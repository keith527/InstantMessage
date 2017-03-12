/**
* Description:书影音页面
* Created by Xiaocheng Zuo  on 2017-03-07 09:20:53
* @flow
*/
import React, {Component} from 'react';
import {StyleSheet, View,ScrollView, Text} from 'react-native';

import ScrollableTabView,{DefaultTabBar, ScrollableTabBar, FacebookTabBar} from 'react-native-scrollable-tab-view';
import * as color from '../../style/color';

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

export default BookVideoMusic;