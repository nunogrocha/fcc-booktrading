angular
  .module('booktrade')
  .directive('editProfileSettings', ['$http','$cookies', function($http,$cookies){
    return {
      restrict: 'E',
      templateUrl: 'js/directives/edit-profile-settings/edit-profile-settings.html',
      link: function (scope, element, attrs) {
        scope.profile = {
          fullName: "",
          city: "",
          state: ""
        };
        
        loadSettings();
        scope.buttonText = 'Submit';
        
        scope.submitForm = function() {
          scope.buttonText = 'Sending...';
          
          $http({
            method: 'POST',
            url: '/api/users/profile',
            headers: {
              'Authorization': $cookies.get('token')
            },
            data: {
              fullName: scope.profile.fullName,
              city: scope.profile.city,
              state: scope.profile.state
            }
          }).then(function successCallback(response) {
            if (!response.data.success) {
              scope.buttonText = 'Error';
            } else {
              scope.buttonText = 'Success!';
            }
          }, function errorCallback(response) {
            scope.buttonText = 'Error';
          });
        }
        
        function loadSettings() {
          $http({
            method: 'GET',
            url: '/api/users/profile',
            headers: {
              'Authorization': $cookies.get('token')
            }
          }).then(function successCallback(response) {
            scope.profile.fullName = typeof response.data.item.fullName !== 'undefined' ? response.data.item.fullName : "";
            scope.profile.city = typeof response.data.item.city !== 'undefined' ? response.data.item.city : "";
            scope.profile.state = typeof response.data.item.state !== 'undefined' ? response.data.item.state : "";
          }, function errorCallback(response) {
            console.log(response)
          });
        }
        
      }
    };
}]);