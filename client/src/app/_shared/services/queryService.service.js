;(function() {

  'use strict';

  /**
   * $http service abstraction to make API calls with any HTTP method,
   * custom url, and params.
   *
   * @category  service
   * @author    Jozef Butko
   * @example   Inject QueryService as the dependency and then use it this way:
   *
   * QueryService.query('GET', 'users/user', {get: query}, {post: params}, {headers: headers})
   *   .then(function(data) {
   *     console.log(data);
   *   }, function(error) {
   *     console.log(error);
   *   });
   *
   * @version   2.0
   *
   */

  angular
    .module('boilerplate')
    .service('QueryService', QueryService);

  QueryService.$inject = ['$http', 'CONSTANTS'];

  function QueryService($http, CONSTANTS) {
    this.query = query;

    /// definitions

    /**
     * Make http request of any method with params
     * @param  {string} method     HTTP method
     * @param  {styring} url       URL
     * @param  {object} getParams  GET params in case of GET request
     * @param  {object} postParams POST/PUT params in case of POST/PUT requests
     * @param  {object} headers    Headers
     * @return {object}            Promise
     */
    function query(method, url, getParams, postParams, headers) {
      return $http({
        method: method,
        url: CONSTANTS.API.dev.API_URL + url,
        params: getParams || '', // GET
        data: postParams || '', // POST/PUT
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

  }

})();
