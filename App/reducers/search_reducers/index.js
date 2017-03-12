/**
* Description:
* Created by Xiaocheng Zuo on 2017-03-10 09:11:44
* @flow
*/

import {combineReducers} from 'redux';
import book_search from './book-search-reducer';
import movie_search from './movie-search-reducer';
import music_search from './music-search-reducer';
import search_index from './search-index-reducer';

const search_reducers = combineReducers({
    book_search,
    search_index,
    movie_search,
    music_search
});

export default search_reducers;

