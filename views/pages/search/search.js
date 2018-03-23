$(document).ready(function () {
    $(window).scroll(function() {
        var t = document.documentElement.scrollTop || document.body.scrollTop;  //获取距离页面顶部的距离
        var $categorySearch = $("#js-category-search"); //获取div元素
        if( t >= 1550 ) { //当距离顶部超过300px时
            $categorySearch.addClass('animated side-panel-fixed');
        } else { //如果距离顶部小于300px
            $categorySearch.removeClass('animated side-panel-fixed');
        }
    });
});