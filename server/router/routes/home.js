'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');

/* GET App home page. */
module.exports = (app) => {
  app
      .route('/')
      .get((req, res, next) => {
        return res.render('index');
      });
};