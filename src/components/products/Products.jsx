import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Product from './product/Product';
import useStyles from './styles';

// mock products
// const myProducts = [
//     {id: 1, name: 'Shoes', description: 'Running Shoes.', price: '₦50', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNMNlVMt1prdIlR6L8_tpholbRkAV4avra2w&usqp=CAU'},
//     {id: 2, name: 'Macbook', description: 'Apple Macbook.', price: '₦1200', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3Tuk6O6joOIoLP47pvIAwMD6jmROX4LfSNA&usqp=CAU'},
// ]

// destructuring products, onAddToCart passed in from app.js
const Products = ({ products, onAddToCart }) => {
    // from styles.js
    const classes = useStyles();

    return (
        <main className={classes.content}> 
            <div className={classes.toolbar}/>
            <Grid container justifyContent="center" spacing={4}>
                {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                    {/* sending each product obj inside of our product component with map */}
                    {/* passing onAddToCart event one level deeper, into our product */}
                    <Product product={product} onAddToCart={onAddToCart}  /> 
                </Grid> 
                ))}
            </Grid>
            <br />
            <footer>
                <Typography variant="subtitle1">
                    Built by <a className={classes.link} href='https://github.com/Codexgrey'>Codexgrey</a> &copy; All Rights Reserved 2022
                </Typography>
            </footer>
        </main>
    );
}

export default Products;