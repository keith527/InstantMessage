/**
* Description: 入口
* Created by Xiaocheng Zuo on 2017-03-04 18:00:20
* @flow
*/
import React, {Component} from 'react';

import {Provider} from 'react-redux';
import App from './containers/App';
import configureStore from './configure/store';
import rootSaga from './sagas';
import './configure/storage';//全局存储
import CodePush from 'react-native-code-push';

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

    componentDidMount() {

        CodePush.sync({
            updateDialog: {
                optionalIgnoreButtonLabel: '稍后',
                optionalInstallButtonLabel: '后台更新',
                optionalUpdateMessage: '有新版本了，是否更新？',
                title: '更新提示'
            }
        });
    }

    render(){
        return(
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}