/**
* Description:
* Created by Yacheng Lee on 2017-03-10 15:29:55
* @flow
*/
import { put, take, call, fork } from 'redux-saga/effects';
import * as types from '../constants/action-types';
import {receivedSearchIndexSuccess, receivedSearchIndexFailed} from '../actions/search_action';

import { toastShort } from '../utils/ToastUtil';
import {SearchApi} from '../constants/urls';
import {request} from '../utils/RequestUtil';

export function* fetchMovie(params) {
    try{

        const [bookData, movieData, musicData]
            = yield [call(request, SearchApi.book_search,params , 'get'),
            call(request, SearchApi.movie_search, params, 'get'),
            call(request, SearchApi.music_search, params, 'get')];//返回的json
        const searchData = {
            bookList:bookData.books,
            movieList:movieData.subjects,
            musicList:musicData.musics

        }
        yield put(receivedSearchIndexSuccess(searchData))

    }catch(error){
        yield put(receivedSearchIndexFailed());
        if(error.code === 1002){
            yield toastShort('请输入查询内容');
        }else{

            yield toastShort('网络发生错误，请重试'+error);
        }
    }
}

export function* watchfetchIndexSearch() {
    while(true){
        const action = yield take(types.SEARCH_INDEX_REQUEST);
        yield fork(fetchMovie, action.params);
    }
}