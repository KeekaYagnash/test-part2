// Validation for Text Input
export const validateTextInput = (value) => {
  if (!value.trim()) {
    return "Input text is required.";
  }
  return null; // No error
};

// Validation for emails
export const validateEmail = (value) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(value)) {
    return "Invalid email address.";
  }
  return null; // No error
};

// Validations for Passwords
export const validatePassword = (value) => {
  if (!value) {
    return "Password is required.";
  } else if (!/\d/.test(value)) {
    return "Password must contain at least 1 digit.";
  } else if (!/[A-Z]/.test(value)) {
    return "Password must contain at least 1 uppercase letter.";
  } else if (!/[a-z]/.test(value)) {
    return "Password must contain at least 1 lowercase letter.";
  } else if (!/[!@#$%^&*]/.test(value)) {
    return "Password must contain at least 1 special character.";
  } else if (value.length < 8 || value.length > 15) {
    return "Password must be 8 to 15 characters long.";
  }
  return null; // No error
};

// Validations for password and confirming password
export const validateConfirmPassword = (password, confirmPassword) => {
  if (confirmPassword !== password) {
    return "Passwords don't match";
  }
  return null; // No error
};

// Validations for Verification Code (OTP)
export const validateCode = (value) => {
  const codePattern = /^[0-9]+$/;
  if (!codePattern.test(value)) {
    return "Verification code may only contain numbers.";
  } else if (value.length < 6) {
    return "Invalid verification code.";
  }
  return null; // No error
};

// Validations for Dropdowns
export const validateDropDown = (value) => {
  if (!value) {
    return "Please select an option from the list";
  }

  return null;
};

export const validateText = (value) => {
  if (!value) {
    return "Field required.";
  }
  return null; // No error
};

export const validatePhone = (value) => {
  const phonePattern = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  if (!phonePattern.test(value)) {
    return "Invalid phone number.";
  }
  return null; // No error
};

export const validateNoSpaces = (value) => {
  if (!value) {
    return "Field required.";
  }

  if (/\s/.test(value)) {
    return "Please use hyphens '-' instead of spaces in this field.";
  }
  return null; //No error
};

export const validateDate = (value) => {
  if (!value) {
    return "Date is required.";
  }

  const selectedDate = new Date(value);
  var dateComponents = selectedDate.toString().split(" ");

  if (dateComponents[0] === "Sat" || dateComponents[0] === "Sun") {
    return "Selected date cannot be on a weekend.";
  }

  return null;
};

export const validateDocument = (doc) => {
  if (typeof doc === "string" && doc !== "") {
    var extension = doc.split(".").pop().toLowerCase();

    const validExtentions = [ "csv", "xls", "xlsx" ];

    if (validExtentions.some(ve => ve === extension)) {
      return null;
    } else {
      return `Invalid document file. Upload any of the following: ${validExtentions.join(", ")}`;
    }
  }

  return "No document attached.";
};
