app.controller(
  "genLedCntrl",
  function ($scope, $http, $timeout, $window, $rootScope, $filter, $location) {
    $scope.timeoutPromise = null;
    const config = $rootScope.config;
    //Saving data to the bank table
    $scope.form = {};
    // $scope.form.universityCode = 5;
    $scope.post = function (monthYear) {
      var monthyear = monthYear.toString().split("-");
      const url =
        "http://192.168.88.169:9099/api/v1/general-ledger/?year=" +
        monthyear[0] +
        "&month=" +
        monthyear[1];
      // console.log(url);
      // console.log("http://192.168.88.169:9099/api/v1/general-ledger/?year=2024&month=02")
      if ($scope.myform.$valid) {
        $http
          .post(url, config)
          .then(function successCallback(response) {
            if (response.status === 200 || 201) {
              $scope.form = {};
              $scope.formSubmitted = true;
              toastr.success("Generated successfully!", "Success");
              // $scope.getdata();
    $scope.getGenData();

            }
            console.log("object", response);
          })
          // .catch(function errorCallback(response) {
          //   toastr.error("An error occurred while saving data.", "Error");
          //   console.error(response);
          // });
      } else {
        if (!$scope.timeoutPromise) {
          toastr.error("Please fill in all required fields.", "Error");
          $scope.timeoutPromise = $timeout(function () {
            $scope.timeoutPromise = null;
          }, 3000); // Adjust the timeout value as needed
        }
      }
    };

    $scope.getAcMasterData = function () {
      $http.get(path + "/api/v1/account/accreport", config).then(
        function successCallback(response) {
          $scope.accMasterData = response.data;
        },
        function errorCallback(response) {
          console.log("Unable to perform request");
        }
      );
    };
    $scope.getAcMasterData();

    $scope.getGenData = function () {
      $http
        .get("http://192.168.88.169:9099/api/v1/general-ledger/page", config)
        .then(
          function successCallback(response) {
            if (response.status == 200) {
              $scope.subLedData = response.data.data.content;
              console.log($scope.subLedData);
            }
          },
          function errorCallback(response) {
            console.log("Unable to perform request", response);
          }
        );
    };
    // $scope.getGenData();
    //To perform edit operation
    $scope.edit = function (n) {
      console.log();
      $scope.form = {
        bankCode: n.bankCode,
        dscr: n.dscr,
        shortName: n.shortName,
      };
    };

    // $scope.delete=function(n){
    //   console.log(n);
    //   var data = $scope.form;
    //   var sl=n.accountCode;
    //   console.log(sl);
    //   var url = 'http://127.0.0.1:9099/api/v1/account/deletereport/' + sl;
    //   $http.delete(url);
    //   $window.location.reload();
    // }

    $scope.search = function (keyword1, keyword2) {
      // Create a request object with the keywords in the request body
      var bankDto = {
        bankCode: keyword1 || 0,
        shortName: keyword2 || "",
      };

      console.log(bankDto);
      //Make the HTTP POST request to your API endpoint with the request data in the body
      $http.post(path + "/api/v1/account/bank/search", bankDto, config).then(
        function successCallback(response) {
          $scope.bankData = response.data;
          console.log("$scope.bankData", $scope.bankData);
        },
        function errorCallback(error) {
          console.log("Unable to perform request", error);
        }
      );
    };

    $scope.exportTableToExcel = function () {
      const table = document.querySelector(".table-striped");
      if (table) {
        const ws = XLSX.utils.table_to_sheet(table);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "general-ledger.xlsx");
      }
    };

    $scope.update = function () {
      var data = $scope.form;

      var sl = data.bankCode;
      var url = path + "/api/v1/account/bank" + sl;

      $http.put(url, data, config).then(
        function successCallback(response) {
          $scope.form = {};
          $scope.getdata();
        },
        function errorCallback(response) {
          console.log("Updating of data failed");
        }
      );
    };
  }
);
