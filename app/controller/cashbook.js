app.controller(
  "cashBookCntrl",
  function ($scope, $http, $timeout, $window, $rootScope, $filter) {
    $scope.form = {};

    $scope.timeoutPromise = null;
    $rootScope.checkToken();
    const config = $rootScope.config;
    // selecting university automatically upon selecting college
    $scope.save = function () {
      // console.log("formdata", $scope.form);
      $(".loaderbg").show();
      if ($scope.myform.$valid) {
        $scope.form.universityCode = 5;
        $http.post(path + "/api/v1/bankbook/page/", $scope.form, config).then(
          function successCallback(response) {
            if (response.status == 200) {
              $scope.form = {};
              $scope.getdata();
              $scope.formSubmitted = true;
              toastr.success("Data saved successfully!", "Success");
              $(".loaderbg").hide();
            }
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

    //Fetching of data from bankaccount table
    $scope.bankBookData = [];
    $scope.getdata = function () {
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
            console.log("saving of data failed");
          }
        );
    };
    $scope.getdata();

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
        // universityCode:$scope.y               }
      };
    };

    $scope.search = function (keyword1, keyword2) {
      // Create a request object with the keywords in the request body
      var bankAccDto = {
        bankAccountNo: keyword1 || "",
        cllg: keyword2 || 0,
      };

      console.log(bankAccDto);
      //Make the HTTP POST request to your API endpoint with the request data in the body
      $http
        .post(path + "/api/v1/account/search/banktype", bankAccDto, config)
        .then(
          function successCallback(response) {
            $scope.bankBookData = response.data;
            console.log(
              "$scope.bankBookData>>>>>>>>>>>>>>>>",
              $scope.bankBookData
            );
          },
          function errorCallback(error) {
            console.log("Unable to perform request", error);
          }
        );
    };

    //To update the data and save the data back to the table
    $scope.update = function () {
      var data = $scope.form;
      var sl = data.bankAccountNo;
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
    // $scope.exportToExcel = function () {
    //   const workbook = XLSX.utils.book_new();
    //   const sheetData = $scope.bankBookData.map((item) => Object.values(item));
    //   const sheetHeader = Object.keys($scope.bankBookData[0]);
    //   const sheet = XLSX.utils.json_to_sheet([sheetHeader, ...sheetData]);

    //   XLSX.utils.book_append_sheet(workbook, sheet, "Bank Data");

    //   const excelBuffer = XLSX.write(workbook, {
    //     bookType: "xlsx",
    //     bookSST: true,
    //     type: "array",
    //   });
    //   const blob = new Blob([excelBuffer], {
    //     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    //   });
    //   saveAs(blob, `BankData_${new Date().toISOString()}.xlsx`);
    // };


  //   function exportTableToExcel() {
  //     const table = document.querySelector(".table.table-striped");
  //     if (table) {
  //       const ws = XLSX.utils.table_to_sheet(table);
  //       const wb = XLSX.utils.book_new();
  //       XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  //       XLSX.writeFile(wb, "Bankbook.xlsx");
  //     }
  //   }
  //   const exportButton = document.getElementById("exportToExcel");
  //   if (exportButton) {
  //     exportButton.addEventListener("click", exportTableToExcel);
  //   }
  // }
 $scope.data = [
    {
        "bankDate": "2024-01-29",
        "bankCode": 23,
        "bankAc": "102387115210",
        "paymentAmount": 6000,
        "receiptAmount": 0,
        "bankCb": 64000,
        "collegeCode": 157,
        "universityCode": 5,
        "$$hashKey": "object:157"
    },
    {
      "bankDate": "2024-01-29",
      "bankCode": 24,
      "bankAc": "102387115232",
      "paymentAmount": 7000,
      "receiptAmount": 0,
      "bankCb": 64000,
      "collegeCode": 157,
      "universityCode": 5,
      "$$hashKey": "object:157"
  }
]
  $scope.exportToExcel=function(){
    
  }
  }

);
