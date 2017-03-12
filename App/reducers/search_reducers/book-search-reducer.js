/**
* Description:
* Created by Yacheng Lee on 2017-03-10 09:16:39
* @flow
*/

import * as types from '../../constants/action-types';

const initState = {
    isLoading:false,
    isLoadMore:false,
    start:0,
    count:10,
    total:0,
    bookList:[]

};

export default function bookSearchReducer(state = initState, action) {
    switch (action.type){
        case types.BOOK_SEARCH_REQUEST:
            return Object.assign({}, state, {
                isLoading:true,
                bookList:action.isFirstLoad?[]:state.bookList,
                start:action.isFirstLoad?0:state.start,

            });
        case types.BOOK_SEARCH_RECEIVE_SUCCESS:

            const booksData = action.booksData;
            const total = booksData.total;
            const start = booksData.start+state.count;

            return Object.assign({}, state, {
                isLoading:false,
                isLoadMore:start < total,
                start:start,
                total:total,
                bookList:state.bookList.concat(booksData.books),
            });

        case types.BOOK_SEARCH_RECEIVE_FAILED:
            return Object.assign({}, state, {
                isLoading:false,
                bookList:state.bookList
            });
        default: return state;


    }
}