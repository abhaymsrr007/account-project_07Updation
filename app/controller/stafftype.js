app.controller(
  "stafftypeCtrl",
  function ($scope, $http, $timeout, $window, $rootScope, $filter) {
    $scope.flag = false;
    $scope.form = {};
    $scope.timeoutPromise = null;
    $scope.details = [];
    $rootScope.checkToken();
    const config = $rootScope.config;
    //To save data of staff type table
    $scope.save = function () {
      if ($scope.myform.$valid) {
        $http
          .post(path + "/api/v1/account/type/staff", $scope.form, config)
          .then(
            function (response) {
              if (response.status == 200) {
                $scope.flag = false;
                $scope.form = {};
                $scope.getdata();
                $scope.formSubmitted = true;
                toastr.success("Data saved successfully!", "Success");
              }
            },
            function (response) {
              console.log(response.status);
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
    //To fetch data from staff type table
    $scope.getdata = function () {
      $http.get(path + "/api/v1/account/type/staff", config).then(
        function (response) {
          $scope.staffTypeData = response.data;
        },
        function (response) {
          console.log("Error fetching data of staff type table ");
        }
      );
    };
    $scope.getdata();

    $scope.checkForDuplicate = function(staffTypeCode) {
      $http.get(path + `/api/v1/account/type/staff/${staffTypeCode}`, config).then(
          function(response) {
              if (response.data.staffTypeCode == staffTypeCode) {
                  $scope.duplicateCode = true;
              } else {
              }
            }).catch(function(error) {
              console.log("Error fetching data from staff Type code", error);
              $scope.duplicateCode = false;
          })   
        };

    //To edit  data
    $scope.edit = function (n) {
      var targetOffset = $('.scroll-target').offset().top;         
      $('html, body').animate({
          scrollTop: targetOffset
      }, 100);
      $scope.flag = true;
      $scope.form = {
        staffTypeCode: n.staffTypeCode,
        dscr: n.dscr,
      };
    };
    //To updatedata in  stff tyype table
    $scope.update = function () {
      var data = $scope.form;
      var sl = data.staffTypeCode;
      var url = path + "/api/v1/account/type/staff" + sl;
      $http.put(url, data, config).then(
        function (response) {
          $scope.getdata();
          $scope.form = {};
        },
        function (response) {
          console.log("Error updating data of staff type table ");
        }
      );
    };
  }
);
