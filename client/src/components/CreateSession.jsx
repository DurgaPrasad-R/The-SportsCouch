import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const CreateSession = () => {
  const initialState = {
    name: "",
    time: "",
    date: "",
    venue: "",
    team: "Team-1",
    sport: "Cricket",
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    const getTeams = async () => {
      if (localStorage.getItem("auth-token")) {
        const response = await fetch("http://localhost:3001/teams/get-teams", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        });
        const jsonData = await response.json();
        // console.log(jsonData.teams);

        setData(jsonData.teams);
      } else {
        toast.error("Please login to view teams");
        setTimeout(() => {
          window.location.href = "/sign-in";
        }, 2000);
      }
    };
    getTeams();
  }, []);
  const [session, setSession] = useState(initialState);

  const changeHandler = (e) => {
    setSession({ ...session, [e.target.name]: e.target.value });
  };

  const createSession = () => {
    console.log(session);
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:3002/sessions/create-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify(session),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          toast.success(data.message);
          setSession(initialState);
        });
    } else {
      toast.error("Please login to create a session");
      setTimeout(() => {
        window.location.href = "/sign-in";
      }, 2000);
    }
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
        <p className="my-2">Sport Name</p>
        <p className="my-2 pl-4">Cricket</p>
      </div>
      <div className="createsession-itemfield text-[#7b7b7b] w-full">
        <p className="my-2">Select Your Team</p>
        <select
          name="team"
          value={session.team}
          onChange={changeHandler}
          className="createsession-selector p-2 max-w-96 h-10 text-md text-[#7b7b7b] border-[1px] border-[#c3c3c3] rounded-md outline-none text-ellipsis overflow-hidden"
        >
          {data.map((team, index) => (
            <option value={team.name} key={index}>
              {team.name}
            </option>
          ))}
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
