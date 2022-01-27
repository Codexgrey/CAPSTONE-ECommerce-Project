import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';

// importing stripe tools
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// general list of our purchase
import Review from './Review';

// passing in my stripe public key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPEPublickey);

// accessing passed props from Checkout.jsx
const PaymentForm = ({ shippingData, checkoutToken, backStep, onCaptureCheckout, nextStep }) => {
    // form function to finalize order
    const handleSubmit = async (event, elements, stripe) => {
        // so the website doesn't refresh after user clicks the button
        event.preventDefault();

        // do nothing/go outside function, if user can't access to any of these
        if( !stripe || !elements) return

        // getting our element from stripe
        const cardElement = elements.getElement(CardElement)

        // using stripe API to create a payment method; passing in options obj
        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

        // if error, log it
        if(error) {
            console.log(error);

          // else if no error; create final object with all data, all items in our cart.
        } else { 
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: { 
                    firstname: shippingData.firstName,
                    lastname: shippingData.lastName, 
                    email: shippingData.email 
                },
                shipping: { 
                    name: 'Primary', 
                    street: shippingData.address1, 
                    town_city: shippingData.city, 
                    county_state: shippingData.shippingSubdivision, 
                    postal_zip_code: shippingData.zip, 
                    country: shippingData.shippingCountry 
                },
                fulfillment: { shipping_method: shippingData.shippingOption },
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        // from calling stripe.createPaymentMethod
                        payment_method_id: paymentMethod.id, 
                    },
                },
            }

            onCaptureCheckout(checkoutToken.id, orderData);
            nextStep();
        }
    }

    return (
        <>
            {/* passing token as prop, to Review.jsx */}
            <Review checkoutToken={checkoutToken} /> 
            <Divider />
            <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
            {/*
                -> Everything here is done by stripe...
                - stripe Elements, ElementsConsumer always has a callback func with a return 
            */}
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                     {({ elements, stripe }) => (
                        <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                            <CardElement /> {/* user payment card */}
                            <br /> <br />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button variant="outlined" onClick={backStep}>Back</Button>
                                <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                                    Pay { checkoutToken.live.subtotal.formatted_with_symbol }
                                </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </>
      )
};

export default PaymentForm;

// SANDBOX Settings for testing
