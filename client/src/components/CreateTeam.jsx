import { useState } from "react";
import upload_area from "../assets/upload_area.svg";
import { toast } from "react-toastify";
const CreateTeam = () => {
  const [image, setImage] = useState(false);
  const initialState = {
    name: "",
    available: "",
    required: "",
    players: "",
    sport: "Cricket",
  };
  const [team, setTeam] = useState(initialState);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };
  const changeHandler = (e) => {
    setTeam({ ...team, [e.target.name]: e.target.value });
  };

  const createTeam = async () => {
    console.log(team);
    let responseData;
    let teamDetails = team;
    let teamData = new FormData();
    console.log(image);
    teamData.append("team", image);
    if (localStorage.getItem("auth-token")) {
      await fetch("http://localhost:3001/teams/upload", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: teamData,
      })
        .then((res) => res.json())
        .then((data) => {
          responseData = data;
        });
      if (responseData.success) {
        console.log(responseData.image_url);
        teamDetails.image = responseData.image_url;
        teamDetails.players = team.players.split(",");
        await fetch("http://localhost:3001/teams/create-team", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
          body: JSON.stringify(teamDetails),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              toast.success(data.message);
              setTeam(initialState);
            } else {
              toast.error("Failed to create team");
            }
          });
      } else {
        toast.error("Failed while uploading an image");
      }
    } else {
      toast.error("Please login to create team");
      window.location.href = "/sign-in";
    }
  };
  return (
    <div className="create-team box-border w-full max-w-[800px] rounded-md px-12 py-8 my-5 mx-8 bg-white font-poppins">
      <div className="createteam-itemfield text-[#7b7b7b] w-full">
        <p className="my-2">Team title</p>
        <input
          value={team.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
          className="w-full h-10  box-border border-[1px] border-[#c3c3c3] rounded-md pl-4 outline-none text-[#7b7b7b]"
        />
      </div>
      <div className="createteam-players flex gap-10">
        <div className="createteam-itemfield text-[#7b7b7b] w-full">
          <p className="my-2">No. of available players</p>
          <input
            type="text"
            value={team.available}
            onChange={changeHandler}
            name="available"
            placeholder="Type here"
            className="w-full h-10  box-border border-[1px] border-[#c3c3c3] rounded-md pl-4 outline-none text-[#7b7b7b]"
          />
        </div>
        <div className="createteam-itemfield text-[#7b7b7b] w-full">
          <p className="my-2">No. of required players</p>
          <input
            type="text"
            value={team.required}
            onChange={changeHandler}
            name="required"
            placeholder="Type here"
            className="w-full h-10  box-border border-[1px] border-[#c3c3c3] rounded-md pl-4 outline-none text-[#7b7b7b]"
          />
        </div>
      </div>
      <div className="createteam-itemfield text-[#7b7b7b] w-full">
        <p className="my-2">Player Names (CSV)</p>
        <input
          type="text"
          value={team.players}
          onChange={changeHandler}
          name="players"
          placeholder="Type here"
          className="w-full h-10  box-border border-[1px] border-[#c3c3c3] rounded-md pl-4 outline-none text-[#7b7b7b]"
        />
      </div>
      <div className="createteam-itemfield text-[#7b7b7b] w-full">
        <p className="my-2">Sport Name</p>
        <p className="my-2 pl-4">Cricket</p>
      </div>
      <div className="createteam-itemfield text-[#7b7b7b] w-full">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="createteam-thumbnail-img h-28 w-28 rounded-lg my-2 object-contain"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          hidden
          id="file-input"
          className="w-full h-10  box-border border-[1px] border-[#c3c3c3] rounded-md pl-4 outline-none text-[#7b7b7b]"
        />
      </div>
      <button
        className="createteam-btn  mt-5 w-40 h-10 rounded-md bg-[#6079ff] cursor-pointer text-white"
        onClick={() => createTeam()}
      >
        Create
      </button>
    </div>
  );
};
export default CreateTeam;
