import React from "react";
import Dropdown from "../ui/Dropdown";
import Input from "../ui/InputField";
import { Grid } from "@mui/material";
import DatePicker from "../ui/DatePicker";

const FormFieldMapper = ({ formFields, onChange, gridSizes }) => {
  const { xs, sm, md, lg, xl } = gridSizes;

  const handleFieldChange = (fieldName, value) => {
    onChange(fieldName, value);
  };

  return (
    <>
      {formFields.map((field, index) => {
        return field.type === "select" ? (
          <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl} key={index}>
            <Dropdown
              field={field}
              options={field.options}
              onChange={(value) => handleFieldChange(field.name, value)}
            />
          </Grid>
        ) : field.type === "date" ? (
          <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl} key={index}>
            <DatePicker
              label={field.label}
              value={field.value}
              onChange={(value) => handleFieldChange(field.name, value)}
            />
          </Grid>
        ) : (
          <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl} key={index}>
            <Input
              field={field}
              onChange={(value) => handleFieldChange(field.name, value)}
              gridSizes={gridSizes}
            />
          </Grid>
        );
      })}
    </>
  );
};

export default FormFieldMapper;
