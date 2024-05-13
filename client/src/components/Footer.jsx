import navLogo from "../assets/nav-logo.png";
const Footer = () => {
  return (
    <>
      <div className="px-10 flex justify-around items-center">
        <div>
          <div className="navLinks flex gap-10">
            <div className="firstSec flex flex-col items-start p-4">
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
            <div className="thirdSec flex flex-col items-start p-4">
              <h1 className="text-lg font-semibold">Industries</h1>
              <p className="text-md">Startup</p>
              <p className="text-md">Venture Capital</p>
              <p className="text-md">Careers</p>
            </div>
            <div className="fourthSec flex flex-col items-start p-4">
              <h1 className="text-lg font-semibold">Help</h1>
              <p className="text-md">Talk to Support</p>
              <p className="text-md">Support Docs</p>
              <p className="text-md">System Status</p>
            </div>
          </div>
        </div>
        <div className="w-1/3 flex flex-col gap-4 p-4">
          <img src={navLogo} alt="logo" className="nav-logo w-24" />
          <p>
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
      <div className="mx-10 flex justify-around my-2">
        <div className="flex gap-4">
          <p>Privacy</p>
          <p>Services</p>
          <p>Terms & Conditions</p>
        </div>
        <div>Copyright &copy; 2024 DurgaPrasad-R. All rights reserved.</div>
      </div>
    </>
  );
};

export default Footer;
