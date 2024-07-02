import React, { useContext, useEffect, useState } from "react";
import { Alert, Box, Collapse, Grid, IconButton, Button } from "@mui/material";
import InputField from "../../../components/ui/InputField";
import { SubmitButton } from "../../../components/ui/Button";
import CloseIcon from "@mui/icons-material/Close";
import {
  validateEmail,
  validatePassword,
} from "../../../components/form/Validations";
import CenteredBox from "../../../components/ui/CenteredBox";
import LogoBlack from "../../../components/Logo/LogoBlack";
import PaperComponent from "../../../components/ui/Paper";
import Heading from "../../../components/ui/Heading";
import { GridSizes } from "../../../components/ui/GridSizes";
import { Link, useNavigate } from "react-router-dom";
//import { AuthContext } from "../../../context/AuthContext";
//import APIEndpoints from "../../../api/APIEndpoints";
//import { onBoard, resetPass, signIn } from "../../../api/API";

function SignIn({}) {
  const navigate = useNavigate();
  //const ctx = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isError, setIsError] = useState(true);
  const [progress, setProgress] = useState(false);
  const [open, setOpen] = useState(true);
  const [alertMessage, setAlertMessage] = useState();
  const [alertType, setAlertType] = useState();
  const [response, setResponse] = useState(false);

  const handleValidation = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    setIsError(isEmailValid !== null || isPasswordValid !== null);
  };

  useEffect(() => {
    handleValidation();
    // if (ctx.isAuthenticated) {
    //   navigate("/dashboard");
    // }
  }, [email, password /*ctx.isAuthenticated]*/]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProgress(true);

    const signinData = {
      email,
      password,
    };

    localStorage.setItem("email", email);

    navigate("/dashboard");

    //const endpoint = new APIEndpoints().loginAPI();
    //const loginResponse = await signIn(endpoint, signinData);

    // if (loginResponse.token) {
    //   ctx.logIn(await loginResponse.token);
    // } else {
    //   setAlertMessage(loginResponse.message);
    //   setAlertType("error");
    //   setProgress(false);
    //   setResponse(true);
    //   setOpen(true);
    // }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const formFields = [
    {
      name: "email",
      label: "Email Address",
      type: "email",
      value: email,
      onChange: setEmail,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      value: password,
      onChange: setPassword,
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
              <Heading text="Sign in to your account" />
            </Box>
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
                  label="Signin"
                  disabled={isError}
                  type="submit"
                  progress={progress}
                />
              </Grid>
            </form>
            <Box sx={{ textAlign: "left", pt: 1, pb: 1 }}>
              <Link className="onboarding-link" to={"/forgot-password"}>
                Forgot Password?
              </Link>
            </Box>
          </PaperComponent>
        </Box>
      </CenteredBox>
    </>
  );
}

export default SignIn;
