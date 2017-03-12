/**
* Description: 书影音下的 NavTab -- 电影
* Created by Xiaocheng Zuo  on 2017-03-07 09:12:44
* @flow
*/
import React, {Component} from 'react';
import {StyleSheet,
    View,
    Text,
    Image,
    ListView,
    StatusBar,
    Navigator,
    RefreshControl,
    TouchableHighlight,
    ScrollView} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {requestMovieHome} from '../../actions/BookVideoMusic';
import {LoadingView, LvStar,ScrollTopMovie} from '../../components';

import {MOVIE_TAG} from '../../constants/type_tags';


/**
 * 初始化状态
 */

let isFirstLoad = true;

class MovieNav extends Component{

    // 构造
      constructor(props) {
        super(props);
      }

    componentDidMount() {
        const {movieHomeAction} = this.props;
        movieHomeAction();
    }

    //点击影院热映--更多
    onMoreClick4InTheaters(){
        alert("影院热映---更多");
    }

    onMoreClick4ComingSoon(){
        alert("即将上映---更多");
    }

    render(){
        const {movie} = this.props;
        let data_movie_in_theaters = movie.movieList.in_theaters;
        let data_movie_coming_soon = movie.movieList.coming_soon;
        if (data_movie_in_theaters.length && data_movie_coming_soon.length) {
            isFirstLoad = false;
        }
        return (
            movie.isLoading?
                <LoadingView/>
                :
                <ScrollView style={{flex:1, marginTop:50, backgroundColor: '#f8f8ff'}}>
                    <StatusBar backgroundColor="#00000000" translucent={true}/>

                    <View>
                        <LvStar data={data_movie_in_theaters} title="影院热映" type={MOVIE_TAG.MOVIE_IN_THEATERS}
                                onMoreClick={this.onMoreClick4InTheaters}
                        />
                        <View style={{height:10}}/>
                        <LvStar data={data_movie_coming_soon} title="即将上映" type={MOVIE_TAG.MOVIE_COMING_SOON}
                                onMoreClick={this.onMoreClick4ComingSoon}
                        />
                    </View>

                    <View style={{height:10}}/>

                    <ScrollTopMovie title="精选榜单" />
                </ScrollView>
        );
    }
}

const mapStateToProps = (state)=>{
    const {bookVideoMusic}  = state;// => var bookVideoMusic = state.bookVideoMusic;调用rootReducer中声明的reducer
    return {
        movie:bookVideoMusic.movie,

    };
};

const mapDispatchToProps = (dispatch) => {
    //bindActionCreators:把 action creators 转成拥有同名 keys 的对象
    const movieHomeAction = bindActionCreators(requestMovieHome, dispatch);
    return {
        movieHomeAction:movieHomeAction,//2.注入action,即可调用action中声明的方法,（即可通过this.props获取）
    };
};
/**
 * 将state,action绑定到props
 */
export default connect(mapStateToProps, mapDispatchToProps)(MovieNav);
//export default MovieNav;