import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../features/auth';
import { Typography,Button , Box } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

const Profiles = () => {
  const{ user} = useSelector(userSelector)
//  const {user} = userSelector((state)=>state.user)
const favoraiteMovies =[];

const logout =() =>{
  localStorage.clear();
  window.location.href = '/';
  }
  return (
    <Box>
      <Box display='flex' justifyContent="space-between">
        <Typography varient='h4' gutterBottom>My Profile</Typography>
        <Button color='inherit' onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoraiteMovies.length
        ? <Typography variant='h5'>
      Add Favorits or watchlist some movies to watch later.
     </Typography>
    :( 
      <Box>
     Favorits Movies
    </Box>
     )}
 </Box>
  );

};

export default Profiles;
