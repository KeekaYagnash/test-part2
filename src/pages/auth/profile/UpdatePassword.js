import React, { useEffect, useState } from "react";
import { Alert, Box, Collapse, Grid, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SubmitButton } from "../../../components/ui/Button";
import {
  validateText,
  validatePassword,
  validateConfirmPassword,
} from "../../../components/form/Validations";
import { GridSizes } from "../../../components/ui/GridSizes";
import InputField from "../../../components/ui/InputField";

function UpdatePassword() {
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const [isError, setIsError] = useState(true);
  const [progress, setProgress] = useState(false);
  const [open, setOpen] = useState(true);
  const [alertMessage, setAlertMessage] = useState();
  const [alertType, setAlertType] = useState();
  const [response, setResponse] = useState(false);

  const handleValidation = () => {
    const isCurrentPasswordValid = validateText(currentPassword);
    const isNewPasswordValid = validatePassword(newPassword);
    const isConfirmPasswordValid = validateConfirmPassword(
      newPassword,
      confirmPassword
    );

    setIsError(
      isCurrentPasswordValid !== null ||
        isNewPasswordValid !== null ||
        isConfirmPasswordValid !== null
    );
  };

  useEffect(() => {
    handleValidation();
  }, [currentPassword, newPassword, confirmPassword]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setProgress(true);

    const updatePasswordData = {
      currentPassword,
      newPassword,
    };

    if (updatePasswordData.newPassword !== currentPassword) {
      setAlertMessage("Successful");
      setAlertType("success");
      setProgress(false);
      setResponse(true);
      setOpen(true);
    } else {
      setAlertMessage("Error");
      setAlertType("error");
      setProgress(false);
      setResponse(true);
      setOpen(true);
    }
  };

  const formFields = [
    {
      name: "currentPassword",
      label: "Current Password",
      type: "password",
      value: currentPassword,
      onChange: setCurrentPassword,
    },
    {
      name: "password",
      label: "New Password",
      type: "password",
      value: newPassword,
      onChange: setNewPassword,
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      value: confirmPassword,
      onChange: setConfirmPassword,
    },
  ];

  return (
    <>
      <Box sx={{ width: "100%" }}>
        {response ? (
          <Collapse in={open}>
            <Alert
              severity={alertType}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {alertMessage}
            </Alert>
          </Collapse>
        ) : (
          <Box></Box>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container sx={{ paddingY: "15px" }}>
            {formFields.map((field, index) => (
              <InputField
                key={index}
                field={field}
                gridSizes={GridSizes.onbordingFieldSizes}
              />
            ))}

            <SubmitButton
              label="Update Password"
              disabled={isError}
              type="submit"
              progress={progress}
            />
          </Grid>
        </form>
      </Box>
    </>
  );
}

export default UpdatePassword;
