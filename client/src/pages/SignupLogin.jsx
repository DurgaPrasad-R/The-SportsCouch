import WAVES from "vanta/src/vanta.waves";
import { useEffect, useState } from "react";
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
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phone: "",
    email: "",
    password: "",
  });
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    console.log(formData);
    let responseDate;
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    await fetch(apiUrl + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        responseDate = data;
      });
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
                className="w-full h-10  box-border border-[1px] border-[#c3c3c3] rounded-md pl-4 outline-none text-[#7b7b7b]"
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
                        style={{ WebkitAppearance: "none" }}
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
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={changeHandler}
                className="w-full h-10  box-border border-[1px] border-[#c3c3c3] rounded-md pl-4 outline-none text-[#7b7b7b]"
                placeholder="Type here"
              />
            </div>
            <button
              className="my-2 w-full h-10 rounded-md bg-[#6079ff] cursor-pointer text-white"
              onClick={() => loginUser()}
            >
              Continue
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
    </div>
  );
};

export default SignupLogin;

// <div className="create-team box-border w-full max-w-[800px] rounded-md px-12 py-8 my-5 mx-8 bg-white font-poppins">
//       <div className="createteam-itemfield text-[#7b7b7b] w-full">
//         <p className="my-2">Team title</p>
//         <input
//           value={team.name}
//           onChange={changeHandler}
//           type="text"
//           name="name"
//           placeholder="Type here"
//           className="w-full h-10  box-border border-[1px] border-[#c3c3c3] rounded-md pl-4 outline-none text-[#7b7b7b]"
//         />
//       </div>
//       <div className="createteam-players flex gap-10">
//         <div className="createteam-itemfield text-[#7b7b7b] w-full">
//           <p className="my-2">No. of available players</p>
//           <input
//             type="text"
//             value={team.available_players}
//             onChange={changeHandler}
//             name="available_players"
//             placeholder="Type here"
//             className="w-full h-10  box-border border-[1px] border-[#c3c3c3] rounded-md pl-4 outline-none text-[#7b7b7b]"
//           />
//         </div>
//         <div className="createteam-itemfield text-[#7b7b7b] w-full">
//           <p className="my-2">No. of required players</p>
//           <input
//             type="text"
//             value={team.required_players}
//             onChange={changeHandler}
//             name="required_players"
//             placeholder="Type here"
//             className="w-full h-10  box-border border-[1px] border-[#c3c3c3] rounded-md pl-4 outline-none text-[#7b7b7b]"
//           />
//         </div>
//       </div>
//       <div className="createteam-itemfield text-[#7b7b7b] w-full">
//         <p className="my-2">Player Names (CSV)</p>
//         <input
//           type="text"
//           value={team.player_names}
//           onChange={changeHandler}
//           name="player_names"
//           placeholder="Type here"
//           className="w-full h-10  box-border border-[1px] border-[#c3c3c3] rounded-md pl-4 outline-none text-[#7b7b7b]"
//         />
//       </div>
//       <div className="createteam-itemfield text-[#7b7b7b] w-full">
//         <p className="my-2">Sport Name</p>
//         <p className="my-2 pl-4">Cricket</p>
//       </div>
//       <div className="createteam-itemfield text-[#7b7b7b] w-full">
//         <label htmlFor="file-input">
//           <img
//             src={upload_area}
//             className="createteam-thumbnail-img h-28 w-28 rounded-lg my-2 object-contain"
//           />
//         </label>
//         <input
//           type="file"
//           name="image"
//           hidden
//           id="file-input"
//           className="w-full h-10  box-border border-[1px] border-[#c3c3c3] rounded-md pl-4 outline-none text-[#7b7b7b]"
//         />
//       </div>
//       <button
//         className="createteam-btn  mt-5 w-40 h-10 rounded-md bg-[#6079ff] cursor-pointer text-white"
//         onClick={() => createTeam()}
//       >
//         Create
//       </button>
//     </div>
