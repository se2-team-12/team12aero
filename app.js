const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

let usersRouter = require('./routes/users');
let indexRouter = require('./routes/index');
let gatewayRouter = require('./routes/gateway');
let clientSideRouter = require('./routes/clientSide');
let newUsersRouter = require('./routes/tokenUser');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/swe2");


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tokenUser', newUsersRouter);
app.use('/gateway', gatewayRouter);
app.use('/clientSide', clientSideRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  .next(createError(404));
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
