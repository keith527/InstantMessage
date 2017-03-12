/**
* Description:
* Created by Yacheng Lee on 2017-03-10 09:37:02
* @flow
*/
import {SearchApi} from '../constants/urls';
import {put, take, call, fork} from 'redux-saga/effects';
import * as types from '../constants/action-types';
import {toastShort} from '../utils/ToastUtil';
import {request} from '../utils/RequestUtil';
import {receivedBookSearchSuccess, receivedBookSearchFailed} from '../actions/search_action';

export function* fetchBookSearch(params){
    try {

        const booksData = yield call(request, SearchApi.book_search, params, 'get');
        yield put(receivedBookSearchSuccess(booksData));


    }catch(error){
        yield put(receivedBookSearchFailed());
        if(error.code === 1002){
            yield toastShort('请输入查询内容');
        }else{
            yield toastShort('网络发生错误，请重试'+error);
        }
    }
}

export function* watchFetchBookSearch() {
        while(true){
            const action = yield take(types.BOOK_SEARCH_REQUEST);
            yield fork(fetchBookSearch,action.params);
        }
}