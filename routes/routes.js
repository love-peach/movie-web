var index = require('./index');
var login = require('./login');
var sigup = require('./sigup');
var ranking = require('./ranking');
var explore = require('./explore');
var review = require('./review');
var search = require('./search');
var admin = require('./admin');
var movie = require('./movie');
var user = require('./user');

module.exports = function(app) {
    // pre handle user
    app.use(function(req, res, next) {
        var _user = req.session.user;
        app.locals.user = _user;
        next();
    })

    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1')
        // res.header("Content-Type", "application/json;charset=utf-8");
        next();
    });

    app.use('/', index);
    app.use('/login', login);
    app.use('/sigup', sigup);
    app.use('/ranking', ranking);
    app.use('/explore', explore);
    app.use('/review', review);
    app.use('/search', search);
    app.use('/admin', admin);
    app.use('/movie', movie);
    app.use('/user', user);
}