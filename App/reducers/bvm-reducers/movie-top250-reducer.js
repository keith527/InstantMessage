/**
* Description:
* Created by Xiaocheng Zuo on 2017-03-09 14:56:59
* @flow
*/
import * as types from '../../constants/action-types';

const initState = {
    isLoading: false,
    isLoadMore: false,
    total:0,
    count:10,
    start:0,
    movieList:[]
};

export default function movieTop250Reducer(state=initState, action) {
    switch (action.type){
        case types.MOVIE_TOP250_REQUEST:
            const isFirstLoad = (action.params.start===0);
            return Object.assign({}, state, {
                isLoading: true,
                movieList:isFirstLoad?[]:state.movieList

            });
        case types.MOVIE_TOP250_RECEIVE_SUCCESS:

            const start = action.movie_top250.start+state.count;
            const total = action.movie_top250.total;
            const isLoadMore = (start < total);
            return Object.assign({}, state, {

                isLoading: false,
                total:total,
                start:start,
                movieList: state.isLoadMore?state.movieList.concat(action.movie_top250.subjects):action.movie_top250.subjects,
                isLoadMore:isLoadMore,

                // movieList: state.isLoadMore ?
                //     {in_theaters:state.movieList.in_theaters.concat(action.movieList.in_theaters) }: {in_theaters:action.movieList.in_theaters}
            });
        case types.MOVIE_TOP250_RECEIVE_FAILED:
            return Object.assign({}, state, {
                isLoading: false,

            });
        default: return state;
    }
}

