import { Link } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import navProfile from "../assets/nav-profile.svg";
import navLogo from "../assets/nav-logo.png";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../store/AuthSlice";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const [theme, setTheme] = useState("light");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between px-4 shadow-md dark:bg-black relative">
      <Link to="/user">
        <img src={navLogo} alt="logo" className="nav-logo w-20" />
      </Link>
      <div className="flex items-center gap-5">
        {theme === "dark" ? (
          <MdLightMode
            className="text-white text-2xl cursor-pointer"
            onClick={handleTheme}
          />
        ) : (
          <MdDarkMode
            className="text-2xl cursor-pointer"
            onClick={handleTheme}
          />
        )}
        <div className="relative">
          <img
            src={navProfile}
            alt="Profile"
            className="nav-profile w-20 cursor-pointer"
            onClick={toggleDropdown}
          />
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-fit bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg">
              <div className="p-4">
                <p className="text-gray-900 dark:text-gray-100 font-bold">
                  {user.firstName + " " + user.lastName}
                </p>
                <p className="text-gray-700 dark:text-gray-300">{user.email}</p>
              </div>
              <div className="p-2 border-t border-gray-300 dark:border-gray-700">
                <button
                  onClick={() => dispatch(removeUser())}
                  className="w-full text-left px-4 py-2 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Signout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
