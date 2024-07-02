import { Box, Divider, Grid, LinearProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Paragraph from "../../../components/ui/Paragraph";

function ViewProfile({ profileData, progress }) {
  const { name, surname, email } = profileData;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(progress);
  }, [progress]);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ paddingY: "15px" }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              color: "#A9832D",
              fontSize: "1.13em",
            }}
          >
            Personal info
          </Typography>
          <Divider />
          {isLoading && (
            <LinearProgress
              color="inherit"
              sx={{ backgroundColor: "#A9832D" }}
            />
          )}
        </Box>
        <Grid container spacing={1} sx={{ paddingY: "2px" }}>
          <Grid item xs={4}>
            <Paragraph text="Name" fontWeight="bold" />
          </Grid>
          <Grid item xs={8}>
            <Paragraph text={name} fontWeight="normal" />
          </Grid>
        </Grid>
        <Grid container spacing={1} sx={{ paddingY: "2px" }}>
          <Grid item xs={4}>
            <Paragraph text="Surname" fontWeight="bold" />
          </Grid>
          <Grid item xs={8}>
            <Paragraph text={surname} fontWeight="normal" />
          </Grid>
        </Grid>

        <Box sx={{ paddingY: "15px" }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              color: "#A9832D",
              fontSize: "1.13em",
            }}
          >
            Contact info
          </Typography>
          <Divider />
          {isLoading && (
            <LinearProgress
              color="inherit"
              sx={{ backgroundColor: "#A9832D" }}
            />
          )}
        </Box>
        <Grid container spacing={1} sx={{ paddingY: "2px" }}>
          <Grid item xs={4}>
            <Paragraph text="Email Address" fontWeight="bold" />
          </Grid>
          <Grid item xs={8}>
            <a href={"mailto:" + email}>
              <Paragraph text={email} fontWeight="normal" />
            </a>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ViewProfile;
