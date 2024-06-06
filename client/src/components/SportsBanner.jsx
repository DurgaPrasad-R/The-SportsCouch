import { Link } from "react-router-dom";
import cricket from "../assets/cricket.png";
import volleyball from "../assets/volleyball.png";
import badminton from "../assets/badminton.png";
import basketball from "../assets/basketball.png";
import soccer from "../assets/soccer.png";
import squash from "../assets/squash.png";
import golf from "../assets/golf.png";

const sports = [
  { name: "Cricket", img: cricket },
  { name: "Volleyball", img: volleyball },
  { name: "Badminton", img: badminton },
  { name: "Basketball", img: basketball },
  { name: "Soccer", img: soccer },
  { name: "Squash", img: squash },
  { name: "Golf", img: golf },
];

const SportsBanner = () => {
  return (
    <div className="p-2 dark:bg-black">
      <h1 className="title font-bold text-2xl flex justify-center p-4 dark:text-white">
        Select a Sport
      </h1>
      <div className="p-4 flex flex-wrap gap-10 justify-center">
        {sports.map((sport, index) => (
          <div
            key={index}
            className="bg-black dark:bg-white dark:text-black text-white w-fit flex flex-row items-center justify-center rounded-md p-2 gap-2"
          >
            <p className="font-semibold">
              <Link to={`/user/options/${sport.name}`}>{sport.name}</Link>
            </p>
            <img src={sport.img} alt={sport.name} className="w-10" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SportsBanner;
