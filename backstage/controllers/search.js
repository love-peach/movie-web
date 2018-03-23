var Movie = require('../models/movie');

var axios = require('axios');
var api = require('../api');
var countPerPage = 20;
exports.list = function(req, res, next) {
    var paramsSearch = {
        q: req.query.q || '',
        tag: req.query.tag || '',
        count: countPerPage,
        start: req.query.start || 0
    };

    var paramsRankingWeekly = {
        count: 10,
        start: 0
    };
    var paramsRankingUs = {
        count: 9,
        start: 0
    };


    axios.all([
        makeRequest('getSearch', paramsSearch),
        makeRequest('getRankingWeekly', paramsRankingWeekly),
        makeRequest('getRankingUs', paramsRankingUs)
    ]).then(axios.spread(function (resSearch, resWeekly, resUs) {
        res.render('search/search', {
            title: '搜索',
            total: resSearch.total,
            countPerPage: countPerPage,
            currentPage: resSearch.start / resSearch.count,
            movies: resSearch,
            moviesWeekly: resWeekly.subjects,
            moviesUs: resUs
        })
    })).catch(function (err) {
        next(err)
    });


    // api.getRankingWeekly()
    // api.getSearch(params)
    //     .then(function (response) {
    //         res.render('search/search', {
    //             title: '搜索',
    //             total: response.total,
    //             countPerPage: countPerPage,
    //             currentPage: response.start / response.count,
    //             movies: response.subjects
    //         })
    //     })
    //     .catch(function (err) {
    //         next(err)
    //     });
};

function makeRequest(apiName, params) {
    return api[apiName](params);
}