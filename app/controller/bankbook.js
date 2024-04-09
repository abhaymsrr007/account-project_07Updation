app.controller(
  "bankBookCntrl",
  function ($scope, $http, $timeout, $window, $rootScope, $filter) {
    $scope.form = {};

    $scope.timeoutPromise = null;
    $rootScope.checkToken();
    const config = $rootScope.config;
    // selecting university automatically upon selecting college
    // $scope.form.universityCode = "5 - PRSU";
    $scope.post = function (bankDate, collegeCode) {
      if (bankDate && collegeCode) {
        // const date = bankDate.split("-");
        // // console.log("object", date);
        // const inputDate = new Date(date[2] + "-" + date[1] + "-" + date[0]);
        // const day = inputDate.getDate().toString().padStart(2, "0");
        // const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
        // const year = inputDate.getFullYear();
        // $scope.form.bankDate = date[2] + "-" + date[1] + "-" + date[0];
        // $scope.form.bankDate = `${day}-${month}-${year}`;
      }
      // console.log(bankDate,collegeCode)
      // var bankData = new Date(bankDate);
      $(".loaderbg").show();
      if ($scope.myform.$valid) {
        $http
          .post(
            "http://192.168.88.169:9099/api/v1/bankbook/?bankDate=" +
              $scope.form.bankDate +
              "&collegeCode=" +
              collegeCode +
              "&universityCode=5",
            $scope.form,
            config
          )
          .then(
            function successCallback(response) {
              console.log(response);
              if (response.status == 200) {
                $scope.form = { universityCode: 5 };
                $scope.getBankBookData();
                $scope.formSubmitted = true;
                toastr.success("Bank book Generated successfully!");
                $(".loaderbg").hide();
              }
            },
            function errorCallback(response) {
              toastr.error("An error occurred while saving data.", "Error");
              console.log(response);
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

    //Fetching of data from bankaccount table
    $scope.bankBookData = [];
    $scope.getBankBookData = function () {
      $http
        .get("http://192.168.88.169:9099/api/v1/bankbook/page/", config)
        .then(
          function successCallback(response) {
            if (response.status == 200) {
              console.log(response.data.data.content);
              $scope.bankBookData = response.data.data.content;
            }
          },
          function errorCallback(response) {
            console.log("saving of data failed", response);
          }
        );
    };
    // $scope.getBankBookData();

    $scope.removeDup = (val) => {
      let dup = [];
      dup.push(val);
      if (dup.includes(val)) {
        return null;
      } else {
        return false;
      }
    };

    //Fetching of data from bankaccount table
    $scope.bankAccountData = [];
    $scope.getBankAccountData = function () {
      $http.get(path + "/api/v1/account/bankacc", config).then(
        function successCallback(response) {
          $scope.bankAccountData = response.data;
          console.log("jkkjkj", $scope.bankAccountData);
        },
        function errorCallback(response) {
          console.log("saving of data failed", response);
        }
      );
    };
    $scope.getBankAccountData();

    // To edit the data
    $scope.edit = function edit(n, unidata) {
      $scope.flag = true;
      console.log(n);
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
        bankCode: n.bankCode.toString(),
        bankAccountNo: n.bankAccountNo,
        accountTypeCode: n.accountTypeCode.toString(),
        ifscCode: n.ifscCode,
        collegeCode: n.collegeCode.toString(),
        universityCode: $scope.z + "-" + $scope.x,
      };
    };
    $scope.convertDateFormat = function (dateString) {
      var parts = dateString.split("-");
      console.log(parts);
      if (parts.length === 3) {
        console.log(parts)
        return parts[2] + "-" + parts[1] + "-" + parts[0];
      } else {
        return "Invalid date format";
      }
    };

    $scope.search = function (universityCode,collegeCode,bankCode,bankAc,fromVchrDate,toVchrDate
    ) {
      // Create a request object with the keywords in the request body
      var fromvchrdate = $scope.convertDateFormat(fromVchrDate);
      var tovchrdate = $scope.convertDateFormat(toVchrDate);
      console.log(fromvchrdate,tovchrdate);
      console.log(
        universityCode,
        collegeCode,
        bankCode,
        bankAc,
        fromvchrdate,
        tovchrdate
      );

      // const url =`http://192.168.88.169:9099/api/v1/bankbook/search?universityCode=${{universityCode}}&collegeCode=${{collegeCode}}&bankCode=${{bankCode}}&bankAc=${{bankAc}}&fromVchrDate=${{fromvchrdate}}&toVchrDate=${{ tovchrdate }}`
      const url ='http://192.168.88.169:9099/api/v1/bankbook/search?universityCode='+universityCode+"&collegeCode="+collegeCode+"&bankCode="+bankCode+"&bankAc="+bankAc+"&fromVchrDate="+fromvchrdate+"&toVchrDate="+tovchrdate
      console.log(url);
      //Make the HTTP POST request to your API endpoint with the request data in the body
      $http
        .post(url,config)
        .then(
          function successCallback(response) {
            $scope.bankBookData = response.data.data;
            console.log(
              "$scope.bankBookData",
              $scope.bankBookData
            );
          },
          function errorCallback(error) {
            console.log("Unable to perform request", error);
          }
        );
    };

    $scope.ClgData = [];
    $scope.getCollege = function () {
      $http
        .get(path + "/api/v1/account/college", config)
        .then(function (response) {
          $scope.ClgData = response.data;
          console.log("ClgData", response.data);
        });
    };
    $scope.getCollege();

    $scope.exportTableToExcel = function () {
      const table = document.querySelector(".table-striped");
      if (table) {
        const ws = XLSX.utils.table_to_sheet(table);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "bankbook.xlsx");
      }
    };
  }
);
