angular
  .module('booktrade')
  .directive('navToolbar', ['$cookies', function($cookies){
    return {
      restrict: 'E',
      templateUrl: 'js/directives/nav-toolbar/nav-toolbar.html',
      link: function (scope, element, attrs) {
        scope.loggedin = false;
        if ($cookies.get('token')) {
          scope.loggedin = true;
        }
        
        scope.logout = function() {
          $cookies.remove('token');
          location.assign("/");
        }
      }
    };
}]);