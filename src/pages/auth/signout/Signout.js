import React, { useEffect, useContext } from "react";
//import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import CenteredBox from "../../../components/ui/CenteredBox";
import Paragraph from "../../../components/ui/Paragraph";

const SignOut = () => {
  //const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    //ctx.signOut();
    localStorage.removeItem("email");
    navigate("/signin");
  }, []);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CenteredBox>
          <CircularProgress />
          <Paragraph text={"Signing out..."} fontWeight={"normal"} />
        </CenteredBox>
      </Box>
    </>
  );
};

export default SignOut;
