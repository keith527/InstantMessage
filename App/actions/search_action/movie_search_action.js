/**
* Description:
* Created by Xiaocheng Zuo on 2017-03-10 09:08:54
* @flow
*/
import * as types from '../../constants/action-types';

export function requestMovieSearch(params, isFirstLoad){
    return{
        type:types.MOVIE_SEARCH_REQUEST,
        params:params,
        isFirstLoad,
    };
}

export function receivedMovieSearchSuccess(moviesData) {
    return{
        type:types.MOVIE_SEARCH_RECEIVE_SUCCESS,
        moviesData
    };
}

export function receivedMovieSearchFailed() {
    return{
        type:types.MOVIE_SEARCH_RECEIVE_FAILED

    }
}