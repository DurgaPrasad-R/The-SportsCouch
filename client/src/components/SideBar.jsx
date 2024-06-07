import { Link, useNavigate } from "react-router-dom";

import create from "../assets/create.png";
import view from "../assets/view.png";
import join from "../assets/join-team.png";
import { PropTypes } from "prop-types";

const SidebarItem = ({ to, imgSrc, text }) => (
  <Link to={to}>
    <div className="sidebar-item flex items-center justify-center mx-5 py-1 px-3 rounded-md bg-[#f6f6f6] gap-5 cursor-pointer dark:bg-gray-700 dark:border dark:shadow-sm dark:shadow-[#333333]">
      <img src={imgSrc} alt="" className="w-10" />
      <p className="text-blue-900 dark:text-white">{text}</p>
    </div>
  </Link>
);

SidebarItem.propTypes = {
  to: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

const SideBar = ({ sportName }) => {
  const navigate = useNavigate();
  const menuItems = [
    {
      to: `/user/options/${sportName}/create-team`,
      imgSrc: create,
      text: "Create a Team",
    },
    {
      to: `/user/options/${sportName}/created-teams`,
      imgSrc: view,
      text: "Created Teams",
    },
    {
      to: `/user/options/${sportName}/create-session`,
      imgSrc: create,
      text: "Create a Session",
    },
    {
      to: `/user/options/${sportName}/created-sessions`,
      imgSrc: view,
      text: "Created Sessions",
    },
    {
      to: `/user/options/${sportName}/join-sessions`,
      imgSrc: join,
      text: "Join a Session",
    },
  ];

  const handleSelectChange = (e) => {
    const path = e.target.value;
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="side-bar dark:bg-[#041F1E] dark:text-white md:flex w-full md:max-w-72 bg-white pt-7 my-1">
      <div className="md:flex flex-col gap-5 hidden">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.to}
            to={item.to}
            imgSrc={item.imgSrc}
            text={item.text}
          />
        ))}
      </div>
      <div className="md:hidden">
        <select
          onChange={handleSelectChange}
          className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-700 dark:text-white mb-4"
        >
          <option value="">Select an option</option>
          {menuItems.map((item) => (
            <option key={item.to} value={item.to}>
              {item.text}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default SideBar;
SideBar.propTypes = {
  sportName: PropTypes.string,
};
