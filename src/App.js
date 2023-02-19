import React, { useEffect } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.jsx";
import Recovery from "./components/Recovery.jsx";
import Reset from "./components/Reset.jsx";
import Register from "./components/Register.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import Dashboard from "./screens/homepage/Dashboard";
import AdminSettings from "./screens/adminSettings/AdminSettings";
import SubscriptionStatus from "./screens/subscriptionStatus/SubscriptionStatus";
import ProfileDashboard from "./screens/updateProfile/ProfileDashboard";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Login type="adminlogin" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/newadmin",
    element: <Register type="adminRegister" />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/reset",
    element: <Reset />,
  },
  {
    path: "/recovery",
    element: <Recovery />,
  },
  {
    path: "/profile",
    element: <ProfileDashboard />,
  },
  {
    path: "/adminsettings",
    element: <AdminSettings />,
  },
  {
    path: "/status",
    element: <SubscriptionStatus />,
  },
  {
    path: "/",
    element: <Dashboard />,
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
