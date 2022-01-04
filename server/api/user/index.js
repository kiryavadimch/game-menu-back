const getGlobbedFiles = require('../../utils/getGlobbedFiles');
const path = require('path');

module.exports = (router) => {
   getGlobbedFiles(path.join(__dirname, './routes/*.js')).forEach((path) =>
      require(path)(router)
   );
};
