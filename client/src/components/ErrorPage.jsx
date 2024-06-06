import error from "../assets/error.gif";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <div className="flex items-center w-full h-screen justify-center px-5 whitespace-nowrap md:px-0">
      <div className="">
        <p className="md:text-2xl font-bold text-base">
          Looks like you&apos;re on a wrong route!
        </p>
        <Link
          to="/user"
          className="text-blue-900 font-semibold md:text-base text-sm"
        >
          Click here to navigate to the Home Page
        </Link>
      </div>
      <div>
        <img src={error} alt="error" />
      </div>
    </div>
  );
};

export default ErrorPage;
