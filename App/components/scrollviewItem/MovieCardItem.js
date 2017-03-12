/**
* Description:
* Created by Yacheng Lee on 2017-03-07 11:56:36
* @flow
*/
import React, {Component,PropTypes} from 'react';
import {StyleSheet, View, Text,Image, TouchableOpacity} from 'react-native';
import {isPlatformIOS,WINDOW_DIMEN} from '../../constants/device-info';
import StarRating from 'react-native-star-rating';

export default class MovieCardItem extends Component{

    static propTypes={
        text: PropTypes.string,
        rating:PropTypes.number,
        onClick:PropTypes.func,
        image:PropTypes.string,
    }


    // 构造
      constructor(props) {
        super(props);
      }

    render(){
        return (
            <TouchableOpacity onPress={this.props.onClick} opacity={0.7} activeOpacity={0.9}>
                <View style={styles.card} >
                    {this.props.image? <Image source={{uri:this.props.image}}
                                            resizeMode={Image.resizeMode.cover} style={styles.img}/>:
                        <Image source={require('../../images/arrow_left.png')}/>}
                    <Text numberOfLines={1}>{this.props.text}</Text>
                    <View style={styles.con_rating}>
                        <StarRating disabled={true} emptyStar={'ios-star-outline'} fullStar={'ios-star'}
                                    halfStar={'ios-star-half'} iconSet={'Ionicons'}
                                    maxStars={5} rating={this.props.rating/2} starColor={'gold'}
                                    starSize = {12} starStyle={styles.rating}
                                    />
                        <Text style={styles.text_rating}>{this.props.rating}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    card: {
        height: 180,
        width:WINDOW_DIMEN.width/3-30,
        backgroundColor: '#fff',
        marginLeft:5,
        marginTop:5,
        marginBottom:5,
        padding: 5,
    },
    img:{
        flex:1,
        margin:2,
    },
    text_movie:{
        fontSize:12,
        fontWeight:'bold',
        marginBottom:5,
        marginLeft:3
    },
    con_rating:{
        flexDirection:'row',
        marginBottom:5,
        height:20,
        alignItems:'center',
    },
    rating:{
       // flex:1,

    },
    text_rating:{
        color:'#ccc',
        marginLeft:3,
        fontSize:12,
    }
});