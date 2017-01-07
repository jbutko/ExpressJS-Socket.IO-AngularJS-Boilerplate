;(function() {

  /**
   * Definition of the main app module and its dependencies
   */
  angular
    .module('boilerplate', [
      'ui.router',
      'ngDialog',
      'btford.socket-io',
      'angularUtils.directives.dirPagination',
    ])
    .config(config);

  config.$inject = ['$locationProvider', '$httpProvider', '$logProvider'];

  /**
   * App config
   */
  function config($locationProvider, $httpProvider, $logProvider) {

    // $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push('authInterceptor');

    // you can turn off logging globaly here (for production)
    // $logProvider.debugEnabled(false);
    $logProvider.debugEnabled(true);

  }

  /**
   * Run block
   */
  angular
    .module('boilerplate')
    .run(run);

  run.$inject = ['$transitions', '$location', '$state', '$rootScope', 'localStorage'];

  function run($transitions, $location, $state, $rootScope, localStorage) {
    // this runs on every route change
    $transitions.onStart({}, function(trans) {
      trans.promise.then(function(state) {

        // route authorization can be handled here (admin routes etc.)
        // you should have `role` attribute in routes you want to restrict in `app.routes.js`
        // var user = localStorage.get('user');
        // var isAuthorized = state.role && state.role.indexOf(user.role) > -1;
        // if (state.role && !isAuthorized)
        //   return $state.go('home');
      });
    });

    $rootScope.$on('user:logout', function() {
      logoutUser();
    });

    function logoutUser() {
      $state.go('home');
      localStorage.remove('user');
    }

  }

})();
