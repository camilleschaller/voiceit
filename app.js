const config = require('./config.js');

const mongoose = require('mongoose');
mongoose.connect(config.databaseUrl);

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var subjectsRouter = require('./routes/subjects');
var notesRouter = require('./routes/notes');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/subjects', subjectsRouter);
app.use('/notes', notesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//openAPI 
const fs = require('fs');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
// Parse the OpenAPI document.
const openApiDocument = yaml.load(fs.readFileSync('./openapi.yml'));
// Serve the Swagger UI documentation.
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(openApiDocument));

module.exports = app;
