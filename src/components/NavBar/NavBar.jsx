import React from 'react';
import { AppBar, Toolbar, IconButton, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import useStyles from './styles';
import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';

const NavBar = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const isAuthenticated = true
  return (
    <>
      <AppBar position='fixed'>
        <Toolbar className={classes.toolbar}>
          {
            isMobile && (
              <IconButton
                color='inherit'
                edge='start'
                style={{ outline: 'none' }}
                onClick={() => { }}
                className={classes.menuButton}
              >
                <Menu />
              </IconButton>
            )}
          <IconButton color='inherit' sx={{ ml: 1 }} onClick={() => { }}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && 'Search...'}
          <div>
            {!isAuthenticated ? AccountCircle(
              <Button color='inherit' onClick={() => { }} >
                Login &nsp; <AccountCircle />
              </Button>
            ) : (
              <Button color='inherit' component={Link} to={`/profile`} className={classes.linkButton} onClick={() => { }}>
                {!isMobile && <> My Movies &nbsp;</>}
                <Avatar style={{ width: 30, height: 30 }} alt="Profile" 
                src='' />
              </Button>
            )
            }

          </div>
          {isMobile && 'Search...'}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
