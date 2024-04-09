app.controller(
  "purOrdCntrl",
  function ($scope, $http, $rootScope, $filter) {
    $scope.form = {};
    $scope.flag = false;
    $scope.formSubmitted = false;
    $scope.details = [];
    const config = $rootScope.config;

    $scope.handleLink = function (pgname) {
      $rootScope.handleLink(pgname);
    };
    // saving data to Purchase Order table

    $scope.form.poCapitalAmount =
      $scope.form.poCapitalAmount > 0 ? $scope.form.poCapitalAmount : 0;
    $scope.form.poRevenueAmount =
      $scope.form.poRevenueAmount > 0 ? $scope.form.poRevenueAmount : 0;
    $scope.savePurOrd = function () {
      console.log($scope.form);
      $http
        .post(path + "/api/v1/account/po", $scope.form, config)
        .then(function successCallback(response) {
          if (response.status == 200) {
            $scope.formSubmitted = true;
            // alert("data saved successfully!!");
            toastr.success("Purchase Order Saved", "Success");
          }
        })
        .catch(function errorCallback(response) {
          alert("saving of data failed", response);
        });
    };

    //Fetching of data from table
    $scope.getdata = function () {
      $http.get(path + "/api/v1/account/po", config).then(
        function successCallback(response) {
          $scope.data = response.data;
          //console.log("purchase order", $scope.data);
        },
        function errorCallback(response) {
          //console.log("saving of data failed");
        }
      );
    };
    $scope.getdata();

    $scope.setUniversity = (clgData, clgCode) => {
      clgData.map((x, i) => {
        x.collegeCode == clgCode
          ? ($scope.form.universityCode = x.universityCode?.toString())
          : "";
        // $scope.universityData.map((x) => {
        //   x.universityCode == $scope.form.universityCode
        //     ? ($scope.universityDscr = x.dscr)
        //     : "";
        // });
      });
    };

    $scope.setUniversityDscr = (staffNo) => {
      //console.log(staffNo);
      for (let i = 0; i < $scope.employeeData.length; i++) {
        const x = $scope.employeeData[i];
        if (x.staffNo === staffNo) {
          $scope.executingAuthorityDscr = x.fullName;
          // //console.log($scope.executingAuthorityDscr);
        }
      }
    };
    //To fetch data from university table
    $scope.universityData = [];
    ($scope.getUnidata = function () {
      $http.get(path + "/api/v1/account/university", config).then(
        function (response) {
          //console.log("University Data>>>>>>>>>>>>>>>", response.data);
          $scope.universityData = response.data;
        },
        function (response) {
          console.log("Error in fetching data from university table", response);
        }
      );
    })();

    $scope.department = [];
    $scope.getDepartment = function () {
      $http.get(path + "/api/v1/account/department", config).then(
        function (response) {
          $scope.department = response.data;
          //console.log("Department", response.data);
        },
        function errorCallback(response) {
          //console.log("error ");
        }
      );
    };
    $scope.getDepartment();



    $scope.employeeData = [];
    $scope.getEmployee = function () {
      $http.get(path + "/api/v1/account/employees", config).then(
        function (response) {
          $scope.employeeData = response.data;
          //console.log("employee123", response.data);
        },
        function (response) {
          //console.log("error ", response);
        }
      );
    };
    $scope.getEmployee();

    $scope.supplier = [];
    $scope.getSupplier = function () {
      $http.get(path + "/api/v1/account/supplier", config).then(
        function (response) {
          $scope.supplier = response.data;
          //console.log("supplier", response.data);
        },
        function errorCallback(response) {
          //console.log("error ");
        }
      );
    };
    $scope.getSupplier();

    $scope.setVenNameFromSupp = function (code) {
      //console.log(code);
      if (code) {
        $scope.supplier.forEach((element) => {
          if (element.vendorCode == code) {
            $scope.form.vendorName = element.fullName;
          }
        });
      } else {
        $scope.form.vendorName = "";
      }
    };
    //To update the data and save the data back to the table
    $scope.update = function () {
      var data = $scope.form;
      var sl = data.poId;
      var url = path + "/api/v1/account/po/{id}" + sl;
      $http.put(url, data).then(
        function successCallback(response) {
          $scope.getdata();
          $scope.form = {};
        },
        function errorCallback(response) {
          //console.log("updating of data failed!!");
        }
      );
    };

    $scope.f = false;
    $scope.getTotal = function () {
      $scope.form.poTotalAmount =
        parseInt($scope.form.poCapitalAmount) +
        parseInt($scope.form.poRevenueAmount);
      $scope.f = true;
    };

    // $scope.validyear = function (finYear) {
    //   //console.log(finYear, "hello");
    //   var currentYear = new Date().getFullYear();
    //   var finYearArray = finYear.split("-");
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
      var finYearArray = finYear.split("-");
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
    //To fetch data from PO status table

    $scope.poStatusData = [];
    $scope.getpodata = function () {
      $http.get(path + "/api/v1/account/po/status", config).then(
        function success(response) {
          $scope.poStatusData = response.data;
           console.log("asdasd",$scope.poStatusData)
          // $scope.form.poStatusCode = 1;
          $scope.form = {
            poStatusCode: 1,
          };
        },
        function (response) {
          //console.log("Error in fetching data ");
        }
      );
    };
    $scope.getpodata();
    //Fetching college table table

    $scope.collegeData = [];
    $scope.getCollagedata = function () {
      $http.get(path + "/api/v1/account/college", config).then(
        function successCallback(response) {
          $scope.collegeData = response.data;
          //console.log("Collage Data>>>>>>>>>>>>>>>>>", $scope.collegeData);
        },
        function errorCallback(response) {
          //console.log("Error fetching colllege data");
        }
      );
    };
    $scope.getCollagedata();

    //To fetch data from university table
    $scope.getUniversityData = function () {
      $http.get(path + "/api/v1/account/university", config).then(
        function (response) {
          $scope.universityData = response.data;
        },
        function (response) {
          console.log("Error in fetching data from university table ",response);
        }
      );
    };
    $scope.getUniversityData();

    $scope.setPlanDetailData = function (id) {
      //console.log("pccid", id);
      $scope.projectPlanCostCenterData.map((x) => {
        // //console.log("x>>>>>>>>>>>>>>>>>",x.costCentreId)
        if (x.planNo == id) {
          $scope.form.planFinYear = x.planFinYear;
          $scope.form.planTypeCode = x.planTypeCode;
          $scope.getProjectPlan(x.costCentreId);
          $scope.form.costCentreId = x.costCentreId.toString();
          $scope.setDscrCustodianType(x.costCentreId);

          // document.getElementById('costodianType').innerHTML = x.costCentreCode;

          //console.log("yess", x.costCentreId);
          $scope.accounttypeData.map((i) =>
            i.accountTypeCode == x.planTypeCode
              ? ($scope.planTypeCodeDscr = i.dscr)
              : ""
          );

          // $scope.budgetalldata.map((x=>{//console.log(x)}))
        }
      });
    };

    //get data of project plan
    // $scope.budgetalldata = [];
    $scope.costCentreIds = [];
    $scope.getProjectPlan = function () {
      $http
        .get(path + "/api/v1/account/costCentre/alldata", config)
        .then(function (response) {
          $scope.projectPlanCostCenterData = response.data;
          // $scope.projectPlanCostCenterData.map((x) => {
          //   //console.log("cost", x.costCentreId);
          //   $scope.costCentreIds.push(x.costCentreId);
          //   //console.log("A", $scope.costCentreIds);
          //   $scope.costCentreIds = [...new Set($scope.costCentreIds)];
          //   //console.log("B", $scope.costCentreIds);
          // });
          // //console.log(
          //   "projectPlanCostCenterData>>>>",
          //   $scope.projectPlanCostCenterData
          // );
        });
    };
    $scope.getProjectPlan();

    $scope.pccdscr = "";
    let pcccode = "";
    $scope.depDscr = "";
    $scope.projectPlanCostCenterData = [];
    $scope.setDscrCustodianType = (ccid) => {
      //console.log("ccid>>>>", ccid);
      $scope.projectPlanCostCenterData.map((x) => {
        x.costCentreId == ccid
          ? (pcccode = x.costCentreCode)
          : (pcccode = pcccode);
      });
      $http.get(path + `/api/v1/account/cost/${pcccode}`, config).then(
        function successCallback(response) {
          // //console.log("pccdscr333>>>", response);
          response.data.dscr
            ? ($scope.pccdscr = response.data.dscr)
            : ($scope.pccdscr = "");
          // //console.log("pccdscr>>>", $scope.pccdscr);
        },
        function errorCallback(erroe) {
          // //console.log("custdion detail not fetch");
          //console.log(erroe);
        }
      );
    };
    $scope.form = {};
    $scope.fetchPoByPk = (poNo, poFinYear) => {
      if (poNo && poFinYear) {
        $http
          .get(`${path}/api/v1/account/po/${poNo}/${poFinYear}`, config)
          .then(
            (res) => {
              //console.log("data from po through po details>>>", res.data);
              $scope.form = res.data;
              $scope.form.costCentreId = res.data.costCentreId.toString();
              $scope.form.departmentCode = res.data.departmentCode?.toString();
              $scope.form.collegeCode = res.data.collegeCode.toString();
              $scope.form.planNo = res.data.planNo;
              $scope.setVenNameFromSupp($scope.form.vendorCode);
              $scope.setDscrCustodianType($scope.form.costCentreId);
              $scope.setDepDscr($scope.form.departmentCode);
              $scope.setUniversityDscr($scope.form.executingAuthority);
              $scope.setUniversity($scope.collegeData, $scope.form.collegeCode);
              $scope.accounttypeData.map(
                (x) => ($scope.planTypeCodeDscr = x.dscr)
              );
            },
            (err) => {
              console.log(err, "custdion detail not fetched");
            }
          );
      }
    };
    $scope.setDepDscr = (depCode) => {
      if (depCode) {
        //console.log("depCode>>>>", depCode);
        $scope.department.map((x) => {
          if (x.departmentCode == depCode) {
            $scope.depDscr = x.dscr;
          }
        });
      } else {
        $scope.depDscr = "";
      }
    };

    $scope.getClgDscr = function (clgCode) {
      // console.log("$scope.collegeData, clgCode", $scope.collegeData, clgCode)
      for (let index = 0; index < $scope.collegeData.length; index++) {
        var row = $scope.collegeData[index];
        if (row.collegeCode == clgCode) {
          return row.dscr;
        }
      }
    };

    $scope.getProjectPlan = () => {
    
      $http.get(path + `/api/v1/account/projectplan/alldata`, config).then(
        function successCallback(response) {
          // //console.log("pccdscr333>>>", response);
         $scope.projectPlanData = response.data;
        },
        function errorCallback(erroe) {
          // //console.log("custdion detail not fetch");
          //console.log(erroe);
        }
      );
    };
    $scope.getProjectPlan();

    $scope.setPlanTitle = function (planNo) {
      console.log("$scope.collegeData, clgCode", planNo);
      for (let index = 0; index < $scope.projectPlanData?.length; index++) {
        var row = $scope.projectPlanData[index];
        if (row.planNo == planNo) {
          return row.dscr;
        }
      }
    };

    //To fetch data from account type
    $scope.accounttypeData = [];
    (function () {
      $http.get(path + "/api/v1/account/acctype", config).then(
        function successCallback(response) {
          $scope.accounttypeData = response.data;
        },
        function errorCallback(response) {
          //console.log("fetching of data failed");
        }
      );
    })();
    $scope.flag1 = true;
    $scope.setGemField = function (toggle) {
      // alert(y)
      // //console.log(y)
      if (toggle === "Y") {
        $scope.flag1 = false;
      } else {
        $scope.flag1 = true;
      }
    };
    // Function to get the value of a query parameter by name
    function getQueryParam(name) {
      const urlParams = new URLSearchParams(window.location.search);
      const paramValue = urlParams.get(name);
      try {
        // Attempt to parse the JSON string into an object
        return JSON.parse(paramValue);
      } catch (error) {
        // Handle any parsing errors (e.g., invalid JSON)
        //console.error(`Error parsing query parameter '${name}':`, error);
        return null; // Return null or an appropriate default value
      }
    }
    // Get the 'n' object from the query parameter
    $scope.idDisable = false;
    if ($rootScope.data) {
      $scope.fetchPoByPk($rootScope.data.poId, $rootScope.data.poFinYear);
      $scope.idDisable = true;
    }
  }
);
