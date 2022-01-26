import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';

// importing stripe tools
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// general list of our purchase
import Review from './Review';


// accessing checkoutToken prop
const PaymentForm = ({ checkoutToken }) => {
    return (
        <>
            {/* passing token as prop */}
            <Review checkoutToken={checkoutToken} />
        </>
      )
};

export default PaymentForm;


