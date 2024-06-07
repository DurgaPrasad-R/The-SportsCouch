import { PropTypes } from "prop-types";
const TeamCard = ({ image, teamName, sportName }) => {
  return (
    <div className="teamContainer">
      <div className="imgContainer rounded flex justify-center">
        <img src={image} alt="teamCric" className="w-52 rounded" />
      </div>
      <div className="teamDetails">
        <h1 className="font-bold text-lg">{teamName}</h1>
        <p className="text-sm">{sportName}</p>
      </div>
    </div>
  );
};

export default TeamCard;
TeamCard.propTypes = {
  image: PropTypes.string,
  teamName: PropTypes.string,
  sportName: PropTypes.string,
};
