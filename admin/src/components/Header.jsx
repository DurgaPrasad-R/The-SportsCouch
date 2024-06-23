import navLogo from "../assets/nav-logo.png";
import navProfile from "../assets/nav-profile.svg";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { toast } from "react-toastify";
const Header = () => {
  const { logout } = useContext(UserContext);
  const signOut = () => {
    console.log("signout");
    logout();
    toast.success("Logged out successfully!");
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };
  return (
    <div className="flex justify-between p-1 shadow-md font-poppins">
      <img src={navLogo} alt="logo" className="w-20" />
      <div className="flex items-center gap-2">
        <button
          onClick={signOut}
          className="p-2 bg-blue-500 rounded-md text-white"
        >
          Signout
        </button>
        <img src={navProfile} alt="profile" />
      </div>
    </div>
  );
};

export default Header;
