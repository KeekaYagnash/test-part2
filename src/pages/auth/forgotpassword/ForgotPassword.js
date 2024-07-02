import React, { useContext, useEffect, useState } from "react";
import { Alert, Box, Collapse, Grid, IconButton } from "@mui/material";
import InputField from "../../../components/ui/InputField";
import { SubmitButton } from "../../../components/ui/Button";
import CloseIcon from "@mui/icons-material/Close";
import { validateEmail } from "../../../components/form/Validations";
import CenteredBox from "../../../components/ui/CenteredBox";
import LogoBlack from "../../../components/Logo/LogoBlack";
import PaperComponent from "../../../components/ui/Paper";
import Heading from "../../../components/ui/Heading";
import { GridSizes } from "../../../components/ui/GridSizes";
import { Link } from "react-router-dom";
//import { onBoard } from "../../../api/API";
//import { AuthContext } from "../../../context/AuthContext";
//import APIEndpoints from "../../../api/APIEndpoints";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState();
  //const [gender, setGender] = useState();

  // State to track form field error
  const [isError, setIsError] = useState(true);
  const [progress, setProgress] = useState(false);
  const [open, setOpen] = useState(true);
  const [alertMessage, setAlertMessage] = useState();
  const [alertType, setAlertType] = useState();
  const [response, setResponse] = useState(false);

  //useContext
  //const ctx = useContext(AuthContext);

  //useNavigate
  const navigate = useNavigate();

  // Update the isError state based on the validation results
  const handleValidation = () => {
    // use your existing validation functions to validate email and password.
    const isEmailValid = validateEmail(email);

    // Set isError based on the validation results

    setIsError(isEmailValid !== null);
  };

  useEffect(() => {
    handleValidation();
    // Run the validation when formValues state changes
  }, [email]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    //progress
    setProgress(true);

    const forgotPasswordData = {
      email,
    };

    // const endpoint = new APIEndpoints().forgotPasswordAPI();
    // const forgotResponse = await onBoard(endpoint, forgotPasswordData);

    // if (email !== "" && forgotResponse) {
    //   //ctx.userEmail(email);
    //   setAlertMessage("Successful");
    //   setAlertType("success");
    //   // setProgress(false);
    //   setResponse(true);
    //   setOpen(true);
    //   setTimeout(() => {
    //     setProgress(false);
    //     navigate("/reset-password");
    //   }, 1000);
    // } else {
    //   // set error
    //   setAlertMessage("Error");
    //   setAlertType("error");
    //   setProgress(false);
    //   setResponse(true);
    //   setOpen(true);
    // }
  };

  // formfields
  const formFields = [
    {
      name: "email",
      label: "Email Address",
      type: "email",
      value: email,
      onChange: setEmail,
    },
    /*{
      name: "select",
      label: "Gender",
      type: "select",
      value: gender,
      onChange: setGender,
      options: [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
      ],
    },*/
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
              <Heading text="Forgot your password" />
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
                  label="Forgot Password"
                  disabled={isError}
                  type="submit"
                  progress={progress}
                />
              </Grid>
            </form>
            <Box sx={{ textAlign: "left", pt: 1, pb: 1 }}>
              <Link className="onboarding-link" to={"/signin"}>
                Login instead
              </Link>
            </Box>
          </PaperComponent>
        </Box>
      </CenteredBox>
    </>
  );
}

export default ForgotPassword;
