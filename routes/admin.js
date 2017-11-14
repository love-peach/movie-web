var express = require('express');
var router = express.Router();
var Admin = require('../backstage/controllers/admin');

router.get('/', Admin.index);

module.exports = router;
