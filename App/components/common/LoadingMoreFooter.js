/**
* Description:
* Created by Yacheng Lee on 2017-03-05 19:17:30
* @flow
*/

import React, { Component } from 'react';

import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet
} from 'react-native';

export default class LoadingMoreFooter extends Component {

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <Text style={styles.title}>正在加载更多...</Text>
            </View >
        )
    }
}

const styles = StyleSheet.create({

    container: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    title: {
        fontSize: 14,
        color: 'gray',
        marginLeft: 10
    }
});