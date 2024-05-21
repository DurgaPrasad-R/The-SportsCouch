import { Link } from "react-router-dom";
import navProfile from "../assets/nav-profile.svg";
import navLogo from "../assets/nav-logo.png";
const Header = () => {
  return (
    <div className="flex items-center justify-between px-4 shadow-md">
      <Link to="/user">
        <img src={navLogo} alt="logo" className="nav-logo w-20" />
      </Link>
      <img src={navProfile} alt="" className="nav-profile w-20" />
    </div>
  );
};

export default Header;
