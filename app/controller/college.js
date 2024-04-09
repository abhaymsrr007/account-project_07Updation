app.controller(
  "collegeCtrl",
  function ($scope, $http, $timeout, $window, $rootScope, $filter) {
    $rootScope.checkToken();
    const config = $rootScope.config;
    //Saving college data to the college table
    $scope.save = function () {
      if ($scope.myform.$valid) {
        $http.post(path + "/api/v1/account/college", $scope.form, config).then(
          function successCallback(response) {
            if (response.status == 200) {
              $scope.form = {};
              $scope.getColleges();
              $scope.formSubmitted = true;
              $scope.isDisabledflag = false;
              toastr.success("Data saved successfully!", "Success");
            }
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

    //Fetching college table table
    $scope.getColleges = function () {
      $http.get(path + "/api/v1/account/college", config).then(
        function successCallback(response) {
          $scope.collegeData = response.data;
        },
        function errorCallback(response) {
          console.log("Error fetching colllege data", response);
        }
      );
    };
    $scope.getColleges();

    //Fetching data from university table
    $scope.universityData = [];
    $scope.getUniversities = function () {
      $http.get(path + "/api/v1/account/university", config).then(
        function successCallback(response) {
          if (response.status == 200) {
            $scope.universityData = response.data;
          }
        },
        function errorCallback(response) {
          console.log("Error fetching data from university table", response);
        }
      );
    };
    $scope.getUniversities();

    //Fetching data from location table
    $scope.locationData = [];
    $scope.getlocationData = function () {
      $http
        .get(path + "/api/v1/account/location", config)
        .then(function successCallback(response) {
          if (response.status == 200) {
            $scope.locationData = response.data;
          }
        })
        .catch(function errorCallback(response) {
          console.log("Error fetching data from location table ", response);
        });
    };
    $scope.getlocationData();

    // Getting university description from the university code for user perspective
    $scope.getUniDscr = function (n, universityCode) {
      // console.log("data2", n, universityCode);
      var dscr = null;
      for (var i = 0; i < n.length; i++) {
        var row = n[i];
        // console.log(row, i);
        if (row.universityCode === universityCode) {
          // console.log(row.dscr);
          dscr = row.dscr;
          break; // Exit the loop if a match is found
        }
      }
      return dscr;
    };

    // Getting location description from the university code for user perspective
    $scope.getLocationDscr = function (n, locationCode) {
      // console.log("data2", n, locationCode);
      var dscr = null;
      for (var i = 0; i < n.length; i++) {
        var row = n[i];
        // console.log(row, i);
        if (row.locationCode === locationCode) {
          // console.log(row.dscr);
          dscr = row.dscr;
          break; // Exit the loop if a match is found
        }
      }
      return dscr;
    };
    $scope.checkForDuplicate = function(collegeCode) {
      $http.get(path + `/api/v1/account/college/${collegeCode}`, config).then(
          function(response) {
              if (response.data.collegeCode == collegeCode) {
                  $scope.duplicateCode = true;
              } else {
              }
            }).catch(function(error) {
              console.log("Error fetching data from college Code", error);
              $scope.duplicateCode = false;
          })   
        };
      $scope.isDisabledflag = false;
    // To edit data
    $scope.edit = function (n) {
      var targetOffset = $('.scroll-target').offset().top;         
      $('html, body').animate({
          scrollTop: targetOffset
      }, 100);
      $scope.isDisabledflag = true;
      $scope.form = {
        collegeCode: n.collegeCode,
        universityCode: n.universityCode.toString(),
        collegeId:n.collegeId,
        locationCode: n.locationCode,
        address: n.address,
        city: n.city,
        country: n.country,
        dscr: n.dscr,
        shortName: n.shortName,
        state: n.state,
        pan: n.pan,
        gstin: n.gstin,
        pinCode: n.pinCode,
      };
    };

    // $scope.delete=function(n){
    //   console.log(n);
    //   var data = $scope.form;
    //   var sl=n.account_code;
    //   console.log(sl);
    //   var url = 'http://127.0.0.1:9099/api/v1/account/deletereport/' + sl;
    //   $http.delete(url);
    //   $window.location.reload();
    // }

    //To update
    $scope.update = function () {
      $scope.flag = false;
      $scope.flag1 = true;
      var data = $scope.form;
      console.log(data.bank_code);
      var sl = data.collegeCode;
      var url = path + "/api/v1/account/college" + sl;

      $http.put(url, data, config).then(function (response) {
        $scope.form = {};
        $scope.getdata();
      });
    };
  }
);
