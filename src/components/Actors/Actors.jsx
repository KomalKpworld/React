import React , {useState} from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, ListItemIcon, CircularProgress, Rating, useMediaQuery } from '@mui/material';
import { Link, useParams , useHistory} from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { useGetMovieActorsQuery,useGetMovieActorsByIdQuery} from '../../services/TMDB';
import MoviesList from '../MovieList/MoviesList';
import useClasses from './styles';
const Actors = () => {
  const classes = useClasses();
  const { id } = useParams();
  const page = 1;
  const { data, error, isFetching } = useGetMovieActorsQuery(id);
  const { data: ActorMovieData, isFetching: ActorMovieDataFetch } = useGetMovieActorsByIdQuery({  id, page });
  console.log(data)
const history = useHistory();


  if (isFetching) {
    return (
      <Box display='flex' justifyContent='center'>
        <CircularProgress size='8rem' />
      </Box>
    );
  }
  if (!data) {
    return (
      <Box display='flex' alignItems="center" mt='20px'>
        <Typography variant='h4'>
          No movies that match that name. <br /> please search for something else
        </Typography>
      </Box>
    )
  }
  if (error) {
    return (
    <Box display='flex' justifyContent = 'center' alignItems="center" mt='20px'>
         <Button startIcon={<ArrowBack />} onClick={()=>history.goBack} color= 'primary'>
          Go Back
          </Button>
      </Box>
    )
  }
  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={5} xl={4}  >
        <img className={classes.image}
          src={data.profile_path ? `https://image.tmdb.org/t/p/w780/${data?.profile_path}` : 'https:www.fillmiurry.com/200/300'}
          alt={data?.title}
        />
      </Grid>
      <Grid item container direction='column' lg={7} xl ={8} style ={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}} >
        <Typography variant="h2" align='center' gutterBottom>
          {data?.name}
        </Typography>
        <Typography variant="h5" align='center' gutterBottom>
        Born : {new Date(data?.birthday).toDateString()}
        </Typography>
        <Typography variant="body1" align='justify' paragraph>
          {data?.biography || ' Sorry, no biography yet ..'}
        </Typography>
        <Box marginTop='2rem' display='flex' justifyContent='space-around'>
          <Button variant='contained' color='primary' target="_blank" href={'https://www.imdb.com/name/${data?.imdb_id}'} > IMDB </Button>
          <Button startIcon={<ArrowBack />} onClick={() => history.goBack()} color='primary'>
            Back
          </Button>
        </Box>
       

      </Grid>

      <Box margin ='2rem 0'>
        <Typography variant="h3" align='center' gutterBottom >
          movies
        </Typography>
        {ActorMovieData &&
          <MoviesList movies={ActorMovieData} numberOfMovies={12} component={Link} to='/' /> }
      </Box>
    </Grid>
  );
};

export default Actors;
