import React from "react";
import "./App.css";
import { Grid } from "@mui/material";
import { AdminMenuItems } from "./components/navbar/AdminMenuItems";
import { AdvisorMenuItems } from "./components/navbar/AdvisorMenuItems";
import SideNav from "./components/navbar/Sidenav";
//import { AuthContext } from "./context/AuthContext";

function App() {
  //const ctx = useContext(AuthContext);
  const ctx = localStorage.getItem("email");
  return (
    <>
      <Grid container>
        <SideNav
          menuItems={ctx === "admin@trc.com" ? AdminMenuItems : AdvisorMenuItems}
        />
      </Grid>
    </>
  );
}

export default App;
