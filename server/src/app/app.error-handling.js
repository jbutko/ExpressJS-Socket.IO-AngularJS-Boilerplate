;(function() {

  'use strict';

  // public
  module.exports = {
    routeNotFound,
    dev,
    prod
  };

  // on javascript exception, print out nice stack
  process.on('uncaughtException', (err) => {
    console.log('');
    console.error(err.stack);
    process.exit();
  });

  /// definitions

  function routeNotFound(req, res, next) {
    var err = new Error('API endpoint not found. Please double check URL and HTTP method.');
    err.status = 404;
    next(err);
  }

  function dev(err, req, res, next, app, utils) {
    if (!err) return next(); // you also need this line

    var host = req.get('host');
    var reqUrl = req.protocol + '://' + host + req.url;
    var status = err.status || 500;
    var errMsg = {
      status: status,
      stack: err.stack,
      code: err.code,
      detail: err.message || err.err.message,
      error: err.err ? err.err.message : err
    };

    utils.sendJSONresponse(res, status, errMsg, reqUrl);
  }

  function prod(app, utils, err, req, res, next) {
    if (!err) return next(); // you also need this line

    var host = req.get('host');
    var reqUrl = req.protocol + '://' + req.get('host') + req.url;
    var status = err.status || 500;
    var errMsg = {
      status: status,
      code: err.code,
      detail: err.message || err.err.message
    };

    utils.sendJSONresponse(res, status, errMsg, reqUrl);
  }



})();
