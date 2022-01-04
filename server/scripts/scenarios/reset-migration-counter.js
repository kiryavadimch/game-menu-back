'use strict';

const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../../../.migrate');
const Promose = require('bluebird');

module.exports = () => {
  if (fs.existsSync(filePath)) {
    return fs.unlink(filePath, (err) => {
      if (err) throw err;
      console.log(`${filePath} was deleted`);
    });
  } else {
    return Promise.resolve();
  }
};