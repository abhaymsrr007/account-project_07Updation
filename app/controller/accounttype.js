app.controller("accounttypeCtrl", function ($scope, $http, $timeout,$rootScope, $window) {
  $scope.timeoutPromise = null;
  // const token = $window.sessionStorage.getItem("token");
  // $scope.logout = function () {
  //   $window.sessionStorage.removeItem("token");
  //   $window.location.href = "index.html";
  // };

  // var config = {
  //   headers: {
  //     Authorization: "Bearer " + token,
  //   },
  // };
  const a =$rootScope.checkToken();
  console.log("lklklk",a)
  const config = $rootScope.config;

  // saving data to accounttype table
  $scope.idDisable = false;
  $scope.save = function () {
    if ($scope.myform.$valid) {
      $scope.form.dscr = $scope.form.dscr.toUpperCase();
      $http.post(path + "/api/v1/account/acctype", $scope.form, config).then(
        function successCallback(response) {
          $scope.form = {};
          $scope.getdata();
          $scope.idDisable = false;
          $scope.formSubmitted = true;
          toastr.success("Data saved successfully!", "Success");
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

  //To fetch data from account type
  $scope.accounttypeData = [];
  $scope.getdata = function () {
    $http.get(path + "/api/v1/account/acctype", config).then(
      function successCallback(response) {
        $scope.accounttypeData = response.data;
        console.log("first", $scope.accounttypeData);
      },
      function errorCallback(response) {
        console.log("fetching of data failed");
      }
    );
  };
  $scope.getdata();


  $scope.checkForDuplicate = function(accountTypeCode) {
    $http.get(path + `/api/v1/account/acctype/${accountTypeCode}`, config).then(
        function(response) {
            if (response.data.accountTypeCode == accountTypeCode) {
                $scope.duplicateCode = true;
            } else {
            }
          }).catch(function(error) {
            console.log("Error fetching data from Account Type code", error);
            $scope.duplicateCode = false;
        })   
};

  //To edit the form data and
  $scope.edit = function (n) {
    var targetOffset = $('.scroll-target').offset().top;         
    $('html, body').animate({
        scrollTop: targetOffset
    }, 100);
    $scope.idDisable = true;
    $scope.form = {
      accountTypeCode: n.accountTypeCode,
      dscr: n.dscr,
    };
  };

  // $scope.delete=function(n){
  //   console.log(n);
  //   var data = $scope.form;
  //   var sl=n.accountTypeCode;
  //   console.log(sl);
  //   var url = 'http://127.0.0.1:9099/api/v1/account/deletereport/' + sl;
  //   $http.delete(url);
  //   $window.location.reload();
  // }

  $scope.search = function (keyword1, keyword2) {
    // Create a request object with the keywords in the request body
    var AccountTypeDto = {
      accountTypeCode: keyword1 || 0,
      dscr: keyword2.toUpperCase() || "",
    };

    console.log(AccountTypeDto);
    //Make the HTTP POST request to your API endpoint with the request data in the body
    $http
      .post(path + "/api/v1/account/search/acctype", AccountTypeDto, config)
      .then(
        function successCallback(response) {
          $scope.accounttypeData = response.data;
          console.log("$scope.accounttypeData", $scope.accounttypeData);
        },
        function errorCallback(error) {
          console.log("Unable to perform request", error);
        }
      );
  };
  $scope.goBack = function () {
    window.history.back();
  };
  //To update the edited data to the accounttype table
  $scope.update = function () {
    var data = $scope.form;
    var sl = data.accountTypeCode;
    var url = path + "/api/v1/account/updateacc/" + sl;
    $http.put(url, data, config).then(
      function successCallback(response) {
        $scope.form = {};
        $scope.getdata();
      },
      function errorCallback(response) {
        console.log("updating  of data failed");
      }
    );
  };
});
