import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { PropTypes } from "prop-types";
const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.util.auth.user);
  return user ? children : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
