app.controller(
  "accountMasterCtrl",
  function ($scope, $http, $rootScope, $timeout, $window) {
    // Initialize scope variables
    $scope.terte = 10;
    $scope.flag = false;
    $scope.timeoutPromise = null;
    $scope.glgroupData = [];
    $scope.accMasterData = [];
    $scope.formSubmitted=false;
    $rootScope.checkToken();
    const config = $rootScope.config;
    // Save function
    $scope.save = function () {
      if ($scope.myform.$valid) {
        $http
          .post(path + "/api/v1/account/accreport", $scope.form, config)
          .then(
            function successCallback(response) {
              // Handle success
              toastr.success("Data saved successfully!", "Success");
              $scope.form = {};
              $scope.formSubmitted=true;
              $scope.flag = false;

              $scope.getdata(); 
            },
            function errorCallback(response) {
              // Handle error
              toastr.error("An error occurred while saving data.", "Error");
            }
          );
      } else {
        // Handle form validation error
        toastr.error("Please fill in all required fields.", "Error");
      }
    };

    // Search function
    $scope.search = function (keyword1, keyword2) {
      var requestData = {
        keyword1: keyword1 || "",
        keyword2: keyword2 || "",
      };

      $http.post(path + "/api/v1/account/search", requestData, config).then(
        function successCallback(response) {
          $scope.accMasterData = response.data;
        },
        function errorCallback(error) {
          console.log("Unable to perform request", error);
        }
      );
    };

    // Fetch GL Group data
    $scope.getglGroupData = function () {
      $http.get(path + "/api/v1/account/glgroup", config).then(
        function successCallback(response) {
          $scope.glgroupData = response.data;
          console.log("aaaaaaa", $scope.glgroupData);
        },
        function errorCallback(response) {
          console.log("Unable to perform request");
        }
      );
    };
    $scope.getglGroupData();
//fetch and check by id

$scope.checkForDuplicate = function() {
  $http.get(path + `/api/v1/account/accreport/${$scope.form.accountCode}`, config).then(
      function(response) {
          if (response.data.accountCode === $scope.form.accountCode) {
              $scope.duplicateCode = true;
          } else {
          }
        }).catch(function(error) {
          console.log("Error fetching data from Account master", error);
          $scope.duplicateCode = false;
      })   
};




    // Fetch account master data
    $scope.getdata = function () {
      $http.get(path + "/api/v1/account/accreport", config).then(
        function successCallback(response) {
          $scope.accMasterData = response.data;
        },
        function errorCallback(response) {
          console.log("Unable to perform request");
        }
      );
    };
    $scope.getdata();

    //Fetching GL Group Master data description for GL Group Code
    $scope.glcodeDrsc = function (n, glcode) {
      var dscr = null;
      for (var i = 0; i < n.length; i++) {
        var row = n[i];
        if (row.glGroupCode === glcode) {
          dscr = row.dscr;
          break; // Exit the loop if a match is found
        }
      }
      return dscr;
    };
    // Edit function
    $scope.edit = function (n) {
      var targetOffset = $('.scroll-target').offset().top;         
      $('html, body').animate({
          scrollTop: targetOffset
      }, 100);
      $scope.flag = true;
      $scope.form = n;
    };

    // Update function
    $scope.update = function () {
      var data = $scope.form;
      var sl = data.accountCode;
      var url = path + "/api/v1/account/accreport" + sl;

      $http.put(url, data, config).then(
        function successCallback(response) {
          $scope.form = {};
          $scope.formSubmitted=true;
          $scope.getdata();
        },
        function errorCallback(response) {
          console.log("Unable to update request");
        }
      );
    };
  }
);
