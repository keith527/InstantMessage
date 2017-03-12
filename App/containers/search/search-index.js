/**
* Description:
* Created by Xiaocheng Zuo on 2017-03-10 13:21:42
* @flow
*/
import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, ListView, TouchableOpacity} from 'react-native';
// 第三方
import Search from 'react-native-search-box';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
//Action
import {requestSearchIndex } from '../../actions/search_action';
//Component
import {LoadingMoreFooter,LoadingView} from '../../components';
//const
import {isPlatformIOS,WINDOW_DIMEN} from '../../constants/device-info';

const rowHeight = 40;

let searchAction;
let params={
    start:0,
    count:3,
    q:''
};

class SearchIndex extends Component{
// 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            //history: [],
            dataSource:new ListView.DataSource({
                rowHasChanged:(row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            }),
        };
    }

    _onSearch(text){

       params={
            start:0,
            count:3,
            q:(text&&text!=="")?text:'王菲'
        }

        searchAction(params);
    }

    _rowItemPressed(mobile_link){
       //TODO:   详情
        Actions.webview({
            title:' 详情',
            url:mobile_link,
        });
    }

    _renderRow(rowData, sectionID, rowID){
         switch (sectionID){
             case 'bookList':
                 return (
                     <TouchableOpacity key={rowID}
                                       style={styles.item}
                                       onPress={this._rowItemPressed.bind(this, rowData.alt)} activeOpacity={0.9}>
                         <Image source={{uri:rowData.image}} style={styles.item_img}/>
                         <View>
                             <Text style={styles.item_title}>{rowData.title}</Text>
                             <Text numberOfLines={1} style={styles.item_intro}>{rowData.rating.average}分/{rowData.author}/{rowData.pubdate}</Text>
                         </View>

                     </TouchableOpacity>
                 );
             case 'movieList':
                return(
                    <TouchableOpacity key={rowID}
                                   style={styles.item}
                                   onPress={this._rowItemPressed.bind(this,rowData.alt)} activeOpacity={0.9}>
                     <Image source={{uri:rowData.images.small}} style={styles.item_img}/>
                     <View>
                         <Text style={styles.item_title}>{rowData.title}</Text>
                         <Text numberOfLines={1} style={styles.item_intro}>{rowData.rating.average}分/{rowData.year}</Text>
                     </View>

                 </TouchableOpacity>);
             case 'musicList':
                 let author = rowData.author;
                 return(
                     <TouchableOpacity key={rowID}
                                       style={styles.item}
                                       onPress={this._rowItemPressed.bind(this,rowData.mobile_link)} activeOpacity={0.9}>
                         <Image source={{uri:rowData.image}} style={[styles.item_img, {width:64, height:64}]}/>
                         <View style={{justifyContent:'space-around',flex:1}}>
                             <Text style={styles.item_title}>{rowData.title}</Text>
                             <View style={{height:10}}/>
                             <Text numberOfLines={1} style={styles.item_intro}>
                                 {rowData.rating.average}分/{author[0].name}
                                 </Text>
                         </View>

                     </TouchableOpacity>);
             default: return <View/>
         }

    }


    componentDidMount() {
        // storage.load({
        //     key:'searchHistory',
        //     autoSync: false
        // }).then(ret=>{
        //     this.setState({
        //         history:ret.searchWord
        //     });
        //    // alert(ret.searchWord);
        // }).catch(err =>{
        //     console.warn(err.message);
        // });

        const {SearchIndexAction} = this.props;
        searchAction = SearchIndexAction;


    }
    _loadMoreBook(){
        Actions.search_book({
            title:params.q

        });
    }
    _loadMoreMovie(){
        Actions.search_movie({
            title:params.q

        });
    }

    _loadMoreMusic(){
        Actions.search_music({
            title:params.q

        });
    }

    _renderSectionHeader(sectionData, sectionID){

        if (sectionData.length<=0) return <View/>;

        switch (sectionID){
            case 'bookList':
                return <View style={styles.section_header}>
                         <Text style={styles.section_header_text}>图书</Text>
                        <Text style={{color:'#00bfff',marginRight:10}} onPress={this._loadMoreBook}>更多 ></Text>
                      </View>;
            case 'movieList':
                return <View style={styles.section_header}>
                    <Text style={styles.section_header_text}>电影/电视</Text>
                    <Text style={{color:'#00bfff',marginRight:10}} onPress={this._loadMoreMovie}>更多 ></Text>
                </View>;
            case 'musicList':
                return <View style={styles.section_header}>
                    <Text style={styles.section_header_text}>音乐</Text>
                    <Text style={{color:'#00bfff',marginRight:10}} onPress={this._loadMoreMusic}>更多 ></Text>
                </View>;
            default: return <View/>
        }
    }

    render(){
        const {SearchIndex} = this.props;

        return(
            <View style={{flex:1, marginTop:isPlatformIOS?22:0,
             backgroundColor: '#f5f5f5', marginBottom:20}}>
                <Search ref="search_box"
                        placeholder="影视、图书、唱片"
                        backgroundColor="transparent"
                        cancelTitle="取消"
                        titleCancelColor="#00bfff"
                        onSearch={this._onSearch}
                        />
                <View style={{height:5, backgroundColor: '#fff'}}/>
                {/*<View style={{backgroundColor:'#ccc'}}><Text>搜索历史</Text></View>*/}
                {SearchIndex.isLoading?
                    <LoadingView/>
                    :
                    <ListView
                        style={styles.list_view}
                        enableEmptySections={true}
                        dataSource={this.state.dataSource.cloneWithRowsAndSections(SearchIndex.searchData)}
                        renderRow={this._renderRow.bind(this)}
                        renderSectionHeader={this._renderSectionHeader.bind(this)}
                        />
                }


            </View>

        )
    }
}


const styles = StyleSheet.create({
    list_view:{

    },
    section_header:{
        height:40,
        width:WINDOW_DIMEN.width,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        backgroundColor: '#f5f5f5'
    },
    section_header_text:{

        fontSize:16,
        marginLeft:10

    },
    item:{
        flex:1,
        height: 80,
        alignItems: 'center',
        backgroundColor:'#fff',
        flexDirection:'row',
    },
    item_img:{
        width:45,
        height:64,
        resizeMode:Image.resizeMode.cover,
        margin:8,
    },
    item_title:{
        fontSize:16,
        fontWeight:'bold'

    },
    item_intro:{
        color:'#bbb',
        fontSize:12,
        marginRight:20,
    }

});

const mapStateToProps = (state)=>{
    const {search}  = state;// => var search = state.search;调用rootReducer中声明的reducer
    const SearchIndex = search.search_index;

    return {
        SearchIndex:SearchIndex
    };
};

const mapDispatchToProps = (dispatch) => {
    //bindActionCreators:把 action creators 转成拥有同名 keys 的对象
    const SearchIndexAction = bindActionCreators(requestSearchIndex, dispatch);

    return {
        //注入action,即可调用action中声明的方法,（即可通过this.props获取）
        SearchIndexAction:SearchIndexAction,

    };
};
/**
 * 将state,action绑定到props
 */
export default connect(mapStateToProps, mapDispatchToProps)(SearchIndex);
