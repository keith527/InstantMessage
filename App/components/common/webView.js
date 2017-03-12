/**
* Description:
* Created by Yacheng Lee on 2017-03-08 11:09:10
* @flow
*/
import React, {Component} from 'react';
import {StyleSheet,Text,View,WebView,} from 'react-native';

export default class  extends Component{

    // 构造
      constructor(props) {
        super(props);

      }

    render(){
          let url = this.props.url;
        return (
            <View style={{flex:1}}>

                <WebView style={{backgroundColor:'transparent', }}
                         source={{uri:url}}
                         startInLoadingState={true}
                         domStorageEnabled={true}
                         javaScriptEnabled={true}
                >
                </WebView>
            </View>
        );
    }
}