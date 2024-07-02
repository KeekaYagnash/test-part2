import { Alert, Box, Collapse, Grid, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { SubmitButton } from "../../../components/ui/Button";
import { GridSizes } from "../../../components/ui/GridSizes";
import InputField from "../../../components/ui/InputField";
import {
  validateEmail,
  validatePassword,
  validateText,
} from "../../../components/form/Validations";

function AddAdvisor() {
  // State to track form field error
  const [isError, setIsError] = useState(true);
  const [progress, setProgress] = useState(false);
  const [open, setOpen] = useState(true);
  const [alertMessage, setAlertMessage] = useState();
  const [alertType, setAlertType] = useState();
  const [response, setResponse] = useState(false);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState("DefaultPassword@2024");
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  const handleValidation = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isFirstNameValid = validateText(firstName);
    const isLastNameValid = validateText(lastName);
    setIsError(
      isEmailValid !== null ||
        isFirstNameValid !== null ||
        isLastNameValid !== null
    );
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
  };

  const formFields = [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      value: firstName,
      onChange: setFirstName,
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      value: lastName,
      onChange: setLastName,
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      value: email,
      onChange: setEmail,
    },
    // {
    //   name: "password",
    //   label: "Password",
    //   type: "password",
    //   value: password,
    //   onChange: setPassword,
    // },
  ];

  return (
    <>
      <Box width="100%">
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
          <Grid container>
            {formFields.map((field, index) => (
              <InputField
                key={index}
                field={field}
                gridSizes={GridSizes.onbordingFieldSizes}
              />
            ))}

            <SubmitButton
              label="Add Advisor"
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

export default AddAdvisor;
