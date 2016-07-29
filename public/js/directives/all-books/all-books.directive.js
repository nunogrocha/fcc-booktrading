angular
  .module('booktrade')
  .directive('allBooks', ['$http','$cookies', function($http,$cookies){
    return {
      restrict: 'E',
      templateUrl: 'js/directives/all-books/all-books.html',
      link: function (scope, element, attrs) {
        scope.books = JSON.parse(attrs.books);
        
        scope.requestBook = function(book) {
          $http({
            method: 'POST',
            url: '/api/trade/request',
            headers: {
              'Authorization': $cookies.get('token')
            },
            data: {
              ownerId: book._owner,
              bookId: book._id
            }
          }).then(function successCallback(response) {
            if (!response.data.success) {
              console.log(response)
            } else {
              console.log(response)
            }
          }, function errorCallback(response) {
            console.log(response)
          });
        }
        
      }
    };
}]);