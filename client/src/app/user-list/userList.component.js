;(function() {

  'use strict';

  /**
   * Show user list table
   *
   * @usage <user-list users="vm.users"></user-list>
   */

  angular
    .module('boilerplate')
    .component('userList', {
      bindings: {
        users: '<'
      },
      templateUrl: 'app/user-list/user-list.html',
      controllerAs: 'vm',
      controller: UserListCtrl
    });

  UserListCtrl.$inject = ['$log', 'QueryService'];

  function UserListCtrl($log, QueryService) {
    var vm = this;

    vm.$onInit = function() {
      if (!vm.users)
        getUsers();
    };

    /// definitions

    /**
     * Get users
     */
    function getUsers() {
      QueryService
        .query('GET', 'users/', null, null)
        .then(function(user) {
          vm.users = user.data.data;
          $log.debug('users', vm.users);
        })
        .catch(function(err) {
          $log.debug(err);
        });
    }
  }

})();
