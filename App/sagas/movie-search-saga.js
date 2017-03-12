/**
* Description:
* Created by Yacheng Lee on 2017-03-10 22:29:12
* @flow
*/
import {SearchApi} from '../constants/urls';
import {put, take, call, fork} from 'redux-saga/effects';
import * as types from '../constants/action-types';
import {toastShort} from '../utils/ToastUtil';
import {request} from '../utils/RequestUtil';
import {receivedMovieSearchSuccess, receivedMovieSearchFailed} from '../actions/search_action';

export function* fetchMovieSearch(params){
    try {

        const moviesData = yield call(request, SearchApi.movie_search, params, 'get');
        yield put(receivedMovieSearchSuccess(moviesData));


    }catch(error){
        yield put(receivedMovieSearchFailed());
        if(error.code === 1002){
            yield toastShort('请输入查询内容');
        }else{
            yield toastShort('网络发生错误，请重试'+error);
        }
    }
}

export function* watchFetchMovieSearch() {
        while(true){
            const action = yield take(types.MOVIE_SEARCH_REQUEST);
            yield fork(fetchMovieSearch,action.params);
        }
}