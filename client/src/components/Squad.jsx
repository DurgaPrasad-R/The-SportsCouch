import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TeamGroup from "./TeamGroup";
import spin from "../assets/loading.gif";
import next from "../assets/rightArrow.png";
import previous from "../assets/leftArrow.png";
import { useParams } from "react-router-dom";
const Squad = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 2;
  const { sportName } = useParams();
  useEffect(() => {
    const getTeams = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/teams/get-teams?page=${currentPage}&perPage=${perPage}&sport=${sportName}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch teams");
        }
        const jsonData = await response.json();
        setData(jsonData.teams);
      } catch (error) {
        toast.error("Error fetching teams: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    getTeams();
  }, [currentPage, sportName]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="md:m-5 w-full gap-5 font-poppins">
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
            {data.length === perPage && (
              <button
                onClick={() => paginate(currentPage + 1)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 md:py-2 md:px-4 rounded"
              >
                <img src={next} alt="previous" className="w-4 h-4" />
              </button>
            )}
          </div>
          {data.length === 0 ? (
            <p className="flex justify-center">No Teams to Show</p>
          ) : (
            <div className="flex flex-wrap justify-evenly">
              {data.map((teamData, index) => (
                <TeamGroup key={index} data={teamData} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Squad;
