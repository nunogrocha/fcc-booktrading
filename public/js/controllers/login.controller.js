angular
  .module('booktrade')
  .controller('LoginController', ['LoginService','$http','$localStorage','$location', function(LoginService,$http,$localStorage,$location) {

    var self = this;
     
    function handleRequest(res) {
      var token = res.data ? res.data.token : null;
      if(token) { 
        self.loginError = false;
        $localStorage.JWT = token
        $http.defaults.headers.common['Authorization'] = token;
      } else {
        self.loginError = true;
      }
    }
    
    self.login = function() {
      LoginService.login(self.username, self.password)
        .then(handleRequest, handleRequest)
    }
    
    self.register = function() {
      LoginService.register(self.username, self.password)
        .then(handleRequest, handleRequest)
    }
    
  }]);