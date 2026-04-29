import { Navigate } from "react-router-dom";
import useLocal from "../hooks/useLocal";

const ProtectedRoute = ({ children, allowedRole = [] }) => {
  const [currentUser] = useLocal("currentUser", null);

  if (!currentUser) {
    console.log("You are not authorised user");
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRole?.length > 0 &&
    currentUser?.userType &&
    !allowedRole.includes(currentUser.userType)
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
