import React, { useContext } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/auth/login/Login";
import Dashboard from "../pages/admin/dashboard/Dashboard";
import Commissions from "../pages/admin/commissions/Commissions";
import App from "../App";
import { Grid } from "@mui/material";
import { RouteGuard } from "./RouteGuard";
import Profile from "../pages/auth/profile/Profile";
import ForgotPassword from "../pages/auth/forgotpassword/ForgotPassword";
import ResetPassword from "../pages/auth/resetpassword/ResetPassword";
import VerifyOTP from "../pages/auth/verifyotp/VerifyOTP";
import SignOut from "../pages/auth/signout/Signout";
import UserCommission from "../pages/advisors/commission/UserCommission";
import Advisors from "../pages/admin/users/Advisors";
import ManageAdvisor from "../pages/admin/users/ManageAdvisor";
import UploadData from "../pages/admin/upload-data/UploadData";
import Home from "../pages/advisors/home/Home";
import Analytics from "../pages/advisors/analytics/Analytics";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="signin" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="verify-otp" element={<VerifyOTP />} />
        <Route path="signout" element={<SignOut />} />
        {/* Private routes */}
        <Route path="/" element={<PrivateRoute />}>
          <Route
            path="dashboard"
            element={
              <RouteGuard>
                <Dashboard />
              </RouteGuard>
            }
          />

          <Route
            path="upload"
            element={
              <RouteGuard>
                <UploadData />
              </RouteGuard>
            }
          />

          <Route
            path="profile"
            element={
              <RouteGuard>
                <Profile />
              </RouteGuard>
            }
          />

          <Route
            path="commissions"
            element={
              <RouteGuard>
                <Commissions />
              </RouteGuard>
            }
          />

          <Route
            path="advisors"
            element={
              <RouteGuard>
                <Advisors />
              </RouteGuard>
            }
          />
          <Route
            path="advisors/advisor"
            element={
              <RouteGuard>
                <ManageAdvisor />
              </RouteGuard>
            }
          />

          <Route
            path="home"
            element={
              <RouteGuard>
                <Home />
              </RouteGuard>
            }
          />

          <Route
            path="my-commission"
            element={
              <RouteGuard>
                <UserCommission />
              </RouteGuard>
            }
          />

          <Route
            path="analytics"
            element={
              <RouteGuard>
                <Analytics />
              </RouteGuard>
            }
          />
        </Route>
        <Route path="signin" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

function PrivateRoute() {
  // const ctx = useContext(AuthContext);
  // const isAuthenticated = ctx.isAuthenticated;

  const urlPathObj = new URL(window.location.href);
  const urlPath = urlPathObj.href;

  if (urlPath.includes("signin") || localStorage.getItem("email") == null) {
    return <Navigate to="signin" replace />;
  }

  return (
    <Grid container>
      <App />
    </Grid>
  );
}

export default AppRoutes;
