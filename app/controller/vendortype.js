app.controller(
  "vendorTypeCtrl",
  function ($scope, $http, $timeout, $window, $rootScope, $filter) {
    $scope.timeoutPromise = null;

    const token = $window.sessionStorage.getItem("token");
    $scope.logout = function () {
      $window.sessionStorage.removeItem("userDetails");
      $window.location.href = "index.html";
    };
    var config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    // To save data to vendor report table
    $scope.save = function () {
      if (!a.includes($scope.myform.vendorTypeCode)) {
        if ($scope.myform.$valid) {
          console.log($scope.form);
          $http.post(path + "/api/v1/account/vendor", $scope.form, config).then(
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
      }else{
        toastr.warning('This Vendor Type Code Already Exsist!');
        $scope.form = {};
      }
    };
    const a = [];
    // To Fetch data from vendor report table
    $scope.getdata = function () {
      $http.get(path + "/api/v1/account/vendor", config).then(
        async function (response) {
          $scope.vendorTypeData = response.data;
          for (let i = 0; i < (await $scope.vendorTypeData?.length); i++) {
            const el = await $scope.vendorTypeData[i];
            a.push(el.semesterSystemCode);
          }
        },
        function (response) {
          console.log("Error  fetching data in vendor table  ");
        }
      );
    };
    $scope.getdata();

    $scope.checkForDuplicate = function(vendorTypeCode) {
      $http.get(path + `/api/v1/account/vendor/${vendorTypeCode}`, config).then(
          function(response) {
              if (response.data.vendorTypeCode == vendorTypeCode) {
                  $scope.duplicateCode = true;
              } else {
              }
            }).catch(function(error) {
              console.log("Error fetching data from Vendor Type code", error);
              $scope.duplicateCode = false;
          })   
        };



    // to edit
    $scope.edit = function (n) {
      var targetOffset = $('.scroll-target').offset().top;         
      $('html, body').animate({
          scrollTop: targetOffset
      }, 100);
      $scope.form = {
        vendorTypeCode: n.vendorTypeCode,
        dscr: n.dscr,
      };
    };
    // to update vendor type table
    $scope.update = function () {
      var data = $scope.form;

      var sl = data.vendorTypeCode;
      var url = "path" + "/api/v1/account/vendor" + sl;
      $http.put(url, data, config).then(
        function (response) {
          $scope.getdata();
          $scope.form = {};
        },
        function (response) {
          console.log("Error  updating data in vendor tabl;e  ");
        }
      );
    };
  }
);
