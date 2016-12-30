;(function() {


	/**
	 * Place to store API URL or any other CONSTANTS
	 * Usage:
	 *
	 * Inject CONSTANTS service as a dependency and then use like this:
	 * CONSTANTS.API_URL
	 */
  angular
  	.module('boilerplate')
    .constant('CONSTANTS', {
      API: {
        dev: {
          'API_URL': 'http://localhost:5000/api/v1/'
        },
        prod: {
          'API_URL': 'api/v1/'
        },
      }
    });


})();
