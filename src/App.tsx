import { useState } from "react";
import "./App.css";
import { createBrowserRouter } from "react-router-dom";
import { routes } from "./routing/routes";

export const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
