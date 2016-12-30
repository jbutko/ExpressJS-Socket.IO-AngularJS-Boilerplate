;(function() {

  'use strict';

  /**
   * Main navigation
   *
   * @example
   * <main-nav><main-nav/>
   *
   */
  angular
    .module('boilerplate')
    .component('mainNav', {
      templateUrl: 'app/main-nav/main-nav.html',
      controllerAs: 'vm',
      controller: MainNavCtrl
    });

    MainNavCtrl.$inject = ['$scope', 'localStorage'];

    /// definition

    function MainNavCtrl($scope, localStorage) {
      var vm = this;
      vm.user = localStorage.get('user');

      /// definitions

      /**
       * Events
       */
      $scope.$on('user:login', function() {
        vm.user = localStorage.get('user');
      });

      $scope.$on('user:logout', function() {
        vm.user = null;
      });
    }

})();
