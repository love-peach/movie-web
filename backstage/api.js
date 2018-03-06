var request = require('./request');

// 获取 排行榜 Top250
exports.getRankingTop250 = function (params) {
    return request.get('/v2/movie/top250', params);
};

// 正在上映
exports.getBeingShown = function (params) {
    return request.get('/v2/movie/in_theaters', params);
};

// 口碑榜
exports.getRankingWeekly = function (params) {
    return request.get('/v2/movie/weekly', params);
};

// 北美票房榜
exports.getRankingUs = function (params) {
    return request.get('/v2/movie/us_box', params);
};

// 新片榜
exports.getRankingNew = function (params) {
    return request.get('/v2/movie/new_movies', params);
};

// 即将上映
exports.getRankingComing = function (params) {
    return request.get('/v2/movie/coming_soon', params);
};

/** 搜索
* q: 搜索关键字
* tag: 标签
* start: 起始位置
* count: 数量
* */
exports.getSearch = function (params) {
    return request.get('/v2/movie/search', params);
};

/** 电影条目信息
 * */
exports.getMovieDetail = function (params) {
    return request.get('/v2/movie/subject/id', params);
};

/** 电影条目剧照
 * */
exports.getMovieDetailForPhotos = function (params) {
    return request.get('/v2/movie/subject/id/photos', params);
};

/** 电影条目影评列表
 * */
exports.getMovieDetailForReviews = function (params) {
    return request.get('/v2/movie/subject/id/reviews', params);
};

/** 电影条目短评列表
 * */
exports.getMovieDetailForComments = function (params) {
    return request.get('/v2/movie/subject/id/comments', params);
};