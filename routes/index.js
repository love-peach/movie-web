var express = require('express');
var router = express.Router();
var Index = require('../backstage/controllers/index');

/* GET home page. */
router.get('/', Index.index);

module.exports = router;
