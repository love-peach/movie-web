(function () {
    'use strict'

    // 引入gulp
    var gulp = require('gulp');

    // 引入组件
    var less = require('gulp-less'),               // less
        minifyCSS = require('gulp-minify-css'),    // css压缩
        autoprefix = require('gulp-autoprefixer'), // 自动补齐前缀
        jshint = require('gulp-jshint'),           // js检测
        uglify = require('gulp-uglify'),           // js压缩
        concat = require('gulp-concat'),           // 合并文件
        rename = require('gulp-rename'),           // 重命名
        imagemin = require('gulp-imagemin'),       // 图片压缩
        pngquant = require('imagemin-pngquant'),   //深度压缩png图片的imagemin插件
        changed = require('gulp-changed'),         // 过滤改动的文件
        del = require('del'),                      // 清空文件夹
        notify = require('gulp-notify');           // 提示信息

    // 定义路径对象
    var srcRoot = './src/';                            // 源目录文件夹 ./表示当前目录,这里没有设置./是因为需要监听新增的图片
    var distRoot = './dist/';                     // 输出目录文件夹
    var paths = {
        src: {
            less: srcRoot + 'stylesheets/',
            scripts: srcRoot + 'javascripts/',
            img: srcRoot + 'images/',
            // fonts: srcRoot + 'fonts/'
        },
        dist: {
            css: distRoot + 'stylesheets/',
            scripts: distRoot + 'javascripts/',
            img: distRoot + 'images/',
            // fonts: distRoot + 'fonts/'
        }
    };

    //拷贝图片，开发环境不需要每次都压缩图片。之所以需要拷贝一次，是因为会执行clean任务。
    gulp.task('img', function () {
        var imgSrc = paths.src.img + '*.+(jpeg|jpg|png|svg|gif|ico)';
        var imgDest = paths.dist.img;

        return gulp.src(imgSrc)
            .pipe(changed(imgDest))
            .pipe(gulp.dest(imgDest))
            .pipe(notify({ message: '<%= file.relative %>' + ' copied finished' }));
    });

    // 压缩图片。只在build任务中才压缩图片
    gulp.task('imgMin', function () {
        var imgSrc = paths.src.img + '**';
        var imgDest = paths.dist.img;

        return gulp.src(imgSrc)
            .pipe(changed(imgDest))
            .pipe(imagemin({
                optimizationLevel: 5,                     //类型：Number  默认：3  取值范围：0-7（优化等级）
                progressive: false,                        //类型：Boolean 默认：false 无损压缩jpg图片
                interlaced: true,                         //类型：Boolean 默认：false 隔行扫描gif进行渲染
                multipass: true,                          //类型：Boolean 默认：false 多次优化svg直到完全优化
                svgoPlugins: [{removeViewBox: false}],    //不要移除svg的viewbox属性
                use: [pngquant({quality: '65-80'})]
            }))
            .pipe(gulp.dest(imgDest))
            .pipe(notify({ message: '<%= file.relative %>' + ' compressed finished' }));
    });

    //less转css,自动补齐前缀并压缩
    gulp.task('css', function () {
        var cssSrc = paths.src.less + 'style.less';
        var cssDest = paths.dist.css;

        return gulp.src(cssSrc)
            .pipe(changed(cssDest))
            .pipe(less())
            .pipe(autoprefix())
            .pipe(gulp.dest(cssDest))
            .pipe(rename({ suffix: '.min' }))
            .pipe(minifyCSS(
                {
                    advanced: false,
                    aggressiveMerging: false
                }))
            .pipe(gulp.dest(cssDest))
            .pipe(notify({ message: '<%= file.relative %>'+' finished less to css' }));
    });

    // 检查、合并、压缩js文件
    gulp.task('js', function () {
        var jsSrc = paths.src.scripts + '*.js';
        var jsDest = paths.dist.scripts;

        return gulp.src(jsSrc)
            .pipe(changed(jsDest))
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            .pipe(notify({ message: 'jscheck is ok' }))
            /*.pipe(concat('all.js'))*/
            .pipe(gulp.dest(jsDest))
            .pipe(rename({ suffix: '.min' }))
            .pipe(uglify())
            .pipe(gulp.dest(jsDest))
            .pipe(notify({ message: '<%= file.relative %>'+' finished js task' }));
    });

    //拷贝字体
    gulp.task('fonts', function () {
        var fontSrc = paths.src.fonts + '*.*';
        var fontDest = paths.dist.fonts;

        return gulp.src(fontSrc)
            .pipe(changed(fontDest))
            .pipe(gulp.dest(fontDest))
            .pipe(notify({ message: 'fonts task ok' }));
    });

    //定义监听任务
    gulp.task('watch', function () {
        gulp.watch(paths.src.img + '*.+(jpeg|jpg|png|svg|gif|ico)', ['img']);//此任务好像没有效果？ 原因：用 './xx' 开头作为当前路径开始，会导致无法监测到新增文件，所以直接省略掉 './' 即可。'./images/*' === 'images/*'
        gulp.watch(paths.src.less + '*.less', ['css']);
        gulp.watch(paths.src.scripts + '*.js', ['js']);
    });

    // 清空dist目录下的所有文件

    gulp.task('clean', function() {
        var imgDist = paths.dist.img;
        var cssDist = paths.dist.css;
        var jsDist = paths.dist.scripts;
        del([imgDist, cssDist, jsDist])
    });

    // gulp.task('clean', function () {
    //     return gulp.src(distRoot + '**/**.*', {read: false})
    //         .pipe(clean({force: true}));
    // });


    //将子任务组合起来,方便调用
    //默认运行dev任务
    gulp.task('dev', function () {
        gulp.run('img', 'css', 'js');
    });

    // gulp命令默认启动的就是default认为,这里将clean任务作为依赖,也就是先执行一次clean任务,流程再继续.
    gulp.task('default', ['clean'], function () {
        gulp.run('dev');
    });

    //push时需要调用的任务，在build中调用
    gulp.task('build-task', function () {
        gulp.run('imgMin', 'css', 'js');
    });

    gulp.task('build', ['clean'], function () {
        gulp.run('build-task');
    });
})();