app.controller(
  "suppBillDetsCtrl",
  function ($scope, $http, $window, $rootScope) {
    $scope.details = [];
    const token = $window.sessionStorage.getItem("token");
    var config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    $scope.formSubmitted = false;
    $scope.savebilldetails2 = function () {
      console.log("amalwa")
      alert("amal")
    }
    $scope.savebilldetails = function () {
      console.log("hgfhgfh");
      $http.post(path + "/api/v1/account/suppbill/data", $scope.form, config)
        .then(
          function successCallback(response) {
            if (response.status == 200) {
              $scope.data = response.data;
              console.log("supplierbill>>>>>>>>>>>>", response);
              $scope.formSubmitted = true;
              // $scope.form = {};
              // $window.location.href = "supplierbilldata.html";
            }
            if (response.status === 200) {
              toastr.success("Data saved successfully!", "Success");
            } else {
              toastr.error("An error occurred while saving data.", "Error");
            }
          },
          function errorCallback(response) {
            // alert("Supplier Bill Not Saved Successfully");
            toastr.error("Deleted Not Successfully");
          }
        );
    };

    $scope.data = [];
    $scope.getdata = function () {
      $http.get(path + "/api/v1/account/po", config).then(
        function successCallback(response) {
          $scope.data = response.data;
          console.log("purchase order >>>", $scope.data);
        },
        function errorCallback(response) {
          console.log("saving of data failed", response);
        }
      );
    };

    $scope.getdata();
    $scope.bPvData = [];
    $scope.getBpvData = function () {
      $http.get(path + "/api/v1/account/bpv", config).then(function (response) {
        $scope.bPvData = response.data;
        console.table("amalaaaa",$scope.bPvData);
      }).catch(function (error) {
        console.log("errr", error);
      })
    };
    $scope.getBpvData();


    $scope.billStatusData = [];
    $scope.getBillStatusData = function () {
      $http.get(path + "/api/v1/account/billstatus/", config).then(function (response) {
        $scope.billStatusData = response.data;
        console.table("amal", $scope.billStatusData);
      }).catch(function (error) {
        console.log("errr", error);
      })
    };
    $scope.getBillStatusData();

    $scope.setBankPvFinYear = (bankPvId) => {
      for (let i = 0; i < $scope.bPvData.length; i++) {
        const element = $scope.bPvData[i];
        console.log(element);
        if (bankPvId == element.bankPvId) {
          $scope.form = element.finYear;
        }

        
      }
    }



    $scope.employeeData = [];
    $scope.getEmployeeData = function () {
      $http.get(path + "/api/v1/account/employees", config).then(
        function successCallback(response) {
          if(response.status ==200){
            $scope.employeeData = response.data;
            console.log("purchase order>>>>>>>>>>>>", $scope.data);
          }
        },
        function errorCallback(response) {
          console.log("saving of data failed",response);
        }
      );
    };
    $scope.getEmployeeData();

    $scope.setEmpName= function (staffNo) {arguments                                                                                                                                   
      $scope.employeeData.forEach((element) => {
        if (element.staffNo == staffNo) {
          $scope.employeeNameCirtifiedBy = element.fullName;
          $scope.employeeNameEnterBy = element.fullName;
          console.log("cccc", $scope.employeeName, "jjj", $scope.employeeName1)
          // form.certifiedBy
        }
      });
      // $scope.form.vendorName = name
    };


    $scope.getByPk = function (poid, pofinyear, billslno) {
      console.log("UKey objectk", poid, pofinyear, billslno);
      $http
        .get(
          path + `/api/v1/account/suppbill/${poid}/${pofinyear}/${billslno}`,
          config
        )
        .then(
          function successCallback(response) {
            console.log("sanction data", response.data);
            $scope.form = response.data;
            $scope.change(response.data?.poId);
          },
          function errorCallback(response) {
            console.log("Unable to update  request");
          }
        );
    };

    $scope.suppdata = [];
    $scope.getsuppdata = function () {
      $http.get(path + "/api/v1/account/suppbill/alldata", config).then(
        function successCallback(response) {
          $scope.suppdata = response.data;
          console.log("supplierbill order>>>>>>>>>>>>", $scope.suppdata);
        },
        function errorCallback(response) {
          console.log("saving of data failed");
        }
      );
    };
    $scope.getsuppdata();
    $scope.projectPlanDataDisable = false;

    $scope.change = function (n) {
      // Ensure $scope.form is defined
      // $scope.data.splice(index)
      // var poid = document.getElementById('poid')
      // poid.innerText = n;

      // const selectElement = document.getElementById("poid");
      // // selectElement.addEventListener("change",function())
      // const selectedOption=selectElement.options[selectElement.selectedIndex];
      // selectedOption.remove();

      if (!$scope.form) {
        $scope.form = {};
      }
      $scope.projectPlanDataDisable = true;
      for (var i = 0; i < $scope.data.length; i++) {
        var row = $scope.data[i];
        if (row.poId == n) {
          console.log("row",row);
          $scope.form.poFinYear = row.poFinYear;
          $scope.form.poNumber = row.poNumber;
          $scope.form.poDate = row.poDate;
          $scope.form.vendorCode = row.vendorCode;
          $scope.form.planNo = row.planNo;
          $scope.form.planFinYear = row.planFinYear;
          $scope.form.planTitle = row.planTitle;
          $scope.form.planTypeCode = row.planTypeCode;
          $scope.form.costCenterId = row.costCentreId;
          $scope.form.departmentCode = row.departmentCode;
          $scope.form.collegeCode = row.collegeCode;
          $scope.form.universityCode = row.universityCode;
          // $scope.form.postatus =  row.poStatusCode === "1" ? "Active" : "Inactive";
          $scope.form.postatus = row.poStatusCode === 1 ? "Active" : "Inactive";
          $scope.form.planTitle = $scope.getprojectplsndscr(row.planTypeCode);
          //$scope.findDesc(row.costCentreId, row.departmentCode, row.collegeCode, row.universityCode);
          $scope.setVenNameFromSupp(row.vendorCode);
          $scope.setdeptdscr(row.departmentCode);
          $scope.setunidscr(row.universityCode);
          $scope.setcllgdscr(row.collegeCode);
          break; // Exit the loop if a match is found
        }
      }
    };

    $scope.getprojectplsndscr = function (n) {
      for (let index = 0; index < $scope.projectplan.length; index++) {
        var element = $scope.projectplan[index];
        if (n === element.planTypeCode) {
          return element.planTitle;
        }
      }
    };

    $scope.projectplan = [];
    $scope.projectplan = function () {
      $http.get(path + "/api/v1/account/projectplan/alldata", config).then(
        function (response) {
          $scope.projectplan = response.data;
          console.log("supplier>>>>>>>>>>>>>>>>>", response.data);
        },
        function errorCallback(response) {
          console.log("error ");
        }
      );
    };
    $scope.projectplan();

    $scope.supplier = [];
    $scope.getSupplier = function () {
      $http.get(path + "/api/v1/account/supplier", config).then(
        function (response) {
          $scope.supplier = response.data;
          console.log("supplier", response.data);
        },
        function errorCallback(response) {
          console.log("error ");
        }
      );
    };
    $scope.getSupplier();

    $scope.setVenNameFromSupp = function (code) {
      $scope.supplier.forEach((element) => {
        if (element.vendorCode == code) {
          $scope.form.vendorName = element.fullName;
        }
      });
      // $scope.form.vendorName = name
    };

    $scope.universityData = [];
    ($scope.getUnidata = function () {
      $http.get(path + "/api/v1/account/university", config).then(
        function (response) {
          $scope.universityData = response.data;
          console.log($scope.universityData);
        },
        function (response) {
          console.log("Error in fetching data from university table");
        }
      );
    })();

    $scope.setunidscr = function (code) {
      $scope.universityData.forEach((element) => {
        if (element.universityCode == code) {
          $scope.form.unidscr = element.dscr;
          console.log(element.dscr);
        }
      });
      // $scope.form.vendorName = name
    };
    $scope.department = [];
    $scope.getDepartment = function () {
      $http.get(path + "/api/v1/account/department", config).then(
        function (response) {
          $scope.department = response.data;
          console.log("Department", response.data);
        },
        function errorCallback(response) {
          console.log("error ");
        }
      );
    };
    $scope.getDepartment();

    $scope.setdeptdscr = function (code) {
      $scope.department.forEach((element) => {
        if (element.departmentCode == code) {
          $scope.form.deptdscr = element.dscr;
          console.log(element.dscr);
        }
      });
      // $scope.form.vendorName = name
    };

    $scope.collegeData = [];
    $scope.getCollagedata = function () {
      $http.get(path + "/api/v1/account/college", config).then(
        function successCallback(response) {
          $scope.collegeData = response.data;
          console.log("Collage Data>>", $scope.collegeData);
        },
        function errorCallback(response) {
          console.log("Error fetching colllege data");
        }
      );
    };
    $scope.getCollagedata();
    $scope.setcllgdscr = function (code) {
      $scope.collegeData.forEach((element) => {
        if (element.collegeCode == code) {
          $scope.form.cllgdscr = element.dscr;
          console.log(element.dscr);
        }
      });
      // $scope.form.vendorName = name
    };
    $scope.hideflag = false;
    // Function to get the value of a query parameter by name
    
    $scope.handleLink = function (pgname) {
      $rootScope.handleLink(pgname);
    };

    console.log("Value of n:", $rootScope.data);
    if ($rootScope.data) {
      $scope.hideflag = true;
      $scope.getByPk(
        $rootScope.data.poId,
        $rootScope.data.poFinYear,
        $rootScope.data.billSlNo
      );
    }
  }
);
