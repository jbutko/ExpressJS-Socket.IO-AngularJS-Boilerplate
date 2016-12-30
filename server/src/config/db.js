;(() => {

  'use strict';

  var mongoose = require('mongoose');
  var config = require('./config.js');
  var ENV = process.env.NODE_ENV || 'development';
  var DB_URI = config.db[ENV].url;

  // set mongoose.Promise to native ES6 Promise implementation
  mongoose.Promise = Promise;

  mongoose.connect(DB_URI);

  // connection events
  mongoose.connection.on('connected', () => {
      console.log(`Mongoose connected to ${DB_URI}`);
  });

  mongoose.connection.on('error', (err) => {
      console.log(`Mongoose connection error: ${err}`);
  });

  mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected');
  });

  mongoose.connection.once('open', (err, data) => {
    console.log('Mongo working!');
  });

  // for nodemon restarts
  process.once('SIGUSR2', () => {
      gracefulShutdown('nodemon restart', () => {
          process.kill(process.pid, 'SIGUSR2');
      });
  });

  // for app termination
  process.on('SIGINT', () => {
      gracefulShutdown('app termination', () => {
          process.exit(0);
      });
  });

  /// definitions

  // capture app termination / restart events
  // To be called when process is restarted or terminated
  function gracefulShutdown(msg, cb) {
      mongoose.connection.close(() => {
          console.log(`Mongoose disconnected through ${msg}`);
          cb();
      });
  }

})();