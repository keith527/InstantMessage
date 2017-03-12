/**
* Description:
* Created by Yacheng Lee on 2017-03-10 15:22:57
* @flow
*/
import * as types from '../../constants/action-types';

export function requestSearchIndex(params){
    return{
        type:types.SEARCH_INDEX_REQUEST,
        params:params
    };
}

export function receivedSearchIndexSuccess(searchData) {
    return{
        type:types.SEARCH_INDEX_RECEIVE_SUCCESS,
        searchData
    };
}

export function receivedSearchIndexFailed() {
    return{
        type:types.SEARCH_INDEX_RECEIVE_FAILED

    }
}
