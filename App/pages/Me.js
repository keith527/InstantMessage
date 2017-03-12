/**
* Description:
* Created by Xiaocheng Zuo on 2017-03-05 15:11:06
* @flow
*/
import React, {Component} from 'react';
import {StyleSheet, View,Text} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class Me extends Component{
    render(){
        const gotoTest = ()=>{
            return Actions.test({index:1});
        }
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}} >
                <Text style={{color:'green', fontSize:25}} onPress={gotoTest}>Me</Text>
            </View>
        );
    }
}