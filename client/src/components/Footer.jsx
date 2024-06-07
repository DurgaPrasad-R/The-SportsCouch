import navLogo from "../assets/nav-logo.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="dark:bg-[#041F1E] dark:text-white ">
      <div className="px-10 flex flex-wrap justify-around items-center">
        <div>
          <div className="navLinks flex flex-wrap gap-10">
            <div className="firstSec md:flex flex-col items-start p-4 hidden">
              <h1 className="text-lg font-semibold">Product</h1>
              <p className="text-md">Updates</p>
              <p className="text-md">Security</p>
              <p className="text-md">Chrome</p>
            </div>
            <div className="secondSec flex flex-col items-start p-4">
              <h1 className="text-lg font-semibold">Company</h1>
              <p className="text-md">About</p>
              <p className="text-md">Blog</p>
              <p className="text-md">Join us</p>
            </div>
            <div className="thirdSec md:flex flex-col items-start p-4 hidden">
              <h1 className="text-lg font-semibold">Industries</h1>
              <p className="text-md">Startup</p>
              <p className="text-md">Venture Capital</p>
              <p className="text-md">Careers</p>
            </div>
            <div className="fourthSec md:flex flex-col items-start p-4 hidden">
              <h1 className="text-lg font-semibold">Help</h1>
              <p className="text-md">Talk to Support</p>
              <p className="text-md">Support Docs</p>
              <p className="text-md">System Status</p>
            </div>
          </div>
        </div>
        <div className="w-1/3 md:flex flex-col gap-4 p-4">
          <img src={navLogo} alt="logo" className="nav-logo w-20" />
          <p className="hidden md:flex">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </div>
      </div>
      <hr className="mx-10 my-4" />
      <div className="md:mx-10 flex flex-wrap justify-around md:py-2">
        <div className="flex gap-4">
          <p>Privacy</p>
          <p>Services</p>
          <p className="hidden md:block">Terms & Conditions</p>
          <p className="block md:hidden">T & C</p>
        </div>
        <div className="whitespace-nowrap">
          Copyright &copy; 2024{" "}
          <Link to="https://github.com/DurgaPrasad-R">DurgaPrasad-R.</Link>
        </div>
        <div>All rights reserved.</div>
      </div>
    </div>
  );
};

export default Footer;
