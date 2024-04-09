app.controller(
  "transacTypeCtrl",
  function ($scope,$http,$window) {
    const token = $window.sessionStorage.getItem("token");
    $scope.logout = function () {
      $window.sessionStorage.removeItem("userDetails");
      $window.location.href = "index.html";
    };
    var config = {
      headers: {
        Authorization: "Bearer " + token,
      }
    };
    $scope.txTypeData = [];
    $scope.save = function () {
      // saving data to accountmaster table
      $http.post(path + "/api/v1/account/txtype", $scope.form,config).then(
        function successCallback(response) {
          console.log(response.data, "done");
          const excludedField = ["operative"];
          const values = {};
          for (let key in $scope.form) {
            if (excludedField.includes(key)) {
              values[key] = $scope.form[key];
            }
          }
          $scope.form = values;
          $scope.formSubmitted = true;
          $scope.getdata();
        },
        function errorCallback(response) {
          console.log("saving of data failed");
        }
      );
    };
    $scope.getdata = function () {
      // keyword = keyword.toLowerCase();
      $http.get(`${path}/api/v1/account/txtype`,config).then(
        function successCallback(response) {
          $scope.txTypeData = response.data;
          console.log("$scope.txTypeData", $scope.txTypeData);
        },
        function errorCallback(err) {
          console.log(err, "Unable to perform  request");
        }
      );
    };
    $scope.getdata();
    //To edit the data and bind to the form
    $scope.edit = function (n) {
      console.log("edit", n);
      $scope.flag = true;
      $scope.form = n;
    };
    $scope.goBack = function () {
      window.history.back();
    };
    // to update the form data
    $scope.update = function () {
      var data = $scope.form;
      console.log(data.accountCode);
      var sl = data.accountCode;
      var url = "http://localhost:9099/api/v1/account/accreport" + sl;
      $http.put(url, data,config).then(
        function successCallback(response) {
          $scope.form = {};
        },
        function errorCallback(response) {
          console.log("Unable to update  request");
        }
      );
    };
  }
);
