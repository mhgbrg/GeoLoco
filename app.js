var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug');

require('dotenv').config()

var routes = require('./routes/index');
var api = require('./routes/api');
var twitter = require('./routes/twitter');
var instagram = require('./routes/instagram');
var nytimes = require('./routes/nytimes');
var yikyak = require('./routes/yikyak');

var app = express();

/****************
SETUP
****************/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/****************
ROUTING
****************/

app.use('/', routes);
app.use('/api', api);
app.use('/api/instagram', instagram);
app.use('/api/twitter', twitter);
app.use('/api/nytimes', nytimes);
app.use('/api/yikyak', yikyak);

/****************
ERROR HANDLING
****************/

// Catch 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Development
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// Production
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
