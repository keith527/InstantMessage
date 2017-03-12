/**
* Description:
* Created by Yacheng Lee on 2017-03-10 22:24:51
* @flow
*/

import React, {Component} from 'react';
import {StyleSheet, View,Text, ListView,Image, TouchableOpacity} from 'react-native';
// 第三方组件
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Search from 'react-native-search-box';
import StarRating from 'react-native-star-rating';
//Action
import {requestMovieSearch } from '../../actions/search_action';
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
let movieSearchAct;


class MovieSearch extends Component{

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

        const {movieSearchAction,title} = this.props;
        movieSearchAct = movieSearchAction;

        //console.log('props:'+JSON.stringify(this.props));
        params={
            q:title,
            start:0,
            count:10
        }
        isFirstLoad = true;
        movieSearchAction(params, isFirstLoad);
    }
    _rowClicked(mobile_link){
        //TODO:   详情
        Actions.webview({
            title:' 详情',
            url:mobile_link
        });
    }

    _renderRow(rowData, sectionID, rowID){

        let directors = "";
        let directorsArr = rowData.directors;
        for(let value in directorsArr){
            directors += value;
            directors += '/';
        }
        directors.substr(directors.length-1,1);

        let casts = "";
        let castArr = rowData.casts;
        for(let value in castArr){
            casts += value.name;
            casts += '/';
        }
        casts.substr(casts.length-1,1);

        return (
            <TouchableOpacity key={rowData.id}  style={styles.item_container}
                              activeOpacity={0.8} onPress={this._rowClicked.bind(this, rowData.alt)}>
                <View style={{height:1, width:WINDOW_DIMEN.width, backgroundColor:'#f2f2f2'}}/>
                <View style={styles.item}>
                    <Image source={{uri:rowData.images.small}} style={styles.item_img}/>
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
                        <Text style={styles.item_author} numberOfLines={1}>导演：{directors}</Text>
                        <Text style={styles.item_publisher} numberOfLines={1}>主演：{casts}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    _renderFooter(){
        const {movieSearchData} = this.props;

        return (
            movieSearchData.isLoadMore?<LoadingMoreFooter/>:<NoMoreFooter/>
        );

    }

    _renderHeader(total){
        return (
            <View style={{height:25, width:WINDOW_DIMEN.width,justifyContent:'center',
                backgroundColor:'#fff', marginLeft:5}}>
                <Text style={{color:'#ccc'}}>共{total}个影视作品</Text>
            </View>
        );
    }

    _onEndReach(){
        const {movieSearchAction, movieSearchData} = this.props;

        if(!isFirstLoad && !movieSearchData.isLoading && movieSearchData.isLoadMore){
            let param = Object.assign({}, params,{
                start:movieSearchData.start,
                count:movieSearchData.count
            });
            movieSearchAction(param, isFirstLoad);
        }
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
        movieSearchAct(params, isFirstLoad)
    }

    render(){
        const {movieSearchData,title} = this.props;
        if(movieSearchData.movieList && movieSearchData.movieList.length){
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
                { (movieSearchData.isLoading&&isFirstLoad)?
                    <LoadingView/>
                    :
                    <ListView
                        style={styles.listview}
                        enableEmptySections={true}
                        dataSource={this.state.dataSource.cloneWithRows(movieSearchData.movieList)}
                        renderRow={this._renderRow.bind(this)}
                        renderHeader={this._renderHeader.bind(this,movieSearchData.total)}
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
    const {search}  = state;// => var bookVideoMusic = state.bookVideoMusic;调用rootReducer中声明的reducer
    const movieSearchData = search.movie_search;

    return {
        movieSearchData:movieSearchData//1.bookVideoMusic:bookVideoMusic，当key和value相同时，可省略key ==> es6（即可通过this.props.bookVideoMusic获取state中的状态值）
    };
};

const mapDispatchToProps = (dispatch) => {
    //bindActionCreators:把 action creators 转成拥有同名 keys 的对象

    const movieSearchAction = bindActionCreators(requestMovieSearch, dispatch);
    return {
        movieSearchAction:movieSearchAction,//2.注入action,即可调用action中声明的方法,（即可通过this.props.main获取,用于调用main中的方法）

    };
};
/**
 * 将state,action绑定到props
 */
export default connect(mapStateToProps, mapDispatchToProps)(MovieSearch);

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