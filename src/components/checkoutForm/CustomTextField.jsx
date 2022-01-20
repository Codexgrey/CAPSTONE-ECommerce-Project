// This component connects RHF with material UI text input
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';

function FormInput({ name, label, required }) {
  const { control } = useFormContext();
  const isError = false;

  return (
    <Grid item xs={12} sm={6}>
      {/* RHF component that allows us to use any other input/text field as this controller */}
      <Controller
        as={TextField} // Takes look and feel and all the variables from the real text field
        name={name}
        control={control}  // getting from calling useFormContext()
        label={label}
        fullWidth
        required={required}
        error={isError}
      />
    </Grid>
  );
}

export default FormInput;