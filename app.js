var path = require('path');
var express = require("express");

// 定义启动端口 默认为 3000; 其中 process 为全局变量，类似于浏览器中的 window 对象
var port = process.env.PORT || 3000

// 实例化
var app = express();

// 设置 视图文件目录 以及 视图模板引擎
app.set('views', path.join(__dirname, 'views/pages'))
app.set('view engine', 'jade')

// 设置 静态资源目录
console.log(path.join(__dirname, 'dist'))
app.use(express.static(path.join(__dirname, 'dist')))

// 定义路由
app.get('/', function(req, res) {
	res.render('hello', {
    	title: '欢迎'
  	})
})

// 监听服务
app.listen(port,function(){
	console.log('app is runing at http://localhost:' + port);
})