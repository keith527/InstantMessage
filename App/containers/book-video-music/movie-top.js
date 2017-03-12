/**
* Description:
* Created by Yacheng Lee on 2017-03-08 16:32:40
* @flow
*/

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text, ListView} from 'react-native';

// 第三方组件
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
//Action
import {requestMovieTop250, requestMovieNiceWeekly, requestMovieNew} from '../../actions/BookVideoMusic';
//Component
import MovieTopItem from '../../components/scrollviewItem/MovieTopItem';
import {LoadingMoreFooter, LoadingView, NoMoreFooter} from '../../components';
//const
import {WINDOW_DIMEN} from '../../constants/device-info';

let params = {
    start:0,
    count:10,
}
let isFirstLoad = true;
let requestType ;

class MovieTop extends Component{

    // 构造
      constructor(props) {
        super(props);
        requestType = this.props.requestType
        this.state = {
            dataSource: new ListView.DataSource({
               rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        }
      }

    componentDidMount() {
        let {movieTop250Action} = this.props;
        movieTop250Action(params);

    }

    _renderRow(rowData, sectionID, rowID){
          let directors = rowData.directors;
          let director = directors[0];
        return <MovieTopItem key={rowID} title={rowData.title} rating={rowData.rating.average}
                             director={director.name} casts={rowData.casts}
                            imageUrl={rowData.images.large} url={rowData.alt} top_index={rowID}/>;
    }

    _onEndReach(){
        const {movieTop, movieTop250Action} = this.props;

        if(!isFirstLoad && !movieTop.isLoading && movieTop.isLoadMore){

            let param = Object.assign({}, params,{
                start:movieTop.start,
                count:movieTop.count
            });
            movieTop250Action(param);
        }
    }

    _renderFooter(){
        const {movieTop} = this.props;

        return (
            movieTop.isLoadMore?<LoadingMoreFooter/>:<NoMoreFooter/>
        );

    }

    render(){

        const {movieTop}  = this.props;

          if(movieTop.movieList && movieTop.movieList.length){
              isFirstLoad = false;
          }

        return(
            (movieTop.isLoading&&isFirstLoad)?
            <LoadingView/>
                :
            <ListView dataSource={this.state.dataSource.cloneWithRows(movieTop.movieList)}
                      style={{height: WINDOW_DIMEN.height,marginLeft: 10,marginRight: 10}}
                      enableEmptySections={true}
                      showsVerticalScrollIndicator={false}
                      renderRow={this._renderRow.bind(this)}
                      onEndReachedThreshold={10}
                      onEndReached={this._onEndReach.bind(this)}
                      renderFooter={this._renderFooter.bind(this)}
            />


        );
    }
}


const mapStateToProps = (state)=>{
    const {bookVideoMusic}  = state;// => var bookVideoMusic = state.bookVideoMusic;调用rootReducer中声明的reducer
    const movieTop = bookVideoMusic.movieTop;

    return {
        movieTop:movieTop//1.bookVideoMusic:bookVideoMusic，当key和value相同时，可省略key ==> es6（即可通过this.props.bookVideoMusic获取state中的状态值）
    };
};

const mapDispatchToProps = (dispatch) => {
    //bindActionCreators:把 action creators 转成拥有同名 keys 的对象
     const movieTop250Action = bindActionCreators(requestMovieTop250, dispatch);

    return {
        movieTop250Action:movieTop250Action,//2.注入action,即可调用action中声明的方法,（即可通过this.props.main获取,用于调用main中的方法）

    };
};
/**
 * 将state,action绑定到props
 */
export default connect(mapStateToProps, mapDispatchToProps)(MovieTop);