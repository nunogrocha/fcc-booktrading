angular
  .module('booktrade')
  .factory('LoginService', ['$http', function($http) {

    return {
      login : function(username, password) {
        return $http.post('/api/authenticate', {
          username: username,
          password: password
        });
      },
      register : function(username, password) {
        return $http.post('/api/register', {
          username: username,
          password: password
        });
      }
    }     
}]);