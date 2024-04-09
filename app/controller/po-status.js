app.controller(
  "poStatusCtrl",
  function ($scope, $http, $timeout, $rootScope, $window) {
    $scope.timeoutPromise = null;
    const a = $rootScope.checkToken();
    console.log("lklklk", a);
    const config = $rootScope.config;

    // saving data to accounttype table
    $scope.idDisable = false;
    $scope.save = function () {
      if ($scope.myform.$valid) {
        $scope.form.poStatusCode = parseInt($scope.form.poStatusCode);
        $http
          .post(path + "/api/v1/account/po/status", $scope.form, config)
          .then(
            function successCallback(response) {
              $scope.form = {};
              $scope.getdata();
              $scope.idDisable = false;
              $scope.formSubmitted = true;
              toastr.success("Data saved successfully!", "Success");
            },
            function errorCallback(response) {
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

    //To fetch data from account type
    $scope.poStatusData = [];
    $scope.getdata = function () {
      $http.get(path + "/api/v1/account/po/status", config).then(
        function successCallback(response) {
          $scope.poStatusData = response.data;
          console.log("first", $scope.poStatusData);
        },
        function errorCallback(response) {
          console.log("fetching of data failed");
        }
      );
    };
    $scope.getdata();

    $scope.checkForDuplicate = function (poStatusCode) {
      $http
        .get(path + `/api/v1/account/po/status/${poStatusCode}`, config)
        .then(function (response) {
          if (response.data.poStatusCode == poStatusCode) {
            $scope.duplicateCode = true;
          } else {
          }
        })
        .catch(function (error) {
          console.log("Error fetching data from Account Type code", error);
          $scope.duplicateCode = false;
        });
    };

    //To edit the form data and
    $scope.edit = function (n) {
      var targetOffset = $(".scroll-target").offset().top;
      $("html, body").animate(
        {
          scrollTop: targetOffset,
        },
        100
      );
      $scope.idDisable = true;
      $scope.form = {
        poStatusCode: n.poStatusCode,
        dscr: n.dscr,
      };
    };

    // $scope.delete=function(n){
    //   console.log(n);
    //   var data = $scope.form;
    //   var sl=n.poStatusCode;
    //   console.log(sl);
    //   var url = 'http://127.0.0.1:9099/api/v1/account/deletereport/' + sl;
    //   $http.delete(url);
    //   $window.location.reload();
    // }

    $scope.search = function (keyword1, keyword2) {
      // Create a request object with the keywords in the request body
      var AccountTypeDto = {
        poStatusCode: keyword1 || 0,
        dscr: keyword2.toUpperCase() || "",
      };

      console.log(AccountTypeDto);
      //Make the HTTP POST request to your API endpoint with the request data in the body
      $http
        .post(path + "/api/v1/account/search/po/status", AccountTypeDto, config)
        .then(
          function successCallback(response) {
            $scope.poStatusData = response.data;
            console.log("$scope.poStatusData", $scope.poStatusData);
          },
          function errorCallback(error) {
            console.log("Unable to perform request", error);
          }
        );
    };
    $scope.goBack = function () {
      window.history.back();
    };
    //To update the edited data to the accounttype table
    $scope.update = function () {
      var data = $scope.form;
      var sl = data.poStatusCode;
      var url = path + "/api/v1/account/po/status/" + sl;
      $http.put(url, data, config).then(
        function successCallback(response) {
          $scope.form = {};
          $scope.getdata();
        },
        function errorCallback(response) {
          console.log("updating  of data failed");
        }
      );
    };
  }
);
