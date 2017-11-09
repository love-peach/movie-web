var express = require('express');
var router = express.Router();
var Ranking = require('../backstage/controllers/ranking');

/* GET home page. */
router.get('/', Ranking.list);

module.exports = router;
