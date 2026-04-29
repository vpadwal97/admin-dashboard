import { Navigate } from "react-router-dom";
import useLocal from "../hooks/useLocal";

const UnProtectedRoute = ({ children }) => {
  const [currentUser, setCurrentUser] = useLocal("currentUser", null);

  if (currentUser) {
    console.log("You are not authorised user");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default UnProtectedRoute;
