/**
* Description:
* Created by Xiaocheng Zuo on 2017-03-10 09:08:54
* @flow
*/
import * as types from '../../constants/action-types';

export function requestBookSearch(params, isFirstLoad){
    return{
        type:types.BOOK_SEARCH_REQUEST,
        params:params,
        isFirstLoad,
    };
}

export function receivedBookSearchSuccess(booksData) {
    return{
        type:types.BOOK_SEARCH_RECEIVE_SUCCESS,
        booksData
    };
}

export function receivedBookSearchFailed() {
    return{
        type:types.BOOK_SEARCH_RECEIVE_FAILED

    }
}