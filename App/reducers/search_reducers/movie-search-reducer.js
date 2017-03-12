/**
* Description:
* Created by Xiaocheng Zuo on 2017-03-10 22:25:15
* @flow
*/


import * as types from '../../constants/action-types';

const initState = {
    isLoading:false,
    isLoadMore:false,
    start:0,
    count:10,
    total:0,
    movieList:[]

};

export default function movieSearchReducer(state = initState, action) {
    switch (action.type){
        case types.MOVIE_SEARCH_REQUEST:
            return Object.assign({}, state, {
                isLoading:true,
                movieList:action.isFirstLoad?[]:state.movieList,
                start:action.isFirstLoad?0:state.start,
                //total:action.isFirstLoad?0:state.total
            });
        case types.MOVIE_SEARCH_RECEIVE_SUCCESS:

            const moviesData = action.moviesData;
            // const isFirst = (state.start===0);

            const total = moviesData.total;
            const start = moviesData.start+state.count;

            return Object.assign({}, state, {
                isLoading:false,
                isLoadMore:start < total,
                start:start,
                total:total,
                //isFirstLoad:false,
                movieList:state.movieList.concat(moviesData.subjects),
            });

        case types.MOVIE_SEARCH_RECEIVE_FAILED:
            return Object.assign({}, state, {
                isLoading:false,
                movieList:state.movieList
            });
        default: return state;

    }
}