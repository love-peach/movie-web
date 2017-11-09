var express = require('express');
var router = express.Router();
var Movie = require('../backstage/controllers/movie');

router.get('/', Movie.list);

module.exports = router;
