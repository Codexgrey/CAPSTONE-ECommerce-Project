import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@material-ui/core'; // MenuItem, Menu,
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom'

import logo from '../../assets/prime.png';
import useStyles from './styles';


// destructuring & passing totalItems to Navbar for badgecount render
const Navbar = ({ totalItems }) => {
    // from styles.js
    const classes = useStyles();
    const location = useLocation();

    return (
        // empty react fragment, can also be a div
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Prime Stores" height="30px" className={classes.image} />
                        Prime Stores
                    </Typography>

                    {/* classes.grow means this div will take as much space as it needs */}
                    <div className={classes.grow} />

                    {/*using useLocation hook to handle cart icon button display */}
                    {location.pathname === '/' && (
                        <div className={classes.button}>
                         <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                             {/* passing totalItems to badgecount for dynamic rendering */}
                             <Badge badgeContent={totalItems} color="secondary">
                                 <ShoppingCart />
                             </Badge>
                         </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar;
