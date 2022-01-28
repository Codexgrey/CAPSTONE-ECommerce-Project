import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import CartItem from './cartItem/CartItem'


// our cart logic, passing in props from Cart component call on App.js
const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {
    const classes = useStyles();

    // functions to return some jsx for cart state
    const EmptyCart = () => (
        <Typography variant="subtitle1">
            You have no items in your shopping cart, <Link to="/" className={classes.link}>Let's add some now</Link>!
        </Typography>
    )

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {/* mapping through all items in cart and rendering each via cartItem component */}
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        {/* passing in item as props to our cartItem component */}
                        <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} />
                    </Grid>
                ))}
            </Grid>

            <div className={classes.cardDetails}>
                <Typography variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                    {/* 
                        - handling empty cart state onClick'
                        - proceed to checkout
                    */}
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
                    <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                 </div>
            </div>
        </>
    );

    if(!cart.line_items) return 'loading...' 

    return (
        <Container>
            {/* this just pushes the content, creating sortof a top margin */}
            <div className={classes.toolbar}/>
            <Button component={Link} to="/" size="large" variant="outlined" type="button">Back to Home</Button>
    
            {/* options to display different content based state of cart */}
            <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart
  