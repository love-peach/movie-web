# movie-web

## 目录结构

```
.
├── README.md
├── app.js
├── backstage
│   ├── controllers
│   ├── models
│   └── schemas
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
├── routes
├── test
└── views
    ├── include
    ├── layout
    └── pages
   
```

## 主要用到的技术
- nodejs
- mongodb
- jade
- gulp

## 启动项目
首先`npm install` 然后`bower install` 最后 `npm run start`

## issue

### Cannot find module 'jade'

项目按照正常配置，但是启动的时候就是报上面的错误，可能是依赖不全，执行`npm install -d`
