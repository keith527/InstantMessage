/**
* Description:
* Created by Xiaocheng Zuo on 2017-03-09 18:08:27
* @flow
*/
import {combineReducers} from 'redux';

import book from './book-reducer';
import movie from './movie-reducer';
import movieTop from './movie-top250-reducer';
import music from './music-reducer';

const bookVideoMusic = combineReducers({
    // book,
    movie,
    movieTop,
    //music
});

export default bookVideoMusic;