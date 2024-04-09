
    app.controller('contr', function ($scope, $http, $timeout, $window, $rootScope, $filter, $location) {
      $scope.img = profile;
      $scope.details = [];
      var userDetailsJSON = $window.sessionStorage.getItem('userDetails');
      if (userDetailsJSON) {
        var userDetails = JSON.parse(userDetailsJSON);
        if (userDetails.token != null || userDetails.token != '') {
          $scope.details = angular.copy(userDetails);
        }
      } else {
        $window.location.href = "index.html";
        console.log('User details not found in sessionStorage');
      }
      $scope.logout = function () {
        $window.sessionStorage.removeItem('userDetails');
        $window.location.href = 'index.html';
      };
      $scope.goBack = function () {
        window.history.back();
      }
    });
