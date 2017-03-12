/**
* Description:
* Created by Yacheng Lee on 2017-03-08 09:55:32
* @flow
*/

import { put, take, call, fork } from 'redux-saga/effects';
import * as types from '../constants/action-types';
import {receivedSuccess, receivedFailed} from '../actions/BookVideoMusic/movie-nav-action';
import { toastShort } from '../utils/ToastUtil';
import {MovieApi} from '../constants/urls';
import {request} from '../utils/RequestUtil';

export function* fetchMovie() {
    try{
        const [movie_in_theaters, movie_coming_soon]
            = yield [call(request, MovieApi.in_theaters, null, 'get'),
                     call(request, MovieApi.coming_soon, null, 'get')];//返回的json
        const movieList = {
            in_theaters:movie_in_theaters.subjects,
            coming_soon:movie_coming_soon.subjects

        }
        yield put(receivedSuccess(movieList))

    }catch(error){
        yield put(receivedFailed());
        yield toastShort('网络发生错误，请重试');
    }
}

 export function* watchfetchMovie() {
    while(true){
        yield take(types.MOVIE_HOME_REQUEST);
        yield fork(fetchMovie);
    }
 }