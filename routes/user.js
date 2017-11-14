var express = require('express');
var router = express.Router();
var User = require('../backstage/controllers/user');

router.post('/login', User.login);
router.post('/sigup', User.sigup);
router.post('/logout', User.logout);
router.get('/list', User.list);

module.exports = router;
