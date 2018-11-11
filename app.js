var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

var usersRouter = require('./routes/users');
var indexRouter = require('./routes/index');
var gatewayRouter = require('./routes/gateway');
var clientSideRouter = require('./routes/clientSide');
var newUsersRouter = require('./routes/tokenUser');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/swe2");


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extend : false}));
app.use(bodyParser.json());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tokenUser', newUsersRouter);
app.use('/gateway', gatewayRouter);
app.use('/clientSide', clientSideRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
