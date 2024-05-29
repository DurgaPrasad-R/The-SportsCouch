import { useSelector } from "react-redux";
const UserProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div>
      <p>{user}</p>
      <p>{isAuthenticated}</p>
    </div>
  );
};

export default UserProfile;
