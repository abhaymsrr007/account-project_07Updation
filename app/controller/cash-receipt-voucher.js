app.controller(
  "cashRecVouCtrl",
  function ($scope, $http, $timeout, $window, $rootScope, $filter) {
    $scope.details = [];
    $scope.flag1 = false;
    $scope.flag2 = false;
    $scope.flag3 = false;
    $scope.hideFlag = false;
    $scope.terte = 10;
    $scope.flag = false;
    $scope.vflag = false;
    $scope.sflag = false;
    $scope.assistantStaffNo = "";
    $scope.t = {};
    $scope.cform = {};
    const token = $window.sessionStorage.getItem("token");
    const userDetailsJSON = $window.sessionStorage.getItem("userDetails");
    $scope.role = JSON.parse(
      $window.sessionStorage.getItem("roles")
    )[0].dscr.toLowerCase();
    var config = { headers: { Authorization: "Bearer " + token } };
    const t = $window.sessionStorage.getItem("tempRole");
    $scope.tempRole = JSON.parse(t) || null;
    // // console.log("kkkkkk>>>", userDetailsJSON);
    // // console.log(">>>>>>tempRole", $scope.tempRole);
    if (userDetailsJSON) {
      const userDetails = JSON.parse(userDetailsJSON);
      // // console.log("😒😒😒😒",userDetails)
      if (token != null || token != "") {
        $scope.details = angular.copy(userDetails);
        $scope.role = $scope.tempRole ? $scope.tempRole.role : $scope.role;
        // // console.log("details", $scope.details)
        $scope.token = $scope.details.token;
        if ($scope.tempRole?.role === "assistant") {
          // // console.log("admin2", $scope.tempRole?.role)
          $scope.assistantStaffNo = $scope.details.staffNo;
          $scope.assistantName = $scope.details.name;
          // console.log("check1", $scope.assistantStaffNo);
        } else if ($scope.tempRole?.role === "manager") {
          // // console.log("admin", $scope.tempRole.role)
          $scope.managerStaffNo = $scope.details.staffNo;
          $scope.cform.managerStaffNo = $scope.details.staffNo;
          $scope.managerName = $scope.details.name;
        } else {
          if ($scope.tempRole?.role === "cashier") {
            // // console.log("check3", $scope.tempRole.role)
            $scope.cashierName = $scope.details.name;
            $scope.mgrcashStaffNo = $scope.details.staffNo;
            $scope.cform.mgrcashStaffNo = $scope.details.staffNo;
          }
        }
        if ($scope.role === "assistant") {
          console.log("asst");
          $scope.assistantStaffNo = $scope.details.staffNo;
          // $scope.getEmpData();
          // $scope.setAssisName($scope.assistantStaffNo);
          $scope.cform.assistantStaffNo = $scope.details.staffNo;
          $scope.assistantName = $scope.details.name;
        } else if ($scope.role === "cashier") {
          $scope.cashierName = $scope.details.name;
          $scope.mgrcashStaffNo = $scope.details.staffNo;
          $scope.cform.mgrcashStaffNo = $scope.details.staffNo;
          // $scope.assistantName = $scope.details.name;
        } else {
          if ($scope.role === "manager") {
            $scope.managerStaffNo = $scope.details.staffNo;
            $scope.cform.managerStaffNo = $scope.details.staffNo;
            $scope.managerName = $scope.details.name;
          }
          // // console.log(">>>>>>>>>>>>>>>>>>S>>>", $scope.cform.manager);
          // $scope.manager = $scope.details?.username;
        }
        // $scope.cform.assistantStaffNo  = userDetails.username;
      }
    } else {
      $window.location.href = "index.html";
      // console.log('User details not found in sessionStorage');
    }
    $scope.logout = function () {
      $window.sessionStorage.removeItem("userDetails");
      $window.sessionStorage.removeItem("tempRole");
      $window.location.href = "index.html";
    };

    $timeout(function () {
      $scope.cform.voucherStatusCode = "U";
      $scope.sflag = true;
    });
    $scope.glgroupData = [];
    $scope.cform = {};
    $scope.crvds = [];
    $scope.crvds.push({});
    //get transaction data

    $scope.payeeTypeData = [];
    $scope.getPayeeTypeData = function () {
      $http.get(path + "/api/v1/account/paytotype", config).then(
        function (res) {
          //console.log("response", res.data)
          $scope.payeeTypeData = res.data;
          //console.log("$scope.payeeTypeData", $scope.payeeTypeData)
        },
        function (err) {
          console.log(err);
        }
      );
    };
    $scope.getPayeeTypeData();
    $scope.empData = [];
    // $scope.getEmpData = function () {
    $http
      .get(path + "/api/v1/account/employees", config)
      .then(function (response) {
        $scope.empData = response.data;
        // // console.log("$scope.empData", $scope.empData);
      });
    // };

    $scope.plancostcenter = [];
    $scope.getplancostcenter = function () {
      $http.get(path + "/api/v1/account/costCentre/alldata", config).then(
        function (res) {
          // // console.log("response", res.data)
          $scope.plancostcenter = res.data;
          //  // console.log("$scope.plancostcenter", $scope.plancostcenter)
        },
        function (err) {
          console.log(err);
        }
      );
    };
    $scope.getplancostcenter();
    $scope.bankaccountData = [];
    $scope.getdata = function () {
      $http.get(path + "/api/v1/account/bankacc", config).then(
        function successCallback(response) {
          $scope.bankaccountData = response.data;
        },
        function errorCallback(response) {
          // console.log("saving of data failed");
        }
      );
    };
    $scope.getdata();
    // selectplan
    $scope.getbankdeatil = function (bankAccountNo) {
      if (bankAccountNo) {
        // console.log("lollllllll", bankAccountNo);
        for (let index = 0; index < $scope.bankaccountData.length; index++) {
          const element = $scope.bankaccountData[index];
          if (element.bankAccountNo === bankAccountNo) {
            // // console.log("yessssssss", element);
            $scope.cform.bankCode = element.bankCode;
            $scope.cform.bankDscr = element.dscr;
            return;
          }
        }
      }
    };
    $scope.addObj = function () {
      $scope.crvds.push({});
    };
    $scope.setAssisName = function (staffNo) {
      if (staffNo) {
        // console.log("emp Data 7878787", $scope.empData);
        for (let i = 0; i < $scope.empData.length; i++) {
          const row = $scope.empData[i];
          if (row.staffNo === staffNo) {
            if ($scope.role === "assistant") {
              $scope.assistantStaffNo = row.staffNo;
              $scope.cform.assistantStaffNo = row.staffNo;
              // // console.log("fnc amal trigger", $scope.t.assistantName, $scope.assistantStaffNo, $scope.cform.assistantStaffNo);
            } else if ($scope.role === "cashier") {
              $scope.cashierName = row.fullName;
              $scope.cform.mgrCashStaffNo = row.staffNo;
              $scope.t.mgrCashStaffNo = row.staffNo;
            } else {
              if ($scope.role === "manager") {
                $scope.cform.managerStaffNo = row.staffNo;
                $scope.managerStaffNo = row.staffNo;
              } else {
                console.error("Role is ----->", $scope.role);
              }
            }
          }
        }
      }
    };

    $scope.saveCashForm = function () {
      // const role = $scope.role;
      const voucherStatusCode = $scope.cform.voucherStatusCode;
      $scope.cform.sectionCode = $scope.details.sectionCode;
      if (voucherStatusCode === "P" && role === "manager") {
        $http
          .get(
            `${path}/api/v1/account/crv/passed/${$scope.cform.bankPvNo || 0}`,
            config
          )
          .then((response) => {
            // console.log("got it🚗🚗🚗🚗>>>>>", response);
            if (response.data.status != 0) {
              $scope.res = response.data.count + 1;
              $scope.cform.bankPvNo = $scope.res;
              const inputDate = new Date();
              const day = inputDate.getDate().toString().padStart(2, "0");
              const month = (inputDate.getMonth() + 1)
                .toString()
                .padStart(2, "0");
              const year = inputDate.getFullYear();
              $scope.cform.bankPvDate = `${day}-${month}-${year}`;
            }
            $scope.postDataToServer();
          })
          .catch((error) => {
            throw error;
          });
        $scope.getbankdeatil($scope.cform.bankAcNo);
      }

      // Assistant-specific logic
      if (
        $scope.role === "assistant" &&
        (voucherStatusCode === "F" || voucherStatusCode === "U")
      ) {
        $scope.cform.assistantStaffNo = $scope.details.staffNo;
        $scope.postDataToServer();
      }
      // manager-specific logic
      if (voucherStatusCode === "R" && $scope.role === "manager") {
        $scope.postDataToServer();
      }
      if ($scope.role === "manager") {
        $scope.cform.managerStaffNo = $scope.details.staffNo;
      }
      if (
        (voucherStatusCode === "A" ||
          voucherStatusCode === "C" ||
          voucherStatusCode === "P") &&
        $scope.role === "cashier"
      ) {
        $scope.mgrCashStaffNo = $scope.details.staffNo;
        $scope.cform.mgrCashStaffNo = $scope.details.staffNo;
        $scope.postDataToServer();
      } else {
        // console.log("not save yet")
      }
    };
    // Common logic for saving data to Bank Payment Voucher table
    $scope.postDataToServer = () => {
      $scope.cform = Object.fromEntries(
        Object.entries($scope.cform).filter(([_, value]) => value)
        );
      $scope.cform.voucherNetAmount = $scope.cform.voucherNetAmount || 0;
      console.log("posting data>>>>>>>>", $scope.cform);
      $http
        .post(path + "/api/v1/account/crv", $scope.cform, config)
        .then((response) => {
          toastr.success("Cash Receipt Voucher Saved !","Successfull");
          $scope.getCashRv(response.data?.cashRvId, response.data?.finYear);
        })
        .catch((error) => {
          toastr.error("ERROR", "Something Went Wrong !!");
          // Handle the error here or propagate it to the calling code
          console.error(error);
          throw error;
        });
    };

    //Fetching Voucher Type table
    $scope.voucherType = [];
    $scope.getVoucherType = function () {
      $http.get(path + "/api/v1/account/vst", config).then(
        function successCallback(response) {
          $scope.voucherType = response.data;
          //  // console.log("$scope.voucherType>>>>>>", $scope.voucherType)
          $scope.cform = {
            voucherStatusCode:
              $scope.voucherType?.length > 0
                ? $scope.voucherType[0].voucherStatusCode
                : null,
          };
        },
        function errorCallback(response) {
          // // console.log("Error fetching colllege data")
        }
      );
    };
    $scope.getVoucherType();
    $scope.uniquePayToTypes = function (bPvData) {
      var uniqueTypes = {};
      var uniqueList = [];
      for (var i = 0; i < bPvData.length; i++) {
        var typeCode = bPvData[i].payFromTypeCode;
        if (!uniqueTypes[typeCode]) {
          uniqueTypes[typeCode] = true;
          uniqueList.push(bPvData[i]);
        }
      }
      return uniqueList;
    };

    $scope.getEmpDscr = function (staffNo) {
      if (staffNo) {
        // console.log("staff No", staffNo)
        for (let i = 0; i < $scope.empData.length; i++) {
          let row = $scope.empData[i];
          if (staffNo == row.staffNo) {
            // // console.log("row", row)
            $scope.cform.empDscr = row.fullName;
            $scope.cform.address = row.addr1;
            $scope.cform.departmentCode = row.departmentCode;
            $scope.setDepDscr(
              $scope.cform.departmentCode,
              $scope.departmentData
            );
            $scope.cform.collegeCode = row.collegeCode;
            $scope.setClgDscr($scope.cform.collegeCode, $scope.collegeData);
            $scope.cform.universityCode = row.universityCode;
            $scope.setUniversityDscr(
              $scope.cform.universityCode,
              $scope.universityData
            );
            $scope.cform.bankIfscCode = row.bankIfscCode;
            $scope.cform.bankAccountNo = row.bankAccountNo;
            $scope.cform.recvdFrom = row.fullName;
            $scope.cform.bankName = row.bankName;
            $scope.cform.bankBranch = row.bankBranch;
            $scope.cform.bankCity = row.bankCity;
            $scope.cform.bankCountry = row.bankCountry;
            $scope.getaccountdetails(row.collegeCode);
          }
        }
      }
    };
    $scope.updatedbankacc = [];
    $scope.getaccountdetails = function (collegeCode) {
      if (collegeCode) {
        // console.log("bank ke liye ", collegeCode);
        for (let index = 0; index < $scope.bankaccountData?.length; index++) {
          const element = $scope.bankaccountData[index];
          if (element.collegeCode === collegeCode) {
            // $scope.bankaccount=[];
            // $scope.bankaccount.push(element);
            $scope.updatedbankacc.push(element);
            console.log($scope.updatedbankacc, ".................");
            break;
          }
        }
      }
      $scope.bankaccountData = $scope.updatedbankacc;
    };

    $scope.studentData = [];
    $scope.fetchStudentData = function () {
      $http
        .get(path + "/api/v1/account/students", config)
        .then(function (response) {
          $scope.studentData = response.data;
          // // console.log("$scope.studentData", $scope.studentData)
        });
    };
    $scope.fetchStudentData();

    $scope.getStudentDscr = function (code) {
      if (code) {
        // console.log("codezilla", code)
        for (let i = 0; i < $scope.studentData.length; i++) {
          let row = $scope.studentData[i];
          // // console.log("row", row)
          if (code == row.univRegistrationNo) {
            // console.log("rowwqsddsdsdsdedSADAS>>>>>>>>>>", row)
            $scope.cform.studentDscr = row.fullName;
            $scope.cform.address = row.addres1;
            $scope.cform.departmentCode = row.departmentCode;
            $scope.setDepDscr(
              $scope.cform.departmentCode,
              $scope.departmentData
            );
            $scope.cform.collegeCode = row.collegeCode;
            $scope.setClgDscr($scope.cform.collegeCode, $scope.collegeData);
            $scope.cform.universityCode = row.universityCode;
            $scope.setUniversityDscr(
              $scope.cform.universityCode,
              $scope.universityData
            );
            $scope.cform.bankIfscCode = row.bankIfscCode;
            $scope.cform.bankAccountNo = row.bankAccountNo;
            $scope.cform.recvdFrom = row.fullName;
            $scope.cform.bankName = row.bankName;
            $scope.cform.bankBranch = row.bankBranch;
            $scope.cform.bankCity = row.bankCity;
            $scope.cform.bankCountry = row.bankCountry;
            $scope.getaccountdetails(row.collegeCode);
          }
        }
      }
    };

    // Data from supplier table for vendor
    $scope.supplierData = [];
    $scope.getSupplierData = function () {
      $http
        .get(path + "/api/v1/account/supplier", config)
        .then(function (response) {
          $scope.supplierData = response.data;
          //  // console.log("$scope.supplierData", response.data);
        });
    };
    $scope.getSupplierData();
    // Data from supplier table for vendor
    $scope.supplierBillData = [];
    $scope.getSupplierBillData = function () {
      $http
        .get(path + "/api/v1/account/suppbill/alldata", config)
        .then(function (response) {
          $scope.supplierBillData = response.data;
          // console.log("$scope.supplierData", response.data);
        });
    };
    $scope.getSupplierBillData();
    $scope.bankaccount = [];
    $scope.setPoBillDetails = function (billSlNo) {
      // console.log("yes123", billSlNo)
      if (billSlNo) {
        for (let i = 0; i < $scope.supplierBillData.length; i++) {
          const element = $scope.supplierBillData[i];
          // console.log("yesss", element);
          if (billSlNo == element.billSlNo) {
            $scope.cform.garnNo = element.garnNo?.toString();
            $scope.cform.garnDate = element.garnDate;
            $scope.cform.invoiceNo = element.invoiceNo?.toString();
            $scope.cform.invoiceDate = element.invoiceDate;
            $scope.cform.billRegNo = element.billRegNo?.toString();
            $scope.cform.billRegDate = element.billRegDate;
            $scope.cform.passedAmount = element.passedAmount;
            // console.log($scope.cform.garnNo, $scope.cform.garnDate, $scope.cform.invoiceNo, $scope.cform.invoiceDate, $scope.cform.billRegNo, $scope.cform.billRegDate, $scope.cform.passedAmount)
          }
        }
      } else {
        $scope.cform.garnNo = "";
        $scope.cform.garnDate = "";
        $scope.cform.invoiceNo = "";
        $scope.cform.invoiceDate = "";
        $scope.cform.billRegNo = "";
        $scope.cform.billRegDate = "";
        $scope.cform.passedAmount = "";
      }
    };

    $scope.getVendorDscr = function (code) {
      if (code) {
        // console.log("code", code);
        for (let i = 0; i < $scope.supplierData.length; i++) {
          let row = $scope.supplierData[i];
          if (code == row.vendorCode) {
            // // console.log("row", row)
            $scope.vflag = true;
            $scope.cform.vendorDscr = row.fullName;
            $scope.cform.recvdFrom = row.fullName;
            $scope.cform.address = row.addr1;
            $scope.cform.departmentCode = row.departmentCode;
            $scope.cform.collegeCode = row.collegeCode;
            $scope.cform.universityCode = row.universityCode;
            $scope.cform.bankIfscCode = row.bankIfscCode;
            $scope.cform.bankAccountNo = row.bankAccountNo;
            $scope.cform.bankName = row.bankName;
            $scope.cform.bankBranch = row.bankBranch;
            $scope.cform.bankCity = row.bankCity;
            $scope.cform.bankCountry = row.bankCountry;
            $scope.getpodetails(code);
          }
        }
      }
    };
    $scope.getPodata = function () {
      $http.get(path + "/api/v1/account/po", config).then(
        function successCallback(response) {
          $scope.data = response.data;
          // // console.log("purchase order>>>>>>>>>>>>", $scope.data);
          // After retrieving data, call the updateSuppData function
          // $scope.updateSuppData();
        },
        function errorCallback(response) {
          // console.log("saving of data failed");
        }
      );
    };

    $scope.getsuppdata = function () {
      $http.get(path + "/api/v1/account/suppbill/alldata", config).then(
        function successCallback(response) {
          $scope.suppdata = response.data;
        },
        function errorCallback(response) {
          // console.log("saving of data failed");
        }
      );
    };

    $scope.selectplan = function (x, data) {
      if (data) {
        // // console.log("$scope.plancostcenter", x, data);
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          if (element.planNo == x) {
            // // console.log("meri", element.planFinYear)
            $scope.cform.planFinYear = element.planFinYear;
            $scope.cform.planTypeCode = element.planTypeCode;
            $scope.cform.planTitle = element.planTitle;
          }
        }
      }
    };

    $scope.getPodata();
    $scope.getsuppdata();
    $scope.getPurchaseOrderDetails = function (poNumber) {
      // console.log("checking for poNumber", poNumber, $scope.purchaseOrders);
      if (poNumber) {
        $scope.getbillslno(poNumber);
        for (let index = 0; index < $scope.purchaseOrders?.length; index++) {
          const element = $scope.purchaseOrders[index];
          // console.log("object>>>>???", poNumber, element.poNumber)
          if (poNumber === element.poNumber) {
            // console.log("element", element);
            $scope.cform.poDate = element.poDate;
            $scope.cform.indentNo = element.indentNo;
            $scope.cform.indentDate = element.indentDate;
            $scope.cform.poId = element.poId;
            $scope.cform.poFinYear = element.poFinYear;
          }
        }
      } else {
        $scope.cform.poDate = "";
        $scope.cform.indentNo = "";
        $scope.cform.indentDate = "";
        $scope.cform.poId = "";
        $scope.cform.poFinYear = "";
      }
    };
    // $scope.planno = [];
    $scope.billSlNoArr = [];
    $scope.getbillslno = function (poNumber) {
      if (poNumber) {
        console.log(poNumber);
        for (let index = 0; index < $scope.supplierBillData.length; index++) {
          const element = $scope.supplierBillData[index];
          if (poNumber === element.poNumber) {
            if (!$scope.billSlNoArr.includes(element.billSlNo)) {
              $scope.billSlNoArr.push(element.billSlNo);
            }
            if (
              element.planNo !== undefined &&
              !$scope.planno.includes(element.planNo)
            ) {
              $scope.planno.push(element.planNo);
            }
          }
        }
      }
      // console.log("abhay????????///", $scope.billSlNoArr);
      // console.log($scope.planno);
    };

    $scope.getponumber = [];
    $scope.getpodetails = function (code) {
      // console.log(code, "codwa")
      $scope.getponumber = [];
      for (let index = 0; index < $scope.supplierData.length; index++) {
        const element = $scope.supplierData[index];
        if (code == element.vendorCode) {
          if (!$scope.getponumber.includes(element.poNumber)) {
            $scope.getponumber.push(element.poNumber);
          }
        }
      }
    };

    $scope.getPurchaseOrders = function () {
      $http.get(path + "/api/v1/account/po", config).then(
        function successCallback(response) {
          // console.table((response.data);
          const uniqueSet = new Set();
          $scope.purchaseOrders = response.data;
          // console.log("aml", $scope.purchaseOrders)
          $scope.uniquePurchaseOrders = response.data.filter((x) => {
            const value = x.planNo;
            if (!uniqueSet.has(x.planNo)) {
              uniqueSet.add(value);
              return true;
            }
            return false;
          });
          for (let i = 0; i < $scope.purchaseOrders.length; i++) {
            const element = $scope.purchaseOrders[i];
            // if()
          }
          // console.log("purchase order>>>>1234>>>>>>>>", $scope.uniquePurchaseOrders);
          //// console.table(($scope.purchaseOrders)
          // After retrieving data, call the updateSuppData function
          $scope.getSupplierData();
        },
        function errorCallback(response) {
          // // console.log("saving of data failed");
        }
      );
    };
    $scope.getPurchaseOrders();

    $scope.getsuppdata();
    // Fetch data from the collgeDepartment table
    $scope.departmentData = [];
    $scope.fetchDepartmentdata = function () {
      $http.get(path + "/api/v1/account/department", config).then(
        function successCallback(response) {
          $scope.departmentData = response.data;
          //  // console.log("department data", response.data)
        },
        function errorCallback(resopnse) {
          // console.log("Error Fetching department data ")
        }
      );
    };
    $scope.fetchDepartmentdata();
    $scope.setDepDscr = function (depCode, departmentData) {
      for (let i = 0; i < departmentData.length; i++) {
        const row = departmentData[i];
        // // console.log("dep Code", row)
        if (depCode == row.departmentCode) {
          $scope.cform.departmentDscr = row.dscr;
          break;
        }
      }
    };
    // $scope.setDepDscr();
    //Fetching college table table
    $scope.collegeData = [];
    $scope.getClgData = function () {
      $http.get(path + "/api/v1/account/college", config).then(
        function successCallback(response) {
          $scope.collegeData = response.data;
        },
        function errorCallback(response) {
          // console.log("Error fetching colllege data")
        }
      );
    };

    // Our GET request function to fetch data from accountmaster table
    $scope.accMasterData = [];
    $scope.getdata = function () {
      $http.get(path + "/api/v1/account/accreport", config).then(
        function successCallback(response) {
          $scope.accMasterData = response.data;
        },
        function errorCallback(response) {
          // console.log("Unable to perform  request");
        }
      );
    };
    $scope.getdata();
    $scope.getClgData();
    $scope.setClgDscr = function (ClgCode, collegeData) {
      for (let i = 0; i < collegeData.length; i++) {
        const row = collegeData[i];
        if (ClgCode == row.collegeCode) {
          $scope.cform.collegeDscr = row.dscr;
          break;
        }
      }
    };
    $scope.disableFlag1 = false;
    $scope.disableFlag2 = false;
    $scope.disableFlag3 = false;
    $scope.disableFuncFlags = function (voucherStatusCode) {
      // // console.log("2222",$scope.role);
      if (
        voucherStatusCode === "F" ||
        $scope.role === "manager" ||
        $scope.role === "cashier"
      ) {
        $scope.disableFlag1 = true;
        // console.log("🚀 ~ erterterterterterterterteterte ~ voucherStatusCode:1234567", voucherStatusCode, $scope.disableFlag1)
      }
      if ($scope.role === "cashier") {
        // $scope.disableFlag2 = false;
        $scope.disableFlag3 = true;
      }
    };
    // $rootScope.data = getQueryParam('n');
    //To fetch data from university table
    $scope.universityData = [];
    $scope.getUniversityData = function () {
      $http.get(path + "/api/v1/account/university", config).then(
        function (response) {
          $scope.universityData = response.data;
        },
        function (response) {
          // console.log("Error in fetching data from university table  ")
        }
      );
    };
    $scope.getUniversityData();
    //To fetch data from university discription from university table
    $scope.setUniversityDscr = function (uniCode, universityData) {
      for (let i = 0; i < universityData.length; i++) {
        const row = universityData[i];
        //  // console.log("university Data", row)
        if (uniCode == row.universityCode) {
          $scope.cform.universityDscr = row.dscr;
          break;
        }
      }
    };

    $scope.delBPVDList = [];
    $scope.setdeleteCashRvD = function (cashRvId, finYear, robj) {
      $timeout(() => {
        console.log("robj>>>>>>>>", robj);
        if (robj.select && cashRvId && finYear) {
          // Checkbox is checked, add the object to the array.
          $scope.delObj = {
            cashRvId: cashRvId,
            finYear: finYear,
            cashRvDetSlno: robj.cashRvDetSlno,
          };
          $scope.delBPVDList.push($scope.delObj);
          // $scope.getCashRvD($scope.cform.cashRvId, $scope.cform.finYear);
          console.log("Object added:", $scope.delBPVDList, robj);
        } else {
          // Checkbox is unchecked, remove the object from the array.
          console.log("12345", robj);
          $scope.delBPVDList = $scope.delBPVDList.filter(
            (obj) =>
              !(
                obj.cashRvDetSlno === robj.cashRvDetSlno &&
                obj.cashRvId === cashRvId &&
                obj.finYear === finYear
              )
          );
          console.log("Object removed:", $scope.delBPVDList, robj);
        }
      }, 500);
    };

    $scope.deleteCashRvD = function () {
      if ($scope.delBPVDList.length > 0) {
        // console.log("🚀 ~ $scope.setdeleteCashRvD ~ $scope.delObj2:", $scope.delBPVDList, config)
        $http({
          method: "DELETE",
          url: path + `/api/v1/account/crvd`,
          data: $scope.delBPVDList,
          headers: {
            "Content-type": "application/json;charset=utf-8",
            Authorization: "Bearer " + $scope.token,
          },
        }).then(
          (response) => {
            if (response.status == 200) {
              $scope.delBPVDList = [];
              console.log("🚀 ~ $scope.deleteCashRvD ~ response:", response);
              $scope.getTotalAmmounts();
              toastr.success("Deleted Successfully");
              $scope.getCashRvD($scope.cform.cashRvId, $scope.cform.finYear);
            }
          },
          (error) => {
            console.log("🚀 ~ $scope.deleteCashRvD ~ error:", error);
            toastr.error(
              "Delete Error",
              "Error deleting BPVD. Please try again."
            );
          }
        );
      } else {
        console.error("error while deleting, check atleat one");
      }
    };

    $scope.fieldDisable = function (payFromTypeCode) {
      // console.log(payFromTypeCode)
      if (payFromTypeCode === "E") {
        // console.log(payFromTypeCode)
        $scope.typeF = "Employee";
        $scope.disableVendor = true;
        $scope.disableStu = true;
        $scope.disableEmp = false;
        $scope.hideFlag = true;
        $scope.cform.empDscr = "";
        $scope.cform.address = "";
        $scope.cform.departmentCode = "";
        $scope.cform.collegeDscr = "";
        $scope.cform.departmentDscr = "";
        $scope.cform.universityDscr = "";
        $scope.cform.collegeCode = "";
        $scope.cform.universityCode = "";
        $scope.cform.bankIfscCode = "";
        $scope.cform.bankAccountNo = "";
        $scope.cform.bankName = "";
        $scope.cform.bankBranch = "";
        $scope.cform.bankCity = "";
        $scope.cform.bankCountry = "";
        $scope.paidByFlag = true;
        $scope.cform.vendorCode = "";
        $scope.cform.vendorDscr = "";
        // $scope.cform.staffNo = ""
        $scope.cform.empDscr = "";
        // $scope.cform.univRegistrationNo = ""
        $scope.cform.studentDscr = "";
        console.log(payFromTypeCode);
      } else if (payFromTypeCode === "S") {
        $scope.typeF = "Student";
        $scope.disableVendor = true;
        $scope.disableEmp = true;
        $scope.disableStu = false;
        $scope.hideFlag = true;
        $scope.paidByFlag = true;
        $scope.cform.empDscr = "";
        $scope.cform.address = "";
        $scope.cform.departmentCode = "";
        $scope.cform.collegeCode = "";
        $scope.cform.collegeDscr = "";
        $scope.cform.departmentDscr = "";
        $scope.cform.universityDscr = "";
        $scope.cform.universityCode = "";
        $scope.cform.bankIfscCode = "";
        $scope.cform.bankAccountNo = "";
        $scope.cform.bankName = "";
        $scope.cform.bankBranch = "";
        $scope.cform.bankCity = "";
        $scope.cform.bankCountry = "";
        $scope.cform.vendorCode = "";
        $scope.cform.vendorDscr = "";
        $scope.cform.staffNo = "";
        $scope.cform.empDscr = "";
        $scope.cform.studentDscr = "";
        // console.log(payFromTypeCode)
      } else if (payFromTypeCode === "V") {
        $scope.typeF = "Vendor";
        $scope.disableEmp = true;
        $scope.disableStu = true;
        $scope.disableVendor = false;
        $scope.hideFlag = false;
        $scope.paidByFlag = true;
        $scope.cform.empDscr = "";
        $scope.cform.address = "";
        $scope.cform.departmentCode = "";
        $scope.cform.collegeDscr = "";
        $scope.cform.departmentDscr = "";
        $scope.cform.universityDscr = "";
        $scope.cform.collegeCode = "";
        $scope.cform.universityCode = "";
        $scope.cform.bankIfscCode = "";
        $scope.cform.bankAccountNo = "";
        $scope.cform.bankName = "";
        $scope.cform.bankBranch = "";
        $scope.cform.bankCity = "";
        $scope.cform.bankCountry = "";
        //$scope.cform.vendorCode = ""r
        //$scope.cform.vendorDscr = ""
        $scope.cform.staffNo = "";
        $scope.cform.empDscr = "";
        $scope.cform.univRegistrationNo = "";
        $scope.cform.studentDscr = "";
        console.log(payFromTypeCode);
      } else if (payFromTypeCode === "O") {
        $scope.typeF = "Other";
        $scope.disableEmp = true;
        $scope.disableStu = true;
        $scope.disableVendor = true;
        $scope.hideFlag = true;
        $scope.cform.empDscr = "";
        $scope.cform.address = "";
        $scope.cform.recvdFrom = "";
        $scope.cform.departmentCode = "";
        $scope.cform.collegeDscr = "";
        $scope.cform.departmentDscr = "";
        $scope.cform.universityDscr = "";
        $scope.cform.collegeCode = "";
        $scope.cform.universityCode = "";
        $scope.cform.planNo = "";
        $scope.cform.bankIfscCode = "";
        $scope.cform.bankAccountNo = "";
        $scope.cform.bankName = "";
        $scope.cform.bankBranch = "";
        $scope.cform.bankCity = "";
        $scope.cform.bankCountry = "";
        $scope.cform.vendorCode = "";
        $scope.cform.vendorDscr = "";
        $scope.cform.staffNo = "";
        $scope.cform.empDscr = "";
        $scope.cform.univRegistrationNo = "";
        $scope.cform.studentDscr = "";
        console.log(payFromTypeCode);
      } else {
        // console.log("Nhi hoga")
      }
    };

    // $scope.projectPlanData = [];
    // $scope.getprojectdata = function () {
    //   $http.get(path + "/api/v1/account/projectplan/allData", config)
    //     .then(function successCallback(response) {
    //       $scope.projectPlanData = response.data;
    // // console.log("meri",$scope.projectPlanData);
    //     },
    //       function errorCallback(response) {
    // // console.log("Fetching of data failed");
    //       });
    // };
    // $scope.getprojectdata();
    $scope.getbankByPk = function (cashRvId, finYear) {
      // console.log(">>>>>>>>>>>>>>>>", cashRvId, finYear);
      $http
        .get(path + `/api/v1/account/crv/${cashRvId}/${finYear}`, config)
        .then(
          function successCallback(response) {
            // console.log("bankPaymentdata", response.data);
            if (response.data.payFromTypeCode === "V") {
              $scope.cform = response.data;
              $scope.cform.vendorDscr = response.data.recvdFrom;
              $scope.cform.vendorCode = response.data.vendorCode.toString();
              $scope.cform.planTitle = $scope.setonedit(
                response.data.planTypeCode
              );
              $scope.cform.bankDscr = $scope.setoneditbankdscr(
                response.data.bankCode
              );
              // $scope.cform.garnNo = response.data.garnNo.toString();
            } else if (response.data.payFromTypeCode === "E") {
              $scope.cform = angular.copy(response.data);
              $scope.cform.empDscr = response.data.recvdFrom;
              //$scope.cform.departmentDscr = getdepdscr(response.data.);
              $scope.cform.departmentDscr = $scope.setoneditDepDscr(
                response.data.departmentCode
              );
              $scope.cform.collegeDscr = $scope.setoneditcllgDscr(
                response.data.collegeCode
              );
              $scope.cform.universityDscr = $scope.setonedituniDscr(
                response.data.universityCode
              );
              $scope.cform.bankDscr = $scope.setoneditbankdscr(
                response.data.bankCode
              );
            } else {
              $scope.cform = response.data;
              $scope.cform.studentDscr = response.data.recvdFrom;
              $scope.cform.departmentDscr = $scope.setoneditDepDscr(
                response.data.departmentCode
              );
              $scope.cform.collegeDscr = $scope.setoneditcllgDscr(
                response.data.collegeCode
              );
              $scope.cform.universityDscr = $scope.setonedituniDscr(
                response.data.universityCode
              );
              $scope.cform.bankDscr = $scope.setoneditbankdscr(
                response.data.bankCode
              );
            }
          },
          function errorCallback(response) {
            // console.log("Unable to update request");
          }
        );
    };
    $scope.setoneditDepDscr = function (n) {
      // console.log("nnnnnnnnnnnnnnnnnnnnnnnnn", n)
      for (let index = 0; index < $scope.departmentData.length; index++) {
        const element = $scope.departmentData[index];
        if (element.departmentCode === n) {
          // console.log(">>>>>>>>>>>>>>", element.departmentCode, element)
          return element.dscr;
        }
      }
    };
    $scope.setoneditcllgDscr = function (n) {
      for (let index = 0; index < $scope.collegeData.length; index++) {
        const element = $scope.collegeData[index];
        if (element.collegeCode === n) {
          // console.log(">>>>>>>>????>>>>>>", element.collegeCode, element)
          return element.dscr;
        }
      }
    };
    $scope.setonedituniDscr = function (n) {
      for (let index = 0; index < $scope.universityData.length; index++) {
        const element = $scope.universityData[index];
        if (element.universityCode === n) {
          // console.log(">>>>>>>>????>>>>>>", element.universityCode, element)
          return element.dscr;
        }
      }
    };
    $scope.setoneditbankdscr = function (n) {
      console.log(n);
      for (let index = 0; index < $scope.bankaccount.length; index++) {
        const element = $scope.bankaccount[index];
        if (element.bankCode === n) {
          return element.dscr;
        }
      }
    };
    $scope.setonedit = function (n) {
      console.log(n);
      for (let index = 0; index < $scope.projectPlanData.length; index++) {
        const element = $scope.projectPlanData[index];
        if (element.planTypeCode === n) {
          console.log(element);
          return element.planNo;
        }
      }
    };
    $scope.cform = {};
    // $scope.crvds

    $scope.saveCashRvDet = function () {
      console.log(">>>>>>>>>>>>>>222", $scope.crvds);
      $scope.filteredCashRv = $scope.crvds
        .filter((row) => row.accountCode !== undefined)
        .map((row) => {
          console.log("rocking uma ", row);
          return {
            ...row,
            cashRvId: $scope.cform?.cashRvId,
            finYear: $scope.cform?.finYear,
          };
        });
      console.log("saving data bpvd>>>>>", $scope.filteredCashRv);
      $http
        .post(path + "/api/v1/account/crvd", $scope.filteredCashRv, config)
        .then(
          (res) => {
            toastr.success("Data Saved Successfully");
            // console.log(res.data, "saved successfully")
            $scope.getCashRvD($scope.cform.cashRvId, $scope.cform.finYear);
          },
          (err) => {
            toastr.error("ERROR", "Please fill  all the required fields");
            console.log(err);
          }
        );
    };

    $scope.getTotalAmmounts = function () {
      var cre_total = 0;
      var db_total = 0;
      $scope.crvds.forEach(function (transaction) {
        // // console.log("🚀 ~ $scope.crvds:", $scope.crvds)
        // Set crAmountTouched and dbAmountTouched to true if crAmount and dbAmount are not null
        if (transaction.crAmount != null) {
          transaction.crAmountTouched = true;
        }
        if (transaction.dbAmount != null) {
          transaction.dbAmountTouched = true;
        }
        // Calculate totalCreditAmount and totalDebitAmount
        cre_total += parseFloat(transaction.crAmount) || 0;
        db_total += parseFloat(transaction.dbAmount) || 0;
      });
      $scope.cform.voucherNetAmount = cre_total - db_total || 0;
      if (cre_total - db_total < 0) {
        $scope.negFlag = true;
      } else {
        $scope.negFlag = false;
      }
      $scope.totalCreditAmount = cre_total;
      $scope.totalDebitAmount = db_total;
      // console.log("🚀 ~ $scope.negFlag:", $scope.negFlag);
      $scope.ammountInWords = $scope.negFlag
        ? ""
        : toWords($scope.cform.voucherNetAmount);
    };
    $scope.negFlag = false;
    $scope.calculateFinYear = function (idDate) {
      var idDate = idDate;
      // console.log(idDate);
      var dateParts = idDate.split("-");
      //  console.log(dateParts);
      if (dateParts.length === 3) {
        var day = parseInt(dateParts[0]);
        var month = parseInt(dateParts[1]);
        var year = parseInt(dateParts[2]);
        if (day >= 1 && day <= 31 && month >= 1 && month <= 12) {
          var finYear;
          if (month >= 4) {
            finYear = year + "-" + (year + 1);
          } else {
            finYear = year - 1 + "-" + year;
          }
          //  console.log(finYear);
          $scope.cform.finYear = finYear;
        } else {
          $scope.cform.finYear = "";
        }
      } else {
        $scope.cform.finYear = "";
      }
    };
    $scope.getCashRvD = function (cashRvId, finYear) {
      if (cashRvId && finYear) {
        $http
          .get(path + `/api/v1/account/crvd/${cashRvId}/${finYear}`, config)
          .then((resopnse) => {
            if (resopnse.status == 200) {
              //console.log(resopnse);
              $scope.crvds = resopnse.data.length > 0 ? resopnse.data : [{}];
              // console.table(($scope.crvds);
              // $scope.setAccountDscr(resopnse.data.accountCode? resopnse.data.accountCode : null,0);
            }
          });
      }
    };

    $scope.planNos = [];
    $scope.setPurchaseOrderDetailsDetails = function (vendorCode) {
      if (vendorCode) {
        // console.log("checking vendor code for purchase oder data", vendorCode);
        $scope.poDetails = $scope.purchaseOrders?.filter((row) => {
          $scope.planNos.push(row.planNo);
          return vendorCode === row.vendorCode;
        });
        // // console.log("abc>>>", $scope.planNos);
        $scope.planNos = [...new Set($scope.planNos)];
        // // console.log("abc>>>", $scope.planNos);
        $scope.projectPlanData = $scope.purchaseOrders?.filter(
          (row) => vendorCode === row.vendorCode
        );
        // // console.log("abc", $scope.poDetails);
      }
    };
    $scope.setName = (staffNo) => {
      if (staffNo) {
        for (let i = 0; i < $scope.empData.length; i++) {
          const row = $scope.empData[i];
          if (row.staffNo === staffNo) {
            $scope.cform.assistantName = row.fullName;
            $scope.assistantName = row.fullName;
          }
        }
      }
    };
    $scope.setBankDiscription = (bankCode) => {
      console.log(bankCode);
      for (let index = 0; index < $scope.bankaccount.length; index++) {
        const element = $scope.bankaccount[index];
        if (element.bankCode === bankCode) {
          $scope.cform.bankDscr = element.dscr;
        }
      }
    };

    $scope.setAccountDscr = function (accountCode, index) {
      //  console.log(`🚗🚗🚗${typeof accountCode}🛺🛺🛺🛺`, index)
      for (let i = 0; i < $scope.accMasterData.length; i++) {
        const element = $scope.accMasterData[i];
        // console.log(element.accountCode, accountCode)
        if (accountCode === element.accountCode) {
          // console.log(element);
          $scope.crvds[index].accDscr = element.dscr;
        } else {
          if (!accountCode) {
            $scope.crvds[index].accDscr = "";
          }
        }
      }
    };
    $scope.getCashRv = function (cashRvId, finYear) {
      if (cashRvId && finYear) {
        $http
          .get(`${path}/api/v1/account/crv/${cashRvId}/${finYear}`, config)
          .then(
            (resopnse) => {
              // console.log("response of bpv", resopnse);
              if (resopnse.status === 200) {
                console.log("for spreding in Form", resopnse.data);
                $scope.cform = resopnse.data;
                // console.log("amal??>>>>>>", $scope.assistantStaffNo);
                $scope.cform.assistantStaffNo = $scope.tempRole
                  ? $scope.details.staffNo
                  : resopnse.data.assistantStaffNo;
                $scope.assistantStaffNo = $scope.tempRole
                  ? $scope.details.staffNo
                  : resopnse.data.assistantStaffNo;
                $scope.setName(
                  $scope.tempRole
                    ? $scope.details.staffNo
                    : resopnse.data.assistantStaffNo
                );
                // $scope.setAssisName($scope.assistantStaffNo);
                $scope.cform.bankPvNo = resopnse.data.bankPvNo;
                $scope.cform.bankPvDate = resopnse.data.bankPvDate;
                // console.log("lllllll>>>>>>>", $scope.cform.assistantStaffNo);
                $scope.ammountInWords = toWords(
                  resopnse.data?.voucherNetAmount
                );
                $scope.fieldDisable(resopnse.data.payFromTypeCode);
                $scope.setPurchaseOrderDetailsDetails(resopnse.data.vendorCode);
                $scope.disableFuncFlags(resopnse.data?.voucherStatusCode);
                // $scope.setBankDiscription(resopnse.data.bankCode);
                // $scope.setAccountDscr(resopnse.data.accountCode? resopnse.data.accountCode : null,0);
                // $scope.selectplan(form.planNo,data)
                if (resopnse.data.payFromTypeCode === "S") {
                  $scope.cform.univRegistrationNo =
                    resopnse.data.univRegistrationNo.toString();
                  $scope.cform.voucherStatusCode =
                    resopnse.data.voucherStatusCode.toString();
                  $scope.getStudentDscr($scope.cform.univRegistrationNo);
                  $scope.disableVendor = true;
                  $scope.disableEmp = true;
                  $scope.typeF = "Student";
                } else if (resopnse.data.payFromTypeCode === "E") {
                  $scope.typeF = "Employee";
                  $scope.cform.poNumber = resopnse.data.poNumber?.toString();
                  $scope.cform.staffNo = resopnse.data.staffNo;
                  $scope.getEmpDscr(resopnse.data.staffNo);
                  $scope.disableVendor = true;
                  $scope.disableStu = true;
                } else if (resopnse.data.payFromTypeCode === "V") {
                  $scope.typeF = "Vendor";
                  // console.log("sdsd", resopnse);
                  $scope.getPurchaseOrders();
                  // $scope.setPurchaseOrderDetails(resopnse.data?.vendorCode);
                  $scope.getPurchaseOrderDetails(resopnse.data?.poNumber);
                  $scope.getVendorDscr(
                    resopnse.data?.vendorCode,
                    $scope.supplierData
                  );
                  $scope.cform.vendorCode =
                    resopnse.data.vendorCode?.toString();
                  $scope.cform.poNumber = resopnse.data.poNumber;
                  $scope.setPoBillDetails(resopnse.data.billSlNo);
                  $scope.cform.billSlNo = resopnse.data.billSlNo?.toString();
                  // $scope.cform.passedAmount = resopnse.data.passedAmount;
                  $scope.cform.planNo = resopnse.data.planNo?.toString();
                  $scope.disPlanNo = true;
                  //console.log("<<<<>>>>>>>>>>>>>", typeof resopnse.data.planNo)
                  $scope.disableStu = true;
                  $scope.disableEmp = true;
                } else {
                  // // console.log("some thing went wrong!!");
                }
                $scope.getbankdeatil(resopnse.data.bankAcNo);
              }
            },
            (error) => {
              console.error(error);
            }
          );
      }
    };
    if ($rootScope.data) {
      console.log("Value of n:", $rootScope.data);
      $scope.isDisable = $rootScope.data.isDisable == 1 ? true : false;
      $scope.getCashRv($rootScope.data.cashRvId, $rootScope.data.finYear);
      $scope.getCashRvD($rootScope.data.cashRvId, $rootScope.data.finYear);
    }
    $scope.handleLink = function (p) {
      console.log("p",p)
      $rootScope.handleLink(p);
    };
    $scope.goDataLst = function () {
      if ($scope.tempRole) {
        // console.log("click4545454", $scope.tempRole.role);
        if ($scope.tempRole?.role === "assistant") {
          $scope.handleLink("asst_dash_cashrec_vouchers");
        } else if ($scope.tempRole?.role === "manager") {
          // console.log("click4545454", $scope.tempRole?.role);
          $scope.handleLink("mgr_dash_cashrec_vouchers");
        } else {
          if ($scope.tempRole?.role === "cashier") {
            $scope.handleLink("cash_dash_cashrec_vouchers");
          } else {
            // console.log("nii ho payga")
          }
        }
        // window.location.href = "assistant_dashboard.html";
      } else {
        if ($scope.role === "assistant") {
          $scope.handleLink("asst_dash_cashrec_vouchers");
        } else if ($scope.role === "manager") {
          $scope.handleLink("mgr_dash_cashrec_vouchers");
        } else {
          if ($scope.role === "cashier") {
            $scope.handleLink("cash_dash_cashrec_vouchers");
          }
        }
      }
    };
  }
);

app.directive("numOnly", onlyDigitInput);

function onlyDigitInput() {
  return {
    restrict: "A",
    require: "ngModel",
    link: function (scope, element, attr, ngModelCtrl) {
      function fromUser(text) {
        if (text !== undefined && text !== null) {
          // Allow digits, minus, and plus
          var transformedInput = text.replace(/[^0-9]/g, "");

          if (transformedInput !== text) {
            ngModelCtrl.$setViewValue(transformedInput);
            ngModelCtrl.$render();
          }
          return transformedInput;
        }
        return undefined;
      }

      ngModelCtrl.$parsers.push(fromUser);
    },
  };
}
