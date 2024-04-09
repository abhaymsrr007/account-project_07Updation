app.controller(
  "bankAccCntrl",
  function ($scope, $http, $timeout, $window, $rootScope, $filter) {
    $scope.form = {};
    $scope.flag = false;
    $scope.flag1 = true;
    $scope.x;
    $scope.z;
    $scope.y;
    $scope.timeoutPromise = null;
    $rootScope.checkToken();
    const config = $rootScope.config;
    // selecting university automatically upon selecting college
    $scope.selectUniversity = function (n, clgcode, uniData) {
      if(n && clgcode && uniData){
      var uniCode = null;
      for (var i = 0; i < n.length; i++) {
        var row = n[i];
        if (row.collegeCode == clgcode) {
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
      }}else{
        $scope.form.universityCode = ''
      }
    };

    $scope.save = function () {
      // console.log("formdata", $scope.form);
      $(".loaderbg").show();
      if ($scope.myform.$valid) {
        $scope.form.universityCode = $scope.z;
        $http.post(path + "/api/v1/account/bankacc", $scope.form, config).then(
          function successCallback(response) {
            if (response.status == 200) {
              $scope.flag = false;

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
    $scope.bankaccountData = [];
    $scope.getdata = function () {
      $http.get(path + "/api/v1/account/bankacc", config).then(
        function successCallback(response) {
          $scope.bankaccountData = response.data;
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
    $scope.getBankDscr = function (n, bankCode) {
      var dscr = null;
      for (var i = 0; i < n.length; i++) {
        var row = n[i];
        //console.log(row, i);
        if (row.bankCode === bankCode) {
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
          // console.log("Data 4", $scope.collgData)
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
          // console.log("Uni data", $scope.UniData)
        },
        function errorCallback(response) {
          console.log("Fetching of data failed from university table");
        }
      );
    };
    $scope.getdata5();

    //to fetch the college description from College Table

    $scope.getcllgDscr = function (n, collegeCode) {
      // console.log("data4", n, collegeCode);
      var dscr = null;
      for (var i = 0; i < n.length; i++) {
        var row = n[i];
        // console.log(row, i);
        if (row.collegeCode === collegeCode) {
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

    $scope.getCllgDscr = function (n, collegeCode) {
      // console.log("data4", n, collegeCode);
      var dscr = null;
      for (var i = 0; i < n.length; i++) {
        var row = n[i];
        // console.log(row, i);
        if (row.collegeCode === collegeCode) {
          // console.log(row.dscr);
          dscr = row.dscr;
          break; // Exit the loop if a match is found
        }
      }
      return dscr;
    };
    $scope.checkForDuplicate = function(bankAccountNo) {
      $http.get(path + `/api/v1/account/bankacc/${bankAccountNo}`, config).then(
          function(response) {
              if (response.data.bankAccountNo == bankAccountNo) {
                  $scope.duplicateCode = true;
              } else {
              }
            }).catch(function(error) {
              console.log("Error fetching data from Bank Account No", error);
              $scope.duplicateCode = false;
          })   
        };
    // To edit the data
    $scope.edit = function edit(n, unidata) {
      var targetOffset = $('.scroll-target').offset().top;         
      $('html, body').animate({
          scrollTop: targetOffset
      }, 100);
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
            $scope.bankaccountData = response.data;
            console.log(
              "$scope.bankaccountData>>>>>>>>>>>>>>>>",
              $scope.bankaccountData
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
  }
);
