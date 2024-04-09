app.controller(
  "studentProgramCtrl",
  function ($scope, $http, $timeout, $rootScope) {
    $scope.form = {};
    $scope.flag = false;
    $rootScope.checkToken();
    const config = $rootScope.config;
    $scope.save = function () {
      if ($scope.myform.$valid) {
        $http
          .post(path + "/api/v1/account/studentprogram", $scope.form, config)
          .then(
            function (response) {
              $scope.form = {};
              $scope.getdata();
              $scope.formSubmitted = true;
              toastr.success("Data saved successfully!", "Success");
              $scope.flag = false;

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

    $scope.data = [];
    $scope.getdata = function () {
      $http
        .get(path + "/api/v1/account/studentprogram", config)
        .then(function (response) {
          $scope.data = response.data;
          // console.log("testing", data);
        });
    };
    $scope.getdata();

    $scope.UniData = [];
    $scope.getUniData = function () {
      $http
        .get(path + "/api/v1/account/university", config)
        .then(function (response) {
          $scope.UniData = response.data;
          console.log("University Data", response.data);
        });
    };
    $scope.getUniData();

    $scope.collgData = [];
    $scope.getcollgData = function () {
      $http
        .get(path + "/api/v1/account/college", config)
        .then(function (response) {
          $scope.collgData = response.data;
          console.log("College Data", response.data);
        });
    };
    $scope.getcollgData();

    $scope.dptData = [];
    $scope.getdptData = function () {
      $http.get(path + "/api/v1/account/department",config).then(function (response) {
        $scope.dptData = response.data;
        console.log("Department Data", response.data);
      });
    };
    $scope.getdptData();

    //to fetch the University description from college Table

    $scope.getUniDscr = function (n, universityCode) {
      console.log("University", n, universityCode);
      var dscr = null;
      for (var i = 0; i < n.length; i++) {
        var row = n[i];
        // console.log(row, i);
        if (row.universityCode === universityCode) {
          //    console.log(row.dscr);
          dscr = row.dscr;
          break; // Exit the loop if a match is found
        }
      }
      return dscr;
    };

    $scope.getcllgDscr = function (n, collegeCode) {
      console.log("data2", n, collegeCode);
      var dscr = null;
      for (var i = 0; i < n.length; i++) {
        var row = n[i];
        // console.log(row, i);
        if (row.collegeCode === collegeCode) {
          //  console.log(row.dscr);
          dscr = row.dscr;
          break; // Exit the loop if a match is found
        }
      }
      return dscr;
    };

    $scope.getdptDscr = function (n, departmentCode) {
      console.log("department Data", n, departmentCode);
      var dscr = null;
      for (var i = 0; i < n.length; i++) {
        var row = n[i];
        //console.log(row, i);
        if (row.departmentCode === departmentCode) {
          // console.log(row.dscr);
          dscr = row.dscr;
          break; // Exit the loop if a match is found
        }
      }
      return dscr;
    };
    $scope.search = function (keyword) {
      var sl = keyword;
      //Make the HTTP POST request to your API endpoint with the request data in the body
      $http.get(path + "/api/v1/account/studentprogram/search/" + sl,config).then(
        function successCallback(response) {
          $scope.data = response.data;
          console.log("$scope.data<<<<<<<<<<<<<<<<<<<", $scope.data);
        },
        function errorCallback(error) {
          console.log("Unable to perform request", error);
        }
      );
    };


    $scope.checkForDuplicate = function(studentProgramCode) {
      $http.get(path + `/api/v1/account/studentprogram/${studentProgramCode}`, config).then(
          function(response) {
              if (response.data.studentProgramCode == studentProgramCode) {
                  $scope.duplicateCode = true;
              } else {
              }
            }).catch(function(error) {
              console.log("Error fetching data from student Program Code", error);
              $scope.duplicateCode = false;
          })   
        };
        $scope.flag = false;
    $scope.edit = function (n) {
      var targetOffset = $('.scroll-target').offset().top;         
      $('html, body').animate({
          scrollTop: targetOffset
      }, 100);
      $scope.flag = true;
      console.log(n);
      $scope.form = {
        studentProgramCode: n.studentProgramCode,
        dscr: n.dscr,
        departmentCode: n.departmentCode.toString(),
        collegeCode: n.collegeCode.toString(),
        universityCode: n.universityCode.toString(),
      };
    };
    $scope.goBack = function () {
      window.history.back();
    };
    $scope.update = function () {
      var data = $scope.form;
      console.log(data.studentProgramCode);
      var sl = data.studentProgramCode;
      var url = path + "/api/v1/account/studentprogram" + sl;

      $http.put(url, data, config).then(function (response) {
        $scope.form = {};
        $scope.getdata();
      });
    };
  }
);
