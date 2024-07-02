import { Alert, Box, Collapse, Grid, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { SubmitButton } from "../../../components/ui/Button";
import { GridSizes } from "../../../components/ui/GridSizes";
import InputField from "../../../components/ui/InputField";
import { validateDropDown } from "../../../components/form/Validations";

function ManageAdvisorPermisions({ advisor }) {
  // State to track form field error
  const [isError, setIsError] = useState(true);
  const [progress, setProgress] = useState(false);
  const [open, setOpen] = useState(true);
  const [alertMessage, setAlertMessage] = useState();
  const [alertType, setAlertType] = useState();
  const [response, setResponse] = useState(false);

  const [status, setStatus] = useState(advisor.status);

  const handleValidation = () => {
    const isStatusValid = validateDropDown(status);
    setIsError(isStatusValid !== null);
  };

  useEffect(() => {
    handleValidation();
    // if (ctx.isAuthenticated) {
    //   navigate("/dashboard");
    // }
  }, [status /*ctx.isAuthenticated]*/]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProgress(true);
  };

  const formFields = [
    {
      name: "status",
      label: "Advisor Status",
      type: "select",
      value: status,
      onChange: setStatus,
      options: [
        { value: "Active", label: "Active" },
        { value: "Resigned", label: "Resigned" },
        { value: "Suspended", label: "Suspended" },
        { value: "Temporarily Inactive", label: "Temporarily Inactive" },
      ],
    },
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
              label="Change Advisor Status"
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

export default ManageAdvisorPermisions;
