$(document).ready(function () {
    // 初始化分页组件
    $('._pagination').pagination(pagination_total, {
        callback: testPagination,
        current_page: pagination_currentPage,
        items_per_page: pagination_countPerPage,	// 每页每页显示的记录条数	数字	10
        num_display_entries: 5,	// 最多显示的页码数	数字	11
        next_show_always: true,	// 如果设置为false‘下一页’按钮只有在还能增加页码的情况下才显示	布尔值	true
        prev_show_always: true,	// 如果设置为false‘上一页’按钮只有在还能导航到前一页的情况下才显示	布尔值	true
        num_edge_entries: 1,	// 如果设为1，那么永远会显示首页和末页	1或0	0
        link_to: '',
    });

    // 分页点击回调
    function testPagination(new_page_index, pagination_container) {
        window.location.href= "/explore?start=" + 30 * new_page_index;
    }
});

