/**
* Description: 豆瓣top250
* Created by Xiaocheng Zuo on 2017-03-08 16:51:18
* @flow
*/

import { put, take, call, fork} from 'redux-saga/effects';
import * as types from '../constants/action-types';
import {receivedMovieTop250Success, receivedMovieTop250Failed} from '../actions/BookVideoMusic/movie-top250-action';
import { toastShort } from '../utils/ToastUtil';
import {MovieApi} from '../constants/urls';
import {request} from '../utils/RequestUtil';

export function* fetchMovieTop( url, params) {

    try{
        const movie_top250 = yield call(request, url, params,'get');//返回的json

        yield put(receivedMovieTop250Success(movie_top250));

    }catch(error){

        yield put(receivedMovieTop250Failed());
        yield toastShort('网络发生错误，请重试');
    }

}

export function* watchfetchMovieTop() {
    while(true){

        const action = yield take(types.MOVIE_TOP250_REQUEST);
        yield fork(fetchMovieTop, MovieApi.top_250,action.params );

    }
}
