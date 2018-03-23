var express = require('express');
var router = express.Router();
var Search = require('../backstage/controllers/search');

router.get('/', Search.list);

module.exports = router;
