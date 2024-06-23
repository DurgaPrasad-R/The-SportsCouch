import handIcon from "./assets/hand_icon.png";
import spinner from "./assets/loading.gif";
import BarChart from "./components/BarChart";
import { useState } from "react";
import { Data, TeamsData, SessionStatus, SessionData } from "./Data";
import PieChart from "./components/PieChart";
import LineChart from "./components/LineChart";
import Header from "./components/Header";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { toast } from "react-toastify";
import { useEffect } from "react";

function App() {
  const { user } = useContext(UserContext);
  const [image, setImage] = useState(null);
  const [sportName, setSportName] = useState(null);
  const [sportData, setSportData] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const [loading, setLoading] = useState(false);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setSportName(e.target.value);
  };

  const createSport = async () => {
    let responseData;
    let sportData = new FormData();
    sportData.append("sport", image);
    try {
      setLoading(true);
      await fetch(`http://localhost:9004/upload`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: sportData,
      })
        .then((res) => res.json())
        .then((data) => {
          responseData = data;
        });
      if (responseData.success) {
        console.log(responseData.image_url);
        let sportDetails = {
          name: sportName,
          sport: responseData.image_url,
          email: user.email,
        };
        console.log(sportDetails);
        await fetch(`http://localhost:9004/create`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sportDetails),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              toast.success(data.message);
              setFetchTrigger((prev) => prev + 1);
            } else {
              toast.error("Failed to create sport");
            }
          });
      }
    } catch (err) {
      console.error("Error creating sport:", err);
      toast.error("Failed to create sport");
    } finally {
      console.log("Done");
      setLoading(false);
    }
  };

  const [sessionData, setSessionData] = useState({
    labels: Data.map((data) => data.sport),
    datasets: [
      {
        label: "No. of sessions",
        data: Data.map((data) => data.no_of_sessions),
      },
    ],
  });

  const [userData, setUserData] = useState({
    labels: TeamsData.map((data) => data.user_id),
    datasets: [
      {
        label: "No of Teams",
        data: TeamsData.map((data) => data.no_of_teams),
      },
    ],
  });

  const [activeData, setActiveData] = useState({
    labels: ["Active", "Cancelled"],
    datasets: [
      {
        label: "Sessions",
        data: [SessionStatus[0].active, SessionStatus[0].cancelled],
      },
    ],
  });

  const [data, setData] = useState({
    labels: SessionData.map((data) => data.user_id),
    datasets: [
      {
        label: "No of Sessions",
        data: SessionData.map((data) => data.no_of_sessions),
      },
    ],
  });

  useEffect(() => {
    fetch("http://localhost:9004/getSports", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSportData(data.sports);
      });
  }, [fetchTrigger, user.email]);

  useEffect(() => {
    fetch("http://localhost:3001/teams/fetchTeamByUser", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        const formattedUserData = {
          labels: data.result.map((item) => item.user_id),
          datasets: [
            {
              label: "No of Teams",
              data: data.result.map((item) => item.number_of_teams),
            },
          ],
        };
        setUserData(formattedUserData);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3002/sessions/fetchSessionByUser", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        const formattedData = {
          labels: data.result.map((item) => item.user_id),
          datasets: [
            {
              label: "No of Sessions",
              data: data.result.map((item) => item.number_of_sessions),
            },
          ],
        };
        setData(formattedData);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3002/sessions/groupByStatus", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        const sessionCounts = { active: 0, cancelled: 0 };
        data.result.forEach((session) => {
          if (session.status === true) {
            sessionCounts.active = session.number_of_sessions;
          } else if (session.status === false) {
            sessionCounts.cancelled = session.number_of_sessions;
          }
        });

        setActiveData({
          labels: ["Active", "Cancelled"],
          datasets: [
            {
              label: "Sessions",
              data: [sessionCounts.active, sessionCounts.cancelled],
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching cancelled sessions:", error);
        toast.error("Failed to fetch session data");
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3002/sessions/groupBySport", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        const formattedSessionData = {
          labels: data.result.map((item) => item.sport),
          datasets: [
            {
              label: "No of Sessions",
              data: data.result.map((item) => item.number_of_sessions),
            },
          ],
        };
        setSessionData(formattedSessionData);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="flex font-poppins items-center gap-2 mt-5">
        <img src={handIcon} alt="hand-ico" className="w-10" />
        <p className="italic font-semibold text-2xl">Welcome, {user.name}</p>
      </div>
      <div className="font-poppins flex justify-center items-center gap-2 mt-2">
        <label>Name of the Sport:</label>
        <input
          type="text"
          className="border-b-2 focus:outline-none"
          onChange={changeHandler}
          name="name"
        />
        <input type="file" onChange={imageHandler} name="image" />
        <button
          className="bg-blue-500 p-2 rounded-md text-white"
          onClick={createSport}
        >
          Add Sport
        </button>
      </div>
      {!loading ? (
        sportData.length > 0 && (
          <div className="flex justify-center gap-5 p-2">
            {sportData.map((sport, index) => (
              <div
                key={index}
                className="bg-black text-white w-fit flex flex-row items-center justify-center rounded-md p-2 gap-2"
              >
                <p className="font-poppins font-semibold">{sport.name}</p>
                <img src={sport.sport} alt="sport" className="w-10" />
              </div>
            ))}
          </div>
        )
      ) : (
        <img src={spinner} alt="loading" className="w-10 m-auto" />
      )}
      <div className="text-2xl font-bold p-5 font-poppins">
        <div className="flex justify-center p-5 m-5">
          <div className="w-1/2">
            <LineChart chartData={data} title={"User Vs Sessions"} />
          </div>
          <div className="w-1/2">
            <BarChart chartData={sessionData} />
          </div>
        </div>
        <div className="flex justify-center p-5 m-5">
          <div className="w-1/2">
            <LineChart chartData={userData} title={"User Vs Teams"} />
          </div>
          <div className="w-1/2">
            <PieChart chartData={activeData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
