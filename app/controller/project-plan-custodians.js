app.controller(
  "projPlanCusCtrl",
  function ($scope, $http, $timeout, $location, $window, $rootScope) {
    var divs = document.querySelectorAll('.nextprev > .rowbox');
    angular.element(divs).css('display', 'none');
    if (divs.length > 0) {
        angular.element(divs[0]).css('display', 'block');
    }
    $scope.flag = false;
    $scope.flag1 = true;
    $scope.form = {};
    $scope.dpt = false;
   

    $scope.ppc=true;
    $scope.bae=true;
    $scope.fte=true;

    $scope.details = [];

    const token = $window.sessionStorage.getItem("token");
    const userDetails = JSON.parse(
      $window.sessionStorage.getItem("userDetails")
    );
    if (userDetails && token!='' && token!=undefined && token!=null) {
      $scope.details = angular.copy(userDetails);
    } else {
      $window.location.href = 'index.html'
      // console.log("User details not found in sessionStorage");
    }
    $scope.logout = function () {
      $window.sessionStorage.removeItem("userDetails");
      $window.location.href = "index.html";
    };
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    $scope.handleLink = function (p) {
      $rootScope.handleLink(p);
    };
    $scope.handleLinkWData = function (p,data) {
      $rootScope.handleLinkWData(p,data);
    };

    $scope.dateCheck = function (s, c) {
      var start = new Date(s);
      var end = new Date(c);
      if (start >= end || start == end) {
        $scope.date1 = true;
      } else {
        $scope.date1 = false;
      }
    };
    $scope.dateCheck1 = function (a, e) {
      var actual = new Date(a);
      var actualCom = new Date(e);
      if (actual >= actualCom) {
        $scope.date2 = true;
      } else {
        $scope.date2 = false;
      }
    };

    $scope.dateCheck2 = function (a, e) {
      var sch = new Date(a);
      var actuals = new Date(e);
      if (sch >= actuals) {
        $scope.date3 = true;
      } else {
        $scope.date3 = false;
      }
    };


    $scope.calAlloFinYear = function (allocationDate,index) {
      var allocationDate = allocationDate;
      var dateParts = allocationDate.split("-");
      if (dateParts.length === 3) {
        var day = parseInt(dateParts[0]);
        var month = parseInt(dateParts[1]);
        var year = parseInt(dateParts[2]);

        if (day >= 1 && day <= 31 && month >= 1 && month <= 12) {
          var allocationFinYear;
          if (month >= 4) {
            allocationFinYear = year + "-" + (year + 1);
          } else {
            allocationFinYear = year - 1 + "-" + year;
          }
          $scope.detailbudget[index].allocationFinYear = allocationFinYear;
        } else {
          $scope.detailbudget[index].allocationFinYear = "";
        }
      } else {
        $scope.detailbudget[index].allocationFinYear = "";
      }
    };


    $scope.calFundFinYear = function (transferDate,index) {
      var transferDate = transferDate;
      var dateParts = transferDate.split("-");
      if (dateParts.length === 3) {
        var day = parseInt(dateParts[0]);
        var month = parseInt(dateParts[1]);
        var year = parseInt(dateParts[2]);

        if (day >= 1 && day <= 31 && month >= 1 && month <= 12) {
          var allocationFinYear;
          if (month >= 4) {
            allocationFinYear = year + "-" + (year + 1);
          } else {
            allocationFinYear = year - 1 + "-" + year;
          }
          $scope.savefund[index].allocationFinYear = allocationFinYear;
        } else {
          $scope.savefund[index].allocationFinYear = "";
        }
      } else {
        $scope.savefund[index].allocationFinYear = "";
      }
    };

    $scope.getCostIdOfProjectPlan = function (n) {
      $scope.costCentreId = n;
    };

    $scope.getCostIdOfBudgetAllocation = function (n) {
      $scope.allocationId = n;
      console.log($scope.allocationId, "id of selected record ");
    };

    $scope.getCostIdOffundTransfer = function (n) {
      $scope.serialNo = n;
      console.log($scope.serialNo, "id of selected record ");
    };

    $scope.cln = function () {
      $scope.form.costCentreCode = "";
      $scope.form.collegeCode = "";
    };



    var i;
    // $scope.formData = {};
    $scope.f = [];
    $scope.costId = [];
    $scope.getPlanNo = function (planNo) {
      if(planNo){
      $http.get(path + `/api/v1/account/projectplans/${planNo}`, config).then(
        function (response) {
          $scope.form = response.data;
          if ($scope.form) {
            $scope.getAccountType($scope.form.planTypeCode, j);
          }
          // console.log(" $scope.form", $scope.form);
          // console.log("$scope.form.universityCode",$scope.form.universityCode);
          if ($scope.form) {
            $scope.getUni($scope.form.universityCode);
          }
          $scope.formData = [];

          for (var i = 0; i < $scope.projectPlanCostCenter.length; i++) {
            if ($scope.form.planNo == $scope.projectPlanCostCenter[i].planNo) {
              $scope.formData.push($scope.projectPlanCostCenter[i]);
            }
          }

          // console.log("$scope.formData",$scope.formData)
          for (var j = 0; j < $scope.formData.length; j++) {
            $scope.costId[j] = {
              costCentreId: $scope.formData[j].costCentreId,
            };
          }
          console.log("$scope.formData", $scope.formData);

          for (var j = 0; j < $scope.formData.length; j++) {
            $scope.getClgDById($scope.formData[j].collegeCode, j);
            $scope.getUniversity($scope.formData[j].universityCode, j);
            $scope.getCostCenter($scope.formData[j].costCentreCode, j);
            $scope.getbank($scope.formData[j].bankAccountNo, j);
            $scope.gedept($scope.formData[j].departmentCode, j);
          }

          if ($scope.formData.length == 0) {
            var newField = {
              costCentreId: "",
              costCentreCode: "",
              collegeCode: "",
              coldscr: "",
              universityCode: "",
              unidscr: "",
              bankAccountNo: "",
              bankCode: "",
              bankdscr: "",
              scheduledStartDate: "",
              scheduledCompletionDate: "",
              actualStartDate: "",
              actualCompletionDate: "",
              approvalRefNo: "",
              approvalDate: "",
              approvingAuthority: "",
              executingAuthority: "",
            };
            $scope.formData.push(newField);
          }
        },
        function (error) {
          console.log("erroe has occured in All project plan data",error);
        }
      );
      }
    };

    //get cost center  data by id
    $scope.getUni = function (universityCode) {
      $http
        .get(path + `/api/v1/account/university/${universityCode}`, config)
        .then(
          function (response) {
            $scope.form.universityCode = response.data.universityCode;
            $scope.form.univerdscr = response.data.dscr;
            // console.log("university data by idd", $scope.form.universityCode,$scope.form.univerdscr);
          },
          function (error) {
            console.log("erroe has occured clg by id");
          }
        );
    };

    //get cost center  data by id
    $scope.getAccountType = function (account_type_code, index) {
      if(account_type_code){
      $http
        .get(path + `/api/v1/account/acctype/${account_type_code}`, config)
        .then(
          function (response) {
            $scope.form.accdscr = response.data.dscr;
            //  console.log("Accound data By dscr",$scope.form.accdscr);
          },
          function (error) {
            console.log("erroe has occured on Account Type");
          }
        );
        }
    };
    //get University data
    $scope.getUnidata = function () {
      $http.get(path + "/api/v1/account/university", config).then(
        function (response) {
          $scope.unidata = response.data;
          $scope.form.universityCode = response.data.universityCode;
          $scope.form.univerdscr = response.data.dscr;
          // console.log("get all University data",response.data)
        },
        function (error) {
          console.log("erroe has occured in all university data ");
        }
      );
    };
    $scope.getUnidata();

    //college data
    $scope.clgalldata = [];
    $scope.getclgData = function () {
      $http.get(path + "/api/v1/account/college", config).then(
        function (response) {
          $scope.clgalldata = response.data;
           console.log("get all College data",$scope.clgalldata)
        },
        function (error) {
          console.log("error has occured in all college data");
        }
      );
    };
    $scope.getclgData();

    //Employee Data
    $scope.empdata = {};
    $scope.getEmployeeData = function () {
      $http.get(path + "/api/v1/account/employees", config).then(
        function (response) {
          $scope.empdata = response.data;
          console.log("get all Employee data", response.data)
        },
        function (error) {
          console.log("error has occured in all Employe data");
        }
      );
    };
    $scope.getEmployeeData();

    //get all cost detail by id for budget allocation
    $scope.costAlldata = [];
    $scope.getAllCostCenterData = function () {
      $http.get(path + "/api/v1/account/cost", config).then(
        function (response) {
          $scope.costAlldata = response.data;
          //  console.log("All cost data ",$scope.costAlldata);
        },
        function (error) {
          console.log("erroe has occured cost center");
        }
      );
    };
    $scope.getAllCostCenterData();

    //get cost center  data by id
    $scope.getCostCenterById = function (costCentreCode, index) {
      if(costCentreCode){
      $http.get(path + `/api/v1/account/cost/${costCentreCode}`, config).then(
        function (response) {
          $scope.formData[index].costdscr = response.data.dscr;
          if (response.data.costCentreCode == "CO") {
            $scope.dpt = true;
          } else {
            $scope.dpt = false;
          }
        },
        function (error) {
          console.log("erroe has occured cost center by id");
        }
      );
      }
    };

    //get college data by id
    $scope.getClgDById = function (college_code, index) {
      if(college_code){
      $http.get(path + `/api/v1/account/college/${college_code}`, config).then(
        function (response) {
          $scope.formData[index].clgdscr = response.data.dscr;
          //  console.log("coll desc",response.data.dscr)
        },
        function (error) {
          console.log("erroe has occured clg by id");
        }
      );
      }
    };

    $scope.getUniversity = function (universityCode, index) {
      if(universityCode){
      $http.get(path + `/api/v1/account/university/${universityCode}`, config)
        .then(
          function (response) {
            $scope.formData[index].univerdscr = response.data.dscr;
            // console.log("university data by idd", $scope.formData)
          },
          function (error) {
            console.log("erroe has occured clg by id");
          }
        );
      }
    };

    //get bank data by id
    $scope.getbank = function (bankAccount, index) {
      if(bankAccount){
      $http.get(path + `/api/v1/account/bankacc/${bankAccount}`, config).then(
        function (response) {
          $scope.formData[index].bankdscr = response.data.dscr;
          // console.log("Detail by id Bank",$scope.formData.bankdscr);
        },
        function (error) {
          console.log("erroe has occured clg by id",error);
        }
      );
      }
    };

    //get bank data by id
    $scope.gedept = function (departmentCode, index) {
      if(departmentCode){
      $http.get(path + `/api/v1/account/department/${departmentCode}`, config)
        .then(
          function (response) {
            $scope.formData[index].deptdscr = response.data.dscr;
            // console.log("Detail by id department",response.data);
          },
          function (error) {
            console.log("erroe has occured Department by id", error);
          }
        );
      }
    };

    //get cost center  data by id
    $scope.getCostCenter = function (costCentreCode, index) {
      if(costCentreCode){
      $http.get(path + `/api/v1/account/cost/${costCentreCode}`, config).then(
        function (response) {
          $scope.formData[index].costdscr = response.data.dscr;
        },
        function (error) {
          console.log("erroe has occured cost center by id",error);
        }
      );
      }
    };

    //get university  data by id
    $scope.getUniversiryById = function (universityCode, index) {
      if(universityCode){
      $http.get(path + `/api/v1/account/university/${universityCode}`, config)
        .then(
          function (response) {
            $scope.universityData = response.data;
            $scope.formData[index].universityCode =
              response.data.universityCode;
            $scope.formData[index].univerdscr = response.data.dscr;
            // console.log("university data by id", $scope.universityData)
          },
          function (error) {
            console.log("erroe has occured clg by id");
          }
        );
      }
    };

    $scope.uData = [];
    //get college data by id
    $scope.getClgDataById = function (college_code, index) {
      if(college_code!=null){
      if(college_code){
      $http.get(path + `/api/v1/account/college/${college_code}`, config).then(
        function (response) {
          $scope.uData = response.data;
          $scope.formData[index].clgdscr = $scope.uData.dscr;
          var unicode = $scope.uData.universityCode;
          $scope.getUniversiryById(unicode, index);
        },
        function (error) {
          console.log("erroe has occured clg by id",error);
        }
      );
      }
    }else{
      $scope.formData[index].clgdscr="";
    }
    };

    $scope.bankDetail = [];
    $scope.cData = [];
    $scope.accountdetail = function () {
      $http
        .get(path + `/api/v1/account/bankacc`, config)
        .then(function (response) {
          //  $scope.bankD=response.data;
          $scope.bankDetail = response.data;
          //  console.log("$scope.bankDetail=response.data",$scope.bankDetail)
        });
    };
    $scope.accountdetail();

    //get bank data by id
    $scope.getbankDataById = function (bankAccount, index) {
      if(bankAccount){
      $http.get(path + `/api/v1/account/bankacc/${bankAccount}`, config).then(
        function (response) {
          $scope.formData[index].bankdscr = response.data.dscr;
          $scope.formData[index].bankCode = response.data.bankCode;
        },
        function (error) {
          console.log("erroe has occured clg by id",error);
        }
      );
      }
    };


    $scope.totalData = [];
    $scope.sanction = [];
    $scope.costId = [];
    // $scope.costBudget=[];
    $scope.projectplanData = [];
    $scope.saveCustdionsData = function () {
      var formdata1 = {
        planNo: $scope.form.planNo,
        planFinYear: $scope.form.planFinYear,
        planTypeCode: $scope.form.planTypeCode,
        universityCode: $scope.form.universityCode,
      };
      $scope.sanction = $scope.formData.filter((x) => {
        return x.costCentreId !== "";
      });
      console.log($scope.sanction, "filtered");
      $scope.sanction = $scope.formData.map((row, i) => {
        return { ...row, ...formdata1 };
      });
      console.log($scope.sanction, "filtered after merged");
      $scope.totalData = $scope.sanction;
      console.log("total data", $scope.totalData);

      //  if($scope.formData.$valid) {
      $http
        .post(
          path + "/api/v1/account/costCentre/datalst",
          $scope.sanction,
          config
        )
        .then(
          function (response) {
            $scope.projectplanData = response.data;
            console.log("data saved 1", response.data);
            if (response.data) {
              // $scope.getPlanNo($scope.projectplanData[0].planNo);
              $scope.getAllPlanCost($scope.projectplanData[0].planNo);
            }
            if ($scope.projectplanData) {
              $scope.getProjectPlanCostCenterAll();
            }
            for (var j = 0; j < $scope.projectplanData.length; j++) {
              $scope.costId[j] = {
                costCentreId: $scope.projectplanData[j].costCentreId,
              };
            }

            if (response.status === 200) {
              toastr.success("Data saved successfully!", "Success");
            } else {
              toastr.error("An error occurred while saving data.", "Error");
            }
          },
          function (error) {
            toastr.error("Please fill in all required fields!!",error);
          }
        );
      //   }else{
      //      alert("Filled All requirement!!")
      // //  toastr.error('An error occurred while saving data.', 'Error');
      //   }
    };

    //get all cost detail by id for budget allocation
    $scope.FundDatadetail = [];
    $scope.getAllFundTransferData = function () {
      $http.get(path + "/api/v1/account/fundTransfer/data", config).then(
        function (response) {
          $scope.FundDatadetail = response.data;
          // console.log("All Fund Transfer data ",$scope.FundDatadetail);
        },
        function (error) {
          console.log("erroe has occured fund Transfer");
        }
      );
    };
    $scope.getAllFundTransferData();

    $scope.planCostData = [];
    $scope.getAllPlanCost = function (planNo) {
      $http.get(path + `/api/v1/account/costCentre/all/${planNo}`, config).then(
        function (response) {
          $scope.planCostData = response.data;
          for (var i = 0; i < $scope.planCostData.length; i++) {
            $scope.formData[i] = $scope.planCostData[i];
          }

          for (var j = 0; j < $scope.formData.length; j++) {
            $scope.getClgDById($scope.formData[j].collegeCode, j);
            $scope.getUniversity($scope.formData[j].universityCode, j);
            $scope.getCostCenter($scope.formData[j].costCentreCode, j);
            $scope.getbank($scope.formData[j].bankAccountNo, j);
            $scope.gedept($scope.formData[j].departmentCode, j);
          }

          console.log("All Plan data by plan ", $scope.formData);
        },
        function (error) {
          console.log("erroe has occured project plan data");
        }
      );
    };

    //get all cost detail by id for budget allocation
    $scope.Budgetdetail = [];
    $scope.getAllBudgetDatat = function () {
      $http.get(path + "/api/v1/account/budgetAllocation/data", config).then(
        function (response) {
          $scope.Budgetdetail = response.data;
          // console.log("All budgetallocation data ",$scope.Budgetdetail);
        },
        function (error) {
          console.log("erroe has occured get cost id");
        }
      );
    };
    $scope.getAllBudgetDatat();

    //check id for Budget allocation
    $scope.detailbudget = [];
    $scope.d = [];
    $scope.getCheckIdBudget = function (costCentreId) {
      if(costCentreId){
      $http
        .get(
          path + `/api/v1/account/budgetAllocation/data/${costCentreId}`,
          config
        )
        .then(
          function (response) {
            $scope.d = response.data;
            {
              var newItem = {
                allocationId: "",
                collegeCode: "",
                coldscr: "",
                allocationDate: "",
                allocationFinYear: "",
                approvalRefNo: "",
                approvalDate: "",
                approvingAuthority: "",
                capitalAllocated: "",
                revenueAllocated: "",
                totalBudgetAllocated: "",
              };
              $scope.detailbudget.push(newItem);
            }
          },
          function (error) {
            console.log("erroe has occured get cost id");
          }
        );
      }
    };

    $scope.f = [];
    $scope.getCheckIdFund = function (costCentreId) {
      if(costCentreId){
      $http
        .get(path + `/api/v1/account/costCentre/${costCentreId}`, config)
        .then(
          function (response) {
            $scope.f = response.data;
            {
              var newRow = {
                transferSlNo: "",
                collegeCode: "",
                colidscr: "",
                bankTransactionId: "",
                transferDate: "",
                sanctionFinYear: "",
                approvalRefNo: "",
                approvingAuthority: "",
                capitalTransfer: "",
                revenueTransfer: "",
                totalFundTransfer: "",
              };
              $scope.savefund.push(newRow);
            }
          },
          function (error) {
            console.log("erroe has occured get cost id");
          }
        );
      }
    };

    $scope.BData = [];
    $scope.BudData = [];
    $scope.detailbudget = [];
    var dataArray = [];
    $scope.getCheckIdInBudget = function (costCentreId) {
     if(costCentreId){
      $http
        .get(path + `/api/v1/account/costCentre/${costCentreId}`, config)
        .then(
          function (response) {
            $scope.detailbudget = [];
            $scope.BData = [];
            $scope.BData = response.data;
            $scope.form.collegeCode = response.data.collegeCode;
            $scope.form.universityCode = response.data.universityCode;
            $scope.form.costCentreCode = response.data.costCentreCode;
            $scope.form.departmentCode = response.data.departmentCode;
            $scope.ClgGet($scope.form.collegeCode);
            $scope.uniGet($scope.form.universityCode);
            $scope.custdionType($scope.form.costCentreCode);
            $scope.dptget($scope.form.departmentCode);
            console.log("$scope.BData", $scope.BData);
            for (var a = 0; a < $scope.Budgetdetail.length; a++) {
              if (
                response.data.costCentreId ==
                $scope.Budgetdetail[a].costCentreId
              ) {
                $scope.detailbudget.push($scope.Budgetdetail[a]);
              }
            }
            if ($scope.detailbudget.length == 0) {
              var newItem = {
                allocationId: "",
                collegeCode: "",
                coldscr: "",
                allocationDate: "",
                allocationFinYear: "",
                approvalRefNo: "",
                approvalDate: "",
                approvingAuthority: "",
                capitalAllocated: "",
                revenueAllocated: "",
                totalBudgetAllocated: "",
              };
              $scope.detailbudget.push(newItem);
            }
          },
          function (error) {
            console.log(
              "erroe has occured project plan cost center data getCheckIdInBudget",
            );
          }
        );
     }
    };

    //get college data by id
    $scope.ClgGet = function (college_code) {
      $http.get(path + `/api/v1/account/college/${college_code}`, config).then(
        function (response) {
          $scope.form.clgdscr = response.data.dscr;
          console.log("dddddd", response.data.dscr);
        },
        function (error) {
          console.log("erroe has occured clgGet");
        }
      );
    };

    $scope.uniGet = function (universityCode, index) {
      $http
        .get(path + `/api/v1/account/university/${universityCode}`, config)
        .then(
          function (response) {
            $scope.form.univerdscr = response.data.dscr;
          },
          function (error) {
            console.log("erroe has occured in uniGet");
          }
        );
    };

    $scope.custdionType = function (costCentreCode, index) {
      $http.get(path + `/api/v1/account/cost/${costCentreCode}`, config).then(
        function (response) {
          $scope.form.costdscr = response.data.dscr;
        },
        function (error) {
          console.log("erroe has occured cost center by id");
        }
      );
    };

    $scope.dptget = function (departmentCode) {
      if(departmentCode){
      $http.get(path + `/api/v1/account/department/${departmentCode}`, config)
        .then(
          function (response) {
            $scope.form.dptdscr = response.data.dscr;
            // console.log("cost center data by id",response.data)
          },
          function (error) {
            console.log("erroe has occured cost center by id");
          }
        );
      }
    };

    //post data in Budget allocation
    $scope.detail = [];
    $scope.postBudget = function () {
      console.log("detail budger", $scope.detailbudget)
      $http
        .post(
          path + "/api/v1/account/budgetAllocations",
          $scope.detailbudget,
          config
        )
        .then(
          function successCallback(response) {
            if (response.status === 200) {
              $scope.getAllBudgetDatat();
              toastr.success("Data saved successfully!", "Success");
            } else {
              toastr.error("An error occurred while saving data.", "Error");
            }
            $scope.form.costCentreId = "";
            $scope.form.collegeCode = "";
            $scope.form.universityCode = "";
            $scope.form.clgdscr = "";
            $scope.form.univerdscr = "";
            $scope.form.costdscr = "";
            $scope.form.costCentreCode = "";
            $scope.form.departmentCode = "";
            $scope.form.dptdscr = "";
          },
          function errorCallback(response) {
            // console.log("Saving of data failed in budget allocation");
            toastr.error("An error occurred while saving data.", "Error");
          }
        );
    };

    $scope.clean = function (d) {
      $scope.detailbudget = [
        {
          costCentreCode: "",
          custdionDscr: "",
          collegeCode: "",
          clgdscr: "",
          universityCode: "",
          unidscr: "",
          allocationId: "",
          allocationDate: "",
          allocationFinYear: "",
          totalBudgetAllocated: "",
          capitalAllocated: "",
          revenueAllocated: "",
          approvingAuthority: "",
          approvalRefNo: "",
          approvalDate: "",
        },
      ];
    };

    $scope.cleanFund = function (d) {
      $scope.savefund = [
        {
          costCentreCode: "",
          custdionDscr: "",
          collegeCode: "",
          clgdscr: "",
          universityCode: "",
          univerdscr: "",
          transferSlNo: "",
          transferDate: "",
          allocationFinYear: "",
          totalFundTransfer: "",
          capitalTransfer: "",
          revenueTransfer: "",
          bankTransactionId: "",
          approvingAuthority: "",
          approvalDate: "",
          approvalRefNo: "",
        },
      ];
    };

    $scope.form1 = [];
    $scope.savefund = [];
    $scope.FData = [];
    $scope.getCheckIdInFund = function (costCentreId) {
      if(costCentreId){
      $http
        .get(path + `/api/v1/account/costCentre/${costCentreId}`, config)
        .then(
          function (response) {
            $scope.savefund = [];
            $scope.FData = [];
            $scope.FData.push(response.data);
            $scope.form1.collegeCode = response.data.collegeCode;
            $scope.form1.universityCode = response.data.universityCode;
            $scope.form1.costCentreCode = response.data.costCentreCode;
            $scope.form1.departmentCode = response.data.departmentCode;
            $scope.ClgGet1($scope.form1.collegeCode);
            $scope.uniGet1($scope.form1.universityCode);
            $scope.custdionType1($scope.form1.costCentreCode);
            $scope.dptget1($scope.form1.departmentCode);
            for (var a = 0; a < $scope.FundDatadetail.length; a++) {
              if (
                response.data.costCentreId ==
                $scope.FundDatadetail[a].costCentreId
              ) {
                $scope.savefund.push($scope.FundDatadetail[a]);
                // console.log("detail",$scope.detailbudget);
              } else {
                console.log("False");
              }
            }

            if ($scope.savefund.length == 0) {
              var newRow = {
                transferSlNo: "",
                collegeCode: "",
                colidscr: "",
                bankTransactionId: "",
                transferDate: "",
                sanctionFinYear: "",
                approvalRefNo: "",
                approvingAuthority: "",
                capitalTransfer: "",
                revenueTransfer: "",
                totalFundTransfer: "",
              };
              $scope.savefund.push(newRow);
            }
          },
          function (error) {
            console.log(
              "erroe has occured project plan cost center data getCheckIdInFund" );
          }
        );
      }
    };

    //get college data by id
    $scope.ClgGet1 = function (college_code) {
      $http.get(path + `/api/v1/account/college/${college_code}`, config).then(
        function (response) {
          console.log("college data", response.data);
          $scope.form1.clgdscr = response.data.dscr;
          console.log("dddddd", response.data.dscr);
          // console.log("college name",$scope.dataArray)
        },
        function (error) {
          console.log("erroe has occured clgGet");
        }
      );
    };

    $scope.uniGet1 = function (universityCode, index) {
      $http
        .get(path + `/api/v1/account/university/${universityCode}`, config)
        .then(
          function (response) {
            console.log("university data", response.data);
            $scope.form1.univerdscr = response.data.dscr;
            // console.log("university name", $scope.dataArray)
          },
          function (error) {
            console.log("erroe has occured in uniGet");
          }
        );
    };

    $scope.custdionType1 = function (costCentreCode, index) {
      $http.get(path + `/api/v1/account/cost/${costCentreCode}`, config).then(
        function (response) {
          $scope.form1.costdscr = response.data.dscr;
        },
        function (error) {
          console.log("erroe has occured cost center by id");
        }
      );
    };
    $scope.dptget1 = function (departmentCode, index) {
      if(departmentCode){
      $http.get(path + `/api/v1/account/department/${departmentCode}`, config)
        .then(
          function (response) {
            $scope.form1.dptdscr = response.data.dscr;
            // console.log("cost center data by id",response.data)
          },
          function (error) {
            console.log("erroe has occured cost center by id");
          }
        );
      }
    };

    $scope.postFund = function () {
      $http
        .post(path + "/api/v1/account/fundTransfers", $scope.savefund, config)
        .then(
          function successCallback(response) {
            if (response.status === 200) {
              $scope.getAllFundTransferData();
              toastr.success("Data saved successfully!", "Success");
            } else {
              toastr.error("An error occurred while saving data.", "Error");
            }
            $scope.form.costCenterId = "";
            $scope.form.collegeCode = "";
            $scope.form.universityCode = "";
            $scope.form.clgdscr = "";
            $scope.form.univerdscr = "";
            $scope.form.costdscr = "";
            $scope.form.costCentreCode = "";
            $scope.form.departmentCode = "";
            $scope.form.dptdscr = "";
          },
          function (error) {
            // console.log("error in Fund Transfer");
            toastr.error("An error occurred while saving data.", "Error",error);
          }
        );
    };

    $scope.getProjectPlanAll = function () {
      $http.get(path + "/api/v1/account/projectplan/alldata", config).then(
        function (response) {
          $scope.projectplanAlldata = response.data;
          //  console.log(" project plan All data",$scope.projectplanAlldata);
        },
        function (error) {
          console.log("erroe has occured project plan data");
        }
      );
    };
    $scope.getProjectPlanAll();

    //get All project plan cost center data
    $scope.projectPlanCostCenter = [];
    $scope.getProjectPlanCostCenterAll = function () {
      $http.get(path + "/api/v1/account/costCentre/alldata", config).then(
        function (response) {
          $scope.projectPlanCostCenter = response.data;
          console.log(" project plan cost center All data",$scope.projectPlanCostCenter);
        },
        function (error) {
          console.log(
            "erroe has occured project plan cost center data getProjectPlanCostCenterAll"
          );
        }
      );
    };
    $scope.getProjectPlanCostCenterAll();

    //get All Department data
    $scope.departmentData = [];
    $scope.getDepartmentAll = function () {
      $http.get(path + "/api/v1/account/department", config).then(
        function (response) {
          $scope.departmentData = response.data;
           console.log("All department data",$scope.departmentData);
        },
        function (error) {
          console.log("erroe has occured department data",error);
        }
      );
    };
    $scope.getDepartmentAll();

    $scope.getDeptDscr = function (departmentCode, index) {
      console.log("status",departmentCode)
      if(departmentCode!=null){
      if(departmentCode){
      $http.get(path + `/api/v1/account/department/${departmentCode}`, config)
        .then(
          function (response) {
            $scope.formData[index].deptdscr = response.data.dscr;
            console.log("Department data by id", response.data);
          },
          function (error) {
            console.log("erroe has occured cost center by id", $scope.formData);
          }
        );
      }
    }else{
      console.log("True");
      $scope.formData[index].deptdscr="";
    }
    };


    var ppcd;
    $scope.deleteDataModel = {};
    $scope.setDeleteData2 = function (data,index) {
      ppcd=index;
      $('#deleteConfirmationModal2').modal('show');
      $scope.deleteDataModel = angular.copy(data);      
  };

        $scope.deleteCostId = function (costCentreId) { 
          console.log("costCentreId",costCentreId.type)
         if(costCentreId){
          $http.delete(path + `/api/v1/account/costCenter/${costCentreId}`, config)
            .then(function (response) {
              console.log("response data",response.status)
              if (response.status == '200') {
                $scope.deleteCust(ppcd);
                  toastr.success('Data Deleted successfully!', 'Success');
                  $('#deleteConfirmationModal2').modal('hide');
              }
              if(response.status == '400'){
                toastr.error('It is in Used you can not Delete!', 'error');
                $('#deleteConfirmationModal2').modal('hide');
              }
            },
              function (error) {
                toastr.error('Data Is in Used ! You can not Delete', 'error',error);
                $('#deleteConfirmationModal2').modal('hide');
              }
            );
         }else{
          $scope.deleteCust(ppcd);
          $('#deleteConfirmationModal2').modal('hide');
         }

        };

    $scope.deleteBudget = function (index) {
      $scope.detailbudget.splice(index, 1);     
    };

        //data set for delete model
        var db;
        $scope.deleteDataModel = {};
        $scope.setDeleteData = function (data,index) {
          $('#deleteConfirmationModal').modal('show');
          $scope.deleteDataModel = angular.copy(data);
          db=index;      
         
      };

    //delete data of Budget Allocation
    $scope.deleteCostIdOfBudget = function (planNo, planFinYear, planTypeCode, costCentreId, allocationId) {
      $http
        .delete(path + `/api/v1/account/budgetAllocation/${planNo}/${planFinYear}/${planTypeCode}/${costCentreId}/${allocationId}`,config )
        .then(
          function (response) {
            console.log("response",response)       
            if (response.status == "200") {
              $scope.deleteBudget(db);
              toastr.success("Data Deleted successfully!", "Success");
              $('#deleteConfirmationModal').modal('hide');
              $('.modal').removeClass('show');
              
            }
          },
          function (error) {
            toastr.error("Data Is in Used ! You can not Delete", "error",{timeOut: 3000});
            $('#deleteConfirmationModal').modal('hide');         
          }
        );
    };

    $scope.deleteFund = function(index) {
      $scope.savefund.splice(index, 1);
  };

    $scope.deleteDataModel = {};
    $scope.setDeleteData1 = function (data,index) {
      fa=index;
      $('#deleteConfirmationModal1').modal('show');
      $scope.deleteDataModel = angular.copy(data);      
  };

     //delete data of Fund Transfer
    $scope.deleteCostIdOfFund = function (planNo, planFinYear, planTypeCode, costCentreId, transferSlNo) {
      $http
        .delete(path + `/api/v1/account/fundTransfer/${planNo}/${planFinYear}/${planTypeCode}/${costCentreId}/${transferSlNo}`, config)
        .then(
          function (response) {
            if (response.status == "200") {
              $scope.deleteFund(fa); 
              toastr.success("Data Deleted successfully!", "Success",{timeOut: 3000}); 
              $('#deleteConfirmationModal1').modal('hide');            
            }
          },
          function (error) {
            toastr.error("Data Is in Used ! You can not Delete", "error",{timeOut: 3000}); 
            $('#deleteConfirmationModal1').modal('hide');
          }
        );
    };

    // Validation method to calculate the total fund transfer
    $scope.calculatebudget = function (s, p, index) {
      $scope.totalBudgetAllocated = parseFloat(s) + parseFloat(p);
      console.log("$scope.detailbudget", $scope.totalBudgetAllocated);
      $scope.detailbudget[index].totalBudgetAllocated =
        $scope.totalBudgetAllocated;
      //console.log("Total",$scope.detailbudget)
    };

    $scope.calculatefund = function (s, p, index) {
      $scope.totalFundTransfer = parseFloat(s) + parseFloat(p);
      console.log("$scope.detailbudget", $scope.detailbudget);
      $scope.savefund[index].totalFundTransfer = $scope.totalFundTransfer;
      // $scope.totalBudgetAllocated=$scope.detailbudget
      console.log("Total", $scope.detailbudget);
    };




    $scope.detailbudget = [];
    $scope.detailbudget = [
      {
        allocationId: "",
        collegeCode: "",
        coldscr: "",
        allocationDate: "",
        allocationFinYear: "",
        approvalRefNo: "",
        approvalDate: "",
        approvingAuthority: "",
        capitalAllocated: "",
        revenueAllocated: "",
        totalBudgetAllocated: "",
      },
    ];

    $scope.addRow = function () {
      var newItem = {
        allocationId: "",
        collegeCode: "",
        coldscr: "",
        allocationDate: "",
        allocationFinYear: "",
        approvalRefNo: "",
        approvalDate: "",
        approvingAuthority: "",
        capitalAllocated: "",
        revenueAllocated: "",
        totalBudgetAllocated: "",
      };
      $scope.detailbudget.push(newItem);
    };


    


    $scope.savefund = [];
    $scope.savefund = [
      {
        transferSlNo: "",
        collegeCode: "",
        colidscr: "",
        bankTransactionId: "",
        transferDate: "",
        sanctionFinYear: "",
        approvalRefNo: "",
        approvingAuthority: "",
        capitalTransfer: "",
        revenueTransfer: "",
        totalFundTransfer: "",
      },
    ];

    // Function to add a new row
    $scope.addNewRow = function () {
      var newRow = {
        transferSlNo: "",
        collegeCode: "",
        colidscr: "",
        bankTransactionId: "",
        transferDate: "",
        sanctionFinYear: "",
        approvalRefNo: "",
        approvingAuthority: "",
        capitalTransfer: "",
        revenueTransfer: "",
        totalFundTransfer: "",
      };
      $scope.savefund.push(newRow);
    };

    // $scope.deleteFund = function (index) {
    //   for (var i = $scope.savefund.length - 1; i >= 0; i--) {
    //       $scope.savefund.splice(index, 1);
    //   }
    // };


    $scope.formData = [];
    $scope.formData = [
      {
        costCentreId: "",
        costCentreCode: "",
        collegeCode: "",
        coldscr: "",
        universityCode: "",
        unidscr: "",
        bankAccountNo: "",
        bankCode: "",
        bankdscr: "",
        scheduledStartDate: "",
        scheduledCompletionDate: "",
        actualStartDate: "",
        actualCompletionDate: "",
        approvalRefNo: "",
        approvalDate: "",
        approvingAuthority: "",
        executingAuthority: "",
      },
    ];

    $scope.addFields = function () {
      var newField = {
        costCentreId: "",
        costCentreCode: "",
        collegeCode: "",
        coldscr: "",
        universityCode: "",
        unidscr: "",
        bankAccountNo: "",
        bankCode: "",
        bankdscr: "",
        scheduledStartDate: "",
        scheduledCompletionDate: "",
        actualStartDate: "",
        actualCompletionDate: "",
        approvalRefNo: "",
        approvalDate: "",
        approvingAuthority: "",
        executingAuthority: "",
      };
      $scope.formData.push(newField);
    };

    $scope.deleteCust = function (index) {
      for (var i = $scope.formData.length - 1; i >= 0; i--) {
          $scope.formData.splice(index, i);
      }
    };

    if ($scope.formData.length === 0) {
      $scope.addFields();
    }

    $scope.totalPages = 5;
    $scope.t = 5; // Total number of pages
    $scope.currentPage = 0; // Initialize the current page to the first page (0-based index)

    $scope.goToFirst = function () {
      $scope.currentPage = 0;
    };

    $scope.goToPrevious = function () {
      if ($scope.currentPage > 0) {
        $scope.currentPage--;
      }
    };

    $scope.goToNext = function () {
      if ($scope.currentPage < $scope.totalPages - 1) {
        $scope.currentPage++;
      }
    };

    $scope.goToLast = function () {
      $scope.currentPage = $scope.totalPages - 1;
    };

    function getQueryParam(name) {
      const urlParams = new URLSearchParams(window.location.search);
      const paramValue = urlParams.get(name);
      try {
        return JSON.parse(paramValue);
      } catch (error) {
        console.error(`Error parsing query parameter '${name}':`, error);
        return null;
      }
    }
    // $scope.nObject = getQueryParam("n");
    if ($rootScope.data) {
      $scope.getPlanNo($rootScope.data.planNo);
      $scope.getCheckIdBudget($rootScope.data.costCentreId);
      $scope.getCheckIdFund($rootScope.data.costCentreId);
    }

    app.directive("formatNumber", [
      "$filter",
      function ($filter) {
        return {
          require: "?ngModel",
          link: function (scope, elem, attrs, ngModel) {
            if (!ngModel) return;
            ngModel.$formatters.push(function (value) {
              return $filter("number")(value);
            });
            ngModel.$parsers.push(function (value) {
              var plainNumber = value.replace(/,/g, "");
              elem.val($filter("number")(plainNumber));
              return plainNumber;
            });
          },
        };
      },
    ]);


    $scope.scrollToTab2 = function() {
      var element = document.getElementById('tab2');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }


  }
);
