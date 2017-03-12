/**
* Description: 音乐搜索saga
* Created by Xiaocheng Zuo on 2017-03-10 09:37:02
* @flow
*/
import {SearchApi} from '../constants/urls';
import {put, take, call, fork} from 'redux-saga/effects';
import * as types from '../constants/action-types';
import {toastShort} from '../utils/ToastUtil';
import {request} from '../utils/RequestUtil';
import {receivedMusicSearchSuccess, receivedMusicSearchFailed} from '../actions/search_action';

export function* fetchMusicSearch(params){
    try {

        const musicsData = yield call(request, SearchApi.music_search, params, 'get');
        yield put(receivedMusicSearchSuccess(musicsData));


    }catch(error){
        yield put(receivedMusicSearchFailed());
        if(error.code === 1002){
            yield toastShort('请输入查询内容');
        }else{
            yield toastShort('网络发生错误，请重试'+error);
        }
    }
}

export function* watchFetchMusicSearch() {
        while(true){
            const action = yield take(types.MUSIC_SEARCH_REQUEST);
            yield fork(fetchMusicSearch,action.params);
        }
}