import PlayedCard from "./PlayedCard";
import image from "../assets/team.png";
const RecentlyPlayed = () => {
  const status = "Won";
  const teamName = "TheBoys";
  return (
    <div className="challenge mx-10">
      <h1 className="title font-bold text-xl whitespace-nowrap md:text-2xl flex justify-center p-4">
        Recently Played Teams
      </h1>
      <div className="flex flex-wrap md:flex-nowrap gap-10 justify-center">
        <PlayedCard teamName={teamName} status={status} image={image} />
        <PlayedCard teamName={teamName} status={status} image={image} />
        <PlayedCard teamName={teamName} status={status} image={image} />
        <PlayedCard teamName={teamName} status={status} image={image} />
        <PlayedCard teamName={teamName} status={status} image={image} />
      </div>
    </div>
  );
};

export default RecentlyPlayed;
