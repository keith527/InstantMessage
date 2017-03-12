/**
* Description: 电影排行索引 Item
* Created by Xiaocheng Zuo on 2017-03-08 11:54:38
* @flow
*/
import React, {Component, PropTypes} from 'react';
import {StyleSheet, View,Text, TouchableOpacity} from 'react-native';

export default class MovieTopCatItem extends Component{
      constructor(props) {
        super(props);
      }

      static propTypes={
          title: PropTypes.string,
          subtitle: PropTypes.string,
          bgColor: PropTypes.string,
          onClick:PropTypes.func,
}
        static defaultProps={
            bgColor: 'gold'
        }

    render(){
        return(
            <TouchableOpacity onPress={this.props.onClick} activeOpacity={0.9}>
            <View style={[styles.view_item,{backgroundColor:this.props.bgColor}]}>
                <Text style={styles.text_title}>{this.props.title}</Text>
                <Text style={styles.text_subTitle}>{this.props.subtitle}</Text>
            </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    view_item:{
        width:160,
        height:160,
        borderWidth:1,
        borderColor:'transparent',
        borderRadius:5,
        padding:10,
        paddingTop:20,
        //marginRight:20,
        alignItems:'center',
        backgroundColor:'gold'

    },
    text_title:{
        fontSize:20,
        fontWeight:'bold',
        color:'#fff',

    },
    text_subTitle:{
        fontSize:12,
        color:'#fff',
        marginTop:5,
    },


});