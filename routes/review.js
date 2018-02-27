var express = require('express');
var router = express.Router();
var Review = require('../backstage/controllers/review');

router.get('/', Review.list);

module.exports = router;
