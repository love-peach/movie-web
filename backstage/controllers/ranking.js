var Movie = require('../models/movie');

// ranking page
exports.list = function(req, res) {
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err, '排行榜报错');
        } else {
            res.render('ranking', {
                title: '排行榜',
                movies: movies
            })
        }
    });
}