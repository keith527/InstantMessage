/**
* Description:书影音页面
* Created by Yacheng Lee on 2017-03-07 09:20:53
* @flow
*/
import React, {Component} from 'react';
import {StyleSheet, View,ScrollView, Text} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ScrollableTabView,{DefaultTabBar, ScrollableTabBar, FacebookTabBar} from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import * as color from '../../style/color';

import {requestMovieHome, requestMovieTop} from '../../actions/BookVideoMusic';

import BookNav from './book-nav';
import MovieNav from './movie-nav';
import MusicNav from './music-nav';

class BookVideoMusic extends Component{

    render(){

        return(
            <ScrollableTabView
                locked={true}
                tabBarPosition="overlayTop"
                initialPage={0}
                tabBarTextStyle={{ alignItems: 'center', alignSelf: 'center' }}
                tabBarUnderlineStyle={{ backgroundColor: color.nav_scroll_tab_underline, height: 2 }}
                tabBarBackgroundColor="#FFFFFF"
                tabBarActiveTextColor={color.nav_scroll_tab}
                renderTabBar={()=><DefaultTabBar />}>
                <MovieNav tabLabel='电影' {...this.props}/>
                <BookNav tabLabel='读书' {...this.props}/>
                <MusicNav tabLabel='音乐' {...this.props}/>

            </ScrollableTabView>
        );
    }
}

const mapStateToProps = (state)=>{
    const {bookVideoMusic}  = state;// => var bookVideoMusic = state.bookVideoMusic;调用rootReducer中声明的reducer
    return {
        movie:bookVideoMusic.movie,
        movieTop:bookVideoMusic.movieTop,
        //bookVideoMusic //1.bookVideoMusic:bookVideoMusic，当key和value相同时，可省略key ==> es6（即可通过this.props.bookVideoMusic获取state中的状态值）
    };
};

const mapDispatchToProps = (dispatch) => {
    //bindActionCreators:把 action creators 转成拥有同名 keys 的对象
    const movieHomeAction = bindActionCreators(requestMovieHome, dispatch);
    const movieTopAction = bindActionCreators(requestMovieTop, dispatch);
    return {
        movieHomeAction:movieHomeAction,//2.注入action,即可调用action中声明的方法,（即可通过this.props.main获取,用于调用main中的方法）
        movieTopAction:movieTopAction
    };
};
/**
 * 将state,action绑定到props
 */
//export default connect(mapStateToProps,mapDispatchToProps)(book-video-music);// 3.将组件注入
export default BookVideoMusic;