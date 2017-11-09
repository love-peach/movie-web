# movie-web

一个前后端通常吃，具备增删查改功能的电影展示网站。

**后端**通过 nodejs 驱动，采用 express 框架，jade 模板引擎，快速搭建 web 应用；数据库用的是 mongodb，以及与之配套的 mongooes 插件；
**前端**选用 bower 安装依赖，采用 jQuery 和 bootstrap 样式库编写页面交互和样式；
**本地**开发通过 gulp 以及 一些插件，完成 样式编译，脚本，图片压缩等。


主要技术栈：

- 前端：bower bootstrap jquery
- 后端：nodejs express jade mongodb
- 构建：gulp


## 目录结构

```
.
├── README.md                // 项目简介
├── app.js                   // 主文件
├── backstage                // 后端逻辑
│   ├── controllers             // 
│   ├── models                  //
│   └── schemas                 //
├── bower.json               // bower 依赖配置文件
├── dist                     // 静态资源目录 (部署目录)
│   ├── images
│   ├── javascripts
│   ├── libs                   // bower 依赖安装目录
│   └── stylesheets
├── gulpfile.js              // gulp 配置文件
├── package.json             // 项目依赖配置文件
├── routes                   // 路由
├── src                      // 源码
│   ├── images
│   ├── javascripts
│   └── stylesheets
└── test                     // 测试目录
   
```


## 基础数据

准备通过爬虫，爬豆瓣网的数据；同时，支持手动添加数据。

## 启动项目

1. 首先 安装项目依赖 `npm install` `bower install`
2. 然后 构建静态资源 开发 `gulp watch` 生产 `gulp build`


## issue

### Cannot find module 'jade'

项目按照正常配置，但是启动的时候就是报上面的错误，可能是依赖不全，执行`npm install -d`

### 如何在 jade 模板中定义一个多行的 json 数据

## 参考链接
[Express+Less+Gulp配置高效率开发环境](https://www.qcloud.com/community/article/627049001486519548)