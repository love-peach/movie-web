var express = require("express");
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

// 实例化
var app = express();

var port = process.env.PORT || 3000;

// 链接数据 配置数据库
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/movie_web', {useMongoClient:true});

// 设置 视图文件目录 以及 视图模板引擎
app.set('views', path.join(__dirname, 'views/pages'))
app.set('view engine', 'jade')

// 处理表单提交的数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 设置 静态资源目录
app.use(express.static(path.join(__dirname, 'dist')))

// 引入路由
require('./routes/routes')(app)

// 监听服务
app.listen(port,function(){
    console.log('app is runing at http://localhost:' + port);
})