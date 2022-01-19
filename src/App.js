import React from 'react'
import { useState, useEffect } from 'react';
import { Products, Navbar, Cart } from './components'; 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// commerce.js providing us with a full backend API
import { commerce } from './lib/commerce';


const App = () => {
  // creating state for fetching products
  // our cart = empty object by default
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  // function to populate the products
  const fetchProducts = async () => {
    // this returns a promise, we wait for it. Then destructure the data from its response 
    const { data } = await commerce.products.list();
    // setting the data inside our products. Thus, populating our products
    setProducts(data);
  }

  // function to see what's in the cart. Fetching cart
  const fetchCart = async () => {
    // const cart = await commerce.cart.retrieve();
    // setCart(cart)
    setCart(await commerce.cart.retrieve()) 
  }

  // function to add products to cart. To be used inside our "product component"
  const handleAddToCart = async (productid, quantity) => {
    // passing params to api and adding products to cart using setCart 
    const item = await commerce.cart.add(productid, quantity);
    // cart after the items have been added
    setCart(item.cart);
  }

  // useEffect hook to use fetch func to fetch products immediately on app load
  // [] - this dependency array set to empty means it's only going to run at the start
  // In classbased components, this is called a componentThatMount
  useEffect(() => { 
    fetchProducts(); 
    fetchCart(); 
  }, []);
  // console.log(products);
  console.log(cart)


  return (
    <Router>
      <div>
        {/* passing no of items to Navbar for dynamic item count */}
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            {/* passing our products, onAddToCart as props inside of the products function  */}
            <Products products={products} onAddToCart={handleAddToCart} handleUpdateCartQty />
          </Route>

          <Route exact path="/cart">
            <Cart cart={cart} /* onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} */ />
          </Route>
          {/* <Route path="/checkout" exact>
            <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
          </Route> */} 
        </Switch>
      </div>
    </Router>
  ) 
}

export default App




