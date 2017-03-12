
import * as types from '../../constants/action-types';
import {combineReducers} from 'redux';


const initState = {
    isLoading: true,
    isLoadMore: false,
    isRefreshing: false,
    movieList:{
        in_theaters:[],
        coming_soon:[],

    }
};

export default function movieReducer(state=initState, action) {
    switch (action.type){
        case types.MOVIE_HOME_REQUEST:
            return Object.assign({}, state, {
                isLoading: true
                //isLoadMore: action.isLoadMore,
                //isRefreshing: action.isRefreshing
            });
        case types.MOVIE_HOME_RECEIVE_SUCCESS:

            return Object.assign({}, state, {
                isLoading: false,
                movieList: {in_theaters:action.movieList.in_theaters, coming_soon:action.movieList.coming_soon}
               // isRefreshing: false,
               // movieList: state.isLoadMore ?
               //     {in_theaters:state.movieList.in_theaters.concat(action.movieList.in_theaters) }: {in_theaters:action.movieList.in_theaters}
            });
        case types.MOVIE_HOME_RECEIVE_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
               // isLoadMore: false,
                //isRefreshing: false
            });
        default: return state;
    }
}




