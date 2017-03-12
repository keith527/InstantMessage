/**
* Description:
* Created by Xiaocheng Zuo on 2017-03-05 18:00:49
* @flow
*/

import {
    Alert,
    ToastAndroid,
    Platform
} from 'react-native';

export const toastShort = (content, isAlert) => {
    if (isAlert || Platform.OS === 'ios') {
        Alert.alert(
            '提示',
            content.toString()
        );
    } else {
        ToastAndroid.show(content.toString(), ToastAndroid.SHORT);
    }
};

export const toastLong = (content, isAlert) => {
    if (isAlert || Platform.OS === 'ios') {
        Alert.alert(
            '提示',
            content.toString()
        );
    } else {
        ToastAndroid.show(content.toString(), ToastAndroid.LONG);
    }
};
