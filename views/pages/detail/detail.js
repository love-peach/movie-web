$(document).ready(function () {
    // 点击展开详细影评
    var $moreSummary = $('.more-summary');
    $moreSummary.on('click', function () {
        var $this = $(this);
        var contentShortEle = $this.parent().find('.content-short');
        var contentFullEle = $this.parent().find('.content-full');
        var url = '/fullReview/' + $(this).data("id") + '/full';

        if($this.html().indexOf('展开') > -1) {
            if(!contentFullEle.html()) {
                $.ajax({
                    type: 'get',
                    url: url,
                    dataType: "json",
                    success: function (resReview) {
                        contentShortEle.hide();
                        contentFullEle.html(resReview.html);
                        contentFullEle.show();
                        $this.html('(收起)');
                    }
                })
            } else {
                contentShortEle.hide();
                contentFullEle.show();
                $this.html('(收起)');
            }
        } else {
            contentFullEle.hide();
            contentShortEle.show();
            $this.html('(展开)');
        }
    });

    // video 视频播放功能集合

    // 获取 video 对象
    var $videoPlayerWrap = $('.video-player-wrap');
    var videoPlayer = document.getElementById('videoPlayer');
    var $videoPlayer = $('#videoPlayer');

    // 获取 控制器元素
    var $videoPlayerControl = $('.video-player-control');
    var $controlPlay = $('.control-play');
    var $controlCurrentTime = $('.control-current-time');
    var $controlDuration = $('.control-duration');
    var $controlSound = $('.control-sound');
    var $controlScreen = $('.control-screen');
    var $progressBar = $('.control-progress .progress-bar');
    var $progressItem = $('.control-progress .progress-item');
    var $volumeBar = $('.control-volume .progress-bar');
    var $volumeItem = $('.control-volume .progress-item');
    var $iconPlayCircle = $('.video-mask .icon-play-circle');

    // 获取 控制器中的图标
    var $iconPlay = $videoPlayerControl.find('.icon-play');
    var $iconPause = $videoPlayerControl.find('.icon-pause');
    var $iconSound = $videoPlayerControl.find('.icon-sound');
    var $iconMute = $videoPlayerControl.find('.icon-mute');
    var $iconFullScreen = $videoPlayerControl.find('.icon-full-screen');
    var $iconExitFullScreen = $videoPlayerControl.find('.icon-exit-full-screen');

    // 定义 video 中用到的变量
    var videoDuration = 1;
    var videoCurrentTime = 0;
    var videoPlayerVolume = 1;
    var volumeBarWidth = $volumeBar.width();

    // 鼠标在视频区域内移动事件
    var debounceMove = false; // 设置防抖变量
    $videoPlayerWrap.on('mousemove', function () {
        $videoPlayerControl.css({bottom: 0});
        $videoPlayer.css({cursor: 'auto'});
        clearTimeout(debounceMove); // 清除待执行代码
        debounceMove = setTimeout(function(){
            $videoPlayer.css({cursor: 'none'});
            $videoPlayerControl.css({bottom: '-60px'})
        }, 2000);
    });

    // 遮罩层播放按钮播放事件
    $iconPlayCircle.on('click', function () {
        $('.video-mask').hide();
        videoPlayer.play();
        $iconPlay.hide();
        $iconPause.show();
    });

    // 播放 / 暂停 功能
    $controlPlay.on('click', function () {
        if(videoPlayer.paused) {
            $('.video-mask').hide();
            videoPlayer.play();
            $iconPlay.hide();
            $iconPause.show();
        } else {
            $('.video-mask').show();
            videoPlayer.pause();
            $iconPause.hide();
            $iconPlay.show();
        }
    });

    // 获取总时长
    $videoPlayer.on('loadedmetadata', function () {
        videoDuration = videoPlayer.duration;
        $controlDuration.text(formatTime(videoPlayer.duration));
    });

    // 获取当前播放时长
    $videoPlayer.on('timeupdate', function() {
        videoCurrentTime = videoPlayer.currentTime;
        $controlCurrentTime.text(formatTime(videoPlayer.currentTime));

        var percent = formatPercent(videoCurrentTime, videoDuration);
        $progressItem.css({'width': percent});
    });

    // 点击进度条
    $progressBar.on('click', function (e) {
        var currentLen = e.offsetX;
        var progressBarWidth = $progressBar.width();
        var percent = formatPercent(currentLen, progressBarWidth, true);
        videoPlayer.currentTime = videoDuration * percent;
    });

    // 切换静音功能
    $controlSound.on('click', function () {
        if(videoPlayer.volume) {
            videoPlayerVolume = videoPlayer.volume;
            videoPlayer.volume = 0;
            $iconSound.hide();
            $iconMute.show();
        } else {
            videoPlayer.volume = videoPlayerVolume;
            $iconMute.hide();
            $iconSound.show();
        }
        handleChangeVolumeBar();
    });

    // 切换全屏功能
    $controlScreen.on('click', function () {
        if(document.IsFullScreen) {
            exitFullscreen();
            $iconExitFullScreen.hide();
            $iconFullScreen.show();
        } else {
            launchFullscreen($videoPlayerWrap[0]);
            $iconFullScreen.hide();
            $iconExitFullScreen.show();
        }
    });

    // 点击音量条
    $volumeBar.on('click', function (e) {
        var currentLen = e.offsetX;
        var percent = formatPercent(currentLen, volumeBarWidth, true);
        videoPlayer.volume = percent;
        handleChangeVolumeBar();
        if(percent <= 0) {
            $iconSound.hide();
            $iconMute.show();
        } else {
            $iconMute.hide();
            $iconSound.show();
        }
    });
    
    // 进入全屏
    function launchFullscreen(element) {
        //此方法不可以在異步任務中執行，否則火狐無法全屏
        if(element.requestFullscreen) {
            element.requestFullscreen();
        } else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if(element.msRequestFullscreen){
            element.msRequestFullscreen();
        } else if(element.oRequestFullscreen){
            element.oRequestFullscreen();
        } else if(element.webkitRequestFullscreen){
            element.webkitRequestFullScreen();
        } else {
            var  cssText = 'width:100%;height:100%;overflow:hidden;';
            var docHtml  = document.documentElement;
            var docBody  = document.body;
            docHtml.style.cssText = cssText;
            docBody.style.cssText = cssText;
        }
        element.style.cssText = 'margin:0px;padding:0px;position: fixed; top: 0; left: 0; bottom: 0; right: 0; z-index: 999;';
        document.IsFullScreen = true;
    }

    //退出全屏
    function exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if(document.oRequestFullscreen){
            document.oCancelFullScreen();
        }else if (document.webkitExitFullscreen){
            document.webkitExitFullscreen();
        }else{
            var docHtml  = document.documentElement;
            var docBody  = document.body;
            docHtml.style.cssText = "";
            docBody.style.cssText = "";
        }
        $videoPlayerWrap[0].style.cssText = '';
        document.IsFullScreen = false;
    }

    // 改变音量条长度
    function handleChangeVolumeBar() {
        var percent = formatPercent(videoPlayer.volume, 1);
        $volumeItem.css({'width': percent});
    }

    // 计算百分比 返回浮点数值 或者 百分比字符串
    function formatPercent(num, total, isNum) {
        var percent = Math.round(num / total * 10000) / 100.00;
        return isNum ? percent / 100 : percent + '%';
    }

    // 格式化时间 hh:mm:ss
    function formatTime(seconds) {
        var h = parseInt(seconds / 3600);
        var m = parseInt((seconds % 3600) / 60);
        var s = parseInt(seconds % 60);
        if(h) {
            return formatZero(h) + ':' + formatZero(m) + ':' + formatZero(s);
        } else {
            return formatZero(m) + ':' + formatZero(s);
        }
    }

    // 格式化时间 个位数前面补 '0'
    function formatZero(num) {
        return num < 10 ? '0' + num : num;
    }
});