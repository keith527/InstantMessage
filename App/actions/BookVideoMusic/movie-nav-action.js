/**
* Description:
* Created by Yacheng Lee on 2017-03-07 10:54:48
* @flow
*/

import * as types from '../../constants/action-types';

export function requestMovieHome() {
    return {
        type:types.MOVIE_HOME_REQUEST
    };
}

export function receivedSuccess(movieList) {
    return {
        type:types.MOVIE_HOME_RECEIVE_SUCCESS,
        movieList
    };
}

export function receivedFailed() {
    return {
        type:types.MOVIE_HOME_RECEIVE_FAILED
    };
}
