;(function() {

  'use strict';

  /**
   * Change user password component
   */

  angular
    .module('boilerplate')
    .component('changePassword', {
      templateUrl: 'app/change-password/change-password.html',
      controllerAs: 'vm',
      controller: ChangePasswordCtrl
    });

  ChangePasswordCtrl.$inject = ['$rootScope', '$log', 'ngDialog', 'QueryService'];

  function ChangePasswordCtrl($rootScope, $log, ngDialog, QueryService) {
    var vm = this;

    // methods
    vm.changePassword = changePassword;

    /// definitions

    /**
     * Change password
     */
    function changePassword() {
      var params = {
        password: vm.password,
        confirmPassword: vm.confirmPassword
      };

      QueryService
        .query('PUT', 'users/change-password', null, params)
        .then(function(user) {
          var dialog = ngDialog.open({
            template: '\
              <p>Password changed successfully! You will be logged out of system after dialog confirmation.</p>\
              <div class="ngdialog-buttons">\
                  <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog(\'ok\')">OK</button>\
              </div>',
            plain: true
          });

          dialog.closePromise.then(function(closedDialog) {
            $rootScope.$broadcast('user:logout');
          });
        })
        .catch(function(err) {
          $log.debug(err);
        });
    }
  }

})();
