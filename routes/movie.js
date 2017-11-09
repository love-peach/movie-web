var express = require('express');
var router = express.Router();
var Movie = require('../backstage/controllers/movie');

router.get('/entry', Movie.entry);
router.post('/new', Movie.save);
router.get('/detail/:id', Movie.detail);
router.get('/update/:id', Movie.update);
router.delete('/delete/:id', Movie.delete);

module.exports = router;
