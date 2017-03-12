/**
* Description:书影音下的 NavTab -- 音乐
* Created by Xiaocheng Zuo  on 2017-03-07 09:14:38
* @flow
*/
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class MusicNav extends Component{
    render(){
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}} >
                <Text style={{color:'green', fontSize:25}}>Music Api 暂未开放</Text>
                <Text style={{color:'green', fontSize:25}}>请移步搜索</Text>
            </View>
        );
    }
}