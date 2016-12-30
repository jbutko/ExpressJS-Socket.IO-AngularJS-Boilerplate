;(function() {

  /**
   * App configuration inluding MongoDB, API route etc.
   */

  'use strict';

  module.exports = {
    db: {
      development: {
        url: 'mongodb://localhost/apidev',
        port: 5000
      },
      test: {
        url: 'mongodb://localhost/apitest',
        port: 5555
      },
      production: {
        url: 'mongodb://localhost/apiprod',
        port: 5300
      },
    },
    secret: 'customSecret2016?!', // BEWARE: this should not goes into repository
    apiRoute: '/api/v1/',
  };

})();