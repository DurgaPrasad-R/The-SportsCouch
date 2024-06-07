import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="dark:bg-[#041F1E] dark:text-white ">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default UserLayout;
