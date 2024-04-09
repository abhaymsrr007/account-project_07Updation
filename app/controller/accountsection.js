app.controller(
  "accountsectionCtrl",
  function ($scope, $http, $timeout, $window,$rootScope) {
    $rootScope.checkToken();
    const config = $rootScope.config;

    // To fetch data from location type
    $scope.locationData = [];
    $scope.getlocationData = function () {
      $(".loaderbg").show();
      $http.get(path + "/api/v1/account/location", config).then(
        function (response) {
          $(".loaderbg").hide();
          $scope.locationData = response.data;
          console.log("locationData", $scope.locationData);
        },
        function (response) {
          console.log("Error in fetching location table data  ");
        }
      );
    };
    $scope.getlocationData();
    //Posting data to the caste table
    $scope.save = function () {
      if($scope.myform.$valid) {
        $(".loaderbg").show();
        $http.post(path + "/api/v1/account/accsec", $scope.form, config).then(
          function successCallback(response) {
            if (response.status == 200) {
              $scope.form = {};
              $scope.flag=false;

              $(".loaderbg").hide();
              $scope.getdata();
              $scope.formSubmitted = true;
            }
          }).catch(
          function errorCallback(response) {
            console.log("Error in saving data",response);
          }
        );
      } else {
        alert(
          "Form not submitted. Please fill in all required fields correctly."
        );
      }
    };

    $scope.getlocationDescription = function (n, data) {
      // console.log("dataddddd2", data, n);
      var dscr = null;
      for (var i = 0; i < data.length; i++) {
        var row = data[i];
        // console.log(row, i);
        if (row.locationCode === n.locationCode) {
          dscr = row.dscr;
          break; // Exit the loop if a match is found
        }
      }

      return dscr;
    };

    //Fetching accsec data from the accsec table
    $scope.getdata = function () {
      $http.get(path + "/api/v1/account/accsec", config).then(
        function successCallback(response) {
          $scope.data = response.data;
          console.log("first", response.data);
        },
        function errorCallback(response) {
          console.log("Error fetching accsec table data");
        }
      );
    };
    $scope.getdata();


    $scope.checkForDuplicate = function(sectionCode) {
      $http.get(path + `/api/v1/account/accsec/${sectionCode}`, config).then(
          function(response) {
              if (response.data.sectionCode == sectionCode) {
                  $scope.duplicateCode = true;
              } else {
              }
            }).catch(function(error) {
              console.log("Error fetching data from section Code", error);
              $scope.duplicateCode = false;
          })   
        };
        $scope.flag=false;
    //To edit the form data
    $scope.edit = function (n) {
      var targetOffset = $('.scroll-target').offset().top;         
      $('html, body').animate({
          scrollTop: targetOffset
      }, 100);
      $scope.flag=true;
      $scope.form = {
        sectionCode: n.sectionCode,
        dscr: n.dscr,
        shortName: n.shortName,
        locationCode: n.locationCode,
        city: n.city,
        state: n.state,
        country: n.country,
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

    $scope.goBack = function () {
      window.history.back();
    };
    //To update the accsec table data
    $scope.update = function () {
      var data = $scope.form;
      var sl = data.sectionCode;
      var url = path + "/api/v1/account/accsec" + sl;

      $http.put(url, data, config).then(
        function successCallback(response) {
          $scope.form = {};
          $scope.getdata();
        },
        function errorCallback(response) {
          console.log("Error updating data to the accsec table");
        }
      );
    };
  }
);
