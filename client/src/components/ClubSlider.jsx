import Marquee from "react-fast-marquee";
import vsp from "../assets/vsp.png";
import csk from "../assets/csk.png";
import dc from "../assets/dc.png";
import mi from "../assets/mi.png";
import rcb from "../assets/rcb.png";
import srh from "../assets/srh.png";
const ClubSlider = () => {
  return (
    <div className="clubs m-4">
      <h1 className="title font-bold text-2xl flex justify-center p-4">
        Popular Clubs
      </h1>
      <Marquee>
        <img className="mr-10 w-52" src={vsp} alt="vsp" />
        <img className="mr-10 w-52" src={csk} alt="vsp" />
        <img className="mr-10 w-52" src={dc} alt="vsp" />
        <img className="mr-10 w-52" src={mi} alt="vsp" />
        <img className="mr-10 w-52" src={rcb} alt="vsp" />
        <img className="mr-10 w-52" src={srh} alt="vsp" />
      </Marquee>
    </div>
  );
};

export default ClubSlider;
