var express = require("express");
var bodyParser = require('body-parser');
var path = require('path');

var mongoose = require('mongoose');

var Movie = require('./backstage/models/movie');

var _ = require('underscore');


mongoose.connect('mongodb://127.0.0.1:27017/movie_web');

// 定义启动端口 默认为 3000; 其中 process 为全局变量，类似于浏览器中的 window 对象
var port = process.env.PORT || 3000

// 实例化
var app = express();

// 设置 视图文件目录 以及 视图模板引擎
app.set('views', path.join(__dirname, 'views/pages'))
app.set('view engine', 'jade')

// 处理表单提交的数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 设置 静态资源目录
app.use(express.static(path.join(__dirname, 'dist')))

// 监听服务
app.listen(port,function(){
    console.log('app is runing at http://localhost:' + port);
})

// 定义路由

// 首页
app.get('/', function(req, res) {
    Movie.fetch(function(err, movies) {
        if(err) {
            console.log(err, '首页报错');
        } else {
            res.render('home', {
                title: '主页',
                movies: movies
            }); 
        }
    });
})

// 排行榜
app.get('/ranking', function(req, res) {
    Movie.fetch(function(err, movies) {
        if(err) {
            console.log(err, '排行榜报错');
        } else {
            res.render('ranking', {
                title: '排行榜',
                movies: movies
            })
        }
    });
})

// 选电影
app.get('/explore', function(req, res) {
    Movie.fetch(function(err, movies) {
        if(err) {
            console.log(err, '选电影报错');
        } else {
            res.render('explore', {
                title: '选电影',
                movies: movies
            })
        }
        
    });
})

// 影评
app.get('/review', function(req, res) {
	res.render('review', {
    	title: '影评'
  	})
})

// 详情页
app.get('/detail/:id', function(req, res) {
    var id = req.params.id;
    Movie.findById(id, function(err, movie) {
        if(err) {
            console.log(err, '详情页报错');
        } else {
            res.render('detail', {
                title: '详情',
                movie: movie
            })
        }
    })
    
})

// 后台 - 列表 - 渲染页面
app.get('/admin', function(req, res) {
    Movie.fetch(function(err, movies) {
        if(err) {
            console.log(err, '后台列表页报错');
        } else {
            res.render('admin/index', {
                title: '管理后台-列表',
                movies: movies
            })
        }
        
    });
})

// 后台 - 列表 - 更新 - 渲染页面
app.get('/admin/update/:id', function(req, res) {
    var id = req.params.id;
    if(id !== 'undefined') {
        Movie.findById(id, function(err, movie) {
            if(err) {
                console.log(err, '更新报错')
            } else {
                res.render('admin/entry', {
                    title: '管理后台-更新',
                    movie: movie
                })
            }
        })
    }
})

// 后台 - 列表 - 删除 - 请求
app.delete('/admin/delete/:id', function(req, res) {
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
})

// 后台 - 录入 - 渲染页面
app.get('/admin/entry', function(req, res) {
    res.render('admin/entry', {
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
})

// 后台 - 录入 - 新增请求
app.post('/admin/entry/new', function(req, res) {
    var movieObj = req.body;
    var id = movieObj._id;
    var _movie;

    if(id) {
        Movie.findById(id, function(err, movie) {
            if(err) {
                console.log(err, '更新出错！')
            } else {
                _movie = _.extend(movie, movieObj);
                _movie.save(function(err, movie) {
                    if(err) {
                        console.log(err)
                    } else {
                        res.redirect('/detail/' + movie._id);
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
            if(err) {
                console.log(err, '新增出错')
            } else {
                res.redirect(301, '/detail/' + movie._id);
            }
        })
    }
})