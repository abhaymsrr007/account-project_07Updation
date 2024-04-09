app.controller(
  "departmentCtrl",
  function ($scope, $http, $timeout, $window, $rootScope, $filter) {
    
    $rootScope.checkToken();
    $scope.details = $rootScope.details;
    const config = $rootScope.config;
    $scope.formSubmitted = false;
  
    // selecting university automatically based upon college selection
    $scope.fetchingUniversity = function (clgdata, clgcode, uniData) {
      var uniCode = null;
      for (var i = 0; i < clgdata.length; i++) {
        var row = clgdata[i];
        if (row.collegeCode == clgcode) {
          uniCode = row.universityCode;
          break; // Exit the loop if a match is found
        }
      }

      for (var i = 0; i < uniData.length; i++) {
        var row = uniData[i];

        if (row.universityCode == uniCode) {
          $scope.universityCode = row.universityCode;
          $scope.form.universityCode = row.dscr;

          break; // Exit the loop if a match is found
        }
      }
    };

    // To persist data to college department table

    $scope.save = function () {
      $scope.form.universityCode = $scope.universityCode;
      if ($scope.myform.$valid) {
        // $scope.form = ConvertToUpperCase($scope.form);

        $http
          .post(path + "/api/v1/account/department", $scope.form, config)
          .then(
            function successCallback(response) {
              $scope.form = {};
              $scope.getdata();
              $scope.formSubmitted = true;
              toastr.success("Data saved successfully!", "Success");
              $scope.flag=false;

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
    $scope.checkForDuplicate = function(departmentCode) {
      $http.get(path + `/api/v1/account/department/${departmentCode}`, config).then(
          function(response) {
              if (response.data.departmentCode == departmentCode) {
                  $scope.duplicateCode = true;
              } else {
              }
            }).catch(function(error) {
              console.log("Error fetching data from department Code", error);
              $scope.duplicateCode = false;
          })   
        };
        $scope.flag=false;

    $scope.edit = function (unidata, n, unicode) {
      var targetOffset = $('.scroll-target').offset().top;         
      $('html, body').animate({
          scrollTop: targetOffset
      }, 100);
      $scope.flag=true;
      for (var i = 0; i < unidata.length; i++) {
        var row = unidata[i];
        if (row.universityCode == n.universityCode) {
          $scope.description = row.dscr;
          $scope.universityCode = row.universityCode;
          break; 
        }
      }

      $scope.form = {
        departmentCode: n.departmentCode,
        universityCode: $scope.universityCode + "-" + $scope.description,
        collegeCode: n.collegeCode.toString(),
        locationCode: n.locationCode,
        address: n.address,
        city: n.city,
        pincode: n.pincode,
        country: n.country,
        dscr: n.dscr,
        shortName: n.shortName,
        state: n.state,
      };

      // $scope.form = n;
      // $scope.form.universityCode = n.universityCode.toString();
    };

    // Fetch data from the collgeDepartment table
    $scope.getdata = function () {
      $http.get(path + "/api/v1/account/department", config).then(
        function successCallback(response) {
          $scope.departmentData = response.data;
        },
        function errorCallback(resopnse) {
          console.log("Error Fetching department data ");
        }
      );
    };
    $scope.getdata();

    // Fetching data from the table
    $scope.collegeData = [];
    $scope.getdata2 = function () {
      $http.get(path + "/api/v1/account/college", config).then(
        function successCallback(response) {
          $scope.collegeData = response.data;
        },
        function errorCallback(resopnse) {
          console.log("Error Fetching College  data ");
        }
      );
    };
    $scope.getdata2();

    $scope.getLocationDscr = function (n, locationCode) {
      var dscr = null;
      for (var i = 0; i < n.length; i++) {
        var row = n[i];
        console.log(row, i);
        if (row.locationCode === locationCode) {
          dscr = row.dscr;
          break; // Exit the loop if a match is found
        }
      }
      return dscr;
    };

    //to fetch the college description from College Table

    $scope.getcllgDscr = function (n, collegeCode) {
      // console.log("data4", n, collegeCode);
      var dscr = null;
      for (var i = 0; i < n.length; i++) {
        var row = n[i];
        // console.log(row, i);
        if (row.collegeCode === collegeCode) {
          // console.log(row.dscr);
          dscr = row.dscr;
          break; // Exit the loop if a match is found
        }
      }
      return dscr;
    };

    //to fetch the University description from college Table

    $scope.getUniDscr = function (uniData, universityCode) {
      // console.log("University", n, universityCode);
      var dscr = null;
      for (var i = 0; i < uniData.length; i++) {
        var row = uniData[i];
        // console.log(row, i);
        if (row.universityCode === universityCode) {
          // console.log(row.dscr);
          dscr = row.dscr;
          break; // Exit the loop if a match is found
        }
      }
      return dscr;
    };

    // Fetching data from the location table
    $scope.locationData = [];
    $scope.getdata3 = function () {
      $http.get(path + "/api/v1/account/location", config).then(
        function successCallback(response) {
          $scope.locationData = response.data;
        },
        function errorCallback(resopnse) {
          console.log("Error Fetching location  data ");
        }
      );
    };
    $scope.getdata3();
    // Fetching data from the University table
    $scope.uniData = [];
    $scope.getuniData = function () {
      $http.get(path + "/api/v1/account/university", config).then(
        function successCallback(response) {
          $scope.uniData = response.data;
          // console.log("rajat", $scope.uniData)
        },
        function errorCallback(resopnse) {
          console.log("Error Fetching University  data ");
        }
      );
    };
    $scope.getuniData();

    //To edit the form data

    // $scope.delete=function(n){
    //   console.log(n);
    //   var data = $scope.form;
    //   var sl=n.account_code;
    //   console.log(sl);
    //   var url = 'http://127.0.0.1:9099/api/v1/account/deletereport/' + sl;
    //   $http.delete(url);
    //   $window.location.reload();
    // }
    $scope.goBack = function () {
      window.history.back();
    };
    // to update the edited data
    $scope.update = function () {
      var data = $scope.form;

      var sl = data.departmentCode;
      var url = path + "/api/v1/account/updateuniversity" + sl;

      $http.put(url, data, config).then(
        function successCallback(response) {
          $scope.form = {};
          $scope.getdata();
        },
        function errorCallback(resopnse) {
          console.log("Error updating the data");
        }
      );
    };
  }
);
