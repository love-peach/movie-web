$(document).ready(function () {
    var slider = $('.banner').unslider({
        autoplay: true,
        nav: true,
        delay: 5000,
        animation: 'fade'
    });
    var sliderData = slider.data('unslider');

    // 监听鼠标是否滑入 banner 区域，是就暂停，离开就继续自动轮播
    $('.unslider-wrap li, .banner-nav li').on('mouseenter', function (e) {
        sliderData.stop();
    });
    $('.unslider-wrap li, .banner-nav li').on('mouseleave', function (e) {
        sliderData.start();
    });

    var $bannerNavLinks = $('.unslider-nav li');
    $bannerNavLinks.on('mouseover', function () {
        var dataIndex = $(this).data('slide');
        sliderData.animate(dataIndex);
    });


});