'use strict';

const getGlobbedFiles = require('../utils/getGlobbedFiles');
const path = require('path');

module.exports = (app) => {
  getGlobbedFiles(path.join(__dirname, './routes/*.js'))
      .forEach(path => require(path)(app));
};