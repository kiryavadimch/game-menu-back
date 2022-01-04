'use strict';

module.exports = function(app) {
  require('./user')(app);
  require('./public')(app);
  require('./admin')(app);
};
