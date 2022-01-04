const mongoose = require('mongoose');
const config = require('./config').mongoose;
const glob = require('glob');

// Create the database connection
mongoose.connect(config.connectionString, { useNewUrlParser: true, auto_reconnect:true });
mongoose.set('useCreateIndex', true);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + config.connectionString);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
  mongoose.disconnect();
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
  mongoose.connect(config.connectionString, { useNewUrlParser: true, auto_reconnect:true });
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

const definedModels = glob.sync('server/dao/mongoose-models/*.js');

definedModels.forEach((path) => {
      require(`../dao/mongoose-models/${path.split('/')[3]}`);
    }
);
