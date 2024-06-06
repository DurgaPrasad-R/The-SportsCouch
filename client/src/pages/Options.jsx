import { Routes, Route, useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import Team from "../components/CreateTeam";
import Session from "../components/CreateSession";
import Squad from "../components/Squad";
import SessionCard from "../components/SessionCard";
const Options = () => {
  const { sportName } = useParams();
  console.log(sportName);
  return (
    <div className="flex">
      <SideBar sportName={sportName} />
      <Routes>
        <Route path="create-team" element={<Team sportName={sportName} />} />
        <Route path="created-teams" element={<Squad />} />
        <Route
          path="create-session"
          element={<Session sportName={sportName} />}
        />
        <Route
          path="created-sessions"
          element={<SessionCard created={true} />}
        />
        <Route path="join-sessions" element={<SessionCard created={false} />} />
      </Routes>
    </div>
  );
};

export default Options;
