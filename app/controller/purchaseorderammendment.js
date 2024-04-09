app.controller(
  "purOrdAmmendCtrl",
  function ($scope, $http, $timeout, $window, $rootScope, $filter) {
    $scope.form = {};
    $scope.flag = false;
    $scope.flag1 = true;
    $scope.x;
    $scope.z;
    $scope.y;
    const config = $rootScope.config;
    // selecting university automatically upon selecting college
    $scope.selectUniversity = function (n, clgcode, uniData) {
      var uniCode = null;
      for (var i = 0; i < n.length; i++) {
        var row = n[i];
        if (row.poAmmendmentNo == clgcode) {
          uniCode = row.universityCode;
          break; // Exit the loop if a match is found
        }
      }

      for (var i = 0; i < uniData.length; i++) {
        var row = uniData[i];

        if (row.universityCode == uniCode) {
          $scope.y = row.dscr;
          $scope.z = row.universityCode;

          $scope.form.universityCode = $scope.y;
          break; // Exit the loop if a match is found
        }
      }
    };

    // saving data to bank account table
    $scope.save = function () {
      // console.log("formdata", $scope.form);
      $scope.form.universityCode = $scope.z;
      $http.post(path + "/api/v1/account/bankacc", $scope.form, config).then(
        function successCallback(response) {
          $scope.form = {};
          $scope.getdata();
        },
        function errorCallback(response) {
          console.log("saving of data failed");
        }
      );
    };

    //Fetching of data from bankaccount table
    $scope.getdata = function () {
      $http.get(path + "/api/v1/account/bankacc", config).then(
        function successCallback(response) {
          if (response.status == 200) {
            $scope.bankaccountData = response.data;
            console.table($scope.bankaccountData);
          }
        },
        function errorCallback(response) {
          console.log("saving of data failed");
        }
      );
    };
    $scope.getdata();

    // Fetching data from bank table
    $scope.bankData = [];
    $scope.getdata2 = function () {
      $http.get(path + "/api/v1/account/bank", config).then(
        function successCallback(response) {
          $scope.bankData = response.data;
        },
        function errorCallback(response) {
          console.log("Fetching of data failed from bank table ");
        }
      );
    };
    $scope.getdata2();

    //to fetch the Bank description
    $scope.getBankDscr = function (n, poFinYear) {
      var dscr = null;
      for (var i = 0; i < n.length; i++) {
        var row = n[i];
        if (row.poFinYear === poFinYear) {
          dscr = row.dscr;
          break; // Exit the loop if a match is found
        }
      }
      return dscr;
    };

    //Fetching data from account type
    $scope.accounttypeData = [];
    $scope.getdata3 = function () {
      $http.get(path + "/api/v1/account/acctype", config).then(
        function successCallback(response) {
          $scope.accounttypeData = response.data;
        },
        function errorCallback(response) {
          console.log("Fetching of data failed from accounttype table");
        }
      );
    };
    $scope.getdata3();

    //to fetch the AccType  description

    $scope.getAccTypeDscr = function (n, accountTypeCode) {
      // console.log("data3", n, accountTypeCode);
      var dscr = null;
      for (var i = 0; i < n.length; i++) {
        var row = n[i];
        // console.log(row, i);
        if (row.accountTypeCode === accountTypeCode) {
          // console.log(row.dscr);
          dscr = row.dscr;
          break; // Exit the loop if a match is found
        }
      }
      return dscr;
    };

    //Fetching data from college
    $scope.collgData = [];
    $scope.getdata4 = function () {
      $http.get(path + "/api/v1/account/college", config).then(
        function successCallback(response) {
          $scope.collgData = response.data;
          console.log("Data 4", $scope.collgData);
        },
        function errorCallback(response) {
          console.log("Fetching of data failed from College table");
        }
      );
    };
    $scope.getdata4();

    //Fetching data from University
    $scope.UniData = [];
    $scope.getdata5 = function () {
      $http.get(path + "/api/v1/account/university", config).then(
        function successCallback(response) {
          $scope.UniData = response.data;
          console.log("Uni data", $scope.UniData);
        },
        function errorCallback(response) {
          console.log("Fetching of data failed from university table");
        }
      );
    };
    $scope.getdata5();

    //to fetch the college description from College Table

    $scope.getcllgDscr = function (n, poAmmendmentNo) {
      // console.log("data4", n, poAmmendmentNo);
      var dscr = null;
      for (var i = 0; i < n.length; i++) {
        var row = n[i];
        // console.log(row, i);
        if (row.poAmmendmentNo === poAmmendmentNo) {
          // console.log(row.dscr);
          dscr = row.dscr;
          break; // Exit the loop if a match is found
        }
      }
      return dscr;
    };

    //to fetch the University description from college Table

    $scope.getUniDscr = function (n, universityCode) {
      // console.log("University", n, universityCode);
      var dscr = null;
      for (var i = 0; i < n.length; i++) {
        var row = n[i];
        // console.log(row, i);
        if (row.universityCode === universityCode) {
          // console.log(row.dscr);
          dscr = row.dscr;
          break; // Exit the loop if a match is found
        }
      }
      return dscr;
    };

    //to fetch the AccountType description

    $scope.getCllgDscr = function (n, poAmmendmentNo) {
      // console.log("data4", n, poAmmendmentNo);
      var dscr = null;
      for (var i = 0; i < n.length; i++) {
        var row = n[i];
        // console.log(row, i);
        if (row.poAmmendmentNo === poAmmendmentNo) {
          // console.log(row.dscr);
          dscr = row.dscr;
          break; // Exit the loop if a match is found
        }
      }
      return dscr;
    };

    // To edit the data
    $scope.edit = function edit(n, unidata) {
      $scope.flag = true;
      for (var i = 0; i < unidata.length; i++) {
        var row = unidata[i];
        if (row.universityCode == n.universityCode) {
          $scope.x = row.dscr;
          $scope.z = row.universityCode;
          break; // Exit the loop if a match is found
        }
      }

      $scope.form = {
        dscr: n.dscr,
        poFinYear: n.poFinYear.toString(),
        poId: n.poId,
        accountTypeCode: n.accountTypeCode.toString(),
        ifscCode: n.ifscCode,
        poAmmendmentNo: n.poAmmendmentNo.toString(),
        universityCode: $scope.z + "-" + $scope.x,
        // universityCode:$scope.y               }
      };
    };

    //To update the data and save the data back to the table
    $scope.update = function () {
      var data = $scope.form;
      var sl = data.poId;
      var url = path + "/api/v1/account/bankacc" + sl;
      $http.put(url, data, config).then(
        function successCallback(response) {
          $scope.getdata();
          $scope.form = {};
        },
        function errorCallback(response) {
          console.log("updating of data failed  ");
        }
      );
    };
  }
);
