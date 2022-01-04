'use strict';

let config = {
  mongoose: {
    connectionString: process.env.MONGOOSE_URL || "mongodb://localhost/quickdraw",
  },
  initialData: {
  }
};

module.exports = config;