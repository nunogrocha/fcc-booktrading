angular
  .module('booktrade')
  .controller('LoginController', ['LoginService','$localStorage','$location', function(LoginService,$localStorage,$location) {

    var self = this;
    
    function handleRequest(res) {
      var token = res.data ? res.data.token : null;
      if(token) { 
        self.loginError = false;
        $localStorage.JWT = token
      } else {
        self.loginError = true;
      }
    }
    
    self.login = function() {
      LoginService.login(self.username, self.password)
        .then(handleRequest, handleRequest)
    }
  }]);