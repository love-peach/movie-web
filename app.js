var express = require("express");
var bodyParser = require('body-parser');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const dbUrl = 'mongodb://127.0.0.1:27017/movie_web';
// 实例化
var app = express();

// 链接数据 配置数据库
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, {
    useMongoClient: true
});

// 设置 视图文件目录 以及 视图模板引擎
app.set('views', path.join(__dirname, 'views/pages'))
app.set('view engine', 'jade')

// 处理表单提交的数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser());
app.use(logger('dev'));

app.use(session({
    secret: 'movie_web',
    store: new MongoStore({
        url: dbUrl,
        collection: 'sessions'
    })
}));

// 设置 静态资源目录
app.use(express.static(path.join(__dirname, 'dist')))

// 引入路由
require('./routes/routes')(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;