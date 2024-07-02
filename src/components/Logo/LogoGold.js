import { Box } from "@mui/material";
import React from "react";

function LogoGold({ width }) {
  return (
    <Box
      sx={{
        marginLeft: "auto",
        marginRight: "auto",
        paddingTop: "5px",
        width: { width },
      }}
    >
      <img
        src="../../logo_gold.png"
        alt="Logo"
        width={"100%"}
        height={"auto"}
      />
    </Box>
  );
}

export default LogoGold;
