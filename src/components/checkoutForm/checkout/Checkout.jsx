import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

// for mobile responsiveness
import { CssBaseline } from '@material-ui/core';

// to use all API features
import { commerce } from '../../../lib/commerce';
// importing our form steps components
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

import useStyles from './styles';


// stepper steps
const steps = ['Shipping address', 'Payment details'];

// destructuring props from App.js
const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    // setting token, stepper, shippingData useStates
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const classes = useStyles();
    const history = useHistory();

    /*    
        initially - It's a componentDidMount; 
        has just an empty dependency array. It only happens at the start 
    */
    useEffect(() => {
        // Soon as user enters checkout process, generate a checkoutToken from commerce.js API
        if (cart.id) {
            /* 
                creating a new function & calling it immediately afterwards coz in useEffect
                you can only use async in a new function 
            */
            const generateToken = async () => {
                try {
                    const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
                    setCheckoutToken(token);

                } catch (error) {
                    // if error, go to homepage
                    history.pushState('/');
                    // if (activeStep !== steps.length) history.push('/');
                }
            };
        
            generateToken();
        } 
    }, [cart]);
     

    /*
        After setShippingData, i want to move the setActiveStep - 1 further
        These functions set the activeStep; nextStep = prev + 1, backStep = prev - 1 
    */
    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    // getting data from RHF in AddressForm
    const next = (data) => {
        // setting it to shippingData
        setShippingData(data);
        nextStep();
    };


    /*
        if order.customer exists i.e order is fulfilled, show this 
        else render a new jsx block
     */
    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
            </div>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">Back to home</Button>
        </>
    ) : (
        // while we process the order,display spinner 
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    );

    // if any errors arise during confirmation, use home button
    if(error) {
        <>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
        </>
    }


    // form for rendering steps(components): if first step, render AddressForm else PaymentForm   
    const Form = () => activeStep === 0
        /*
            passing checkoutToken, next into first step of form, i.e AddressForm
            using shippingData useState to pass data to second step of form, i.e PaymentForm
            review - AddressForm => Checkout => PaymentForm.
            passing token via checkoutToken state to PaymentForm as prop
        */
        ? <AddressForm checkoutToken={checkoutToken} next={next} /> 
        : <PaymentForm 
            shippingData={shippingData} 
            checkoutToken={checkoutToken} 
            nextStep={nextStep} 
            backStep={backStep}
            onCaptureCheckout={onCaptureCheckout}
        /> 


    /* 
        react render process; 
        Render JSX => go to componentDidMount, this case useEffect => Re-Render if need be 
    */
    return (
        <>
            <CssBaseline />
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    {/* stepper: a component that moves as you move through the steps */}
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                        ))}
                    </Stepper>
                    {/* 
                        if we're on the last step, show Confirmation Comp else our Form 
                        (but only when we have the checkoutToken) 
                    */}
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </>
    );
};

export default Checkout;