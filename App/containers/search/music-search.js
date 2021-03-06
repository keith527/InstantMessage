/**
* Description:
* Created by Xiaocheng Zuo on 2017-03-10 22:53:27
* @flow
*/

import React, {Component} from 'react';
import {StyleSheet, View,Text, ListView, TouchableOpacity, Image} from 'react-native';
// 第三方组件
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Search from 'react-native-search-box';
import StarRating from 'react-native-star-rating';
//Action
import {requestMusicSearch } from '../../actions/search_action';
//Component
import {LoadingMoreFooter,LoadingView, NoMoreFooter} from '../../components';
//const
import {isPlatformIOS,WINDOW_DIMEN} from '../../constants/device-info';

let params={
    q:'',
    start:0,
    count:10,

}
let isFirstLoad=true;
let musicSearchAct;


class MusicSearch extends Component{

    // 构造
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
        };
    }

    componentDidMount() {
        let search = this.refs.search_box;
        search.expandAnimation();

        const {musicSearchAction,title} = this.props;
        musicSearchAct = musicSearchAction;

        //console.log('props:'+JSON.stringify(this.props));
        params={
            q:title,
            start:0,
            count:10
        }
        isFirstLoad = true;
        musicSearchAction(params, isFirstLoad);
    }

    _rowClicked(mobile_link){
        //TODO:   详情
        Actions.webview({
            title:' 详情',
            url:mobile_link
        });
    }

    _renderRow(rowData, sectionID, rowID){
        let author = "";
        let authors = rowData.author;
        for(let value in authors){
            author += value.name;
            author += '/';
        }
        author.substr(author.length-1,1);

        let pubdate ="";
        if(rowData.attrs.pubdate){
            let pubdateArr = rowData.attrs.pubdate;
            pubdate = pubdateArr[0];
        }

        return (
            <TouchableOpacity key={rowData.id}  style={styles.item_container}
                              activeOpacity={0.8} onPress={this._rowClicked.bind(this, rowData.mobile_link)}>
                <View style={{height:1, width:WINDOW_DIMEN.width, backgroundColor:'#f2f2f2'}}/>
                <View style={styles.item}>
                    <Image source={{uri:rowData.image}} style={styles.item_img}/>
                    <View style={{margin:10,flex:1,justifyContent:'space-between'}}>
                        <Text style={styles.item_title} numberOfLines={1}>{rowData.title}</Text>
                        <View style={styles.item_rating}>
                            <StarRating disabled={true} emptyStar={'ios-star-outline'} fullStar={'ios-star'}
                                        halfStar={'ios-star-half'} iconSet={'Ionicons'}
                                        maxStars={5} rating={rowData.rating.average/2} starColor={'gold'}
                                        starSize = {12}
                            />
                            <Text style={styles.item_rating_text}>{rowData.rating.average}</Text>
                        </View>
                        <Text style={styles.item_author} numberOfLines={1}>表演者：{author}</Text>
                        <Text style={styles.item_publisher} numberOfLines={1}>发行时间：{pubdate}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    _renderFooter(){
        const {musicSearchData} = this.props;

        return (
            musicSearchData.isLoadMore?<LoadingMoreFooter/>:<NoMoreFooter/>
        );
    }

    _onEndReach(){
        const {musicSearchAction, musicSearchData} = this.props;

        // 防止第一次Load就触发加载更多
        if(!isFirstLoad && !musicSearchData.isLoading && musicSearchData.isLoadMore){
            let param = Object.assign({}, params,{
                start:musicSearchData.start,
                count:musicSearchData.count
            });

            musicSearchAction(param, isFirstLoad);
        }
    }

    _renderHeader(total){
        return (
            <View style={{height:25, width:WINDOW_DIMEN.width,justifyContent:'center',
                backgroundColor:'#fff', marginLeft:5}}>
                <Text style={{color:'#ccc'}}>共{total}个音乐</Text>
            </View>
        );
    }

    //click cancel button
    _onCancel(){
        Actions.pop();
    }

    _onSearch(text){

        params = {
            q:text,
            start:0,
            count:10
        };
        isFirstLoad = true;
        musicSearchAct(params, isFirstLoad)
    }

    render(){
        const {musicSearchData,title} = this.props;
        if(musicSearchData.musicList && musicSearchData.musicList.length){
            isFirstLoad = false;
        }
        return(
            <View style={{flex:1, marginTop:isPlatformIOS?22:0,
                backgroundColor: '#f5f5f5', marginBottom:20}}>
                <Search ref="search_box"
                        placeholder={title}
                        backgroundColor="transparent"
                        cancelTitle="取消"
                        titleCancelColor="#00bfff"
                        onCancel={this._onCancel}
                        onSearch={this._onSearch}
                />
                <View style={{height:10, backgroundColor: '#fff'}}/>
                { (musicSearchData.isLoading&&isFirstLoad)?
                    <LoadingView/>
                    :
                    <ListView
                        style={styles.listview}
                        enableEmptySections={true}
                        dataSource={this.state.dataSource.cloneWithRows(musicSearchData.musicList)}
                        renderRow={this._renderRow.bind(this)}
                        renderHeader={this._renderHeader.bind(this,musicSearchData.total)}
                        renderFooter={this._renderFooter.bind(this)}
                        onEndReachedThreshold={10}
                        onEndReached={this._onEndReach.bind(this)}
                    />
                }
            </View>

        );
    }
}
const mapStateToProps = (state)=>{
    const {search}  = state;// => var search = state.search;调用rootReducer中声明的reducer
    const musicSearchData = search.music_search;

    return {

        musicSearchData:musicSearchData

    };
};

const mapDispatchToProps = (dispatch) => {
    //bindActionCreators:把 action creators 转成拥有同名 keys 的对象

    const musicSearchAction = bindActionCreators(requestMusicSearch, dispatch);
    return {
        //注入action,即可调用action中声明的方法,（即可通过this.props获取）
        musicSearchAction:musicSearchAction,

    };
};
/**
 * 将state,action绑定到props
 */
export default connect(mapStateToProps, mapDispatchToProps)(MusicSearch);

const styles = StyleSheet.create({
    listview:{

    },
    item_container:{
        height:110,
        width:WINDOW_DIMEN.width,
        backgroundColor:'#fff',
        flex:1

    },
    item:{
        flex:1,
        flexDirection:'row',
    },
    item_img:{
        width:75,
        height:90,
        resizeMode:Image.resizeMode.cover,
        margin:10,
    },
    item_title:{
        fontSize:18,
        fontWeight:'bold',
    },
    item_rating:{
        marginTop:5,
        flexDirection:'row',
        alignItems:'center'
    },
    item_rating_text:{
        fontSize:14,
        color:'#ccc',
        marginLeft:5
    },
    item_author:{
        fontSize:14,
        marginTop:5,
        color:'#ccc'
    },
    item_publisher:{
        fontSize:14,
        marginTop:5,
        color:'#ccc'

    }
});