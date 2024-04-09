app.controller('projectPlanCtrl', function ($scope, $http, $timeout, $window, $rootScope) {
  $scope.yearflag2 = false;
  $scope.details = [];
  const token = $window.sessionStorage.getItem('token');
  var config = {
    headers: {
      'Authorization': 'Bearer ' + token
    },
  };
  $scope.isCompletionDateBeforeStartDate = function (completionDate, startDate) {
    return new Date(completionDate) < new Date(startDate);
  };
  $scope.f = false;
  $scope.getTotalApprovedCosts = function () {
    $scope.form.approvedTotalCost = parseInt($scope.form.approvedCapitalCost) + parseInt($scope.form.approvedRevenueCost)
    $scope.f = true
  }

  $scope.getSanctionBudgetTotal = function (index) {
    $scope.sanction[index].sanctionTotalBudget = parseInt($scope.sanction[index].sanctionCapitalBudget) + parseInt($scope.sanction[index].sanctionRevenueBudget)
    $scope.f = true
  }

  $scope.getfundXTotal = function (index) {
    $scope.fundTransfer[index].totalFundTransfer = parseInt($scope.fundTransfer[index].capitalTransfer) + parseInt($scope.fundTransfer[index].revenueTransfer)
    $scope.f = true
  }
  $scope.checkDates = function (startdate, enddate, actualdate) {
    var startDateObj = new Date(startdate);
    var endDateObj = new Date(enddate);
    var actualDateObj = new Date(actualdate);
    if (actualDateObj >= startDateObj || actualDateObj <= endDateObj) {
      // actualdate falls within the range of startdate and enddate
      $scope.yearflag2 = true;
      //console.log("Valid Date");
    } else {
      // actualdate is outside the range of startdate and enddate
      $scope.yearflag2 = false;
      console.log("Invalid Date");
    }
  }
  $scope.collegeData = {};
  $scope.form = {};
  $scope.bgform = {};
  $scope.fundform = {};
  $scope.accountTypeData = {};
  $scope.projectPlan = {};
  $scope.flag = false
  $scope.i = 0;
  $scope.sanction = [];
  $scope.i = 0;
  $scope.fundTransfer = [];
  $scope.savePC = function () {
    // saving data to project-plan table
    // if ($scope.myform.$valid) {
      $scope.form.projectNonProject = 'y'
      $http.post(path + "/api/v1/account/projectplan", $scope.form, config)
        .then(function successCallback(response) {
          toastr.success("Data Saved Successfully", "Congratulations");
          console.log(response.data, "saved successfully")
          $scope.formSubmitted = true;
        },
          function errorCallback(response) {
            console.log("saving of data failed");
            toastr.error("ERROR", "Please fill  all the required fields");
          });
    // } else {
    //   toastr.error("ERROR", "Please fill  all the required fields");
    //   // alert("Form not submitted. Please fill in all required fields correctly.");
    // }
  };

  $scope.getClgDscr = function (collegeData, clgCode) {
    // console.log("collegeData, clgCode", collegeData, clgCode)
    for (let index = 0; index < collegeData.length; index++) {
      var row = collegeData[index];
      if (row.collegeCode == clgCode) {
        return row.dscr
      }
    }
  }

  $scope.setUniversityClgDscr = function (universityData, universityCode) {
    console.log(universityData, universityCode, "University Test")
    for (let index = 0; index < universityData.length; index++) {
      var row = universityData[index];
      if (row.collegeCode == universityCode) {
        return row.dscr
      }
    }
  }

  $scope.setUniversityDscr = function (universityCode) {
    console.log(universityCode, "universityCode universityCode")
    console.log($scope.universityData, "University Test for university Discription")
    for (let index = 0; index < $scope.universityData.length; index++) {
      var row = $scope.universityData[index];
      if (row.universityCode == universityCode) {
        return row.dscr
      }
    }
  }


  $scope.departmentData = [];
  $scope.getDepartment = function () {
    $http.get(path + "/api/v1/account/department", config).then(
      function (response) {
        $scope.departmentData = response.data;
        //console.log("Department", response.data);
      },
      function errorCallback(response) {
        //console.log("error ");
      }
    );
  };
  $scope.getDepartment();


  $scope.departmentDscr = '';
  $scope.getDepDscr = function (departmentCode) {
    if (departmentCode) {
      for (let index = 0; index < $scope.departmentData?.length; index++) {
        var row = $scope.departmentData[index];
        if (row.departmentCode == departmentCode) {
          $scope.departmentDscr = row.dscr;
          return row.dscr;
        }
      }
    }
  };

  // getDepDscr(form.departmentCode)

  $scope.getBankDscr = function (bankCode) {
    console.log(bankCode, "bankCode bankCode")
    console.log($scope.bankData, "Bank Account Test for university Discription")
    for (let index = 0; index < $scope.bankData.length; index++) {
      var row = $scope.bankData[index];
      if (row.bankCode == bankCode) {
        return row.dscr
      }
    }
  }
  // $scope.form.planTitle = form.planTitle
  $scope.update = function (planNo, planFinYear, planTypeCode) {
    console.log(planNo, planFinYear, planTypeCode)
    if (planNo && planFinYear && planTypeCode) {
      // $http.get(path+`/api/v1/account/projectplan/${planNo}/${planFinYear}/${planTypeCode}`)
      var url = path + '/api/v1/account/projectplan/' + planNo + '/' + planFinYear + '/' + planTypeCode;
      console.log(url);
      $http.get(url, config)
        .then(function successCallback(response) {
          console.log(response)
          if (response.status === 200) {
            console.log(response.data, "Getting data by path variables")
            var a = $scope.selectAccTypeDscr(response.data.planTypeCode)
            var plancostCenterDscr = $scope.selectPlanCostCenterDscr(response.data.costCentreCode)
            var clgDscr = $scope.getClgDscr($scope.collegeData, response.data.collegeCode)
            var universityClgDscr = $scope.setUniversityClgDscr(response.data.universityCode)
            var universityDscr = $scope.setUniversityDscr(response.data.universityCode)
            var bankDscr = $scope.getBankDscr(response.data.bankCode);
            $scope.form = response.data;
            $scope.form.planTypeCode = response.data.planTypeCode.toString();
            $scope.form.collegeCode = response.data.collegeCode.toString();
            $scope.form.pccDscr = plancostCenterDscr;
            $scope.form.Dscr = clgDscr;
            $scope.form.bankName = bankDscr;
            $scope.form.universityDscr = universityDscr;
            $scope.form.dscr = a;
            // console.log($scope.form.dscr, a, "$scope.form.dscr")

            $scope.getBudgetSanctionByPk(planNo, planFinYear, planTypeCode);
            console.log("(planNo, planFinYear, planTypeCode)", planNo, planFinYear, planTypeCode)

            $scope.bgform.planNo = planNo;
            $scope.bgform.planFinYear = planFinYear;
            $scope.bgform.planTypeCode = planTypeCode;
            $scope.bgform.projectPlanTitle = $scope.form.planTitle;

            $scope.getFundTransferByPk(planNo, planFinYear, planTypeCode);
            $scope.fundform.planNo = planNo;
            $scope.fundform.planFinYear = planFinYear;
            $scope.fundform.planTypeCode = planTypeCode;
            $scope.fundform.projectPlanTitle = $scope.form.planTitle;
          }
        },
          function errorCallback(response) {
            console.log("Unable to update  request");
          });
    }
  }
  $scope.getBudgetSanctionByPk = function (planNo, planFinYear, planTypeCode) {
    //  console.log("URLkjhkjhkjhkhk",url)
    $http.get(path + `/api/v1/account/projectplan/budget/${planNo}/${planFinYear}/${planTypeCode}`, config)
      .then(function successCallback(response) {
        console.log("sanction data", response.data)
        $scope.sanction = response.data;
      },
        function errorCallback(response) {
          console.log("Unable to update  request");
        });
  }

  $scope.getFundTransferByPk = function (planNo, planFinYear, planTypeCode) {

    console.log("fund X", planNo, planFinYear, planTypeCode)
    $http.get(path + `/api/v1/account/fundXfer/${planNo}/${planFinYear}/${planTypeCode}`, config)
      .then(function successCallback(response) {

        console.log("fund Transfer data", response.data)
        $scope.fundTransfer = response.data;
      },
        function errorCallback(response) {
          console.log("Unable to fetch  data from fund trnser (Path Variable)");
        });
  }


  for (var j = 0; j < 10; j++) {
    $scope.sanction.push({
      sanctionId: "",
      sanctionDate: "",
      sanctionFinYear: "",
      sanctionRef: "",
      sanctionRefDate: "",
      sanctionCapitalBudget: "",
      sanctionRevenueBudget: "",
      sanctionTotalBudget: "",
      status: j,

    });
  }

  $scope.addNewObj = function () {
    $scope.i + 1;
    $scope.sanction.push({
      sanctionId: "",
      sanctionDate: "",
      sanctionFinYear: "",
      sanctionRef: "",
      sanctionRefDate: "",
      sanctionCapitalBudget: "",
      sanctionRevenueBudget: "",
      sanctionTotalBudget: "",
      status: $scope.i
    });
  };

  $scope.delNewObj = function (val) {
    $scope.sanction.splice(val, 1);
    console.clear();
    console.log($scope.sanction);
  };


  $scope.submitBudgetForm = function (bgform) {
    console.log(bgform, "asdasdasdasdasd");
    // var formData = {
    //   planNo: bgform.planNo,
    //   planFinYear: bgform.planFinYear,
    //   planTypeCode: bgform.planTypeCode,
    //   // projectPlanTitle:bgform.projectPlanTitle
    // };
    console.log(" form Part", $scope.form);
    $scope.sanction = $scope.sanction.filter((x) => { return x.sanctionDate !== "" })
    $scope.sanction = $scope.sanction.map((row, i) => { return { ...row, planNo: $scope.form.planNo, planFinYear: $scope.form.planFinYear, planTypeCode: $scope.form.planTypeCode, planTitle: $scope.form.planTitle } })
    console.log($scope.sanction, "filtered after merged");

    $scope.timeoutPromise = null;
    // if ($scope.fundform.$valid) {
    $http.post(path + "/api/v1/account/projectPlanSanction/datalst", $scope.sanction, config)
      .then(function successCallback(response) {
        toastr.success("Data Saved Successfully", "Congratulations");
        // if(response.status == 200)
        console.log(response.data, "res")
        console.log("Data saved successfully");
        // Clear the form or perform any other necessary actions
      },
        function errorCallback(response) {
          console.log("Saving of data failed");
        });
    // } else {
    //   if (!$scope.timeoutPromise) {
    //     toastr.error('Please fill in all required fields.', 'Error');
    //     $scope.timeoutPromise = $timeout(function () {
    //       $scope.timeoutPromise = null;
    //     }, 3000); // Adjust the timeout value as needed
    //   }
    //     console.log("not saved!")
    // }
  }

  // Fetching data from the table
  $scope.getdata = function () {
    $http.get(path + "/api/v1/account/projectPlanSanction/alldata", config)
      .then(function successCallback(response) {
        $scope.data = response.data;
        console.log($scope.data);
      },
        function errorCallback(response) {
          console.log("Fetching of data failed");
        });
  };

  $scope.getdata();


  //fundTransfer data 
  for (var j = 0; j < 10; j++) {
    $scope.fundTransfer.push({

      transferSlNo: "",
      transferDate: "",
      sanctionFinYear: "",
      totalFundTransfer: "",
      capitalTransfer: "",
      revenueTransfer: "",
      approvalRefNo: "",
      approvingAuthority: "",
      approvalDate: "",
      status: j,

    });
  }

  $scope.addObj = function () {
    $scope.i++;
    $scope.fundTransfer.push({

      transferSlNo: "",
      transferDate: "",
      sanctionFinYear: "",
      totalFundTransfer: "",
      capitalTransfer: "",
      revenueTransfer: "",
      approvalRefNo: "",
      approvingAuthority: "",
      approvalDate: "",
      status: $scope.i
    });
  };

  $scope.delObj = function (val) {
    $scope.fundTransfer.splice(val, 1);
    console.clear();
    console.log($scope.fundTransfer);
  };


  $scope.submitFundXForm = function (fundform) {
    //  console.log(bgform, "Unfilasdfasfdasftered");
    var formData1 = {
      planNo: fundform.planNo,
      planFinYear: fundform.planFinYear,
      planTypeCode: fundform.planTypeCode,
    };
    console.log($scope.fundTransfer, "helsdfsdfsdfslo")

    $scope.fundTransfer = $scope.fundTransfer.filter((x) => { return x.transferDate !== "" })
    console.log($scope.fundTransfer, "filtered");
    $scope.fundTransfer = $scope.fundTransfer.map((row, i) => { return { ...row, planNo: fundform.planNo, planFinYear: fundform.planFinYear, planTypeCode: fundform.planTypeCode, } })
    console.log($scope.fundTransfer, "fundTransfer data");

    // if ($scope.bgform.$valid) {
    $http.post(path + "/api/v1/account/fundXfer/datalist", $scope.fundTransfer, config)
      .then(function successCallback(response) {
        toastr.success("Data Saved Successfully", "Congratulations");
        console.log("Data saved successfully", response);

        // Clear the form or perform any other necessary actions
      },
        function errorCallback(response) {
          toastr.error('Please fill in all required fields.', 'Error');

          console.log("Saving of data failed");
        });
    // }
  };

  // Fetching data from the table
  $scope.getppftdata = function () {
    $http.get(path + "/api/v1/account/fundXfer/alldata", config)
      .then(function successCallback(response) {
        $scope.data = response.data;
        console.log($scope.data);
      },
        function errorCallback(response) {
          console.log("Fetching of data failed");
        });
  };
  $scope.getppftdata();
  $scope.selectAccTypeDscr = function (code) {
    console.log(code, "kuch likhhh")
    var data = $scope.accountTypeData;
    console.log("ac", data)
    for (var i = 0; i < data.length; i++) {
      var row = data[i];
      if (row.accountTypeCode == code) {
        //  $scope.form.planTypeCode = row.accountTypeCode
        $scope.form.dscr = row.dscr
        $scope.bgform.planTypeDscrforBudget = row.dscr
        $scope.fundform.planTypeDscrforfundTr = row.dscr


        return row.dscr
      }
    }
  }
  //To fetch data from university table

  $scope.getUniData = function () {
    $http.get(path + "/api/v1/account/university", config)
      .then(function (response) {
        $scope.universityData = response.data;
        console.log($scope.universityData, "$scope.universityData")
      }, function (response) {
        console.log("Error in fetching data from university table  ")
      });

  }
  $scope.getUniData();

  $scope.form.pccDscr = "";
  $scope.clgCode = "";
  $scope.uniCode = "";

  $scope.clgDscr = "";
  $scope.uDscr = "";

  $scope.getCllgDscr = function (cllgdata, cllgcode, unidata, bankaccdata, bank) {
    console.log(cllgdata, cllgcode)
    for (var i = 0; i < cllgdata.length; i++) {
      var row = cllgdata[i];
      if (row.collegeCode == cllgcode) {
        console.log(row.dscr)
        $scope.form.Dscr = row.dscr;
        $scope.uniCode = row.universityCode;
        for (let index = 0; index < unidata.length; index++) {

          if ($scope.uniCode === unidata[i].universityCode)

            $scope.form.universityCode = unidata[index].universityCode;
          $scope.form.universityDscr = unidata[index].dscr

        }
        for (let index = 0; index < bankaccdata.length; index++) {
          if ($scope.uniCode === bankaccdata[index].universityCode) {
            $scope.form.bankAccountNo = bankaccdata[index].bankAccountNo;
            $scope.form.bankCode = bankaccdata[index].bankCode
            $scope.bankCode = bankaccdata[index].bankCode

          }

        }
        for (let index = 0; index < bank.length; index++) {
          if ($scope.bankCode === bank[index].bankCode) {
            $scope.form.bankName = bank[index].dscr;


          }
        }
      }
    }
  }

  $scope.selectPlanCostCenterDscr = function (code) {
    data = $scope.costData;
    unidata = $scope.universityData
    bankaccdata = $scope.bankAccountData
    bank = $scope.bankData
    // data, unidata, bankaccdata, bank =  costData,universityData,bankAccountData,bankData;
    console.log("bank data", bankaccdata)
    for (var i = 0; i < data.length; i++) {
      var row = data[i];
      var collrow;
      var unirow = [];
      if (row.costCentreCode == code) {
        $scope.form.pccDscr = row.dscr

        console.log(row.dscr, "unidatahnngghngn")

        return row.dscr
        break;
      }
    }
  }

  //Fetching data  from the bank table
  $scope.bankData = []
  $scope.getdata = function () {
    $http.get(path + "/api/v1/account/bank", config)
      .then(function successCallback(response) {
        $scope.bankData = response.data;

      },
        function errorCallback(response) {
          console.log("Fetching of data failed");
        });

  }
  $scope.getdata();



  // To persist data in plan_cost_centres table
  $scope.save = function () {
    console.log($scope.form)
    $scope.form = {};

  }

  //To fetch data from account type
  $scope.getAccTypeData = function () {
    $http.get(path + "/api/v1/account/acctype", config)
      .then(function successCallback(response) {
        $scope.accountTypeData = response.data;
        console.log("getAccTypeData", $scope.accountTypeData)
      },
        function errorCallback(response) {
          console.log("fetching of data failed");
        });
  }
  $scope.getAccTypeData();


  // Fetching data api
  $scope.costData = {};
  $scope.getPlanCostCenData = function () {
    $http.get(path + "/api/v1/account/cost", config)
      .then(function success(response) {
        $scope.costData = response.data;
        console.log("getPlanCostCenData store in costData", $scope.costData)

      }, function (response) {
        console.log("Error in fetching data ")
      });
  }
  $scope.getPlanCostCenData();


  //Fetching college table table
  $scope.getCollegeData = function () {
    $http.get(path + "/api/v1/account/college", config)
      .then(function successCallback(response) {
        $scope.collegeData = response.data;
        console.log(" $scope.collegeData", $scope.collegeData)

      },
        function errorCallback(response) {
          console.log("Error fetching colllege data")
        });

  }
  $scope.getCollegeData();

  //Fetching of data from bankaccount table
  $scope.getBankAccdata = function () {
    $http.get(path + "/api/v1/account/bankacc", config)
      .then(function successCallback(response) {
        $scope.bankAccountData = response.data;
        console.log(" $scope.bankAccountData", $scope.bankAccountData)
      },
        function errorCallback(response) {
          console.log("saving of data failed");
        });

  }
  $scope.getBankAccdata();


  // $scope.validyear = function (finYear) {
  //   console.log(finYear, "hello")
  //   var currentYear = new Date().getFullYear();
  //   var finYearArray = finYear.split('-');
  //   var startYear = parseInt(finYearArray[0]);
  //   var endYear = parseInt(finYearArray[1]);
  //   if (startYear < currentYear || endYear < currentYear) {
  //     $scope.yearflag = true;
  //   }
  //   if (startYear >= currentYear && endYear === startYear + 1) {
  //     // The Fin Year is valid (not beyond the current year and has a gap of 1 year)
  //     $scope.yearflag = false;
  //   } else {
  //     $scope.yearflag = true;
  //   }
  // };

  $scope.yearflag = false;

  $scope.validyear = function (finYear) {
    // if (finYear.length > 9) {
    // console.log(finYear, "hello");
    var currentYear = new Date().getFullYear();
    var currentMonth = new Date().getMonth() + 1; // Adding 1 because getMonth() returns zero-based months
    var finYearArray = finYear.split('-');
    var startYear = parseInt(finYearArray[0]);
    var endYear = parseInt(finYearArray[1]);

    // Adjusting the start and end years based on the Indian financial year
    var indianStartYear = currentMonth >= 4 ? currentYear : currentYear - 1;
    var indianEndYear = indianStartYear + 1;

    if (
      startYear < indianStartYear ||
      endYear < indianStartYear ||
      startYear > indianEndYear ||
      endYear > indianEndYear
    ) {
      $scope.yearflag = true;
    } else {
      $scope.yearflag = false;
    }
    // }
  };

  $scope.tabToggle = function (id) {
    $rootScope.tabToggle(id);
  }
  // $scope.nObject = getQueryParam('n');
  console.log('Value of $rootScope.data:', $rootScope.data);
  //$scope.poIdDisable =false;
  $scope.handleLink = function (pgname) {
    $rootScope.handleLink(pgname);
    $rootScope.data = '';
  };
  if ($rootScope.data) {
    $scope.update($rootScope.data.planNo, $rootScope.data.planFinYear, $rootScope.data.planTypeCode);
  }
})
