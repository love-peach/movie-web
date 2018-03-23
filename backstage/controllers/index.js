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
// exports.index = function(req, res) {
//     Movie.fetch(function(err, movies) {
//         if (err) {
//             console.log(err, '首页报错');
//         } else {
//             res.render('home/home', {
//                 title: '主页',
//                 bannerData: bannerData,
//                 movies: modelsData,
//                 modelsData: modelsData,
//             });
//         }
//     });
// };

var axios = require('axios');
var api = require('../api');
var countPerPage = 10;
exports.index = function(req, res, next) {
    var paramsBeingShown = {
        count: countPerPage,
        start: 0
    };
    var paramsRankingNew = {
        count: countPerPage,
        start: 0
    };
    var paramsRankingComing = {
        count: countPerPage,
        start: 0
    };

    axios.all([
        makeRequest('getBeingShown', paramsBeingShown),
        makeRequest('getRankingNew', paramsRankingNew),
        makeRequest('getRankingComing', paramsRankingComing)
    ]).then(function (allData) {
        var modelsData = allData.map(function (model) {
            return {
                modelTitle: model.title,
                elements: model.subjects.slice(0,10)
            }
        });
        res.render('home/home', {
                title: '主页',
                bannerData: bannerData,
                modelsData: modelsData,
            });
    }).catch(function (err) {
        next(err)
    });
};

function makeRequest(apiName, params) {
    return api[apiName](params);
}
