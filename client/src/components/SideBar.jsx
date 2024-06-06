import { Link } from "react-router-dom";
import create from "../assets/create.png";
import view from "../assets/view.png";
import join from "../assets/join-team.png";

const SideBar = ({ sportName }) => {
  return (
    <div className="side-bar flex flex-col gap-5 w-full max-w-72 h-screen bg-white pt-7 my-1">
      <Link to={`/user/options/${sportName}/create-team`}>
        <div className="sidebar-item flex items-center justify-center mx-5 py-1 px-3 rounded-md bg-[#f6f6f6] gap-5 cursor-pointer">
          <img src={create} alt="" className="w-10" />
          <p className="text-blue-900">Create a Team</p>
        </div>
      </Link>
      <Link to={`/user/options/${sportName}/created-teams`}>
        <div className="sidebar-item flex items-center justify-center mx-5 py-1 px-3 rounded-md bg-[#f6f6f6] gap-5 cursor-pointer">
          <img src={view} alt="" className="w-10" />
          <p className="text-blue-900">Created Teams</p>
        </div>
      </Link>
      <Link to={`/user/options/${sportName}/create-session`}>
        <div className="sidebar-item flex items-center justify-center mx-5 py-1 px-3 rounded-md bg-[#f6f6f6] gap-5 cursor-pointer">
          <img src={create} alt="" className="w-10" />
          <p className="text-blue-900">Create a Session</p>
        </div>
      </Link>
      <Link to={`/user/options/${sportName}/created-sessions`}>
        <div className="sidebar-item flex items-center justify-center mx-5 py-1 px-3 rounded-md bg-[#f6f6f6] gap-5 cursor-pointer">
          <img src={view} alt="" className="w-10" />
          <p className="text-blue-900">Created Sessions</p>
        </div>
      </Link>
      <Link to={`/user/options/${sportName}/join-sessions`}>
        <div className="sidebar-item flex items-center justify-center mx-5 py-1 px-3 rounded-md bg-[#f6f6f6] gap-5 cursor-pointer">
          <img src={join} alt="" className="w-10" />
          <p className="text-blue-900">Join a Session</p>
        </div>
      </Link>
    </div>
  );
};
export default SideBar;
