import ProtectedRoute from "../auth/ProtectedRoute";
import UnProtectedRoute from "../auth/UnProtectedRoute";
import FirebaseLogin from "../auth/FirebaseLogin";
import Admin from "../component/Admin";
import Dashboard from "../component/Dashboard";
import Employee from "../component/Employee";
import Login from "../component/Login";
import MainPage from "../component/MainPage";
import Profile from "../component/Profile";
import Signup from "../component/Signup";

export const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainPage />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "admin",
        element: <Admin />,
        handle: {
          roles: ["admin"],
        },
      },
      {
        path: "employee",
        element: <Employee />,
        handle: {
          roles: ["admin", "employee"],
        },
      },
      { path: "dashboard", element: <Dashboard /> },
      { path: "profile", element: <Profile /> },
    ],
  },
  {
    path: "/callback",
    element: (
      <UnProtectedRoute>
        "callback"
      </UnProtectedRoute>
    ),
  },
  {
    path: "/firelogin",
    element: (
      <UnProtectedRoute>
        <FirebaseLogin />
      </UnProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <UnProtectedRoute>
        <Login />
      </UnProtectedRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <UnProtectedRoute>
        <Signup />
      </UnProtectedRoute>
    ),
  },
];
