import { createBrowserRouter, redirect } from "react-router-dom";
import Errors from "./views/Errors/Errors";
import Login from "./views/Auth/Login/Login";
import Register from "./views/Auth/Register/Register";
import GuestLayout from "./layouts/GuestLayout/GuestLayout";
import MainLayout from "./layouts/MainLayout/MainLayout";
import Home from "./views/Home/Home";
import { isConnected } from "./utils/utils";
import NewContent from "./views/NewContent/NewContent";

const router = createBrowserRouter([
  {
    loader: async () => {
      if (isConnected()) {
        return redirect("/");
      }
      return null;
    },
    path: "/auth",
    element: <GuestLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    loader: async () => {
      console.log("im here");
      if (!isConnected()) {
        return redirect("/auth/login");
      }
      return null;
    },
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "content/new",
        element: <NewContent />,
      },
    ],
    errorElement: <Errors />,
  },
]);

export default router;
