import icon from "../assets/squad.png";
import PropTypes from "prop-types";
const PlayerList = ({ players, roles }) => {
  return (
    <div className="mt-5">
      <h3 className="font-bold">Players</h3>
      <div className="grid grid-cols-2 gap-5 mt-3">
        {players.map((player, index) => (
          <div
            key={index}
            className="flex items-center px-3 py-3 bg-[#f6f6f6] rounded-lg shadow-md"
          >
            <img src={icon} alt="player icon" className="w-10 h-10 mr-3" />
            <div>
              <h3>{player}</h3>
              <p className="text-gray-500">{roles[index]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

PlayerList.propTypes = {
  players: PropTypes.arrayOf(PropTypes.string).isRequired,
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PlayerList;
