import React from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form'; // using React hook form
import FormInput from './CustomTextField'; // RHF, Material UI connector


const AddressForm = ({ checkoutToken, test }) => {
    // setting up our React hook form. This gives us all the methods we need to run our form 
    const methods = useForm();

   
    return (
        <>
        <Typography variant="h6" gutterBottom>Shipping address</Typography>
        {/* FormProvider from RHF, spreading all methods from RHF*/}
        <FormProvider {...methods}>
            <form onSubmit=''>
            {/* Grid for spacing all of our input fields */}
                <Grid container spacing={3}>
                    {/* FormInput from CustomTextField, connecting RHF to material UI input */}
                    <FormInput required name="firstName" label="First name" />
                    <FormInput required name="lastName" label="Last name" />
                    <FormInput required name="address1" label="Address line 1" />
                    <FormInput required name="email" label="Email" />
                    <FormInput required name="city" label="City" />
                    <FormInput required name="zip" label="Zip / Postal code" />
                </Grid>
            </form>
        </FormProvider>
        </>
    );
};

export default AddressForm;