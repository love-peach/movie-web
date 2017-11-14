
exports.index = function(req, res) {
    res.render('admin/index', {
        title: '管理后台首页',
    });
}