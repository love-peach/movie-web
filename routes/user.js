var express = require('express');
var router = express.Router();
var User = require('../backstage/controllers/user');

router.post('/login', User.login);
router.post('/singin', User.login);


module.exports = router;
