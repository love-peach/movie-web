var Movie = require('../models/movie');

// ranking page
// exports.list = function(req, res) {
//     Movie.fetch(function(err, movies) {
//         if (err) {
//             console.log(err, '选电影报错');
//         } else {
//             res.render('explore/explore', {
//                 title: '选电影',
//                 movies: movies
//             })
//         }
//     });
// }

var api = require('../api');
var countPerPage = 30;
exports.list = function(req, res, next) {

    var params = {
        count: countPerPage,
        start: req.query.start || 0
    };
    api.getRankingTop250(params)
        .then(function (response) {
            res.render('explore/explore', {
                title: '选电影',
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
