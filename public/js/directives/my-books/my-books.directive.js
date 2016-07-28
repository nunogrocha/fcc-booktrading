angular
  .module('booktrade')
  .directive('myBooks', ['$http','$cookies', function($http,$cookies){
    return {
      restrict: 'E',
      templateUrl: 'js/directives/my-books/my-books.html',
      link: function (scope, element, attrs) {
        scope.books = JSON.parse(attrs.books);
        console.log(scope.books)
        
        scope.book = {
          title: 'No Book',
          img: 'https://nnp.wustl.edu/img/bookCovers/genericBookCover.jpg'
        };
        
        scope.profile = {
          outstanding: 0,
          unapproved: 0
        }
        
        scope.submitSearch = function() {
          $http({
            method: 'GET',
            url: '/api/books/search/' + scope.searchTitle,
            headers: {
              'Authorization': $cookies.get('token')
            },
            params: {
              name: scope.searchTitle
            }
          }).then(function successCallback(response) {
            if (!response.data.success) {
              scope.buttonText = 'Error';
            } else {
              scope.buttonText = 'Success!';
              console.log(response)
              scope.book.title = response.data.item.title;
              scope.book.img = response.data.item.cover;
            }
          }, function errorCallback(response) {
            scope.buttonText = 'Error';
          });
        }
        
      }
    };
}]);