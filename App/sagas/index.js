/**
* Description:
* Created by Yacheng Lee on 2017-03-08 09:54:25
* @flow
*/

import {fork} from 'redux-saga/effects';

import {watchfetchMovie} from './movie-saga';
import {watchfetchMovieTop} from './movie-top250-saga';
import {watchFetchBookSearch} from './book-search-saga';
import{watchfetchIndexSearch} from './search-index-saga';
import {watchFetchMovieSearch} from './movie-search-saga';
import {watchFetchMusicSearch} from './music-search-saga';

export default function* rootSaga() {
    yield [
        fork(watchfetchMovie),
        fork(watchfetchMovieTop),
        fork(watchFetchBookSearch),
        fork(watchFetchMovieSearch),
        fork(watchfetchIndexSearch),
        fork(watchFetchMusicSearch)
    ];
}