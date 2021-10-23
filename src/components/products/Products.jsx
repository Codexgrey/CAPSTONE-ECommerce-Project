import React from 'react';
import { Grid } from '@material-ui/core';
import Product from './product/Product';

const myProducts = [
    {id: 1, name: 'Shoes', description: 'Running Shoes.', price: '$50', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNMNlVMt1prdIlR6L8_tpholbRkAV4avra2w&usqp=CAU'},
    {id: 2, name: 'Macbook', description: 'Apple Macbook.', price: '$1200', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3Tuk6O6joOIoLP47pvIAwMD6jmROX4LfSNA&usqp=CAU'},
]

const Products = () => {
    return (
        <main>
            <Grid container justifyContent="center" spacing={4}>
                {myProducts.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <Product product={product} /> 
                </Grid> 
                ))}
            </Grid>
        </main>
    );
}

export default Products;