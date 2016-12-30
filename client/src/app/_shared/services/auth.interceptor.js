;(function() {

  'use strict';

  /**
   * Auth interceptor
   *
   * @desc intercept every request, response, error etc.
   */

  angular
    .module('boilerplate')
    .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$q', '$injector'];

  function authInterceptor($q, $injector) {

    var interceptor = {
      request: request,
      response: response,
      responseError: responseError
    };

    return interceptor;

    /// definitions

    /**
     * intercept every request call
     */
    function request(config) {

      config.headers = config.headers || {};

      var storage = $injector.get('localStorage');
      var user = storage.get('user');
      if (user)
        config.headers['Authorization'] = user.token;

      return config;
    }

    /**
     * intercept every response
     */
    function response(config) {
      config.headers = config.headers || {};
      return config;
    }


    /**
     * handle API response status errors
     */
    function responseError(error) {
      var log = $injector.get('$log');
      log.error('error', error);

      if (error.status == 401) {
        var rootScope = $injector.get('$rootScope');
        rootScope.$broadcast('user:logout');
      }

      return $q.reject(error);
    }

  }
})();
