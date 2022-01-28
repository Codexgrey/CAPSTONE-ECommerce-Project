import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form'; // using React hook form
import { Link } from 'react-router-dom';

// to use all API features
import { commerce } from '../../lib/commerce';
import FormInput from './CustomTextField'; // RHF, Material UI connector


const AddressForm = ({ checkoutToken, next }) => {
    // shipping states to fetch all countries, subdivisions and options
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    // setting up our React hook form. This gives us all the methods we need to run our form 
    const methods = useForm();

    /* 
        Mapping over Object.entries(keys and values of these objects i.e each country).
        This makes shippingCountries an array of arrays (2D array) 
        This is done to simplify the map function in shippingCountry field
    */
    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }))
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }))
    
    // shippingOptions are an array by default, hence mapping immediately
    const options = shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` }))

    const fetchShippingCountries = async (checkoutTokenId) => {
        /* 
            makes api call, passes in our receipt/checkoutTokenId,
            checkoutTokenId is created in Checkout.jsx 
        */ 
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        setShippingCountries(countries);

        //[US, BL, BR] getting first element in array of country object to get country
        setShippingCountry(Object.keys(countries)[0]); 
    };

    //  countryCode (as a result of fetchShippingCountries function) to fetch subdivisions
    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    };

    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: region });
        // this is an array
        setShippingOptions(options);
        setShippingOption(options[0].id);
    };


    // call fetchShippingCountries whenever a user has a checkoutToken
    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    }, []); // fix 1


    /* 
        This carries a singular dependency(shippingCountry).
        Whenever the shippingCountry changes, recall this useEffect i.e fetchSubdivisions 
    */
    useEffect(() => {
        if (shippingCountry) fetchSubdivisions(shippingCountry);
    }, [shippingCountry]);


    useEffect(() => {
        if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    }, [shippingSubdivision]); // fix 2

   
    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping address</Typography>
            {/* FormProvider from RHF, spreading all methods from RHF*/}
            <FormProvider {...methods}>
                {/* 
                    handleSubmit, handling all (data) for all form fields 
                    calling next function from Checkout;
                    giving it an obj - { spreading (data) properties & passing in all shipping Data }
                */}
                <form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
                    {/* Grid for spacing all of our input fields */}
                    <Grid container spacing={3}>
                        {/* FormInput from CustomTextField, connecting RHF to material UI input */}
                        <FormInput name="firstName" label="First name" />
                        <FormInput name="lastName" label="Last name" />
                        <FormInput name="address1" label="Address" />
                        <FormInput name="email" label="Email" />
                        <FormInput name="city" label="City" />
                        <FormInput name="zip" label="Zip / Postal code" /> 

                        {/* fields for shipping details */}
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {countries.map((country) =>
                                    (<MenuItem key={country.id} value={country.id}>
                                        {country.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
  
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                                {subdivisions.map((subdivision) =>
                                    (<MenuItem key={subdivision.id} value={subdivision.id}>
                                        {subdivision.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
 
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                                {options.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <br />                      
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
                        <Button type="submit" variant="contained" color="primary">Next</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
};

export default AddressForm;