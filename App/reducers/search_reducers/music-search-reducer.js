/**
* Description:
* Created by Yacheng Lee on 2017-03-10 22:44:16
* @flow
*/

import * as types from '../../constants/action-types';

const initState = {
    isLoading:false,
    isLoadMore:false,
    start:0,
    count:10,
    total:0,
    musicList:[]

};

export default function musicSearchReducer(state = initState, action) {

        switch (action.type){
            case types.MUSIC_SEARCH_REQUEST:
                return Object.assign({}, state, {
                    isLoading:true,
                    musicList:action.isFirstLoad?[]:state.musicList,
                    start:action.isFirstLoad?0:state.start,
                    //total:action.isFirstLoad?0:state.total
                });
            case types.MUSIC_SEARCH_RECEIVE_SUCCESS:

                const musicsData = action.musicsData;
                // const isFirst = (state.start===0);

                const total = musicsData.total;
                const start = musicsData.start+state.count;

                return Object.assign({}, state, {
                    isLoading:false,
                    isLoadMore:start < total,
                    start:start,
                    total:total,
                    //isFirstLoad:false,
                    musicList:state.musicList.concat(musicsData.musics),
                });

            case types.MUSIC_SEARCH_RECEIVE_FAILED:
                return Object.assign({}, state, {
                    isLoading:false,
                    musicList:state.musicList
                });
            default: return state;

        }
    }