import icon from "../assets/squad.png";
import { MdDelete } from "react-icons/md";
import PropTypes from "prop-types";
const PlayerList = ({ players, id }) => {
  console.log(players);
  const handleDelete = async () => {
    if (
      window.confirm(
        "This operation deletes the team and corresponding sessions?"
      )
    ) {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL_TEAM;
        const response = await fetch(`${apiUrl}/teams/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        });
        const sessionUrl = import.meta.env.VITE_API_BASE_URL_SESSION;
        const res = await fetch(
          `${sessionUrl}/sessions/delete-sessions/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete team");
        }
        if (!res.ok) {
          throw new Error("Failed to delete corresponding sessions");
        }
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("BYe");
    }
  };
  return (
    <div className="mt-5">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">Players</h3>
        <MdDelete
          size={"30px"}
          onClick={handleDelete}
          className="cursor-pointer"
        />
      </div>
      <div className="grid grid-cols-2 gap-5 mt-3">
        {players.map((player, index) => (
          <div
            key={index}
            className="flex items-center dark:bg-gray-700 px-3 py-3 bg-[#f6f6f6] rounded-lg md:shadow-md"
          >
            <img src={icon} alt="player icon" className="w-10 h-10 mr-3" />
            <div>
              <h3>{player}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

PlayerList.propTypes = {
  players: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  // roles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PlayerList;
