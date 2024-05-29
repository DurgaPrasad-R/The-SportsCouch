import { Link } from "react-router-dom";
import navProfile from "../assets/nav-profile.svg";
import navLogo from "../assets/nav-logo.png";
import { useEffect, useState } from "react";
const Header = () => {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    if (theme == "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });
  const handleTheme = () => {
    setTheme(theme == "dark" ? "light" : "dark");
  };
  return (
    <div className="flex items-center justify-between px-4 shadow-md dark:bg-black">
      <Link to="/user">
        <img src={navLogo} alt="logo" className="nav-logo w-20" />
      </Link>
      <img
        src={navProfile}
        alt=""
        className="nav-profile w-20"
        onClick={handleTheme}
      />
    </div>
  );
};

export default Header;
