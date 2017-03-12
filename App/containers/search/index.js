import React, {Component} from 'react';
import {StyleSheet, View,ScrollView, Text} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ScrollableTabView,{DefaultTabBar, ScrollableTabBar, FacebookTabBar} from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import * as color from '../../style/color';

import {requestMovieHome, requestMovieTop} from '../../actions/BookVideoMusic';

import BookSearch from './book-search';
import MovieSearch from './movie-search';
import MusicSearch from './music-search';


export default class Search extends Component{

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
                <BookSearch tabLabel='搜书' {...this.props}/>
                <MovieSearch tabLabel='搜电影' {...this.props}/>
                <MusicSearch tabLabel='搜音乐' {...this.props}/>
            </ScrollableTabView>
        );
    }
}