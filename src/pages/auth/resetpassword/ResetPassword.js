import React, { useContext, useEffect, useState } from "react";
import { Alert, Box, Button, Collapse, Grid, IconButton } from "@mui/material";
import InputField from "../../../components/ui/InputField";
import { SubmitButton } from "../../../components/ui/Button";
import CloseIcon from "@mui/icons-material/Close";
import {
  validateCode,
  validatePassword,
  validateConfirmPassword,
} from "../../../components/form/Validations";
import CenteredBox from "../../../components/ui/CenteredBox";
import LogoBlack from "../../../components/Logo/LogoBlack";
import PaperComponent from "../../../components/ui/Paper";
import Heading from "../../../components/ui/Heading";
import { GridSizes } from "../../../components/ui/GridSizes";
import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../../context/AuthContext";
// import APIEndpoints from "../../../api/APIEndpoints";
// import { onBoard, resetPass } from "../../../api/API";
import Paragraph from "../../../components/ui/Paragraph";

function ResetPassword() {
  const [verificationCode, setVerificationCode] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  // State to track form field error
  const [isError, setIsError] = useState(true);
  const [progress, setProgress] = useState(false);
  const [open, setOpen] = useState(true);
  const [alertMessage, setAlertMessage] = useState();
  const [alertType, setAlertType] = useState();
  const [response, setResponse] = useState(false);

  //const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  // Update the isError state based on the validation results
  const handleValidation = () => {
    // use your existing validation functions to validate email and password.
    const isCodeValid = validateCode(verificationCode);
    const isPasswordValid = validatePassword(newPassword);
    const isConfirmPasswordValid = validateConfirmPassword(
      newPassword,
      confirmPassword
    );

    // Set isError based on the validation results

    setIsError(
      isCodeValid !== null || isPasswordValid !== null || isConfirmPasswordValid
    );
  };

  useEffect(() => {
    handleValidation();
    // Run the validation when formValues state changes
  }, [verificationCode, newPassword, confirmPassword]);

  // resend OTP
  const resendOTP = () => {};

  const handleSubmit = async (event) => {
    event.preventDefault();
    //progress
    setProgress(true);

    const email = "email@example.com"; // ctx.email;

    const resetPasswordData = {
      email,
      verificationCode,
      newPassword,
    };

    // const endpoint = new APIEndpoints().resetPasswordAPI();
    // const resetResponse = resetPass(endpoint, resetPasswordData);

    // if (
    //   verificationCode !== "" &&
    //   newPassword !== "" &&
    //   (await resetResponse).status === 200
    // ) {
    //   setAlertMessage((await resetResponse).message);
    //   setAlertType("success");
    //   // setProgress(false);
    //   setResponse(true);
    //   setOpen(true);
    //   setTimeout(() => {
    //     setProgress(false);
    //     navigate("/signin");
    //   }, 1000);
    // } else {
    //   // set error
    //   setAlertMessage((await resetResponse).message);
    //   setAlertType("error");
    //   setProgress(false);
    //   setResponse(true);
    //   setOpen(true);
    // }
  };

  // formfields
  const formFields = [
    {
      name: "code",
      label: "Verification Code",
      type: "text",
      value: verificationCode,
      onChange: setVerificationCode,
    },
    {
      name: "password",
      label: "Password",
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
      <CenteredBox>
        <Box sx={{ maxWidth: "600px" }}>
          <LogoBlack width="35%" />
          <br />
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

          <PaperComponent>
            <Box sx={{ textAlign: "center", paddingBottom: "20px" }}>
              <Heading text="Reset your password" />
              <Paragraph
                text={
                  "We have sent a password reset code by email to " +
                  //   ctx.email +
                  ". Enter it below to reset your password."
                }
                fontWeight={"normal"}
              />
            </Box>
            <form onSubmit={handleSubmit}>
              <Grid container sx={{ paddingY: "15px" }}>
                {formFields.map((field, index) => {
                  return (
                    <InputField
                      key={index}
                      field={field}
                      gridSizes={GridSizes.onbordingFieldSizes}
                    />
                  );
                })}

                <SubmitButton
                  label="Reset Password"
                  disabled={isError}
                  type="submit"
                  progress={progress}
                />
              </Grid>
            </form>
            <Grid container sx={{ pt: 1, pb: 1 }}>
              <Grid item xs={6} sx={{ textAlign: "left" }}>
                <Button
                  sx={{ color: "#A9832D" }}
                  variant="text"
                  onClick={() => resendOTP()}
                >
                  Resend Code
                </Button>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "right" }}>
                <Link className="onboarding-link" to={"/signin"}>
                  Login instead
                </Link>
              </Grid>
            </Grid>
          </PaperComponent>
        </Box>
      </CenteredBox>
    </>
  );
}

export default ResetPassword;
