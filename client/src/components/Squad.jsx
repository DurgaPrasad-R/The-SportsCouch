import team from "../assets/team.png";
import TeamGroup from "./TeamGroup";

const Squad = () => {
  const data = [
    {
      name: "Team 1",
      sport: "Cricket",
      available: 5,
      required: 11,
      players: ["Player 1", "Player 2", "Player 3", "Player 4", "Player 5"],
      roles: ["Batsman", "Bowler", "All-rounder", "Wicketkeeper", "Bowler"],
      image: team,
    },
    {
      name: "Team 2",
      sport: "Cricket",
      available: 5,
      required: 11,
      players: ["Player A", "Player B", "Player C", "Player D", "Player E"],
      roles: ["Batsman", "Bowler", "All-rounder", "Wicketkeeper", "Bowler"],
      image: team,
    },
  ];

  return (
    <div className="m-10 flex flex-wrap justify-center gap-5 font-poppins">
      {data.map((teamData, index) => (
        <TeamGroup key={index} data={teamData} />
      ))}
    </div>
  );
};

export default Squad;
