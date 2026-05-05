import { Navigate } from "react-router-dom";

const UnProtectedRoute = ({ children }) => {
  const userType = localStorage.getItem("userType");

  if (userType) {
    console.log("You are not authorised user");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default UnProtectedRoute;
