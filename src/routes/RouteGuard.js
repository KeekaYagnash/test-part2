import React, { useContext } from "react";
//import { AuthContext } from "../context/AuthContext";
import Login from "../pages/auth/login/Login";

export const RouteGuard = ({ children }) => {
  //const ctx = useContext(AuthContext);
  const urlPathObj = new URL(window.location.href);
  const urlPath = urlPathObj.href;
  if (!urlPath.includes("signin")) {
    return children;
  }

  return <Login />;
};
