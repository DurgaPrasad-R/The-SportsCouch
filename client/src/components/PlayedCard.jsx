import { PropTypes } from "prop-types";
const PlayedCard = ({ image, teamName, status }) => {
  return (
    <div className="teamContainer">
      <div className="imgContainer rounded flex justify-center">
        <img src={image} alt="teamCric" className="w-52 rounded" />
      </div>
      <div className="teamDetails">
        <h1>
          <span className="font-semibold mr-2">Played against:</span>
          {teamName}
        </h1>
        <p className="text-sm">
          <span className="font-semibold mr-2">Result:</span>
          {status}
        </p>
      </div>
    </div>
  );
};

export default PlayedCard;
PlayedCard.propTypes = {
  image: PropTypes.string,
  teamName: PropTypes.string,
  status: PropTypes.string,
};
