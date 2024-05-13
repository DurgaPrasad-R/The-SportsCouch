import { useState } from "react";
const CreateSession = () => {
  const [session, setSession] = useState({
    name: "",
    time: "",
    date: "",
    venue: "",
    team: "",
  });

  const changeHandler = (e) => {
    setSession({ ...session, [e.target.name]: e.target.value });
  };

  const createSession = () => {
    console.log(session);
  };
  return (
    <div className="create-session box-border w-full max-w-[800px] rounded-md px-12 py-8 my-5 mx-8 bg-white font-poppins">
      <div className="createsession-itemfield text-[#7b7b7b] w-full">
        <p className="my-2">Session title</p>
        <input
          value={session.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
          className="w-full h-10  box-border border-[1px] border-[#c3c3c3] rounded-md pl-4 outline-none text-[#7b7b7b]"
        />
      </div>
      <div className="createsession-dtdesc flex gap-10">
        <div className="createsession-itemfield text-[#7b7b7b] w-full">
          <p className="my-2">Time</p>
          <input
            type="time"
            value={session.time}
            onChange={changeHandler}
            name="time"
            placeholder="Type here"
            className="w-full h-10  box-border border-[1px] border-[#c3c3c3] rounded-md pl-4 outline-none text-[#7b7b7b]"
          />
        </div>
        <div className="createsession-itemfield text-[#7b7b7b] w-full">
          <p className="my-2">Date</p>
          <input
            type="date"
            value={session.date}
            onChange={changeHandler}
            name="date"
            placeholder="Type here"
            className="w-full h-10  box-border border-[1px] border-[#c3c3c3] rounded-md pl-4 outline-none text-[#7b7b7b]"
          />
        </div>
      </div>
      <div className="createsession-itemfield text-[#7b7b7b] w-full">
        <p className="my-2">Venue</p>
        <input
          value={session.venue}
          onChange={changeHandler}
          type="text"
          name="venue"
          placeholder="Type here"
          className="w-full h-10  box-border border-[1px] border-[#c3c3c3] rounded-md pl-4 outline-none text-[#7b7b7b]"
        />
      </div>
      <div className="createsession-itemfield text-[#7b7b7b] w-full">
        <p className="my-2">Select Your Team</p>
        <select
          name="team"
          value={session.team}
          onChange={changeHandler}
          className="createsession-selector p-2 max-w-96 h-10 text-md text-[#7b7b7b] border-[1px] border-[#c3c3c3] rounded-md outline-none text-ellipsis overflow-hidden"
        >
          <option value="Team-1">Team-1</option>
          <option value="Team-2">Team-2</option>
          <option value="Team-3">Team-3</option>
        </select>
      </div>
      <button
        className="createteam-btn  mt-5 w-40 h-10 rounded-md bg-[#6079ff] cursor-pointer text-white"
        onClick={() => createSession()}
      >
        Create
      </button>
    </div>
  );
};

export default CreateSession;
