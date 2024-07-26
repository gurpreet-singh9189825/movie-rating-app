import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Register from "./pages/register/Register";
import HomePage from "./pages/homepage/HomePage";
import Login from "./pages/login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
