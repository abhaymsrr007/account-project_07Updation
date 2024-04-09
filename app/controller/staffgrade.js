app.controller(
  "staffgradeCtrl",
  function ($scope, $http, $timeout, $window, $rootScope, $filter) {
    $scope.flag = false;
    $scope.form = {};
    $rootScope.checkToken();
    const config = $rootScope.config;
    // Persisting data to staff grade table
    $scope.save = function () {
      if ($scope.myform.$valid) {
        $http
          .post(path + "/api/v1/account/staff/grade", $scope.form, config)
          .then(
            function (response) {
              $scope.flag = false;
              $scope.form = {};
              $scope.getdata();
              $scope.formSubmitted = true;
              toastr.success("Data saved successfully!", "Success");
            },
            function (response) {
              toastr.error("An error occurred while saving data.", "Error");
              console.log(response);
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

    //fetching data from staff grade
    $scope.getdata = function () {
      $http.get(path + "/api/v1/account/staff/grade", config).then(
        function (response) {
          $scope.staffGradeData = response.data;
        },
        function (response) {
          console.log("Error in persisting data ");
        }
      );
    };
    $scope.getdata();


      $scope.checkForDuplicate = function(gradeCode) {
        $http.get(path + `/api/v1/account/staff/grade/${gradeCode}`, config).then(
            function(response) {
                if (response.data.gradeCode == gradeCode) {
                    $scope.duplicateCode = true;
                } else {
                }
              }).catch(function(error) {
                console.log("Error fetching data from Staff Grade code", error);
                $scope.duplicateCode = false;
            })   
      };

    //fetching data from staff type
    $scope.data2 = [];
    $scope.getdata2 = function () {
      $http.get(path + "/api/v1/account/type/staff", config).then(
        function successCallback(response) {
          $scope.staffTypeData = response.data;
        },
        function errorCallback(response) {
          console.log("Error fetching data from staff type");
        }
      );
    };
    $scope.getdata2();

    $scope.edit = function (n) {
      var targetOffset = $('.scroll-target').offset().top;         
    $('html, body').animate({
        scrollTop: targetOffset
    }, 100);
      $scope.flag = true;
      $scope.form = {
        gradeCode: n.gradeCode,
        staffTypeCode: n.staffTypeCode,
        dscr: n.dscr,
      };
    };

    // updating data to data to database
    $scope.update = function () {
      var data = $scope.form;

      var sl = data.gradeCode;
      var url = path + "/api/v1/account/staff/grade" + sl;
      $http.put(url, data, config).then(
        function (response) {
          $scope.getdata();
          $scope.form = {};
          $scope.flag = true;
        },
        function errorCallback(response) {
          console.log("Error updating data to staff grade ");
        }
      );
    };
  }
);
