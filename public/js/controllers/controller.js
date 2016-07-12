angular
  .module('booktrade')
  .controller('MainController', function(LoginService,$localStorage,$scope,$cookies,$location) {

    var self = this;
    
    // When a login happens, if the localstorage JWT changes, redirect to home page
    $scope.$watch(angular.bind(this, function () {
      return $localStorage.JWT;
    }), function (newVal, oldVal) {
      if(newVal != oldVal){
        $cookies.put('token', newVal);
        console.log("a")
        location.assign("/");
      }
    });
    
});