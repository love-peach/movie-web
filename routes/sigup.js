var express = require('express');
var router = express.Router();
var User = require('../backstage/controllers/user');

router.get('/', User.showSignup);

module.exports = router;
