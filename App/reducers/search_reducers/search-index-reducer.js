/**
* Description:
* Created by Yacheng Lee on 2017-03-10 15:20:23
* @flow
*/
import * as types from '../../constants/action-types';

const initState = {
    isLoading:false,
    searchData:{
        bookList:[],
        movieList:[],
        musicList:[]
    }

};

export default function SearchIndexReducer(state = initState, action) {
    switch (action.type){
        case types.SEARCH_INDEX_REQUEST:
            return Object.assign({}, state, {
                isLoading:true
            });
        case types.SEARCH_INDEX_RECEIVE_SUCCESS:

            const searchData = action.searchData;

            return Object.assign({}, state, {
                isLoading:false,
                searchData:{
                    bookList:searchData.bookList,
                    movieList:searchData.movieList,
                    musicList:searchData.musicList
                }
            });
        case types.SEARCH_INDEX_RECEIVE_FAILED:
            return Object.assign({}, state, {
                isLoading:false,
            });
        default: return state;

    }
}