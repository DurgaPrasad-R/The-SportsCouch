import { toast } from "react-toastify";
import WAVES from "vanta/src/vanta.waves";
import spinner from "../assets/loading.gif";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/AuthSlice";
import show from "../assets/show.png";
import hide from "../assets/hide.png";
import loginUser from "../services/login";
import signUp from "../services/signup";
import * as Yup from "yup";
import { loginSchema, signupSchema } from "../services/validation";
const SignupLogin = () => {
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
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState(true);
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phone: "",
    email: "",
    password: "",
  });

  const validationSchema = state === "Login" ? loginSchema : signupSchema;

  const handleSubmit = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setLoading(true);
      if (state === "Login") {
        const user = await loginUser(formData);
        console.log(user);
        dispatch(setUser(user));
        setTimeout(() => {
          window.location.href = "/user";
        }, 2000);
      } else {
        const user = await signUp(formData);
        dispatch(setUser(user));
        setTimeout(() => {
          window.location.href = "/user";
        }, 2000);
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => toast.error(err.message));
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="contain flex">
      <div className="bg h-screen w-1/2 relative">
        <div className="z-10 relative text-white text-3xl font-bold flex flex-col justify-center items-center h-full">
          <p className="text-5xl mb-2">
            <span className="text-[#1e2b3a]">T</span>he{" "}
          </p>
          <p className="text-5xl mb-2">
            <span className="text-[#1e2b3a]">S</span>ports{" "}
          </p>
          <p className="text-5xl mb-2">
            <span className="text-[#1e2b3a]">C</span>ouch
          </p>
        </div>
        <div
          id="vanta"
          className="h-full w-full absolute top-0 left-0 z-0"
        ></div>
      </div>
      <div className="w-1/2 flex justify-center items-center h-screen">
        <div className="w-96">
          <h1 className="text-4xl font-extrabold text-[#7b7b7b] text-center mb-8">
            {state}
          </h1>
          <div>
            <div className="mb-2">
              {state === "Sign Up" ? (
                <div className="text-[#7b7b7b] w-full">
                  <div className="flex gap-2">
                    <div className="text-[#7b7b7b] w-full">
                      <p className="my-2">First Name</p>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={changeHandler}
                        name="firstName"
                        placeholder="Type here"
                        className="w-full h-10  box-border border-[1px] border-[#c3c3c3] rounded-md pl-4 outline-none text-[#7b7b7b]"
                      />
                    </div>
                    <div className="text-[#7b7b7b] w-full">
                      <p className="my-2">Last Name</p>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={changeHandler}
                        name="lastName"
                        placeholder="Type here"
                        className="w-full h-10  box-border border-[1px] border-[#c3c3c3] rounded-md pl-4 outline-none text-[#7b7b7b]"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
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
            <div className="mb-2">
              {state === "Sign Up" ? (
                <div className="text-[#7b7b7b] w-full">
                  <div className="flex gap-2">
                    <div className="text-[#7b7b7b] w-full">
                      <p className="my-2">Phone No.</p>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={changeHandler}
                        name="phone"
                        placeholder="Type here"
                        className="w-full h-10  box-border border-[1px] border-[#c3c3c3] rounded-md pl-4 outline-none text-[#7b7b7b]"
                      />
                    </div>
                    <div className="text-[#7b7b7b] w-full">
                      <p className="my-2">Age</p>
                      <input
                        type="number"
                        value={formData.age}
                        onChange={changeHandler}
                        name="age"
                        placeholder="Type here"
                        className="w-full h-10  box-border border-[1px] border-[#c3c3c3] rounded-md pl-4 outline-none text-[#7b7b7b]"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
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
              disabled={loading}
            >
              {loading ? "Loading.." : "Continue"}
            </button>
            {state === "Login" ? (
              <p className="my-2">
                Create an account?{" "}
                <span
                  className="text-red-500 cursor-pointer"
                  onClick={() => {
                    setState("Sign Up");
                  }}
                >
                  Click Here
                </span>
              </p>
            ) : (
              <div>
                <div className="my-2">
                  <input type="checkbox" className="mr-2" required />
                  <label className="text-gray-700">
                    I agree to the terms and conditions
                  </label>
                </div>
                <p className="my-2">
                  Already have an account?{" "}
                  <span
                    className="text-red-500 cursor-pointer"
                    onClick={() => {
                      setState("Login");
                    }}
                  >
                    Login Here
                  </span>
                </p>
              </div>
            )}
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
