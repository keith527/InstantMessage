/**
* Description:组件-加载中
* Created by Xiaocheng Zuo on 2017-03-05 18:16:44
* @flow
*/


import React from 'react';
import {
    ActivityIndicator,
    Text,
    StyleSheet,
    View
} from 'react-native';

const LoadingView = () => (
    <View style={styles.loading}>
        <ActivityIndicator
            size="large"
            color="#3e9ce9"
        />
        <Text style={styles.loadingText}>数据加载中...</Text>
    </View>
);

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    loadingText: {
        marginTop: 10,
        textAlign: 'center'
    }
});

export default LoadingView;
