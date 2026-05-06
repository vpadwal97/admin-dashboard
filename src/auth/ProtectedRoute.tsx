import { Navigate, useMatches } from "react-router-dom";

type MatchType = {
  handle: {
    [key: string]: unknown;
    roles: string[];
  };
};

// const ProtectedRoute = ({ children, allowedRole = [] }) => {
const ProtectedRoute = ({ children }) => {
  const userType = localStorage.getItem("userType");
  const matches = useMatches() as MatchType[];

  const allowedRole = matches[matches.length - 1]?.handle?.roles;

  console.log(userType, matches, allowedRole);

  if (!userType) {
    console.log("You are not authorised user");
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRole?.length > 0 &&
    userType &&
    !allowedRole.includes(userType.toLowerCase())
  ) {
    console.log("You are not authorised to go to this page");
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
