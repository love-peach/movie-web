var express = require('express');
var router = express.Router();
var Ranking = require('../backstage/controllers/ranking');

/* 排行榜首页 默认展示top250 */
router.get('/', Ranking.listTop250);

/* 排行榜首页 分页加载*/
router.get('/:pageNum', Ranking.listTop250ForPage);

/* 分类排行榜 */
router.get('/category', Ranking.listByCategory);

module.exports = router;
