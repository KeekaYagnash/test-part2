import {
  Avatar,
  Box,
  Breadcrumbs,
  Divider,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PaperComponent from "../../../components/ui/Paper";
import Paragraph from "../../../components/ui/Paragraph";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";
import ViewProfile from "./ViewProfile";
//import APIEndpoints from "../../../api/APIEndpoints";
//import { jwtDecode } from "jwt-decode";
//import { AuthContext } from "../../../context/AuthContext";
//import { getData } from "../../../api/API";

function Profile() {
  //profile variables
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileData, setProfileData] = useState({
    name,
    surname,
    email,
  });
  const count = useRef(0);
  //const ctx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  const [tab, setTab] = useState("1");
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  //const userID = jwtDecode(ctx.token)?.user?.id;
  const fetchData = async () => {
    // try {
    //   if (count.current < 2) {
    //     count.current += 1;
    //     const endpoint = new APIEndpoints().getUserProfile(userID);
    //     const response = await getData(endpoint, ctx.token);
    //     setProfileData({
    //       name: response.user.firstName,
    //       surname: response.user.lastName,
    //       email: response.user.email,
    //     });
    //     setTab("1");
    //     setIsLoading(false);
    //   }
    // } catch (error) {}
  };
  useEffect(() => {
    // const userID = jwtDecode(ctx.token)?.user?.id;
    // const fetchData = async () => {
    //   try {
    //     if (count.current < 2) {
    //       count.current += 1;
    //       const endpoint = new APIEndpoints().getUserProfile(userID);
    //       const response = await getData(endpoint, ctx.token);
    //       setProfileData({
    //         name: response.user.firstName,
    //         surname: response.user.lastName,
    //         email: response.user.email,
    //       });
    //       setIsLoading(false);
    //     }
    //   } catch (error) {}
    // };
    fetchData();
  }, [name, surname, email, phone, isLoading]);

  return (
    <>
      <Box sx={{ marginLeft: "auto", marginRight: "auto" }}>
        <Grid container sx={{ pb: 1 }}>
          <Grid item xs={12}>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Geologica",
                  fontWeight: "bold",
                  paddingBottom: "3px",
                  color: "#A9832D",
                }}
              >
                My Account
              </Typography>
              <Paragraph
                text={"Manage your account settings and profile."}
                fontWeight={"normal"}
              />
            </Box>
          </Grid>
        </Grid>
        <Divider />

        <Box sx={{ pt: 2 }}>
          <PaperComponent>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  variant="scrollable"
                  scrollButtons={true}
                  onChange={handleChange}
                  aria-label="profile page tab"
                  value={tab}
                >
                  <Tab label="Edit Profile" value="1" />
                  <Tab label="Update Password" value="2" />
                </Tabs>
              </Box>
              <Box sx={{ paddingY: "15px" }}>
                {tab === "1" ? (
                  <EditProfile
                    profileData={profileData}
                    updateProfile={fetchData}
                    resetCount={() => (count.current = 0)}
                  />
                ) : (
                  <UpdatePassword />
                )}
              </Box>
            </Box>
          </PaperComponent>
        </Box>
      </Box>
    </>
  );
}

function Breadcrumb() {
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link className="breadcrumb-link" to={"/dashboard"}>
          Dashboard
        </Link>
        <Typography
          color="#000"
          sx={{ fontWeight: "bold" }}
          fontWeight="normal"
        >
          Profile
        </Typography>
      </Breadcrumbs>
    </div>
  );
}

export default Profile;
