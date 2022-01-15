import React from 'react'
import { useState, useEffect } from 'react';
// commerce.js providing us with a full backend API
import { commerce } from './lib/commerce';
import { Products, Navbar } from './components'; 


const App = () => {
  // creating state for fetching products
  const [products, setProducts] = useState([]);

  // function to populate the products
  const fetchProducts = async () => {
    // this returns a promise, we wait for it. Then destructure the data from its response 
    const { data } = await commerce.products.list();
    // setting the data inside our products. Thus, populating our products
    setProducts(data);
  }

  // useEffect hook to use fetch func to fetch products immediately on app load
  // [] - this dependency array set to empty means it's only going to run at the start
  // In classbased components, this is called a componentThatMount
  useEffect(() => { fetchProducts(); }, []);
  console.log(products);

  return (
    <div>
        <Navbar /> 
        <Products />
    </div>
  ) 
}

export default App




// import Products from './components/products/Products';
// import Navbar from './components/navbar/Navbar';
