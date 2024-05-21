import Challenge from "../components/Challenge";
import RecentlyPlayed from "../components/RecentlyPlayed";
import SportsBanner from "../components/SportsBanner";
const UserDashBoard = () => {
  return (
    <div>
      <SportsBanner />
      <Challenge />
      <RecentlyPlayed />
      <hr className="mx-10 mt-10" />
    </div>
  );
};

export default UserDashBoard;
