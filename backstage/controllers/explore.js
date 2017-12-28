var Movie = require('../models/movie');

// ranking page
exports.list = function(req, res) {
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err, '选电影报错');
        } else {
            res.render('explore/explore', {
                title: '选电影',
                movies: movies
            })
        }
    });
}