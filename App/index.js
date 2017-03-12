/**
* Description: App入口
* Created by Yacheng Lee on 2017-03-05 14:33:34
* @flow
*/
import React, {Component} from 'react';

import {Provider} from 'react-redux';
import App from './containers/App';
import configureStore from './configure/store';
import rootSaga from './sagas';
import './configure/storage';//全局存储

const store = configureStore();


// run root saga
store.runSaga(rootSaga);
// storage.save({
//     key:'searchHistory',
//     rawData:{
//         searchWord:['东野圭吾','摆渡人'],
//     },
//     expires: null
// });

export default class Root extends Component{
    render(){
        return(
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}