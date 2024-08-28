import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box component="Footer" sx={{mt:'auto', p:2, backgroundColor: '#a0a0a0' , color: '#000'}}>
            <Typography align='center'>© Tháng 6 2024 - ArtTools Management App</Typography>
        </Box>
    );
};

export default Footer;