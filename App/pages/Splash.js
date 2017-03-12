/**
* Description:引导页
* Created by Yacheng Lee on 2017-03-05 18:55:52
* @flow
*/

import React, { Component } from 'react';
import {
    View,
    Image,
    Dimensions,
    StatusBar
} from 'react-native';
import {Actions} from 'react-native-router-flux';

let splashImg = require('../images/ic_splash.jpg');

export default class Splash extends Component{
    // 倒计时2秒后进入首页
    componentDidMount() {
        this.timer = setTimeout(() => {
            Actions.tabs();
        }, 500);
    }

    componentWillUnMount() {
        clearTimeout(this.timer);
    }

    render() {
        let {width, height} = Dimensions.get("window");
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden={true} />
                <Image source={splashImg} resizeMode={Image.resizeMode.cover} style={{ width: width, height: height }} />
            </View>
        )
    }
}