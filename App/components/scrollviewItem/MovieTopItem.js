/**
* Description: 电影排行榜列表展示Item
* Created by Xiaocheng Zuo on 2017-03-08 21:14:03
* @flow
*/
import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {WINDOW_DIMEN,isPlatformIOS} from '../../constants/device-info';
import {Actions} from 'react-native-router-flux';

import StarRating from 'react-native-star-rating';
const indexColor = ['#ff4500', '#ff8c00', '#ffa500'];

export default class  extends Component{

    // 构造
      constructor(props) {
        super(props);
      }

      static propTypes={
          imageUrl:PropTypes.string,
          title:PropTypes.string,
          rating:PropTypes.number,
          director:PropTypes.string,
          casts:PropTypes.array,
          top_index:PropTypes.string,
          url:PropTypes.string,
      }



    _onPress(){
        Actions.webview({
            title:' 详情',
            url:this.props.alt,
        });

    }

    render(){
        let casts = this.props.casts;
        let actors = "";
        for (let cast of casts) {
            actors = actors+cast.name+'/';

        }
        actors.substr(actors.length-1,1);

        let index_color = '#ccc';
        let index = parseInt(this.props.top_index);
        if(index<3){
            index_color = indexColor[index];
        }

        return (
            <View style={styles.container}>
                <View style={styles.index}>
                    <View style={styles.index_line}/>
                    <Text style={[styles.index_text,{color:index_color}]}>{index+1}</Text>
                    <View style={styles.index_line}/>
                </View>
                <TouchableOpacity style={styles.item} onPress={this._onPress.bind(this)} activeOpacity={0.95}>

                    <Image style={styles.item_img} source={{uri:this.props.imageUrl}}/>
                    <View style={styles.item_info}>
                        <Text style={styles.text_title} numberOfLines={1}>{this.props.title}</Text>
                        <View style={styles.con_rating}>
                            <StarRating disabled={true} emptyStar={'ios-star-outline'}
                                        fullStar={'ios-star'}
                                        halfStar={'ios-star-half'}
                                        iconSet={'Ionicons'}
                                        maxStars={5} rating={this.props.rating/2} starColor={'gold'}
                                        starSize = {14} starStyle={styles.rating}
                            />
                            <Text style={styles.text_rating}>{this.props.rating}</Text>
                        </View>
                        <Text numberOfLines={1} style={styles.text_name}>导演:{this.props.director}</Text>
                        <Text numberOfLines={2} style={styles.text_name}>演员:{actors}</Text>
                    </View>

                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        width:WINDOW_DIMEN.width-10,
        height:220,
        //marginRight:10,
        margin:5,
        flex:1,
    },
    index:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        padding:20,
        height:41,
        width:WINDOW_DIMEN.width-10

    },
    index_line:{
        width:35,
        height:1,
        backgroundColor:'#f1f1f1',

    },
    index_text:{
        color: '#ccc',
        fontFamily:'Times New Roman',
        fontSize:18,
        fontWeight:'bold',
        marginLeft:10,
        marginRight:10,
    },
    item:{
        flex:1,
        flexDirection:'row',
        width:WINDOW_DIMEN.width-28,
        borderWidth:1,
        borderColor:'#ccc',
        borderRadius:5,
        shadowColor:'#ccc',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.3,
        shadowRadius:3,
        //padding:20,

    },
    item_img:{
        width:100,
        height:148,
        margin:12,
        resizeMode:Image.resizeMode.cover,

    },
    item_info:{
        margin:20,
        justifyContent:'space-around',
        flex:1,

    },

    text_title:{
        fontSize:20,
        fontWeight:'bold',
    },
    con_rating:{
        flexDirection:'row',
        marginTop:6,
        alignItems:'center',
    },
    rating:{

    },
    text_rating:{
        color:'#ccc',
        marginLeft:3,
        fontSize:14,
    },
    text_name:{
        color:'#ccc',
        marginTop:6,
        fontSize:14,

    }
});
