import cancel from "../assets/cancel.png";
import join from "../assets/Join.png";
const SessionCard = ({ created }) => {
  const sessionData = [
    {
      name: "Morning Football Match",
      sport: "Football",
      date: "2024-05-20",
      time: "08:00",
      venue: "Central Park Stadium",
    },
    {
      name: "Morning Football Match",
      sport: "Football",
      date: "2024-05-20",
      time: "08:00",
      venue: "Central Park Stadium",
    },
    {
      name: "Morning Football Match",
      sport: "Football",
      date: "2024-05-20",
      time: "08:00",
      venue: "Central Park Stadium",
    },
  ];

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
