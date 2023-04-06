import React from 'react';
import { AppBar, Box, Typography} from '@mui/material';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <Box >
      <AppBar position="static" sx={{backgroundColor:"#1f2833"}}>
      <Typography
      variant="body2"
      color="text.light"
      align="center"
      sx={{padding:"20px"}}
    >
      {"Copyright © "}
      <Link className='nav-link-black' to="/">
        Blog App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
    </AppBar>
    </Box>
  );
}

export default Footer;