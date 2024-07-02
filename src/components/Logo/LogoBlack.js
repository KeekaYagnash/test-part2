import { Box } from "@mui/material";
import React from "react";

function LogoBlack({ width }) {
  return (
    <Box
      sx={{
        marginLeft: "auto",
        marginRight: "auto",
        paddingTop: "5px",
        width: { width },
      }}
    >
      <img src="./logo_black.png" alt="Logo" width={"100%"} height={"auto"} />
    </Box>
  );
}

export default LogoBlack;
