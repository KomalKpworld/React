import React from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, ListItemIcon, CircularProgress, Rating, useMediaQuery } from '@mui/material';
import { useGetMovieInfoQuery } from '../../services/TMDB';
import { movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import genreIcons from '../../assets/genres';
import axios from 'axios';
import { red } from '@mui/material/colors';
import useClasses from './styles';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory.js';

const MovieInformation = () => {
    const classes = useClasses();
    const { id } = useParams();
    const dispatch = useDispatch();
    console.log(id)
    const { data, error, isFetching } = useGetMovieInfoQuery(id);
    console.log(data);
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
                    No movies that match that name. <br /> please serch for something else
                </Typography>
            </Box>
        )
    }
    if (error) {
        return 'An error happened'
    }
    console.log(data);
    return (
       
            <Grid container className={classes.containerSpaceAround}>
                <Grid item sm={12} lg={4}  >
                    <img  className={classes.poster}
                        src={data.poster_path ? `https://image.tmdb.org/t/p/w500/${data?.poster_path}` : 'https:www.fillmiurry.com/200/300'}
                        alt={data?.title}
                    />
                 </Grid>

                <Grid item container direction='column' lg={7} >
                    <Typography variant="h3" align='center' gutterBottom>
                        {data?.title} ({data?.release_date.split('-')[0]})
                    </Typography>
                    <Typography variant="h5" align='center' gutterBottom>
                        {data?.tagline}
                    </Typography>
                    <Grid item className= {classes.containerSpaceAround}>
                        <Box display='flex' align='center'>
                            <Rating readOnly value={data?.vote_average / 2} />
                            <Typography variant='subtitle1' gutterBottom style= {{marginLeft:'10px'}}>
                                {data?.vote_average}/10
                            </Typography>
                        </Box>
                        <Typography variant='h6' align='center' gutterBottom>
                        {data?.runtime}min  {data?.spoken_languages.length > 0 ? `${data?.spoken_languages[0].name}` : ''}
                        </Typography>
                        <Grid item className={classes.genresContainer}>
                            {data?.genres?.map((genre, i) => (
                                <Link key = {genre.name} className={classes.links} to='/' onClick={() =>dispatch(selectGenreOrCategory(genre.id))}>
                                 <img src={genreIcons[genre.name.toLowerCase()]} className={classes.genreImage} height={30} />
                                    <Typography color="textPrimary" varient="subtitle1">
                                        {genre?.name}
                                    </Typography>
                                  
                                </Link>
                            ))}
                       </Grid>
                    </Grid>
                </Grid>
            </Grid>
      
    );
};

export default MovieInformation;