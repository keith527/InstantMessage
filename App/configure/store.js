/**
* Description:
* Created by Yacheng Lee on 2017-03-05 13:43:57
* @flow
*/

import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware, {END} from 'redux-saga';

import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import RootReducers from '../reducers';

const middlewares = [];

const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

if(__DEV__){
    const logger = createLogger();
    middlewares.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(RootReducers,initialState);
    // install saga run
    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);

    return store;
}
