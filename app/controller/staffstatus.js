app.controller(
  "staffStatusCtrl",
  function ($scope, $http, $timeout, $window, $rootScope, $filter) {
    $scope.form = {};
    $scope.timeoutPromise = null;
    $scope.details = [];
    const token = $window.sessionStorage.getItem("token");
    $scope.logout = function () {
      $window.sessionStorage.removeItem("userDetails");
      $window.location.href = "index.html";
    };

    var config = {
      headers: {
        Authorization: "Bearer " + token,
      }
    };
    $scope.idDisable = true;
    $scope.save = function () {
      if ($scope.myform.$valid) {
        $http
          .post(path + "/api/v1/account/staff/status", $scope.form, config)
          .then(
            function (response) {
              $scope.form = {};
              $scope.getdata();
              $scope.formSubmitted = true;
              toastr.success("Data saved successfully!", "Success");
            },
            function (response) {
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

    //To fetch  data to the staff staus table
    $scope.getdata = function () {
      $http.get(path + "/api/v1/account/staff/status", config).then(
        function (response) {
          $scope.staffStatusData = response.data;
        },
        function (response) {
          console.log("Error fetchinf dta to staff status table");
        }
      );
    };
    $scope.getdata();

    $scope.checkForDuplicate = function(staffStatusCode) {
      $http.get(path + `/api/v1/account/staff/status/${staffStatusCode}`, config).then(
          function(response) {
              if (response.data.staffStatusCode == staffStatusCode) {
                  $scope.duplicateCode = true;
              } else {
              }
            }).catch(function(error) {
              console.log("Error fetching data from Account Type code", error);
              $scope.duplicateCode = false;
          })   
        };
    //to edit the data
    $scope.idDisable = true;

    $scope.edit = function (n) {
      var targetOffset = $('.scroll-target').offset().top;         
      $('html, body').animate({
          scrollTop: targetOffset
      }, 100);
      $scope.idDisable = true;
      $scope.form = {
        staffStatusCode: n.staffStatusCode,
        dscr: n.dscr,
      };
    };

    // to update the data to the staff status  table
    $scope.update = function () {
      var data = $scope.form;
      console.log(data.staffStatusCode);
      var sl = data.staffStatusCode;
      var url = path + "/api/v1/account/staff/status" + sl;
      $http.put(url, data, config).then(
        function (response) {
          $scope.getdata();
          $scope.form = {};
        },
        function (response) {
          console.log("Error updating dta to staff status table");
        }
      );
    };
  }
);
