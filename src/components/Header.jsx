import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <AppBar position='static' sx={{ backgroundColor: 'blue'}}>
            <Toolbar>
            <Typography variant='h6' component="div" sx={{ flexGrow: 1}}>
                    ArtTools Management App
                </Typography>
                <Button color='inherit' component={Link} to="/">Home</Button>
                <Button color='inherit' component={Link} to="/minhhlnse171857">Art Tools</Button>
                <Button color='inherit' component={Link} to="/contact">Contact</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;