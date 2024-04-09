app.controller('plancostcentresCtrl', function ($scope, $http, $timeout, $window, $rootScope, $filter) {
      $scope.details=[];
        var token;
        const userDetailsJSON = $window.sessionStorage.getItem('userDetails');
        if (userDetailsJSON) {
          const userDetails = JSON.parse(userDetailsJSON);
          if (userDetails.token!=null || userDetails.token!=''){
            $scope.details=angular.copy(userDetails);
            token=$scope.details.token;
          }
        } else {
          $window.location.href = "index.html";
          console.log('User details not found in sessionStorage');
        }
        $scope.logout = function() {
          $window.sessionStorage.removeItem('userDetails');
          $window.location.href = 'index.html';
        }; 

            var config = {
              headers: {
              'Authorization': 'Bearer ' + token
                },   
              };

      $scope.save = function () {
        if ($scope.myform.$valid) {
          // To persist data in plan_cost_centres table
          $http.post(path+"/api/v1/account/cost", $scope.form,config)
            .then(function success(response) {

              $scope.form = {};
              $scope.getdata();
              $scope.formSubmitted = true;
              toastr.success('Data saved successfully!', 'Success');
            }, function (response) {
              toastr.error('An error occurred while saving data.', 'Error');
            });
        } else {
          if (!$scope.timeoutPromise) {
            toastr.error('Please fill in all required fields.', 'Error');
            $scope.timeoutPromise = $timeout(function () {
              $scope.timeoutPromise = null;
            }, 3000); // Adjust the timeout value as needed
          }
        }
      }

      //Fetching data api 
      $scope.data = [];
      $scope.getdata = function () {
        $http.get(path+"/api/v1/account/cost",config)
          .then(function success(response) {
            $scope.data = response.data;
            console.log($scope.data, "lllllllll")

          }, function (response) {
            console.log("Error in fetching data ")
          });
      }
      $scope.getdata();


      // To edit the form data
      $scope.edit = function (n) {

        $scope.form = {

          dscr: n.dscr,
          costCentreCode: n.costCentreCode

        }

      };
      // to update the form data 
      $scope.update = function () {

        var data = $scope.form;

        var sl = data.costCentreCode;
        var url = path+'/api/v1/account/cost' + sl;


        $http.put(url, data,config)
          .then(function success(response) {

            $scope.form = {};

          }, function (response) {
            console.log("Error in updating data ")
          });
      }
      $scope.goBack = function () {
        window.history.back();
      }
    })