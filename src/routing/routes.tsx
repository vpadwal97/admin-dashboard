import ProtectedRoute from "../auth/ProtectedRoute";
import UnProtectedRoute from "../auth/UnProtectedRoute";
import Admin from "../component/Admin";
import Dashboard from "../component/Dashboard";
import Employee from "../component/Employee";
import Login from "../component/Login";
import MainPage from "../component/MainPage";
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
        element: (
          <ProtectedRoute allowedRole={["admin"]}>
            <Admin />
          </ProtectedRoute>
        ),
      },
      {
        path: "employee",
        element: (
          <ProtectedRoute allowedRole={["admin,employee"]}>
            <Employee />
          </ProtectedRoute>
        ),
      },
      { path: "dashboard", element: <Dashboard /> },
    ],
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
