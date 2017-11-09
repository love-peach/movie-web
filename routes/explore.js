var express = require('express');
var router = express.Router();
var Explore = require('../backstage/controllers/explore');

/* GET home page. */
router.get('/', Explore.list);

module.exports = router;
