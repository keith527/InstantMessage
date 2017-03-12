/**
* Description:
* Created by Yacheng Lee on 2017-03-07 13:34:23
* @flow
*/
import React, {Component,PropTypes} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

export default class CardItem extends Component{

    static propTypes={
        text: PropTypes.string,
        onClick:PropTypes.func
    }


    // 构造
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <TouchableOpacity style={styles.card} onPress={this.props.onClick} opacity={0.7}>
                <View >
                    <Text>{this.props.text}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.1)',
        margin: 5,
        height: 150,
        padding: 15,
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
});