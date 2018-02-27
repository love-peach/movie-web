var Movie = require('../models/movie');

var bannerData = [
    {
        poster: '/images/bg-1.jpg',
    }, {
        poster: '/images/bg-2.jpg',
    }, {
        poster: '/images/bg_titanic.jpg',
    }, {
        poster: '/images/bg-2.jpg',
    }, {
        poster: '/images/bg-1.jpg',
    },
];
var moviesData = [
    {
        name: '电影名字',
        sort: 8.9
    }, {
        name: '电影名字',
        sort: 8.9
    }, {
        name: '电影名字',
        sort: 8.9
    }, {
        name: '电影名字',
        sort: 8.9
    }, {
        name: '电影名字',
        sort: 8.9
    }, {
        name: '电影名字',
        sort: 8.9
    }, {
        name: '电影名字',
        sort: 8.9
    }, {
        name: '电影名字',
        sort: 8.9
    }, {
        name: '电影名字',
        sort: 8.9
    }, {
        name: '电影名字',
        sort: 8.9
    }
];
var modelsData = [
    {
        modelTitle: '标题',
        elements: moviesData
    }, {
        modelTitle: '标题',
        elements: moviesData
    }, {
        modelTitle: '标题',
        elements: moviesData
    }, {
        modelTitle: '标题',
        elements: moviesData
    }, {
        modelTitle: '标题',
        elements: moviesData
    }, {
        modelTitle: '标题',
        elements: moviesData
    },

]
// index page
exports.index = function(req, res) {
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err, '首页报错');
        } else {
            res.render('home/home', {
                title: '主页',
                bannerData: bannerData,
                movies: modelsData,
                modelsData: modelsData,
            });
        }
    });
}