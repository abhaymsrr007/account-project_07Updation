
app.controller('admin_dashboardCtrl', function ($scope, $http, $timeout, $window,
  $rootScope, $filter, $location) {
      $scope.img = profile;
      $scope.details = [];
      var userDetailsJSON = $window.sessionStorage.getItem('userDetails');
      const t = $window.sessionStorage.getItem('tempRole');
      $scope.tempRole = JSON.parse(t);
      // console.log("kkkkkk>>>", userDetailsJSON);
      console.log(">>>>>>sdsd", $scope.tempRole);
      if (userDetailsJSON) {
        var userDetails = JSON.parse(userDetailsJSON);
        if (userDetails.token != null || userDetails.token != '') {
          $scope.details = angular.copy(userDetails);
          console.log($scope.details);
        }
      } else {
        //$window.location.href = "index.html";
        console.log('User details not found in sessionStorage');
      }

      $scope.logout = function () {
        $window.sessionStorage.removeItem('userDetails');
        //$window.location.href = 'index.html';
      };
      $scope.setRole = (role)=> {
        console.log(role);
        window.sessionStorage.setItem('tempRole', JSON.stringify({'role':role}));
      }
      $scope.goBack = function () {
        window.history.back();
      }
    });
