import cricket from "../assets/cricket.png";
import volleyball from "../assets/volleyball.png";
import badminton from "../assets/badminton.png";
import basketball from "../assets/basketball.png";
import soccer from "../assets/soccer.png";
import squash from "../assets/squash.png";
import golf from "../assets/golf.png";
const SportsBanner = () => {
  return (
    <div className="p-2">
      <h1 className="title font-bold text-2xl flex justify-center p-4">
        Choose a Sport
      </h1>
      <div className="p-4 flex flex-wrap gap-10 justify-center">
        <div className="bg-black text-white w-fit flex flex-row items-center justify-center rounded-md p-2 gap-2">
          <p className="text-lg font-semibold">Cricket</p>
          <img src={cricket} alt="cricket" className="w-10" />
        </div>
        <div className="bg-black text-white w-fit flex flex-row items-center justify-center rounded-md p-2 gap-2">
          <p className="text-lg font-semibold">Volley Ball</p>
          <img src={volleyball} alt="cricket" className="w-10" />
        </div>
        <div className="bg-black text-white w-fit flex flex-row items-center justify-center rounded-md p-2 gap-2">
          <p className="text-lg font-semibold">Badminton</p>
          <img src={badminton} alt="cricket" className="w-10" />
        </div>
        <div className="bg-black text-white w-fit flex flex-row items-center justify-center rounded-md p-2 gap-2">
          <p className="text-lg font-semibold">Basket Ball</p>
          <img src={basketball} alt="cricket" className="w-10" />
        </div>
        <div className="bg-black text-white w-fit flex flex-row items-center justify-center rounded-md p-2 gap-2">
          <p className="text-lg font-semibold">Soccer</p>
          <img src={soccer} alt="cricket" className="w-10" />
        </div>
        <div className="bg-black text-white w-fit flex flex-row items-center justify-center rounded-md p-2 gap-2">
          <p className="text-lg font-semibold">Squash</p>
          <img src={squash} alt="cricket" className="w-10" />
        </div>
        <div className="bg-black text-white w-fit flex flex-row items-center justify-center rounded-md p-2 gap-2">
          <p className="text-lg font-semibold">Golf</p>
          <img src={golf} alt="cricket" className="w-10" />
        </div>
        <div className="bg-black text-white w-fit flex flex-row items-center justify-center rounded-md p-2 gap-2">
          <p className="text-lg font-semibold">Cricket</p>
          <img src={cricket} alt="cricket" className="w-10" />
        </div>
        <div className="bg-black text-white w-fit flex flex-row items-center justify-center rounded-md p-2 gap-2">
          <p className="text-lg font-semibold">Volley Ball</p>
          <img src={volleyball} alt="cricket" className="w-10" />
        </div>
        <div className="bg-black text-white w-fit flex flex-row items-center justify-center rounded-md p-2 gap-2">
          <p className="text-lg font-semibold">Badminton</p>
          <img src={badminton} alt="cricket" className="w-10" />
        </div>
        <div className="bg-black text-white w-fit flex flex-row items-center justify-center rounded-md p-2 gap-2">
          <p className="text-lg font-semibold">Basket Ball</p>
          <img src={basketball} alt="cricket" className="w-10" />
        </div>
        <div className="bg-black text-white w-fit flex flex-row items-center justify-center rounded-md p-2 gap-2">
          <p className="text-lg font-semibold">Soccer</p>
          <img src={soccer} alt="cricket" className="w-10" />
        </div>
        <div className="bg-black text-white w-fit flex flex-row items-center justify-center rounded-md p-2 gap-2">
          <p className="text-lg font-semibold">Squash</p>
          <img src={squash} alt="cricket" className="w-10" />
        </div>
        <div className="bg-black text-white w-fit flex flex-row items-center justify-center rounded-md p-2 gap-2">
          <p className="text-lg font-semibold">Golf</p>
          <img src={golf} alt="cricket" className="w-10" />
        </div>
      </div>
    </div>
  );
};

export default SportsBanner;
