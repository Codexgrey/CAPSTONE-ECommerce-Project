import React from 'react';
import { TextField, Grid } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';



// This component connects RHF with material UI text input
const FormInput = ({ name, label }) => {
    const { control } = useFormContext();

    return (
        <Grid item xs={12} sm={6}>
            {/* RHF component that allows us to use any other input/text field as this controller */}
            <Controller
                /* 
                    control is gotten from calling useFormContext()
                    using render to output text field, now required for Controller in RHF
                    TextField takes look, feel & all variables from real text field
                */
                name={name}
                control={control} 
                render = {({ field })=> (
                    <TextField 
                        fullWidth
                        label={label}
                        required
                    />
                )}
            />
        </Grid>
    );
}

export default FormInput;