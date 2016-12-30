;(function() {

  'use strict';

  angular
    .module('boilerplate')
    .component('user', {
      bindings: {
        userId: '<'
      },
      templateUrl: 'app/user/user.html',
      controllerAs: 'vm',
      controller: UserCtrl
    });

  UserCtrl.$inject = ['$log', '$state', '$stateParams', 'QueryService', 'localStorage', 'utils',
    'ngDialog'];

  function UserCtrl($log, $state, $stateParams, QueryService, localStorage, utils,
      ngDialog) {
    var vm = this;

    // methods
    vm.createUser = createUser;
    vm.editUser = editUser;
    vm.submitUserForm = submitUserForm;

    vm.$onInit = function() {
      var userId = vm.userId || $stateParams.userId;
      var state = $state.current.name;
      vm.currentUser = localStorage.get('user');
      vm.user = vm.user || {};

      setActionType(state, userId);

      if (userId)
        getUser(userId);
    };

    /// definitions

    /**
     * Set action type
     */
    function setActionType(state, userId) {
      if (state == 'editUser')
        vm.actionType = 'editUser';
      else if (!userId && state != 'editUser')
        vm.actionType = 'createUser';
      else
        vm.actionType = 'loadUser';

      return vm.actionType;
    }


    /**
     * Submit form: either create or edit user
     */
    function submitUserForm(user, userId) {
      vm[vm.actionType](user, userId);
    }

    /**
     * Create new user
     * @param  {object} user User form
     * @return {object}      Promise
     */
    function createUser(user) {
      if (!user) return;

      QueryService
        .query('POST', 'users/', null, user)
        .then(function(newUser) {
          vm.newUser = newUser.data.data;
          $log.debug('newUser', vm.newUser);

          var dialog = ngDialog.open({
            template: '\
              <p>New user created</p>\
              <div class="ngdialog-buttons">\
                  <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog(\'ok\')">OK</button>\
              </div>',
            plain: true
          });

          dialog.closePromise.then(function(closedDialog) {
            $state.go('displayUser', { userId: vm.newUser._id });
          });

        })
        .catch(function(err) {
          $log.debug(err);
        });
    }

    /**
     * Update user attributes
     * @param  {object} editUser User form
     * @return {object}            Promise
     */
    function editUser(user, userId) {
      if (!user) return;

      QueryService
        .query('PUT', 'users/' + userId, null, user)
        .then(function(updatedUser) {
          vm.updatedUser = updatedUser.data.data;
          $log.debug('updatedUser', vm.updatedUser);

          ngDialog.open({
            template: '\
              <p>Update successful!</p>\
              <div class=\"ngdialog-buttons\">\
                  <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=\"closeThisDialog()\">OK</button>\
              </div>',
            plain: true
          });

        })
        .catch(function(err) {
          $log.debug(err);
        });
    }

    /**
     * Get user
     * @param  {object} userId User ID
     * @return {object}      Promise
     */
    function getUser(userId) {
      if (!userId) return;

      QueryService
        .query('GET', 'users/' + userId, null, null)
        .then(function(user) {
          vm.user = user.data.data;
          $log.debug('user', vm.user);
        })
        .catch(function(err) {
          $log.debug(err);
        });
    }

  }

})();
