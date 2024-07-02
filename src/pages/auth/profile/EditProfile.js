import {
  Alert,
  Avatar,
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Fab,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { SubmitButton } from "../../../components/ui/Button";
import CloseIcon from "@mui/icons-material/Close";
import InputField from "../../../components/ui/InputField";
import {
  validateText,
  validatePassword,
  validateEmail,
  validatePhone,
  validateConfirmPassword,
} from "../../../components/form/Validations";
import { GridSizes } from "../../../components/ui/GridSizes";
//   import APIEndpoints from "../../../api/APIEndpoints";
//   import { jwtDecode } from "jwt-decode";
//   import { putData } from "../../../api/API";
//   import { AuthContext } from "../../../context/AuthContext";

function EditProfile({ profileData, updateProfile, resetCount }) {
  const { name, surname, email } = profileData;
  const [nameEdit, setNameEdit] = useState(name);
  const [surnameEdit, setSurnameEdit] = useState(surname);
  const [emailEdit, setEmailEdit] = useState(email);

  // State to track form field error
  const [isError, setIsError] = useState(true);
  const [progress, setProgress] = useState(false);
  const [open, setOpen] = useState(true);
  const [alertMessage, setAlertMessage] = useState();
  const [alertType, setAlertType] = useState();
  const [response, setResponse] = useState(false);
  //const ctx = useContext(AuthContext);

  // Update the isError state based on the validation results
  const handleValidation = () => {
    // use your existing validation functions to validate email and password.
    const isNameValid = validateText(nameEdit);
    const isSurnameValid = validateText(surnameEdit);
    const isEmailValid = validateEmail(emailEdit);

    // Set isError based on the validation results
    setIsError(isNameValid !== null || isSurnameValid !== null);
  };

  useEffect(() => {
    handleValidation();
    // Run the validation when formValues state changes
  }, [nameEdit, surnameEdit, emailEdit]);

  // formfields
  const formFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      value: nameEdit,
      onChange: setNameEdit,
    },
    {
      name: "surname",
      label: "Surname",
      type: "text",
      value: surnameEdit,
      onChange: setSurnameEdit,
    },
    // {
    //   name: "email",
    //   label: "Email Address",
    //   type: "email",
    //   value: emailEdit,
    //   onChange: setEmailEdit,
    // },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    //const userID = jwtDecode(ctx.token)?.user?.id;
    //progress
    setProgress(true);

    const profileEditData = {
      firstName: nameEdit,
      lastName: surnameEdit,
      email: emailEdit,
    };

    //const endpoint = new APIEndpoints().getUserProfile(userID);
    //const response = await putData(endpoint, profileEditData, ctx.token);

    // if (response.status === 200) {
    //   setAlertMessage("Profile Updated Successfully");
    //   setAlertType("success");
    //   setResponse(true);
    //   setOpen(true);
    //   resetCount();
    //   setProgress(false);
    //   updateProfile();
    // } else {
    //   // set error
    //   setAlertMessage(response.response.data.error);
    //   setAlertType("error");
    //   setProgress(false);
    //   setResponse(true);
    //   setOpen(true);
    // }
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ paddingY: "5px" }}></Box>
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
          <Grid container spacing={2} sx={{ paddingY: "15px" }}>
            {formFields.map((field, index) => (
              <InputField
                field={field}
                gridSizes={GridSizes.dashboardFieldSizes}
              />
            ))}
            <Grid item xs={12}>
              <SubmitButton
                label="Save Profile"
                disabled={isError}
                type="submit"
                progress={progress}
              />
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}

export default EditProfile;
