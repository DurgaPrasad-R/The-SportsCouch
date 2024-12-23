import { useState } from "react";
import upload_area from "../assets/upload_area.svg";
import spinner from "../assets/loading.gif";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
const CreateTeam = ({ sportName }) => {
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const initialState = {
    name: "",
    available: "",
    required: "",
    players: "",
    sport: sportName,
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
    try {
      setLoading(true);
      if (localStorage.getItem("auth-token")) {
        const apiUrl = import.meta.env.VITE_API_BASE_URL_TEAM;
        await fetch(`${apiUrl}/teams/upload`, {
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
          await fetch(`${apiUrl}/teams/create-team`, {
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
    } catch (err) {
      console.error("Error creating team:", err);
      toast.error("Failed to create team");
    } finally {
      console.log("Done");
      setLoading(false);
    }
  };
  return (
    <div className="create-team dark:bg-gray-700 p-5 box-border w-full md:max-w-[800px] rounded-md md:px-12 md:py-8 md:my-5 md:mx-8 bg-white font-poppins">
      <div className="createteam-itemfield text-[#7b7b7b] w-full">
        <p className="my-2 dark:text-white">Team title</p>
        <input
          value={team.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
          className="w-full h-10  box-border border-[1px] border-[#c3c3c3] rounded-md pl-4 outline-none text-[#7b7b7b] dark:bg-transparent dark:text-white"
        />
      </div>
      <div className="createteam-players md:flex gap-10">
        <div className="createteam-itemfield text-[#7b7b7b] w-full">
          <p className="my-2 dark:text-white">No. of available players</p>
          <input
            type="text"
            value={team.available}
            onChange={changeHandler}
            name="available"
            placeholder="Type here"
            className="w-full h-10  box-border border-[1px] border-[#c3c3c3] rounded-md pl-4 outline-none text-[#7b7b7b] dark:bg-transparent dark:text-white"
          />
        </div>
        <div className="createteam-itemfield text-[#7b7b7b] w-full">
          <p className="my-2 dark:text-white">No. of required players</p>
          <input
            type="text"
            value={team.required}
            onChange={changeHandler}
            name="required"
            placeholder="Type here"
            className="w-full h-10  box-border border-[1px] border-[#c3c3c3] rounded-md pl-4 outline-none text-[#7b7b7b] dark:bg-transparent dark:text-white"
          />
        </div>
      </div>
      <div className="createteam-itemfield text-[#7b7b7b] w-full">
        <p className="my-2 dark:text-white">Player Names (CSV)</p>
        <input
          type="text"
          value={team.players}
          onChange={changeHandler}
          name="players"
          placeholder="Type here"
          className="w-full h-10  box-border border-[1px] border-[#c3c3c3] rounded-md pl-4 outline-none text-[#7b7b7b] dark:bg-transparent dark:text-white"
        />
      </div>
      <div className="createteam-itemfield text-[#7b7b7b] w-full">
        <p className="my-2 dark:text-white">Sport Name</p>
        <p className="my-2 pl-4 dark:text-white">{sportName}</p>
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
        className={`createteam-btn mt-5 w-40 h-10 rounded-md ${
          loading ? "bg-gray-500" : "bg-[#6079ff]"
        } cursor-pointer text-white`}
        onClick={createTeam}
        disabled={loading}
      >
        {loading ? (
          <img src={spinner} alt="loading" className="h-6 mx-auto" />
        ) : (
          "Create"
        )}
      </button>
    </div>
  );
};

CreateTeam.propTypes = {
  sportName: PropTypes.string.isRequired,
};
export default CreateTeam;
