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

// 首页
app.get('/', function(req, res) {
	res.render('home', {
    	title: '主页',
    	movie: [
    		{
    			cover: '/images/captain.jpeg'
    		},
    		{
    			cover: '/images/captain.jpeg'
    		},
    		{
    			cover: '/images/captain.jpeg'
    		},
    		{
    			cover: '/images/captain.jpeg'
    		},
    		{
    			cover: '/images/captain.jpeg'
    		},
    	]
  	})
})

// 排行榜
app.get('/ranking', function(req, res) {
	res.render('ranking', {
    	title: '排行榜'
  	})
})

// 选电影
app.get('/explore', function(req, res) {
	res.render('explore', {
    	title: '选电影'
  	})
})

// 影评
app.get('/review', function(req, res) {
	res.render('review', {
    	title: '影评'
  	})
})

// 详情
app.get('/detail/:id', function(req, res) {
    res.render('detail', {
        title: '详情'
    })
})

// 后台
app.get('/admin', function(req, res) {
	res.render('admin/index', {
    	title: '主页' 
  	})
})

// 监听服务
app.listen(port,function(){
	console.log('app is runing at http://localhost:' + port);
})