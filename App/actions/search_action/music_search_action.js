/**
* Description:
* Created by Xiaocheng Zuo on 2017-03-10 22:31:26
* @flow
*/
import * as types from '../../constants/action-types';

export function requestMusicSearch(params, isFirstLoad){
    return{
        type:types.MUSIC_SEARCH_REQUEST,
        params:params,
        isFirstLoad,
    };
}

export function receivedMusicSearchSuccess(musicsData) {
    return{
        type:types.MUSIC_SEARCH_RECEIVE_SUCCESS,
        musicsData
    };
}

export function receivedMusicSearchFailed() {
    return{
        type:types.MUSIC_SEARCH_RECEIVE_FAILED

    }
}