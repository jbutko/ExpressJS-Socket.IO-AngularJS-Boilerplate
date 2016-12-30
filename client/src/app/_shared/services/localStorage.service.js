;(function() {

  'use strict';

  /**
   * Service for localStorage functionality
   *
   * @category  service
   * @author    Jozef Butko
   * @example   Inject LocalStorage as the dependency and then use it like this:
   *
   * var data = { property: 'name'};
   * // set, get, remove, removeAll and list localStorage values
   * localStorage.set('obj', data);
   * localStorage.get('obj');
   * localStorage.update('obj', data);
   * localStorage.remove('obj');
   * localStorage.removeAll();
   * localStorage.list();
   *
   * @version 2.0
   *
   */
  angular
    .module('boilerplate')
    .service('localStorage', LocalStorageService);

  LocalStorageService.$inject = ['$window', '$rootScope', '$log'];

  function LocalStorageService($window, $rootScope, $log) {
    this.set = set;
    this.get = get;
    this.update = update;
    this.remove = remove;
    this.removeAll = removeAll;
    this.list = list;

    /// definitions

    /**
     * Test browser if it supports localStorage
     */
    var storage = (typeof window.localStorage === 'undefined') ? undefined : window.localStorage;
    var supported = !(typeof storage === undefined || typeof window.JSON === undefined);

    /**
     * Set localStorage value and check if it already do not exists
     *
     * @param {string} name Name of localStorage value
     * @param {object} val  Return stored value
     */
    function set(name, val) {
      if (!supported)
        $log.debug('localStorage not supported, make sure you have the $cookies supported.');

      // in case we already have localStorage with same name alert error msg
      if (window.localStorage.getItem(name) !== null)
        $log.warn('localStorage with the name ' + name + ' already exists. Please pick another name.');
      else
        return $window.localStorage && $window.localStorage.setItem(name, angular.toJson(val));

    }


    /**
     * getData from localStorage
     *
     * @param  {string} name Name of localStorage value
     * @return {*}           Stored value
     */
    function get(name) {
      if (!supported)
        $log.debug('localStorage not supported, make sure you have the $cookies supported.');

      return $window.localStorage && angular.fromJson($window.localStorage.getItem(name));
    }


    /**
     * Update already stored data
     *
     * @param  {string}  name Name of localStorage value
     * @param {object}   val  Return stored value
     */
    function update(name, val) {
      if (!supported)
        $log.debug('localStorage not supported, make sure you have the $cookies supported.');

      return $window.localStorage && $window.localStorage.setItem(name, angular.toJson(val));
    }



    /**
     * Remove localStorage value
     *
     * @param  {string} name Name of localStorage value
     * @return {boolean}     True/false if the value is removed
     */
    function remove(name) {
      if (!supported)
        $log.debug('localStorage not supported, make sure you have the $cookies supported.');

      return $window.localStorage && $window.localStorage.removeItem(name);
    }


    /**
     * Remove all localStorage values
     *
     * @return {boolean}     True/false if the value is removed
     */
    function removeAll() {
      if (!supported)
        $log.debug('localStorage not supported, make sure you have the $cookies supported.');

      return $window.localStorage && $window.localStorage.clear();
    }


    /**
     * Return object of all values that are stored on localStorage
     *
     * @return {object}    Object with all data stored on localStorage
     */
    function list() {
      return $window.localStorage;
    }

  }


})();
