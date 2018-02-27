var Movie = require('../models/movie');
var _ = require('underscore');

exports.list = function(req, res) {
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err, '后台列表页报错');
        } else {
            res.render('admin/movie/movie-list/list', {
                title: '管理后台-列表',
                movies: movies
            })
        }
    });
}

exports.detail = function(req, res) {
    var id = req.params.id;
    Movie.findById(id, function(err, movie) {
        if (err) {
            console.log(err, '详情页报错');
        } else {
            res.render('detail/detail', {
                title: '详情',
                movie: movie
            })
        }
    })
}

// movie entry page
exports.entry = function(req, res) {
    res.render('admin/movie/movie-entry/entry', {
        title: '管理后台-录入',
        movie: {
            _id: '',
            name: '',
            alias: '',
            director: '',
            screenwriter: '',
            actor: '',
            type: '',
            region: '',
            language: '',
            releaseTime: '',
            filmLength: '',
            sourceUrl: '',
            brief: '',
            cover: '',
        }
    })
}

// movie update page
exports.update = function(req, res) {
    var id = req.params.id;
    if (id !== 'undefined') {
        Movie.findById(id, function(err, movie) {
            if (err) {
                console.log(err, '更新报错')
            } else {
                res.render('admin/movie/movie-entry/entry', {
                    title: '管理后台-更新',
                    movie: movie
                })
            }
        })
    }
}

exports.delete = function(req, res) {
    var id = req.params.id;
    if(id) {
        Movie.remove({_id: id}, function(err, movie) {
            if(err) {
                console.log(err, '后台 - 列表 - 删除 - 请求:');
            } else {
                res.json({success: 1});
            }
        }) 
    }
}

exports.save = function(req, res) {
    var movieObj = req.body;
    var id = movieObj._id;
    var _movie;


    if (id) {
        Movie.findById(id, function(err, movie) {
            if (err) {
                console.log(err, '更新出错！')
            } else {
                _movie = _.extend(movie, movieObj);
                _movie.save(function(err, movie) {
                    if (err) {
                        console.log(err)
                    } else {
                        res.redirect('/movie/detail/' + movie._id);
                    }
                })
            }
        })
    } else {
        _movie = new Movie({
            name: movieObj.name,
            alias: movieObj.alias,
            director: movieObj.director,
            screenwriter: movieObj.screenwriter,
            actor: movieObj.actor,
            type: movieObj.type,
            region: movieObj.region,
            language: movieObj.language,
            releaseTime: movieObj.releaseTime,
            filmLength: movieObj.filmLength,
            sourceUrl: movieObj.sourceUrl,
            brief: movieObj.brief,
            cover: movieObj.cover,
        })
        _movie.save(function(err, movie) {
            if (err) {
                console.log(err, '新增出错')
            } else {
                console.log(movie, 'movie1111');
                // res.redirect('/');

                // res.writeHead(302, {
                //     'Location': '/movie/detail/' + movie._id
                //     //add other headers here...
                // });
                // res.render('想要内容');

                // res.render('home/home', {
                //     title: '主页',
                // });
                // res.write(200, '990');
                // res.end();
                // res.writeHead(200, {'Content-Type': 'text/plain'});
                res.status(200);
                res.json({name: 211});
                // res.end();
                // res.location('/movie/detail/' + movie._id);
                //
                // this.detail;
                // res.end('ddf')
                // res.render('admin/movie/movie-list/list', {
                //     title: '管理后台-列表',
                //     movies: movies
                // })
                // res.redirect(302, '/movie/detail/' + movie._id);
            }
        })
    }
}