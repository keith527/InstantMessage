/**
* Description:
* Created by Yacheng Lee on 2017-03-05 15:07:35
* @flow
*/
import React, {Component} from 'react';
import {StyleSheet, View,Text} from 'react-native';

export default class Home extends Component{
    render(){
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}} ><Text style={{color:'green', fontSize:25}}>Home</Text></View>
        );
    }
}