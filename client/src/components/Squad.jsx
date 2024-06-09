import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TeamGroup from "./TeamGroup";
import spin from "../assets/loading.gif";
const Squad = () => {
  // TODO: Add roles also
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getTeams = async () => {
      if (localStorage.getItem("auth-token")) {
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
        setLoading(false);
      } else {
        toast.error("Please login to view teams");
        setTimeout(() => {
          window.location.href = "/sign-in";
        }, 2000);
      }
    };
    getTeams();
  }, []);
  return (
    <div className="md:m-10 flex flex-wrap justify-evenly w-full gap-5 font-poppins">
      {loading ? (
        <div className="flex justify-center items-center">
          <img src={spin} alt="loading" className="w-20 h-20 mx-auto" />
        </div>
      ) : data.length === 0 ? (
        <p>No Teams to show</p>
      ) : (
        data.map((teamData, index) => <TeamGroup key={index} data={teamData} />)
      )}
    </div>
  );
};

export default Squad;
