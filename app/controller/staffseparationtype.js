app.controller(
  "staffSepTypeCtrl",
  function ($scope, $http, $timeout, $window, $rootScope, $filter) {
    $scope.form = {};
    $scope.timeoutPromise = null;
    $rootScope.checkToken();
    const config = $rootScope.config;
    //To save data to the staff separation table
    $scope.save = function () {
      if ($scope.myform.$valid) {
        $(".loaderbg").show();
        $http
          .post(path + "/api/v1/account/staff/separation", $scope.form, config)
          .then(
            function (response) {
              if (response.status == 200) {
                $(".loaderbg").hide();
                $scope.form = {};
                $scope.getdata();
                $scope.formSubmitted = true;
                $scope.idDisable = false;
                toastr.success("Data saved successfully!", "Success");
              }
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

    //To fetch data from staff separation table
    $scope.getdata = function () {
      $http.get(path + "/api/v1/account/staff/separation", config).then(
        function (response) {
          if (response.status == 200) {
            $scope.staffSepData = response.data;
          }
        },
        function (response) {
          console.log("Error fetching dta to staff separation table",response);
        }
      );
    };
    $scope.getdata();


    $scope.checkForDuplicate = function(separationTypeCode) {
      $http.get(path + `/api/v1/account/staff/separation/${separationTypeCode}`, config).then(
          function(response) {
              if (response.data.separationTypeCode == separationTypeCode) {
                  $scope.duplicateCode = true;
              } else {
              }
            }).catch(function(error) {
              console.log("Error fetching data from Account Type code", error);
              $scope.duplicateCode = false;
          })   
  };
  
 $scope.idDisable = false;
    //to edit the form
    $scope.edit = function (n) {
      var targetOffset = $('.scroll-target').offset().top;         
      $('html, body').animate({
          scrollTop: targetOffset
      }, 100);
  $scope.idDisable = true;

      $scope.form = {
        separationTypeCode: n.separationTypeCode,
        dscr: n.dscr,
      };
    };
    // to update the staff separation form
    $scope.update = function () {
      var data = $scope.form;
    //   console.log(data.separationTypeCode);
      var sl = data.separationTypeCode;
      var url = path + "/api/v1/account/staff/separation" + sl;
      $http.put(url, data, config).then(
        function (response) {
          if (response.status == 200) {
            $scope.getdata();
            $scope.form = {};
          }
        },
        function (response) {
          console.log("Error updating dta to staff separation table", response);
        }
      );
    };
  }
);
