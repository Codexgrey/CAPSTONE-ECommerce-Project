import React from 'react'
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import useStyles from './styles'


// receiving and destructuting props from Cart in our CartItem
const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
    const classes = useStyles();
  
    const handleUpdateCartQty = (productId, newQuantity) => onUpdateCartQty(productId, newQuantity);
  
    const handleRemoveFromCart = (productId) => onRemoveFromCart(productId);
  
    return (
        // building layout for each cartItem card
      <Card className="cart-item">
        <CardMedia image={item.image.url} alt={item.name} className={classes.media} />

        <CardContent className={classes.cardContent}>
            <Typography variant="h4">{item.name}</Typography>
            <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
        </CardContent>

        <CardActions className={classes.cardActions}>
            {/* using our cart props to handle various states */}
            <div className={classes.buttons}>
                <Button type="button" size="small" onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}>-</Button>
                <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
                <Button type="button" size="small" onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}>+</Button>
            </div>
            <Button variant="contained" type="button" color="secondary" onClick={() => handleRemoveFromCart(item.id)}>
                Remove
            </Button>
        </CardActions>
      </Card>
    );
  };
  
  export default CartItem;