/**
* Description:
* Created by Xiaocheng Zuo on 2017-03-08 11:34:58
* @flow
*/
import React, {Component,PropTypes} from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import TopMovieItem from '../scrollviewItem/MovieTopCatItem';
import {Actions} from 'react-native-router-flux';
import {WINDOW_DIMEN} from '../../constants/device-info';

export default class ScrollTopMovie extends Component{

    构造
      constructor(props) {
        super(props);
      }

      static propTypes={

          title:PropTypes.string,
      }


    _onTop250Click(){

        Actions.movietop({title:'豆瓣 Top250'});
    }
    _onNiceWeeklyClick(){
        Actions.movietop({title:'本周口碑榜'});
    }
    _onNewMovieClick(){
        Actions.movietop({title:'新片榜'});
    }

    render(){

        return (

            <View style={{backgroundColor:'#fff', width:WINDOW_DIMEN.width}}>
                {this.props.title?
                    <View style={{flexDirection:'row', height:50, marginTop:5,
                        alignItems:'center', justifyContent:'space-between'}}>
                        <Text  style={{fontSize:18, fontWeight:'bold', marginLeft:10}}>{this.props.title}</Text>
                    </View>
                    :
                    <View />
                }

                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    style={{height:180,backgroundColor: "#fff", marginBottom:30,
                        flex:1,marginLeft:20,margin: 20 }}>

                    <TopMovieItem title="豆瓣 Top250" subtitle="8分以上好电影"
                                  onClick={this._onTop250Click}/>
                    <View style={{width:20, backgroundColor:'transparent'}}/>
                    <TopMovieItem bgColor="lightgreen" title="本周口碑榜" subtitle="3月1日 - 3月8日"
                                  onClick={this._onNiceWeeklyClick}/>
                    <View style={{width:20, backgroundColor:'transparent'}}/>
                    <TopMovieItem bgColor="plum" title="新片榜" subtitle="3月1日 - 3月8日"
                                  onClick={this._onNewMovieClick}/>

                </ScrollView>
            </View>
        );
    }
}
