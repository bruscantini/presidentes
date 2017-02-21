
const express       = require('express');
const path          = require('path');
const favicon       = require('serve-favicon');
const logger        = require('morgan');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const session       = require("express-session");
const MongoStore    = require('connect-mongo')(session);
const bcrypt        = require("bcrypt");
const passport      = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const authenticator = require('./routes/Authenticator');
const main          = require('./routes/Main');
const app           = express();
const flash         = require("connect-flash");
const expressLayouts = require('express-ejs-layouts');

// Mongoose configuration
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/passport-local");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main-layout'); // defaults to 'layout'
app.use(expressLayouts);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', authenticator);
app.use('/', main);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
