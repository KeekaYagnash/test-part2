import React, { useContext, useEffect, useState } from "react";
import { Alert, Box, Collapse, Grid, IconButton } from "@mui/material";
import InputField from "../../../components/ui/InputField";
import { SubmitButton } from "../../../components/ui/Button";
import CloseIcon from "@mui/icons-material/Close";
import { validateCode } from "../../../components/form/Validations";
import CenteredBox from "../../../components/ui/CenteredBox";
import LogoBlack from "../../../components/Logo/LogoBlack";
import PaperComponent from "../../../components/ui/Paper";
import Heading from "../../../components/ui/Heading";
import { GridSizes } from "../../../components/ui/GridSizes";
import { Link, useNavigate } from "react-router-dom";
import Paragraph from "../../../components/ui/Paragraph";
//import { AuthContext } from "../../../context/AuthContext";
//import APIEndpoints from "../../../api/APIEndpoints";
//import { onBoard, resetPass, signIn } from "../../../api/API";

function VerifyOTP() {
  const [otp, setOtp] = useState();
  //const [gender, setGender] = useState();
  const navigate = useNavigate();
  //const ctx = useContext(AuthContext);

  // State to track form field error
  const [isError, setIsError] = useState(true);
  const [progress, setProgress] = useState(false);
  const [open, setOpen] = useState(true);
  const [alertMessage, setAlertMessage] = useState();
  const [alertType, setAlertType] = useState();
  const [response, setResponse] = useState(false);

  // Update the isError state based on the validation results
  const handleValidation = () => {
    // use your existing validation functions to validate code and password.
    const isCodeValid = validateCode(otp);

    // Set isError based on the validation results

    setIsError(isCodeValid !== null);
  };

  useEffect(() => {
    handleValidation();
    // Run the validation when formValues state changes
  }, [otp]);

  //const { logIn } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    //progress
    setProgress(true);

    // const email = ctx.email;
    // const password = ctx.password;
    // const otpData = { email, otp };

    //Verify otp api and method
    // const endpoint = new APIEndpoints().verifyOTP();
    // const otpResponse = resetPass(endpoint, otpData);

    // const signinData = { email, password };
    // const loginEndpoint = new APIEndpoints().loginAPI();

    // if (otp !== "" && (await otpResponse).status === 200) {
    //   const loginResponse = await signIn(loginEndpoint, signinData);
    //   //storing token in authcontext
    //   logIn(await loginResponse.token);

    //   setAlertMessage((await otpResponse).message);
    //   setAlertType("success");
    //   // setProgress(false);
    //   setResponse(true);
    //   setOpen(true);
    //   ctx.removeLoginInfo();
    //   setProgress(false);
    //   navigate("/dashboard");
    // } else {
    //   // set error
    //   setAlertMessage((await otpResponse).message);
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
      value: otp,
      onChange: setOtp,
    },
  ];
  // handle send new code request
  const sendNewCode = () => {
    alert("request");
    //
  };
  // render output
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
              <Heading text="Confirm your account" />

              <Paragraph
                text={
                  "We have sent a code by email to " +
                  //   ctx.email +
                  ". Enter it below to confirm your account."
                }
                fontWeight="normal"
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
                  disabled={isError}
                  label="Confirm account"
                  type="submit"
                  progress={progress}
                />
              </Grid>
            </form>
            <Box item xs={6} sx={{ textAlign: "left", pt: 1, pb: 1 }}>
              <Link className="onboarding-link" onClick={sendNewCode}>
                Resend code
              </Link>
            </Box>
          </PaperComponent>
        </Box>
      </CenteredBox>
    </>
  );
}

export default VerifyOTP;
