import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  TextField,
  IconButton,
  InputAdornment,
  Grid,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateDropDown,
  validateCode,
  validateText,
  validateNoSpaces,
} from "../form/Validations";

function InputField({ field, gridSizes }) {
  const { name, label, type, onChange, value, options } = field;
  const { xs, sm, md, lg, xl } = gridSizes;
  const [defaultError, setDefaultError] = useState("");
  const [fieldValue, setValue] = useState(value);

  // show password functionality
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validationMap = {
    email: validateEmail,
    password: validatePassword,
    confirmPassword: validateConfirmPassword,
    code: validateCode,
    name: validateNoSpaces,
    ingestionType: validateDropDown,
    message: validateText,
    awsAccessKey: validateText,
    awsSecreteKey: validateText,

    // Add more validation functions for other input fields
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setValue(value);

    const validationFn = validationMap[name];
    if (validationFn) {
      const error = validationFn(value);
      setDefaultError(error || "");
      // confirm password validation handle
      if (name === "confirmPassword") {
        if (value === document.getElementById("password").value) {
          setDefaultError("");
        }
      }
    }
    onChange(value);
  };

  return (
    <>
      {type === "select" ? (
        <FormControl
          fullWidth
          error={Boolean(defaultError)}
          sx={{ marginBottom: "15px" }}
        >
          <InputLabel id={`${name}-label`}>{label}</InputLabel>
          <Select
            labelId={`${name}-label`}
            value={fieldValue}
            label={label}
            id={name}
            name={name}
            type={type}
            onChange={handleInputChange}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText sx={{ color: "red" }}>
            {defaultError ? defaultError : ""}
          </FormHelperText>
        </FormControl>
      ) : (
        <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
          <TextField
            id={name}
            name={name}
            value={fieldValue}
            onChange={handleInputChange}
            label={label}
            type={
              type !== "password" ? type : showPassword ? "text" : "password"
            }
            InputProps={
              type === "password"
                ? {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }
                : null
            }
            variant="outlined"
            multiline={name === "message" ? true : false}
            minRows={name === "message" ? 4 : 1}
            maxRows={name === "message" ? 8 : 1}
            fullWidth
            error={Boolean(defaultError)}
            helperText={defaultError}
            sx={{ marginBottom: "15px" }}
          />
        </Grid>
      )}
    </>
  );
}

export default InputField;
