var Movie = require('../models/movie');

// review page
exports.list = function(req, res) {
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err, '影评报错');
        } else {
            res.render('review/review', {
                title: '影评',
                movies: movies
            })
        }
    });
};