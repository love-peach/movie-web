(function () {
    'use strict'

    // 引入gulp
    var gulp = require('gulp');

    // 引入组件
    var less = require('gulp-less'), // less
        minifyCSS = require('gulp-minify-css'), // css压缩
        autoprefix = require('gulp-autoprefixer'), // 自动补齐前缀

        jshint = require('gulp-jshint'), // js检测
        uglify = require('gulp-uglify'), // js压缩
        concat = require('gulp-concat'), // 合并文件
        sourcemaps = require('gulp-sourcemaps'), // sourceMap

        imagemin = require('gulp-imagemin'), // 图片压缩
        pngquant = require('imagemin-pngquant'), // 深度压缩png图片的imagemin插件

        runSequence = require('run-sequence'),
        cached = require('gulp-cached'), // 过滤改动的文件
        rename = require('gulp-rename'), // 重命名
        del = require('del'), // 清空文件夹
        browserSync = require('browser-sync'), // 自动刷新浏览器，代理
        nodemon = require('gulp-nodemon'); // 重启 node 服务

    // 定义路径对象
    var srcRoot = 'src/'; // 源目录文件夹
    var distRoot = 'dist/'; // 输出目录文件夹
    var viewsRoot = 'views/'; // 视图目录文件夹

    var paths = {
        src: {
            less: srcRoot + 'stylesheets/*.less',
            scripts: srcRoot + 'javascripts/*.js',
            img: srcRoot + 'images/*.+(jpeg|jpg|png|svg|gif|ico)',
            plugs: srcRoot + 'libs/**/*',
            fonts: srcRoot + 'fonts/'
        },
        dist: {
            css: distRoot + 'stylesheets/',
            scripts: distRoot + 'javascripts/',
            img: distRoot + 'images/',
            plugs: distRoot + 'libs/',
            fonts: distRoot + 'fonts/'
        },
        views: {
            pages: viewsRoot + 'pages/'
        }
    };

    //拷贝图片，开发环境不需要每次都压缩图片。之所以需要拷贝一次，是因为会执行clean任务。
    gulp.task('img', function () {
        var imgSrc = [paths.src.img, paths.views.pages + '**/*.+(jpeg|jpg|png|svg|gif|ico)'];
        var imgDest = paths.dist.img;
        return gulp.src(imgSrc)
            .pipe(cached('img'))
            .pipe(gulp.dest(imgDest))
    });

    // 压缩图片。只在build任务中才压缩图片
    gulp.task('imgMin', function () {
        var imgSrc = [paths.src.img, paths.views.pages + '**/*.+(jpeg|jpg|png|svg|gif|ico)'];
        var imgDest = paths.dist.img;
        return gulp.src(imgSrc)
            .pipe(cached('imgMin'))
            .pipe(imagemin({
                optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
                progressive: false, //类型：Boolean 默认：false 无损压缩jpg图片
                interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
                multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
                svgoPlugins: [{
                    removeViewBox: false
                }], //不要移除svg的viewbox属性
                use: [pngquant({
                    quality: '65-80'
                })]
            }))
            .pipe(gulp.dest(imgDest))
    });

    //less转css,自动补齐前缀并压缩
    gulp.task('css', function () {
        var cssSrc = [paths.src.less, paths.views.pages + '**/*.less'];
        var cssDest = paths.dist.css;
        return gulp.src(cssSrc)
            .pipe(cached('css'))
            .pipe(less())
            .pipe(autoprefix())
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(minifyCSS({
                advanced: false,
                aggressiveMerging: false
            }))
            .pipe(gulp.dest(cssDest))
    });

    // 检查、合并、压缩js文件
    gulp.task('js', function () {
        var jsSrc = [paths.src.scripts, paths.views.pages + '**/*.js'];
        var jsDest = paths.dist.scripts;
        return gulp.src(jsSrc)
            .pipe(cached('js'))
            .pipe(sourcemaps.init())
            .pipe(jshint())
            // .pipe(jshint.reporter('default'))
            /*.pipe(concat('all.js'))*/
            // .pipe(gulp.dest(jsDest))
            .pipe(uglify())
            .pipe(sourcemaps.write())
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest(jsDest))
    });

    //拷贝字体
    gulp.task('fonts', function () {
        var fontSrc = paths.src.fonts;
        var fontDest = paths.dist.fonts;
        return gulp.src(fontSrc)
            .pipe(cached('fonts'))
            .pipe(gulp.dest(fontDest))
    });

    // 拷贝第三方库/插件
    gulp.task('copyPlugs', function () {
        var plugsSrc = paths.src.plugs;
        var plugsDist = paths.dist.plugs;
        return gulp.src(plugsSrc)
            .pipe(gulp.dest(plugsDist))
    });

    gulp.task('default', function () {
        runSequence(
            'clean',
            ['img', 'css', 'js', 'copyPlugs'],
            'nodemon',
            'browser-sync',
            'watch'
        );
    });

    gulp.task('clean',  function (cb) {
        return del([distRoot + '**/*'], cb)
    });

    gulp.task('nodemon', function (cb) {
        var started = false;
        return nodemon({
            script: 'bin/www',
            ignore: [
                'node_modules/',
                'dist/**/*.*',
                'src/**/*.*',
                'views/**/*.js'
            ],
        }).on('start', function () {
            if (!started) {
                cb();
                started = true;
            }
        });
    });

    gulp.task('browser-sync', function () {
        browserSync.init({
            proxy: "http://localhost:3000",
            files: ["views/**/*.jade", distRoot + '**/*'],
            browser: "google chrome",
            notify: false,
            port: 4000
        });
    });

    gulp.task('watch', function () {
        gulp.watch([paths.src.img, paths.views.pages + '**/*.+(jpeg|jpg|png|svg|gif|ico)'], ['img']);
        gulp.watch([paths.src.less, paths.views.pages + '**/*.less'], ['css']);
        gulp.watch([paths.src.scripts, paths.views.pages + '**/*.js'], ['js']);
    });

    gulp.task('build', ['clean'], function () {
        return gulp.start('img', 'css', 'js', 'copyPlugs');
    });
})();