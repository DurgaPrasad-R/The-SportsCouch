import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import cancel from "../assets/cancel.png";
import spin from "../assets/loading.gif";
import join from "../assets/Join.png";
import PropTypes from "prop-types";
import previous from "../assets/leftArrow.png";
import next from "../assets/rightArrow.png";
import trash from "../assets/delete.png";

const SessionCard = ({ created }) => {
  const { sportName } = useParams();
  const [sessionData, setSessionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState("");
  const [joined, setJoined] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 6;
  const user = useSelector((state) => state.util.auth.user);
  useEffect(() => {
    const getSessions = async () => {
      if (localStorage.getItem("auth-token")) {
        try {
          const apiUrl = import.meta.env.VITE_API_BASE_URL_SESSION;
          setLoading(true);
          const endpoint = created
            ? `${apiUrl}/sessions/get-sessions?page=${currentPage}&perPage=${perPage}&sport=${sportName}`
            : `${apiUrl}/sessions/get-other-sessions?page=${currentPage}&perPage=${perPage}&sport=${sportName}`;
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
  }, [created, reason, joined, currentPage]);

  const handleJoinSession = async (session) => {
    if (created) {
      setSelectedSession(session);
      setShowModal(true);
    } else {
      setButtonLoading(session.sessionId);
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL_TEAM;
        const team = await fetch(`${apiUrl}/teams/${session.team}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        });
        const teamData = await team.json();
        const sessionUrl = import.meta.env.VITE_API_BASE_URL_SESSION;
        if (teamData.available < teamData.required) {
          const endpoint = `${sessionUrl}/sessions/join/${session.sessionId}`;
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
      const apiUrl = import.meta.env.VITE_API_BASE_URL_SESSION;
      const endpoint = `${apiUrl}/sessions/cancel/${selectedSession.sessionId}`;
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

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteSession = async (id) => {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL_SESSION;
      const response = await fetch(`${apiUrl}/sessions/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete session");
      }
      window.location.reload();
    } catch (error) {
      console.error("Error deleting session:", error);
      toast.error("Failed to delete session. Please try again.");
    }
  };

  return (
    <div className="md:m-5 w-full font-poppins">
      {loading ? (
        <div className="flex justify-center items-center">
          <img src={spin} alt="loading" className="w-20 h-20 mx-auto" />
        </div>
      ) : (
        <>
          <div className="my-4 flex justify-end mx-2">
            {currentPage > 0 && (
              <button
                onClick={() => paginate(currentPage - 1)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold md:py-2 md:px-4 py-1 px-2 rounded mr-2"
              >
                <img src={previous} alt="previous" className="w-4 h-4" />
              </button>
            )}
            {sessionData.length === perPage && (
              <button
                onClick={() => paginate(currentPage + 1)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 md:py-2 md:px-4 rounded"
              >
                <img src={next} alt="previous" className="w-4 h-4" />
              </button>
            )}
          </div>
          {sessionData.length === 0 ? (
            <p className="flex justify-center">No Sessions to Show</p>
          ) : (
            <div className="flex flex-wrap w-full justify-center gap-5">
              {sessionData.map((session) => {
                const sessionDate = new Date(session.date);
                const currentDate = new Date();

                return (
                  <div
                    key={session.sessionId}
                    className="shadow-md rounded-md p-4 w-fit h-fit"
                  >
                    <h3 className="text-lg font-semibold mb-2">
                      {session.name}
                    </h3>
                    <p>
                      <span className="font-semibold">Sport:</span>{" "}
                      {session.sport}
                    </p>
                    <p>
                      <span className="font-semibold">Date:</span>{" "}
                      {session.date}
                    </p>
                    <p>
                      <span className="font-semibold">Time:</span>{" "}
                      {session.time}
                    </p>
                    <p>
                      <span className="font-semibold">Location:</span>{" "}
                      {session.venue}
                    </p>
                    <p>
                      <span className="font-semibold">Team:</span>{" "}
                      {session.teamName}
                    </p>
                    {!session.active && (
                      <p>
                        <span className="font-semibold">
                          Cancellation Reason:
                        </span>{" "}
                        {session.cancellationReason}
                      </p>
                    )}
                    {sessionDate < currentDate && <p>Match Date crossed</p>}
                    {session.participants.includes(user.email) && <p>Joined</p>}
                    <div className="flex justify-between">
                      {session.active &&
                        sessionDate > currentDate &&
                        !session.participants.includes(user.email) && (
                          <button
                            className="mt-2 cursor-pointer"
                            onClick={() => handleJoinSession(session)}
                            disabled={buttonLoading === session.sessionId}
                          >
                            {buttonLoading === session.sessionId ? (
                              "Processing..."
                            ) : created ? (
                              <img src={cancel} alt="Cancel" className="w-10" />
                            ) : (
                              <img src={join} alt="Join" className="w-10" />
                            )}
                          </button>
                        )}
                      <img
                        src={trash}
                        alt="delete"
                        className="w-10 cursor-pointer"
                        onClick={() => handleDeleteSession(session._id)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white dark:text-black p-5 rounded shadow-lg">
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
