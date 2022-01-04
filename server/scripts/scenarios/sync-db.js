'use strict';

const mongoose = require('mongoose');

module.exports = (parameters) => {
      return mongoose.connect('mongodb://localhost/organs', function(){
        return mongoose.connection.db.dropDatabase().then(() => {
          console.log("MongoDB dropped");
          process.exit(0);
      })
      }).catch((err) => {
        console.log("Error during sync", err);
        process.exit(1);
      })
};
