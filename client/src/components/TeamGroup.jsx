import PlayerList from "./PlayerList";
import PropTypes from "prop-types";
const TeamGroup = ({ data }) => {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between px-5 py-3 bg-[#f6f6f6] rounded-lg shadow-md">
        <div className="flex justify-between items-center gap-5">
          <img src={data.image} alt={`${data.name} logo`} className="w-20" />
          <div>
            <h3 className="font-bold">{data.name}</h3>
            <p className="text-gray-500">{data.sport}</p>
            <p className="text-gray-500">
              {data.available}/{data.required} players
            </p>
          </div>
        </div>
      </div>
      <PlayerList players={data.players} roles={data.roles} />
    </div>
  );
};

TeamGroup.propTypes = {
  data: PropTypes.object.isRequired,
};

export default TeamGroup;
