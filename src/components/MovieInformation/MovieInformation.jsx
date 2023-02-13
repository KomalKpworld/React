import React, { useState, useEffect } from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, ListItemIcon, CircularProgress, Rating, useMediaQuery } from '@mui/material';
import { useGetMovieInfoQuery, useGetMoviesRecomendationQuery} from '../../services/TMDB';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import genreIcons from '../../assets/genres';
import { useGetListQuery } from '../../services/TMDB';
import axios from 'axios';

import useClasses from './styles';
import MoviesList from '../MovieList/MoviesList';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory.js';
import Pagination from '../Pagination/Pagination';
import { userSelector } from '../../features/auth';

const MovieInformation = () => {

    const classes = useClasses();
    const { id } = useParams();
    const dispatch = useDispatch();

    //*UseSelector
    const { user } = useSelector(userSelector);

    //* Hooks
    const { data, error, isFetching } = useGetMovieInfoQuery(id);
    const { data: favoriteMovies } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 })
    const { data: watchlistMovies } = useGetListQuery({ listName: 'watchlist/movies', account: user.id, sessionId: localStorage.getItem('session_id'), page: 1 })
    const { data: recomendationData, isFetching: recomendationDataFetch } = useGetMoviesRecomendationQuery({ list: '/recommendations', movie_id: id });

    //*UseState
    const [open, setOpen] = useState(false);
    const [isMovieFavorited, setIsMovieFavorited] = useState(false)
    const [isMovieWatchListed, setIsMovieWatchListed] = useState(false)

    //*useEffect It just callbackfunction
useEffect(()=>{
    setIsMovieFavorited(!!favoriteMovies?.results?.find((movie)=> movie?.id === data?.id));
}, [favoriteMovies, data])
useEffect(()=>{
    setIsMovieWatchListed( !!watchlistMovies?.results?.find((movie)=> movie?.id === data?.id));
}, [watchlistMovies, data])


    const addToFavorites = async () => {
        await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem(session_id)}`, {
            media_type: 'movie',
            media_id: id,
            favorite: !isMovieFavorited,
        });
        setIsMovieFavorited((prev) => !prev)
    }
    const addToWatchList = async () => {
        await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem(session_id)}`, {
            media_type: 'movie',
            media_id: id,
            favorite: !isMovieWatchListed,
        });
        setIsMovieWatchListed((prev) => !prev)
    }

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
        return 'An error happened'
    }

    return (

        <Grid container className={classes.containerSpaceAround}>
            <Grid item sm={12} lg={4} style={{ display: 'flex', marginBottom: '30px' }} >
                <img className={classes.poster}
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
                <Grid item className={classes.containerSpaceAround}>
                    <Box display='flex' align='center'>
                        <Rating readOnly value={data?.vote_average / 2} />
                        <Typography variant='subtitle1' gutterBottom style={{ marginLeft: '10px' }}>
                            {data?.vote_average}/10
                        </Typography>
                    </Box>
                    <Typography variant='h6' align='center' gutterBottom >
                        {data?.runtime}min | Language: {data?.spoken_languages[0].name}
                    </Typography>
                </Grid>
                <Grid item className={classes.genresContainer}>
                    {data?.genres?.map((genre, i) => (
                        <Link key={genre.name} style={{ textDecoration: 'none' }} className={classes.links} to='/' onClick={() => dispatch(selectGenreOrCategory(genre.id))}>
                            <img src={genreIcons[genre.name.toLowerCase()]} className={classes.genreImage} height={30} />
                            <Typography color="textPrimary" varient="subtitle1">
                                {genre?.name}
                            </Typography>

                        </Link>
                    ))}

                </Grid>


                <Typography variant='h5' gutterBottom style={{ marginTop: '10px' }}>
                    overview
                </Typography>
                <Typography style={{ marginBottom: '2rem' }}>
                    {data?.overview}
                </Typography>
                <Typography variant='h5' gutterBottom >
                    Top Cast </Typography>
                <Grid item container spacing={2}>
                    {data && data.credits.cast.map((charecter, i) => (
                        charecter.profile_path && (
                            <Grid ket={i} item xs={4} md={2} component={Link} to={`/actors/${charecter.id}`} style={{ textDecoration: 'none' }}>
                                <img className={classes.castImage} src={`https://image.tmdb.org/t/p/w500/${charecter.profile_path}`}
                                    alt={charecter.name}
                                />
                                <Typography color='textPrimary'>{charecter.name}</Typography>
                                <Typography color='textSeondary'>
                                    {charecter?.charecter?.split('/')[0]}
                                </Typography>
                            </Grid>
                        )
                    )).slice(0, 6)}

                </Grid>
                <Grid item container style={{ marginTop: '2rem' }}>
                    <div>
                        <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
                            <ButtonGroup size='medium' variant='outlined'>
                                <Button target='_blank' rel="noopener noreferre" href={data?.homepage} endIcon={<Language />}> website</Button>
                                <Button target='_blank' rel="noopener noreferre" href={`https://ww.imdb.com/title/${data?.imdn_id}`} endIcon={<MovieIcon />}>IMDB</Button>
                                <Button onClick={() => { }} href="#" endIcon={<Theaters />}> Tailers</Button>
                            </ButtonGroup>
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
                            <ButtonGroup size='medium' variant='outlined'>
                                <Button onClick={() => { addToFavorites }} endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}>
                                    {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                                </Button>
                                <Button onClick={() => { addToWatchList }} endIcon={isMovieWatchListed ? <Remove /> : <PlusOne />}>
                                    {isMovieWatchListed ? 'Remove from watchlist' : 'add to watchlist'}
                                </Button>
                                <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }}>
                                    <Typography style={{ textDecoration: 'none' }} component={Link} to='/' color='inherit' variant='subtitle2' >
                                        Back
                                    </Typography>
                                </Button>
                            </ButtonGroup>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
            <Box className={classes.box}>
                <Typography variant="h3" align='center' gutterBottom style={{ marginLeft: '380px' }}>
                    Like all this movies for you
                </Typography>
                {recomendationData ?
                    <MoviesList movies={recomendationData} numberOfMovies={12} /> : 'no movies found'}

            </Box>
        </Grid>


    );
};

export default MovieInformation;