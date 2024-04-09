app.controller(
  "phyHandiCapCtrl",
  function ($scope, $http, $timeout, $window, $rootScope, $filter) {
    $scope.timeoutPromise = null;

    $scope.idDisable = false;
    $rootScope.checkToken();
    const config = $rootScope.config;

    // Persisting data to Physically Handicapped table
    $scope.save = function () {
      if ($scope.myform.$valid) {
        $http
          .post(path + "/api/v1/account/phyhandicapped", $scope.form, config)
          .then(
            function success(response) {
              $scope.form = {};
              $scope.getdata();
              $scope.idDisable = false;
              $scope.formSubmitted = true;
              toastr.success("Data saved successfully!", "Success");
            },
            function error(response) {
              toastr.error("An error occurred while saving data.", "Error");
            }
          );
      } else {
        if (!$scope.timeoutPromise) {
          toastr.error("Please fill in all required fields.", "Error");
          $scope.timeoutPromise = $timeout(function () {
            $scope.timeoutPromise = null;
          }, 3000); // Adjust the timeout value as needed
        }
      }
    };

    //Fetching Data from Physically Handicapped table
    $scope.getdata = function () {
      $http.get(path + "/api/v1/account/phyhandicapped", config).then(
        function success(response) {
          $scope.handicappedData = response.data;
        },
        function (response) {
          console.log("Error in fetching data ");
        }
      );
    };
    $scope.getdata();

    $scope.checkForDuplicate = function(phyHandicappedCode) {
      $http.get(path + `/api/v1/account/phyhandicapped/${phyHandicappedCode}`, config).then(
          function(response) {
              if (response.data.phyHandicappedCode == phyHandicappedCode) {
                  $scope.duplicateCode = true;
              } else {
              }
            }).catch(function(error) {
              console.log("Error fetching data from phyhandicapped code", error);
              $scope.duplicateCode = false;
          })   
  };
    //To edit the form data
    $scope.edit = function (n) {
      var targetOffset = $('.scroll-target').offset().top;         
      $('html, body').animate({
          scrollTop: targetOffset
      }, 100);
      $scope.idDisable = true;
      $scope.form = {
        phyHandicappedCode: n.phyHandicappedCode,
        dscr: n.dscr,
      };
    };

    // $scope.delete=function(n){
    //   console.log(n);
    //   var data = $scope.form;
    //   var sl=n.account_code;
    //   console.log(sl);
    //   var url = 'http://127.0.0.1:9099/api/v1/account/handicapped' + sl;
    //   $http.delete(url);
    //   $window.location.reload();
    // }

    //To update the data to the table
    $scope.update = function () {
      var data = $scope.form;
      var sl = data.phyHandicappedCode;
      var url = path + "/api/v1/account/phyhandicapped" + sl;

      $http.put(url, data, config).then(
        function success(response) {
          $scope.form = {};
          $scope.getdata();
        },
        function (response) {
          console.log("Error in updating Physically handicapped table ");
        }
      );
    };
   
  }
);
