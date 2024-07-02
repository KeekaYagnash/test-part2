import { Typography } from "@mui/material";
import React from "react";

function Heading({ text }) {
  return (
    <>
      <Typography
        variant="h5"
        sx={{
          fontFamily: "Segoe UI",
          fontWeight: "bold",
          paddingBottom: "30px",
          color: "#181C24",
        }}
      >
        {text}
      </Typography>
    </>
  );
}

export default Heading;
