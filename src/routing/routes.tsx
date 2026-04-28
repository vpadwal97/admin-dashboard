export const routes = [
  {
    path: "/",
    element: "login",
    children: [{ index: true, element: "deside where to redirect" }],
  },
  { path: "/signup", element: "signup" },
];
