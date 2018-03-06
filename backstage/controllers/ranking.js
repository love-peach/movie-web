var Movie = require('../models/movie');

// ranking page
// exports.list = function(req, res) {
//     Movie.fetch(function(err, movies) {
//         if (err) {
//             console.log(err, '排行榜报错');
//         } else {
//             res.render('ranking/ranking', {
//                 title: '排行榜',
//                 movies: movies
//             })
//         }
//     });
// }

var api = require('../api');
var countPerPage = 30;

/* 豆瓣电影 Top 250*/
exports.listTop250 = function(req, res, next) {
    var params = {
        count: countPerPage,
        start: req.query.start || 0,
        tag: req.query.tag
    };
    api.getRankingTop250(params)
        .then(function (response) {
            res.render('ranking/ranking', {
                title: '排行榜',
                pageTitle: '豆瓣电影 TOP250',
                total: response.total,
                countPerPage: countPerPage,
                currentPage: response.start / response.count,
                movies: response.subjects
            })
        })
        .catch(function (err) {
            next(err)
        });
};

// 前端分页加载数据，直接吐出 html 内容给页面。
var path = require('path');
var jade = require('jade');
const compiledFunction = jade.compileFile(path.join(__dirname, '../../views/pages/ranking/ranking-ajax.jade'));


/* 豆瓣电影 top 250 分页加载*/
exports.listTop250ForPage = function (req, res, next) {
    var params = {
        count: countPerPage,
        start: (req.params.pageNum * countPerPage) || 0
    };
    api.getRankingTop250(params)
        .then(function (response) {
            var ajaxHtml = compiledFunction({movies: response.subjects, start: params.start});
            res.send(ajaxHtml);
        })
        .catch(function (err) {
            console.log(err, 'ranking controller 报错');
            next(err);
        });
};

/* 分类电影搜索 （假装是分类排行榜） */
exports.listByCategory = function (req, res, next) {
    var params = {
        tag: req.query.tag,
        count: countPerPage,
        start: (req.params.pageNum * countPerPage) || 0
    };
    api.getSearch(params)
        .then(function (response) {
            var ajaxHtml = compiledFunction({movies: response.subjects, start: params.start});
            res.send(ajaxHtml);
        })
        .catch(function (err) {
            console.log(err, 'ranking controller listByCategory 报错');
            next(err);
        });
};

