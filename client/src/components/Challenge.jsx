import TeamCard from "./TeamCard";
import image from "../assets/teamCric.png";
const Challenge = () => {
  const sportName = "Cricket";
  const teamName = "TheBoys";
  return (
    <div className="challenge mx-10">
      <h1 className="title font-bold md:text-2xl text-xl flex justify-center p-4">
        Challenge a Team
      </h1>
      <div className="flex md:flex-nowrap flex-wrap gap-10 justify-center">
        <TeamCard teamName={teamName} sportName={sportName} image={image} />
        <TeamCard teamName={teamName} sportName={sportName} image={image} />
        <TeamCard teamName={teamName} sportName={sportName} image={image} />
        <TeamCard teamName={teamName} sportName={sportName} image={image} />
        <TeamCard teamName={teamName} sportName={sportName} image={image} />
      </div>
    </div>
  );
};

export default Challenge;
