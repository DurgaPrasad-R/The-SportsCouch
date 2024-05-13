import { Routes, Route } from "react-router-dom";
import SideBar from "../components/SideBar";
import Team from "../components/CreateTeam";
import Session from "../components/CreateSession";
const Options = () => {
  return (
    <div className="flex">
      <SideBar />
      <Routes>
        <Route path="/create-team" element={<Team />} />
        <Route path="/create-session" element={<Session />} />
      </Routes>
    </div>
  );
};

export default Options;
