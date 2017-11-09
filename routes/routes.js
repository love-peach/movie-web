var index = require('./index');
var login = require('./login');
var sigup = require('./sigup');
var ranking = require('./ranking');
var explore = require('./explore');
var admin = require('./admin');
var movie = require('./movie');
var user = require('./user');

module.exports = function(app) {
  app.use('/', index);
  app.use('/login', login);
  app.use('/sigup', sigup);
  app.use('/ranking', ranking);
  app.use('/explore', explore);
  app.use('/admin', admin);
  app.use('/movie', movie);
  app.use('/user', user);
}