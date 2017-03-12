/**
* Description: 主reducer
* Created by Yacheng Lee on 2017-03-05 15:36:25
* @flow
*/

import {combineReducers} from 'redux';

import routes from './routes';
import bookVideoMusic from './bvm-reducers';
import search from './search_reducers';

const rootReducer = combineReducers({
    routes,
    bookVideoMusic,
    search,
    //home,
    //me
});

export default rootReducer;