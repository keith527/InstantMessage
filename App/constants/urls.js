/**
* Description: 网络地址
* Created by Yacheng Lee on 2017-03-05 17:25:35
* @flow
*/

const BaseUrl = 'https://api.douban.com/';

export const MovieApi={
    in_theaters : BaseUrl+'v2/movie/in_theaters',
    coming_soon : BaseUrl+'v2/movie/coming_soon',
    top_250 :BaseUrl+'v2/movie/top250',
    nice_weekly : BaseUrl+'v2/movie/weekly',
    new_movie : BaseUrl+'v2/movie/new_movies',
}

export const SearchApi={
    book_search:BaseUrl+'v2/book/search',
    movie_search:BaseUrl+'v2/movie/search',
    music_search:BaseUrl+'v2/music/search'
}

