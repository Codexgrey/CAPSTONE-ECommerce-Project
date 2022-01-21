import React, { useState } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
// import { Link, useHistory } from 'react-router-dom';

// importing our form steps components
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

import useStyles from './styles';


// stepper steps
const steps = ['Shipping address', 'Payment details'];

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const classes = useStyles();

    const Confirmation = () => (
        <div>
            Confirmation
        </div>
    )

    // form for rendering steps(components): if first step, render AddressForm else PaymentForm   
    const Form = () => activeStep === 0
        ? <AddressForm /> 
        : <PaymentForm /> 


    return (
        <>
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
                    {/* if we're on the last step, show Confirmation Comp else our Form */}
                    {activeStep === steps.length ? <Confirmation /> : <Form />}
                </Paper>
            </main>
        </>
    );
};

export default Checkout;