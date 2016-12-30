;(function() {

  'use strict';

  var express = require('express');
  var config = require('../config/config.js');
  var utils = require('./utils/utils.js');

  var cookieParser = require('cookie-parser');
  var bodyParser = require('body-parser');
  var compression = require('compression');
  var helmet = require('helmet');
  var methodOverride = require('method-override');
  var paginate = require('express-paginate');
  var cors = require('cors');
  var expressValidator = require('express-validator');

  var errorHandling = require('./app.error-handling.js');

  /**
   * MongoDB init
   */
  require('../config/db.js');

  /**
   * ExpressJS app init
   */
  var app = express();
  var http = require('http');
  var server = http.Server(app);

  /**
   * Socket.Io init
   */
  // socket.io server url: http://localhost:5000
  var io = require('socket.io')(server);
  io.sockets.on('connection', (socket) => {
    console.log('io connected!');

    socket.on('disconnect', (socket) => {
       console.log('io disconnected!');
    });
  });

  // make io accessible for all routes
  app.use((req,res,next) => {
      req.io = io;
      next();
  });

  /**
   * Middleware section
   */
  app.use(cors());
  app.use(compression());
  app.use(helmet());
  app.use(methodOverride('X-HTTP-Method-Override'));

  /**
   * express pagination, include pagination links in response
   * keep this before all routes that will use pagination
   * 10 - max limit per page
   * 100 - max limit user can send in query
   */
  app.use(paginate.middleware(10, 100));

  app.use(bodyParser.text());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(expressValidator());
  app.use(cookieParser());

  /**
   * Router
   */
  var routes = require('./app.routes.js');
  app.use(config.apiRoute, routes);

  /**
   * Error handling
   */

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    errorHandling.routeNotFound(req, res, next);
  });


  // development error handling with stacktraces
  if (app.get('env') === 'development' || app.get('env') === 'test') {
    app.use((err, req, res, next) => {
      errorHandling.dev(err, req, res, next, app, utils);
    });
  }

  // production error handling no stacktraces
  app.use((err, req, res, next) => {
    errorHandling.prod(app, utils, err, req, res, next);
  });

  // start the app by listening on <port>
  var env = process.env.NODE_ENV || 'development';
  var port = config.db[env].port || 5000;

  // don't start up server for tests
  if (!module.parent) {
    server.listen(port, () => {
      console.log(`Express server listening on port ${port} in ${app.settings.env} mode`);
    });
  }

  module.exports = app;

})();
