import { Link } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import navProfile from "../assets/nav-profile.svg";
import navLogo from "../assets/nav-logo.png";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../store/AuthSlice";
import { toggleTheme } from "../store/themeSlice";
import { jwtDecode } from "jwt-decode";
const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.util.auth.user);
  const theme = useSelector((state) => state.util.theme.theme);
  console.log(theme);

  const [showDropdown, setShowDropdown] = useState(false);
  const token = localStorage.getItem("auth-token");
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const isTokenExpired = decodedToken.exp * 1000 < Date.now();
      console.log(decodedToken.exp * 1000);
      console.log(Date.now());

      if (isTokenExpired) {
        dispatch(removeUser());
      }
    }
  }, [token, dispatch]);

  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="flex items-center justify-between px-4 shadow-md dark:bg-black dark:shadow-[#444444] dark:shadow-sm relative">
      <Link to="/user">
        <img src={navLogo} alt="logo" className="nav-logo w-20" />
      </Link>
      <div className="flex items-center gap-5">
        {theme === "dark" ? (
          <MdLightMode
            className="text-white text-2xl cursor-pointer hidden md:block"
            onClick={handleTheme}
          />
        ) : (
          <MdDarkMode
            className="text-2xl cursor-pointer hidden md:block"
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
              <div className="p-2 border-t border-gray-300 dark:border-gray-700 md:hidden">
                {theme === "dark" ? (
                  <div
                    className="flex w-full text-left px-4 py-2 text-gray-900 dark:text-gray-100 gap-2"
                    onClick={handleTheme}
                  >
                    Light
                    <MdLightMode className="text-white text-2xl cursor-pointer" />
                  </div>
                ) : (
                  <div
                    className="flex w-full text-left px-4 py-2 text-gray-900 dark:text-gray-100 gap-2"
                    onClick={handleTheme}
                  >
                    Dark
                    <MdDarkMode className="text-2xl cursor-pointer" />
                  </div>
                )}
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
