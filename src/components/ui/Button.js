import React from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const SubmitButton = ({ type, label, disabled, progress }) => {
  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Button
        disabled={disabled || progress}
        fullWidth
        type={type}
        variant="contained"
        sx={{ color: "#fff", backgroundColor: "#A9832D", paddingY: "9px" }}
      >
        {label}
      </Button>
      {progress && (
        <CircularProgress
          size={24}
          sx={{
            color: "primary",
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Box>
  );
};

export const NormalButton = ({ label, disabled, handleClick }) => {
  const navigate = useNavigate();
  return (
    <Button
      disabled={disabled}
      type="button"
      variant="contained"
      sx={{ color: "#fff", backgroundColor: "#181C24", paddingY: "9px" }}
      onClick={handleClick}
    >
      {label}
    </Button>
  );
};
