/**
* Description:
* Created by Yacheng Lee on 2017-03-08 16:21:18
* @flow
*/
import * as types from '../../constants/action-types';

export function requestMovieTop250(params) {
    return {
        type:types.MOVIE_TOP250_REQUEST,
        params:params
    };
}

export function receivedMovieTop250Success(movie_top250) {
    return {
        type:types.MOVIE_TOP250_RECEIVE_SUCCESS,
        movie_top250
    };
}

export function receivedMovieTop250Failed() {
    return {
        type:types.MOVIE_TOP250_RECEIVE_FAILED
    };
}
