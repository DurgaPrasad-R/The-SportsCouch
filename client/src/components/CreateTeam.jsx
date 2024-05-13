import { useState } from "react";
import upload_area from "../assets/upload_area.svg";
const CreateTeam = () => {
  const [team, setTeam] = useState({
    name: "",
    available_players: "",
    required_players: "",
    player_names: "",
    image: "",
  });

  const changeHandler = (e) => {
    setTeam({ ...team, [e.target.name]: e.target.value });
  };

  const createTeam = () => {
    console.log(team);
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
            value={team.available_players}
            onChange={changeHandler}
            name="available_players"
            placeholder="Type here"
            className="w-full h-10  box-border border-[1px] border-[#c3c3c3] rounded-md pl-4 outline-none text-[#7b7b7b]"
          />
        </div>
        <div className="createteam-itemfield text-[#7b7b7b] w-full">
          <p className="my-2">No. of required players</p>
          <input
            type="text"
            value={team.required_players}
            onChange={changeHandler}
            name="required_players"
            placeholder="Type here"
            className="w-full h-10  box-border border-[1px] border-[#c3c3c3] rounded-md pl-4 outline-none text-[#7b7b7b]"
          />
        </div>
      </div>
      <div className="createteam-itemfield text-[#7b7b7b] w-full">
        <p className="my-2">Player Names (CSV)</p>
        <input
          type="text"
          value={team.player_names}
          onChange={changeHandler}
          name="player_names"
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
            src={upload_area}
            className="createteam-thumbnail-img h-28 w-28 rounded-lg my-2 object-contain"
          />
        </label>
        <input
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
