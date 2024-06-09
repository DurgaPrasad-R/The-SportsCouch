import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const CreateSession = ({ sportName }) => {
  console.log(sportName);
  const initialState = {
    name: "",
    time: "",
    date: "",
    venue: "",
    team: "",
    teamName: "",
    sport: sportName,
  };
  const [session, setSession] = useState(initialState);
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
        setSession({
          ...session,
        });
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

  const changeHandler = (e) => {
    setSession({ ...session, [e.target.name]: e.target.value });
  };

  const teamChangeHandler = (e) => {
    console.log(e.target.value);
    const selectedTeam = data.find((team) => team._id === e.target.value);
    // console.log(selectedTeam);
    setSession({
      ...session,
      team: selectedTeam._id,
      teamName: selectedTeam.name,
    });
    // console.log(selectedTeam._id + " " + selectedTeam.name);
    document.getElementById("teamId").value = selectedTeam._id;
    document.getElementById("teamName").value = selectedTeam.name;
  };

  const createSession = () => {
    console.log(session);
    if (!document.getElementById("teamId").value) {
      toast.error("Please select a team.");
      return;
    }
    if (localStorage.getItem("auth-token")) {
      const sessionData = {
        ...session,
        team: document.getElementById("teamId").value,
        teamName: document.getElementById("teamName").value,
      };
      fetch("http://localhost:3002/sessions/create-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify(sessionData),
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
    <div className="create-session dark:bg-gray-700 box-border w-full md:max-w-[800px] p-5 rounded-md md:px-12 md:py-8 md:my-5 md:mx-8 bg-white font-poppins">
      <input type="hidden" id="teamId" />
      <input type="hidden" id="teamName" />
      <div className="createsession-itemfield text-[#7b7b7b] w-full">
        <p className="my-2 dark:text-white">Session title</p>
        <input
          value={session.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
          className="w-full h-10  box-border dark:bg-transparent dark:text-white border-[1px] border-[#c3c3c3] rounded-md pl-4 outline-none text-[#7b7b7b]"
        />
      </div>
      <div className="createsession-dtdesc md:flex gap-10">
        <div className="createsession-itemfield text-[#7b7b7b] w-full">
          <p className="my-2 dark:text-white">Time</p>
          <input
            type="time"
            value={session.time}
            onChange={changeHandler}
            name="time"
            placeholder="Type here"
            className="w-full h-10 dark:bg-transparent dark:text-white box-border border-[1px] border-[#c3c3c3] rounded-md pl-4 outline-none text-[#7b7b7b]"
          />
        </div>
        <div className="createsession-itemfield text-[#7b7b7b] w-full">
          <p className="my-2 dark:text-white">Date</p>
          <input
            type="date"
            value={session.date}
            onChange={changeHandler}
            name="date"
            placeholder="Type here"
            className="w-full h-10 dark:bg-transparent dark:text-white box-border border-[1px] border-[#c3c3c3] rounded-md pl-4 outline-none text-[#7b7b7b]"
          />
        </div>
      </div>
      <div className="createsession-itemfield text-[#7b7b7b] w-full">
        <p className="my-2 dark:text-white">Venue</p>
        <input
          value={session.venue}
          onChange={changeHandler}
          type="text"
          name="venue"
          placeholder="Type here"
          className="w-full h-10 dark:bg-transparent dark:text-white box-border border-[1px] border-[#c3c3c3] rounded-md pl-4 outline-none text-[#7b7b7b]"
        />
      </div>
      <div className="createsession-itemfield text-[#7b7b7b] w-full">
        <p className="my-2 dark:text-white">Sport Name</p>
        <p className="my-2 pl-4  dark:text-white">{sportName}</p>
      </div>
      <div className="createsession-itemfield text-[#7b7b7b] w-full">
        <p className="my-2 dark:text-white">Select Your Team</p>
        <select
          name="team"
          onChange={teamChangeHandler}
          className="createsession-selector dark:bg-transparent dark:text-white p-2 max-w-96 h-10 text-md text-[#7b7b7b] border-[1px] border-[#c3c3c3] rounded-md outline-none text-ellipsis overflow-hidden"
        >
          {data.map((team, index) => (
            <option
              value={team._id}
              key={index}
              className="dark:text-white dark:bg-gray-700"
            >
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

CreateSession.propTypes = {
  sportName: PropTypes.string.isRequired,
};
export default CreateSession;
