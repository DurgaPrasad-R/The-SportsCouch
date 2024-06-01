import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import cancel from "../assets/cancel.png";
import join from "../assets/Join.png";

const SessionCard = ({ created }) => {
  const [sessionData, setSessionData] = useState([]);

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
        }
      } else {
        toast.error("Please login to view sessions");
        setTimeout(() => {
          window.location.href = "/sign-in";
        }, 2000);
      }
    };

    getSessions();
  }, [created]);

  const handleJoinSession = (session) => {
    console.log("Cancelling session:", session);
  };

  return (
    <div className="m-10 flex flex-wrap justify-center gap-5 font-poppins">
      {sessionData.map((session, index) => (
        <div key={index} className="shadow-md p-4 w-fit h-fit">
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
            <span className="font-semibold">Team:</span> {session.team}
          </p>
          <button className="mt-2" onClick={() => handleJoinSession(session)}>
            {created ? (
              <img src={cancel} alt="Cancel" className="w-10" />
            ) : (
              <img src={join} alt="join" className="w-10" />
            )}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SessionCard;
