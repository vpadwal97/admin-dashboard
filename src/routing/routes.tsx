import ProtectedRoute from "../auth/ProtectedRoute";
import Admin from "../component/Admin";
import Dashboard from "../component/Dashboard";
import Employee from "../component/Employee";
import Login from "../component/Login";
import MainPage from "../component/MainPage";
import Signup from "../component/Signup";

export const routes = [
  {
    path: "/",
    // children: [
    //   {
    element: (
      <ProtectedRoute>
        <MainPage />
      </ProtectedRoute>
    ),
    children: [
      { path: "admin", element: <Admin /> },
      { path: "employee", element: <Employee /> },
      { path: "other", element: <Dashboard /> },
    ],
    //   },
    // ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
];
