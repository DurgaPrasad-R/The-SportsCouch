import { useSelector } from "react-redux";
const UserProfile = () => {
  const user = useSelector((state) => state.util.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div>
      <p>Email:{user.email}</p>
      <p>First Name:{user.firstName}</p>
      <p>Last Name:{user.lastName}</p>
      <p>Age:{user.age}</p>
      <p>Phone:{user.phone}</p>
      <p>{isAuthenticated ? "logout" : "Login"}</p>
    </div>
  );
};

export default UserProfile;
