angular
  .module('booktrade')
  .factory('LoginService', ['$http', function($http) {

    return {
      login : function(username, password) {
        return $http.post('/api/users/authenticate', {
          username: username,
          password: password
        });
      },
      register : function(username, password) {
        return $http.post('/api/users/register', {
          username: username,
          password: password
        });
      }
    }     
}]);