app.controller(
  "universityCtrl",
  function ($scope, $http, $timeout, $window, $rootScope, $filter) {
    $scope.timeoutPromise = null;
    $rootScope.checkToken();
    const config =$rootScope.config;
    $scope.handleLink = function (pgname) {
      $rootScope.handleLink(pgname);
    };
    $scope.save = function () {
      // let keys = Object.keys($scope.form);
      // // console.log("keys>>>>>>>>", keys);
      // keys.forEach((key) => {
      //   if (typeof $scope.form[key] === "string") {
      //     // Check if the property is a string
      //     $scope.form[key] = $scope.form[key].toUpperCase();
      //   }
      // });
      // console.log(myform.$valid,myform.$invalid)
      if ($scope.myform.$valid) {
        $http
          .post(path + "/api/v1/account/university", $scope.form, config)
          .then(
            function (response) {
              if(response.status==200){
                $scope.form = {};
                toastr.success("Data saved successfully!", "Success");
                $scope.getUniversity();
                $scope.formSubmitted = true;
              }else{
                console.log(response.status);
              }
            },
            function (response) {
              toastr.error("An error occurred while saving data.", "Error");
              console.log(response);
            }
          ).catch(function (error){
            
          })
      } else {
        if (!$scope.timeoutPromise) {
          toastr.error("Please fill in all required fields.", "Error");
          $scope.timeoutPromise = $timeout(function () {
            $scope.timeoutPromise = null;
          }, 3000); // Adjust the timeout value as needed
        }
      }
    };

    //To fetch data from university table
    $scope.getUniversity = function () {
      $http.get(path + "/api/v1/account/university", config).then(
        function (response) {
          if(response.status==200){
            $scope.universityData = response.data;
          }
        },
        function (response) {
          console.log("Error in fetching data from university table",response);
        }
      );
    };
    $scope.getUniversity();

    // To fetch data from location type
    $scope.locationData = [];
    $scope.getLocationData = function () {
      $http.get(path + "/api/v1/account/location", config).then(
        function (response) {
          $scope.locationData = response.data;
        },
        function (response) {
          console.log("Error in fetching location table data  ",response);
        }
      );
    };
    $scope.getLocationData();

    //to fetch the Location description

    $scope.getLocationDscr = function (n, locationCode) {
      var dscr = null;
      for (var i = 0; i < n.length; i++) {
        var row = n[i];

        if (row.locationCode === locationCode) {
          dscr = row.dscr;
          break; // Exit the loop if a match is found
        }
      }
      return dscr;
    };

    //to edit data
    $scope.edit = function (n) {
      console.log(n);
      // $scope.form = n;
      $scope.form = {
        universityCode: n.universityCode,
        universityId: n.universityId,
        locationCode: n.locationCode,
        address: n.address,
        city: n.city,
        country: n.country,
        dscr: n.dscr,
        shortName: n.shortName,
        state: n.state,
        taxRegNo: n.taxRegNo,
        pan: n.pan,
        gstin: n.gstin,
        pinCode: n.pinCode,
      }
    };

    // to update university table data
    $scope.update = function () {
      $scope.flag = false;
      $scope.flag1 = true;
      var data = $scope.form;
      console.log(data.bank_code);
      var sl = data.universityCode;
      var url = "http://localhost:9099/api/v1/account/university" + sl;

      $http.put(url, data, config).then(
        function (response) {
          if(response.status==200){

            $scope.form = {};
            $scope.getUniversity();
          }
        },
        function (response) {
          console.log("Error in updating university table  ");
        }
      );
    };
  }
);
