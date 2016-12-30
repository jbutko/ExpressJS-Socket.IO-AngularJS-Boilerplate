;(function() {

  'use strict';

  /**
   * App routes
   */
  angular.module('boilerplate')
    .config(RoutingConfig);

  RoutingConfig.$inject = ['$urlRouterProvider', '$stateProvider'];

  function RoutingConfig($urlRouterProvider, $stateProvider) {

    // for any unmatched url, redirect to /
    $urlRouterProvider.otherwise('/');

    // now set up the states
    $stateProvider

      .state('home', {
        url: '/',
        component: 'home'
      })

      .state('users', {
        url: '/users',
        component: 'userList',
        // role: 'admin' // accessible only for admin roles
      })

      .state('changePassword', {
        url: '/users/change-password',
        component: 'changePassword',
        // role: 'admin' // accessible only for admin roles
      })

      .state('createUser', {
        url: '/users/create',
        component: 'user',
        // role: 'admin' // accessible only for admin roles
      })

      .state('editUser', {
        url: '/users/:userId/edit',
        component: 'user',
        // role: 'admin' // accessible only for admin roles
      })

      .state('displayUser', {
        url: '/users/:userId',
        component: 'user',
        // role: 'admin' // accessible only for admin roles
      });

  }

})();
