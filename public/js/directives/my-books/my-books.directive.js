angular
  .module('booktrade')
  .directive('myBooks', ['$http','$cookies','jwtHelper', function($http,$cookies,jwtHelper){
    return {
      restrict: 'E',
      templateUrl: 'js/directives/my-books/my-books.html',
      link: function (scope, element, attrs) {
        scope.books = [];
        scope.loadComplete = false;
        scope.showMyTradingRequests = false;
        scope.showInboundTradingRequests = false;
        scope.myTradingRequests = [];
        scope.inboundTradingRequests = [];
        loadMyBooks();
        loadMyTrades();
        
        scope.book = {
          title: 'No Book',
          img: 'https://nnp.wustl.edu/img/bookCovers/genericBookCover.jpg'
        };
        
        scope.toggleMyTradingRequests = function() {
          scope.showMyTradingRequests = !scope.showMyTradingRequests;
        }
        
        scope.toggleInboundTradingRequests = function() {
          scope.showInboundTradingRequests = !scope.showInboundTradingRequests;
        }
        
        scope.removeTrade = function(book, index) {
          $http({
            method: 'POST',
            url: '/api/trade/remove',
            headers: {
              'Authorization': $cookies.get('token')
            },
            data: {
              trade: book
            }
          }).then(function successCallback(response) {
            if (!response.data.success) {
              console.log(response)
            } else {
              console.log(response)
              scope.myTradingRequests.splice(index, 1);
            }
          }, function errorCallback(response) {
            console.log(response)
          });
        }
        
        scope.aproveTrade = function(book, index) {
          $http({
            method: 'POST',
            url: '/api/trade/aprove',
            headers: {
              'Authorization': $cookies.get('token')
            },
            data: {
              trade: book
            }
          }).then(function successCallback(response) {
            if (!response.data.success) {
              console.log(response)
            } else {
              console.log(response)
              loadMyBooks();
              scope.inboundTradingRequests.splice(index, 1);
            }
          }, function errorCallback(response) {
            console.log(response)
          });
        }
        
        scope.removeBook = function(bookId) {
          $http({
            method: 'DELETE',
            url: '/api/books/user/' + bookId,
            headers: {
              'Authorization': $cookies.get('token')
            },
            params: {
              bookId: bookId
            }
          }).then(function successCallback(response) {
            if (!response.data.success) {
              console.log(response)
            } else {
              loadMyBooks();
            }
          }, function errorCallback(response) {
            console.log(response)
          });
        }
        
        scope.submitSearch = function() {
          scope.loadComplete = false;
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
              scope.loadComplete = true;
            } else {
              console.log(response)
              scope.book.title = response.data.item.title;
              scope.book.img = response.data.item.cover;
              loadMyBooks();
              scope.loadComplete = true;
            }
          }, function errorCallback(response) {
          });
        }
        
        function loadMyBooks() {
          $http({
            method: 'GET',
            url: '/api/books/user',
            headers: {
              'Authorization': $cookies.get('token')
            }
          }).then(function successCallback(response) {
            if (!response.data.success) {
              scope.buttonText = 'Error';
            } else {
              scope.buttonText = 'Success!';
              console.log(response)
              scope.books = response.data.books;
              scope.loadComplete = true;
            }
          }, function errorCallback(response) {
            scope.buttonText = 'Error';
          });
        }
        
        function loadMyTrades() {
          $http({
            method: 'GET',
            url: '/api/users/requests',
            headers: {
              'Authorization': $cookies.get('token')
            }
          }).then(function successCallback(response) {
            if (!response.data.success) {
              console.log(response)
            } else {
              console.log(response)
              let _id = jwtHelper.decodeToken($cookies.get('token'))._doc._id;
              
              for (var i = 0; i < response.data.item.length; i++) {
                if (!response.data.item[i].approved) {
                  if (response.data.item[i]._owner == _id) {
                    scope.inboundTradingRequests.push(response.data.item[i]);
                  } else {
                    scope.myTradingRequests.push(response.data.item[i]);
                  }
                }
              }
              
            }
          }, function errorCallback(response) {
            console.log(response)
          });
        }
        
      }
    };
}]);