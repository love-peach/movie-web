var Movie = require('../models/movie');

// index page
exports.index = function(req, res) {
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err, '首页报错');
        } else {
            res.render('home/home', {
                title: '主页',
                movies: movies
            });
        }
    });
}