/**
* Description:  整个App的容器组件
* Created by Xiaocheng Zuo on 2017-03-05 13:42:48
* @flow
*/
import React, {Component} from 'react';
import {StyleSheet, Navigator} from 'react-native';
import {
    Router,
    Scene,
    ActionConst,
    Actions
} from 'react-native-router-flux';
import { connect } from 'react-redux';

import Home from '../pages/Home';
import Splash from '../pages/Splash';
import BookVideoMusic from '../containers/book-video-music';
import Search from './search/search-index';
import SearchBook from './search/book-search';
import SearchMovie from './search/movie-search';
import SearchMusic from './search/music-search';

import Me from '../pages/Me';
import MovieTop from './book-video-music/movie-top';
import WebView from '../components/common/webView';
import TabIcon from '../components/common/TabIcon';



const RouterWithRedux = connect()(Router);
//const BackButton = require('../images/arrow_left.png');

const getSceneStyle = (props, computedProps) => {
    const style = {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
    };
    if (computedProps.isActive) {
        style.marginTop = computedProps.hideNavBar ?
            0 : Navigator.NavigationBar.Styles.General.TotalNavHeight;
        style.marginBottom = computedProps.hideTabBar ? 0 : 50;
    }
    return style;
};

const scenes = Actions.create(
    <Scene key="root">
        <Scene key="splash" component={Splash} hideNavBar hideTabBar initial />
        <Scene key="webview" component={WebView} hideTabBar title="电影" type={ActionConst.PUSH}/>
        <Scene key="movietop" component={MovieTop} hideTabBar type={ActionConst.PUSH} passProps={true}/>
        <Scene key="tabs" tabs={true} pressOpacity={0.8} type={ActionConst.REPLACE} >
            <Scene
                key="home"
                component={Home}
                //hideNavBar
                title="首页"
                icon={TabIcon}
                iconName="md-home"
            />
            <Scene
                key="book_video_music"
                component={BookVideoMusic}
                title="书影音"
                icon={TabIcon}
                iconName="md-bookmarks"
            />
            <Scene
                key="search"
                title="搜索"
                icon={TabIcon}
                iconName="md-search"
                hideNavBar
            >
                <Scene key='search_index' component={Search} />
                <Scene key='search_book' component={SearchBook}/>
                <Scene key="search_movie" component={SearchMovie}/>
                <Scene key="search_music" component={SearchMusic}/>
            </Scene>
            <Scene key="tab4" title="我的"
                   icon={TabIcon}
                   iconName="md-person">
                <Scene key="me" component={Me} title="我的" />
            </Scene>
        </Scene>
    </Scene>
);

export default class App extends Component{
    render(){
        return (
            <RouterWithRedux getSceneStyle={getSceneStyle}
                             navigationBarStyle={styles.navBar}
                             titleStyle={styles.navBarTitle}
                             backButtonImage={require('../images/arrow_left.png')}
                             scenes={scenes}
                             onBack={()=>Actions.pop()}/>
        )
    }
}


const styles = StyleSheet.create({
    navBar: {
        backgroundColor: '#3e9ce9'
    },
    navBarTitle: {
        color: '#fff',
        fontSize: 20,
    }
});