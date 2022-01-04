require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const rfs = require('rotating-file-stream');
const fs = require('fs');
require('./server/configs/mongoose');

var app = express();

const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['authorization']
};
app.use(cors(corsOption));

// assign the swig engine to .html files
app.engine('html', require('ejs').renderFile);
// set .html as the default extension
app.set('view engine', 'html');
app.set('views', __dirname + '/../quickdraw-frontend/build');

const logDirectory = path.join(__dirname, 'log');

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
const accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory
});

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../quickdraw-frontend/build')));
app.use(express.static(path.join(__dirname, './public')));

// set api
require('./server/api')(app);

//set router
require('./server/router')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.end();
});

module.exports = app;
