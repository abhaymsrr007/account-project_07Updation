app.controller(
  "bankContr",
  function ($scope, $http, $timeout, $window, $rootScope, $filter, $location) {
    $scope.timeoutPromise = null;
    const config = $rootScope.config;
    $scope.idDisable = false;

    //Saving data to the bank table
        $scope.save = function () {
      console.log($scope.form);
      if ($scope.myform.$valid) {
        $http.post(path + "/api/v1/account/bank", $scope.form, config).then(
          function successCallback(response) {
            if(response.status==200){
              $scope.form = {};
              $scope.idDisable = false;
              $scope.formSubmitted = true;
              toastr.success("Data saved successfully!", "Success");
              $scope.getdata();
            }
          },
          function errorCallback(response) {
            toastr.error("An error occurred while saving data.", "Error");
            console.error(response);
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

    //Fetching data  from the bank table
    $scope.bankData = [];
    $scope.getdata = function () {
      $http.get(path + "/api/v1/account/bank", config).then(
        function successCallback(response) {
          $scope.bankData = response.data;
        },
        function errorCallback(response) {
          console.log("Fetching of data failed");
        }
      );
    };
    $scope.getdata();

    $scope.checkForDuplicate = function(bankCode) {
      $http.get(path + `/api/v1/account/bank/${bankCode}`, config).then(
          function(response) {
              if (response.data.bankCode == bankCode) {
                  $scope.duplicateCode = true;
              } else {
              }
            }).catch(function(error) {
              console.log("Error fetching data from Bank", error);
              $scope.duplicateCode = false;
          })   
  };

    //To perform edit operation
    $scope.edit = function (n) {
      var targetOffset = $('.scroll-target').offset().top;         
      $('html, body').animate({
          scrollTop: targetOffset
      }, 100);
      $scope.idDisable = true;
      $scope.form = {
        bankCode: n.bankCode,
        dscr: n.dscr,
        shortName: n.shortName,
      };
    };

    // $scope.delete=function(n){
    //   console.log(n);
    //   var data = $scope.form;
    //   var sl=n.accountCode;
    //   console.log(sl);
    //   var url = 'http://127.0.0.1:9099/api/v1/account/deletereport/' + sl;
    //   $http.delete(url);
    //   $window.location.reload();
    // }

    $scope.search = function (keyword1, keyword2) {
      // Create a request object with the keywords in the request body
      var bankDto = {
        bankCode: keyword1 || 0,
        shortName: keyword2 || "",
      };

      console.log(bankDto);
      //Make the HTTP POST request to your API endpoint with the request data in the body
      $http.post(path + "/api/v1/account/bank/search", bankDto, config).then(
        function successCallback(response) {
          $scope.bankData = response.data;
          console.log("$scope.bankData", $scope.bankData);
        },
        function errorCallback(error) {
          console.log("Unable to perform request", error);
        }
      );
    };

    $scope.update = function () {
      var data = $scope.form;

      var sl = data.bankCode;
      var url = path + "/api/v1/account/bank" + sl;

      $http.put(url, data, config).then(
        function successCallback(response) {
          $scope.form = {};
          $scope.getdata();
        },
        function errorCallback(response) {
          console.log("Updating of data failed");
        }
      );
    };
    
  }
);
