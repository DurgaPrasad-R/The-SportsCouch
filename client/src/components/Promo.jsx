import promo from "../assets/promo.mp4";
import { HiLightBulb } from "react-icons/hi";
import { FaLightbulb } from "react-icons/fa6";
import { useState } from "react";
const Promo = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="promo h-screen w-full">
      <div className="overlay absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
      <video
        src={promo}
        autoPlay
        muted
        className="w-full h-full object-cover"
      ></video>
      <div className="box-border absolute w-full h-full top-10 items-center flex flex-col justify-center text-white">
        {/*<p>The Sports Couch</p>*/}
        <button
          className="p-2 bg-blue-500 rounded-md flex justify-center items-center gap-2 hover:bg-blue-800"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Sign In{" "}
          {isHovered ? (
            <HiLightBulb className="w-5 h-5" />
          ) : (
            <FaLightbulb className="w-3 h-3" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Promo;
