import React from "react";

const SessionCard = () => {
  const session = {
    name: "Morning Football Match",
    sport: "Football",
    date: "2024-05-20",
    time: "08:00 AM",
    location: "Central Park Stadium",
    organizer: "John Doe",
    spotsRemaining: 5,
  };

  const handleJoinSession = (session) => {
    // Add your logic for joining the session here
    console.log("Joining session:", session);
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-md">
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
        <span className="font-semibold">Location:</span> {session.location}
      </p>
      <p>
        <span className="font-semibold">Organizer:</span> {session.organizer}
      </p>
      <p>
        <span className="font-semibold">Spots Remaining:</span>{" "}
        {session.spotsRemaining}
      </p>
      <button
        className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        onClick={() => handleJoinSession(session)}
      >
        Join Session
      </button>
    </div>
  );
};

export default SessionCard;
