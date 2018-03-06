$(document).ready(function () {

    // 加载更多
    var $loadMore = $('.load-more');
    var currentPage = 0;
    $loadMore.on('click',function () {
        currentPage += 1;
        var fetching = true;
        // 请求数据
        $.ajax({
            url: '/ranking/' + currentPage ,
        }).then(function (data) {
            $(".movie-list-wrap > ul.mw-row").append(data);
            fetching = false;
        }).catch(function (err) {
            console.log(err,'err');
        });
    })
});