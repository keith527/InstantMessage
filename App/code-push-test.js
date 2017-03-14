/**
* Description:
* Created by Yacheng Lee on 2017-03-13 18:16:45
* @flow
*/
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import CodePush from 'react-native-code-push';

export default class CodePushTest extends Component{


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
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'red', fontWeight:'bold'}}>This is Code Push Test Page</Text>
            </View>
        );
    }
}