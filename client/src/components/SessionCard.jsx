import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import cancel from "../assets/cancel.png";
import spin from "../assets/loading.gif";
import join from "../assets/Join.png";
import PropTypes from "prop-types";

const SessionCard = ({ created }) => {
  const [sessionData, setSessionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState("");
  const [joined, setJoined] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const user = useSelector((state) => state.util.auth.user);
  useEffect(() => {
    const getSessions = async () => {
      if (localStorage.getItem("auth-token")) {
        try {
          const endpoint = created
            ? "http://localhost:3002/sessions/get-sessions"
            : "http://localhost:3002/sessions/get-other-sessions";
          const response = await fetch(endpoint, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("auth-token"),
            },
          });
          const jsonData = await response.json();
          console.log(
            `Fetched ${created ? "created" : "other"} sessions`,
            jsonData.sessions
          );
          setSessionData(jsonData.sessions);
        } catch (error) {
          console.error("Error fetching sessions:", error);
          toast.error("Failed to fetch sessions. Please try again.");
        } finally {
          setLoading(false);
        }
      } else {
        toast.error("Please login to view sessions");
        setTimeout(() => {
          window.location.href = "/sign-in";
        }, 2000);
      }
    };

    getSessions();
  }, [created, reason, joined]);

  const handleJoinSession = async (session) => {
    if (created) {
      setSelectedSession(session);
      setShowModal(true);
    } else {
      setButtonLoading(session.sessionId);
      try {
        const team = await fetch(
          `http://localhost:3001/teams/${session.team}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
        const teamData = await team.json();
        if (teamData.available < teamData.required) {
          const endpoint = `http://localhost:3002/sessions/join/${session.sessionId}`;
          const response = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("auth-token"),
            },
          });
          if (response.ok) {
            setJoined(true);
            toast.success("Joined session successfully");
          } else {
            throw new Error("Failed to join session");
          }
        } else {
          toast.error("Max. players reached");
        }
      } catch (error) {
        console.error("Error joining session:", error);
        toast.error("Failed to join session. Please try again.");
      } finally {
        setButtonLoading(null);
      }
    }
  };

  const handleCancelSession = async () => {
    setButtonLoading(selectedSession.sessionId);
    try {
      const endpoint = `http://localhost:3002/sessions/cancel/${selectedSession.sessionId}`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({ reason }),
      });
      if (response.ok) {
        const updatedSessions = sessionData.map((session) =>
          session.id === selectedSession.id
            ? { ...session, cancelled: true, cancellationReason: reason }
            : session
        );
        setSessionData(updatedSessions);
        toast.success("Session canceled successfully");
        setShowModal(false);
      } else {
        throw new Error("Failed to cancel session");
      }
    } catch (error) {
      console.error("Error canceling session:", error);
      toast.error("Failed to cancel session. Please try again.");
    } finally {
      setButtonLoading(null);
      setSelectedSession(null);
      setReason("");
    }
  };

  return (
    <div className="md:m-10 flex flex-wrap w-full justify-center gap-5 font-poppins">
      {loading ? (
        <div className="flex justify-center items-center">
          <img src={spin} alt="loading" className="w-20 h-20 mx-auto" />
        </div>
      ) : sessionData.length === 0 ? (
        <p>No Sessions to show</p>
      ) : (
        sessionData.map((session) => (
          <div
            key={session.sessionId}
            className="shadow-md rounded-md p-4 w-fit h-fit"
          >
            <h3 className="text-lg font-semibold mb-2">{session.name}</h3>
            <p>
              <span className="font-semibold">Sport:</span> {session.sport}
            </p>
            <p>
              <span className="font-semibold">Date:</span> {session.date}
            </p>
            <p>
              <span className="font-semibold">Time:</span> {session.time}
            </p>
            <p>
              <span className="font-semibold">Location:</span> {session.venue}
            </p>
            <p>
              <span className="font-semibold">Team:</span> {session.teamName}
            </p>
            {!session.active && (
              <p>
                <span className="font-semibold">Cancellation Reason:</span>{" "}
                {session.cancellationReason}
              </p>
            )}
            {session.active &&
              !(session.participants.length > 0) &&
              !session.participants.includes(user.email) && (
                <button
                  className="mt-2"
                  onClick={() => handleJoinSession(session)}
                  disabled={buttonLoading === session.sessionId}
                >
                  {buttonLoading === session._id ? (
                    "Processing..."
                  ) : created ? (
                    <img src={cancel} alt="Cancel" className="w-10" />
                  ) : (
                    <img src={join} alt="Join" className="w-10" />
                  )}
                </button>
              )}
            {session.participants.includes(user.email) && <p>Joined</p>}
          </div>
        ))
      )}

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-5 rounded shadow-lg">
            <h2 className="text-xl mb-4">Cancel Session</h2>
            <p>Please provide a reason for cancellation:</p>
            <textarea
              className="w-full p-2 border rounded mt-2"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button
                className="mr-2 px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={handleCancelSession}
                disabled={buttonLoading === selectedSession.id}
              >
                {buttonLoading === selectedSession.id
                  ? "Processing..."
                  : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

SessionCard.propTypes = {
  created: PropTypes.bool.isRequired,
};

export default SessionCard;
