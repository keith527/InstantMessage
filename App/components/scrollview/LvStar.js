/**
* Description: 上映电影列表
* Created by Xiaocheng Zuo on 2017-03-07 14:47:55
* @flow
*/
import React, {Component, PropTypes} from 'react';
import {StyleSheet, View,Text, ListView} from 'react-native';
import {MovieCardItem} from '../index';
import * as color from '../../style/color';
import {Actions} from 'react-native-router-flux';
export default class LvStar extends Component{

    static propTypes={
        data:PropTypes.array.isRequired,
        title:PropTypes.string,
        onMoreClick:PropTypes.func,
        type:PropTypes.string,
    }

    // 构造
    constructor(props) {
        super(props);

        // 初始状态
        this.state = {
            dataSource:new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    }

    _onClickItem(rowData){

        //TODO: goto Detail
        //alert(JSON.stringify(rowData));
        Actions.webview({url:rowData.alt});

    }

    /**
     * ListView Item布局
     */
    _renderRow(rowData, sectionId, rowId) {
        let image = rowData.images.large;//(small/large/medium)
        return (<MovieCardItem key={rowId} text={rowData.title}
                               rating={rowData.rating.average}
                               image={image}
                               onClick={this._onClickItem.bind(this,rowData)}/>);

    }


    _renderFooter(){
        return(
            //TODO: load more
            <View></View>
        );
    }

    render(){
        return (
            <View style={{backgroundColor:'#fff'}}>
                {this.props.title?
                    <View style={{flexDirection:'row', height:50, marginTop:5,
                        alignItems:'center', justifyContent:'space-between'}}>
                        <Text  style={{fontSize:18, fontWeight:'bold', marginLeft:10}}>{this.props.title}</Text>
                        <Text style={{fontSize:15, color:color.star_lv_more, marginRight:10}} onPress={this.props.onMoreClick}>更多 ></Text>
                    </View>
                    :
                    <View />
                }

                <ListView
                    showsHorizontalScrollIndicator={false}
                    initialListSize={10}
                    pageSize={5}
                    horizontal={true}
                    dataSource={this.state.dataSource.cloneWithRows(this.props.data)}
                    style={{height:200,backgroundColor: "#fff"}}
                    onEndReachedThreshold={10}
                    enableEmptySections={true}
                    renderRow={this._renderRow.bind(this)}
                    renderFooter={this._renderFooter.bind(this)}

                />
            </View>
        );
    }
}