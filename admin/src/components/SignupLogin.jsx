import WAVES from "vanta/src/vanta.waves";
import spinner from "../assets/loading.gif";
import { toast } from "react-toastify";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import show from "../assets/show.png";
import hide from "../assets/hide.png";
const SignupLogin = () => {
  const { login } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    WAVES({
      el: "#vanta",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      color: 0x5892,
      shininess: 50.0,
    });
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:9004/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        login(data.admin);
        toast.success("Logged in successfully!");
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Please try again.");
      throw error;
    } finally {
      setLoading(false);
      console.log("done");
    }
  };
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="contain flex font-poppins">
      <div className="bg h-screen w-1/2 relative hidden md:block">
        <div className="z-10 relative text-white text-3xl font-bold flex flex-col justify-center items-center h-full">
          <p className="text-5xl mb-2">
            <span className="text-[#1e2b3a]">T</span>he{" "}
          </p>
          <p className="text-5xl mb-2">
            <span className="text-[#1e2b3a]">S</span>ports{" "}
            <span className="text-[#1e2b3a]">C</span>ouch
          </p>
          <p className="text-5xl mb-2">
            <span className="text-[#1e2b3a]">A</span>dmin
          </p>
        </div>
        <div
          id="vanta"
          className="h-full w-full absolute top-0 left-0 z-0"
        ></div>
      </div>
      <div className="md:w-1/2 flex justify-center items-center h-screen w-full p-3 md:p-0">
        <div className="w-96">
          <h1 className="text-4xl font-extrabold text-[#7b7b7b] text-center mb-8">
            Login
          </h1>
          <div>
            <div className="text-[#7b7b7b] w-full">
              <p className="my-2">Email</p>
              <input
                value={formData.email}
                onChange={changeHandler}
                type="text"
                name="email"
                placeholder="Type here"
                className="w-full h-10 box-border border-[1px] border-[#c3c3c3] rounded-md pl-4 outline-none text-[#7b7b7b]"
              />
            </div>
            <div className=" text-[#7b7b7b] w-full">
              <p className="my-2">Password</p>
              <div className="flex h-10 box-border border-[1px] border-[#c3c3c3] rounded-md ">
                <input
                  type={passwordType ? "password" : "text"}
                  name="password"
                  value={formData.password}
                  onChange={changeHandler}
                  className="pl-4 rounded-md outline-none w-full text-[#7b7b7b]"
                  placeholder="Type here"
                />
                <div
                  className="h-full flex justify-center items-center cursor-pointer"
                  onClick={() => setPasswordType(!passwordType)}
                >
                  {passwordType ? (
                    <img src={show} className="h-6 mr-2" />
                  ) : (
                    <img src={hide} className="h-6 mr-2" />
                  )}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="my-2 w-full h-10 rounded-md bg-[#6079ff] cursor-pointer text-white"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </div>
      </div>
      {loading && (
        <div className="loading-overlay fixed top-0 left-0 w-full h-full opacity-50 bg-white flex justify-center items-center z-100">
          <img src={spinner} alt="loading.." />
        </div>
      )}
    </div>
  );
};

export default SignupLogin;
