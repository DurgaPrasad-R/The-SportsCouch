import { useEffect, useState } from "react";
// import team from "../assets/team.png";
import TeamGroup from "./TeamGroup";
const Squad = () => {
  // const data = [
  //   {
  //     name: "Team 1",
  //     sport: "Cricket",
  //     available: 5,
  //     required: 11,
  //     players: ["Player 1", "Player 2", "Player 3", "Player 4", "Player 5"],
  //     roles: ["Batsman", "Bowler", "All-rounder", "Wicketkeeper", "Bowler"],
  //     image: team,
  //   },
  //   {
  //     name: "Team 2",
  //     sport: "Cricket",
  //     available: 5,
  //     required: 11,
  //     players: ["Player A", "Player B", "Player C", "Player D", "Player E"],
  //     roles: ["Batsman", "Bowler", "All-rounder", "Wicketkeeper", "Bowler"],
  //     image: team,
  //   },
  // ];
  const [data, setData] = useState([]);
  useEffect(() => {
    const getTeams = async () => {
      const response = await fetch("http://localhost:3001/teams/get-teams", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      const jsonData = await response.json();
      // console.log(jsonData.teams);
      setData(jsonData.teams);
    };
    getTeams();
  }, []);
  return (
    <div className="m-10 flex flex-wrap justify-center gap-5 font-poppins">
      {data.map((teamData, index) => (
        <TeamGroup key={index} data={teamData} />
      ))}
    </div>
  );
};

export default Squad;
