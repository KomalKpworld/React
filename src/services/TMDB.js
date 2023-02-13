
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
let page = 1;
const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
//https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1
//https://api.themoviedb.org/3/genre/movie/list?api_key=<<api_key>>&language=en-US
export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
    endpoints: (builder) => ({

        //* Get Movies geners
        getGenres: builder.query({
            query: () => `genre/movie/list?page ${page}&api_key=${tmdbApiKey}`,

        }),

        //* Get Movies by[Type]
        getMovies: builder.query({
            query: ({ genreIdOrCategoryName, page, searchQuery }) => {
                //* search by movie name
                if (searchQuery) {
                    return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
                }

                //* find from category name 
                if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
                    return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
                }
                //* find from id of genre 
                if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
                    return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
                }

                return `movie/popular?page ${page}&api_key=${tmdbApiKey}`;

            }

        }),

        //* get Movie by id 
        //* https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
        getMovieInfo: builder.query({
            query: (id) => `movie/${id}?append_to_response=vidoes,credits&api_key=${tmdbApiKey}`,

        }),
        //* user specific lists
        getList: builder.query({
            query: ({listName, accountId, sessionId, page}) => `/account/${accountId}/${listName}&api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`,

        }),

        //https://api.themoviedb.org/3/movie/{movie_id}/lists?api_key=<<api_key>>&language=en-US&page=1
        //* GEt Movie List REcommended 
        getMoviesRecomendation: builder.query({
            query: ({movie_id,list}) => `movie/${movie_id}/${list}?api_key=${tmdbApiKey}`,

        }),
        // * https://api.themoviedb.org/3/person/{person_id}?api_key=<<api_key>>&language=en-US
        getMovieActors: builder.query({
            query: (id) => `person/${id}?&api_key=${tmdbApiKey}`,

        }),
        getMovieActorsById: builder.query({
            query: (id, page ) => `/discover/movie?with_cast=${id}&${page}&api_key=${tmdbApiKey}`,

        }),
        
    }),
});

export const {
    useGetGenresQuery,
    useGetMoviesQuery,
    useGetMovieInfoQuery,
     useGetListQuery,
    useGetMoviesRecomendationQuery,
    useGetMovieActorsQuery,
    useGetMovieActorsByIdQuery,
    
} = tmdbApi;