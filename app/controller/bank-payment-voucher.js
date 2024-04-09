app.controller(
  "bankPayVouchCtrl",
  function ($scope, $http, $timeout, $window, $rootScope) {
    $scope.details = [];
    $scope.hideFlag = false;
    $scope.terte = 10;
    $scope.vflag = false;
    $scope.sflag = false;
    $scope.assistantStaffNo = "";
    $scope.t = {};
    $scope.form = {};
    $scope.role = $rootScope.role;
    $scope.details = $rootScope.userDetails;
    const config = $rootScope.config;
    const isLoggedIn = $rootScope.checkToken();
    if (isLoggedIn) {
      console.log("$scope.role", $scope.role);
      if ($scope.role === "assistant") {
        $scope.assistantStaffNo = $scope.details.staffNo;
        // $scope.setAssisName($scope.details.staffNo);
        $scope.assistantName = $scope.details.userFullName;
      } else if ($scope.role === "manager") {
        $scope.managerStaffNo = $scope.details.staffNo;
        $scope.form.managerStaffNo = $scope.details.staffNo;
        $scope.managerName = $scope.details.userFullName;
      } else if ($scope.role === "cashier") {
        $scope.cashierName = $scope.details.userFullName;
        $scope.mgrcashStaffNo = $scope.details.staffNo;
        $scope.form.mgrcashStaffNo = $scope.details.staffNo;
      }
      if ($scope.role === "assistant") {
        $scope.assistantStaffNo = $scope.details.staffNo;
        $scope.form.assistantStaffNo = $scope.details.staffNo;
        $scope.assistantName = $scope.details.userFullName;
      } else if ($scope.role === "cashier") {
        $scope.cashierName = $scope.details.userFullName;
        $scope.mgrcashStaffNo = $scope.details.staffNo;
        $scope.form.mgrcashStaffNo = $scope.details.staffNo;
        // $scope.assistantName = $scope.details.userFullName;
      } else {
        if ($scope.role === "manager") {
          $scope.managerStaffNo = $scope.details.staffNo;
          $scope.form.managerStaffNo = $scope.details.staffNo;
          $scope.managerName = $scope.details.userFullName;
        }
      }
    }
    $scope.tabToggle = function (id) {
      $rootScope.tabToggle(id);
    };

    $scope.form.voucherStatusCode = "U";
    $scope.sflag = true;
    $scope.glgroupData = [];
    $scope.form = {};
    $scope.bpvds = [{}];
    $scope.addObj = function () {
      $scope.bpvds.push({});
    };
    //get transaction data
    $scope.trx = [];
    $scope.gettrxdata = function () {
      $http.get(path + `/api/v1/account/txtype`, config).then(
        function successCallback(response) {
          $scope.trx = response.data;
        },
        function errorCallback(err) {
          console.log(err, "Unable to perform  request");
        }
      );
    };
    $scope.gettrxdata();
    $scope.changetrx = function (txTypeCode) {
      if (txTypeCode) {
        for (let index = 0; index < $scope.trx.length; index++) {
          const element = $scope.trx[index];
          if (txTypeCode == element.txTypeCode) {
            $scope.form.txTypeDscr = element.shortName;
            return;
          }
        }
      }
    };
    $scope.payeeTypeData = [];
    $scope.getPayeeTypeData = function () {
      $http.get(path + "/api/v1/account/paytotype", config).then(
        function (res) {
          if (res.status == 200) {
            $scope.payeeTypeData = res.data;
          }
        },
        function (err) {
          console.log(err);
        }
      );
    };
    $scope.getPayeeTypeData();
    $scope.empData = [];
    $http
      .get(path + "/api/v1/account/employees", config)
      .then(function (response) {
        $scope.empData = response.data;
      });

    $scope.plancostcenter = [];
    $scope.getplancostcenter = function () {
      $http
        .get(path + "/api/v1/account/costCentre/alldata", config)
        .then(
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
            $scope.form.bankCode = element.bankCode;
            $scope.form.bankDscr = element.dscr;
            return;
          }
        }
      }
    };

    $scope.setAssisName = function (staffNo) {
      if (staffNo) {
        for (let i = 0; i < $scope.empData.length; i++) {
          const row = $scope.empData[i];
          if (row.staffNo === staffNo) {
            if ($scope.role === "assistant") {
              $scope.assistantStaffNo = row.staffNo;
              $scope.form.assistantStaffNo = row.staffNo;
            } else if ($scope.role === "cashier") {
              $scope.cashierName = row.fullName;
              $scope.form.mgrCashStaffNo = row.staffNo;
              $scope.t.mgrCashStaffNo = row.staffNo;
            } else {
              if ($scope.role === "manager") {
                $scope.form.managerStaffNo = row.staffNo;
                $scope.managerStaffNo = row.staffNo;
              } else {
                console.error("Role is ----->", $scope.role);
              }
            }
          }
        }
      }
    };

    $scope.saveBpv = function () {
      const voucherStatusCode = $scope.form.voucherStatusCode;
      $scope.form.sectionCode = $scope.details.sectionCode;
      if (voucherStatusCode === "P" && $scope.role === "manager") {
        $http
          .get(
            `${path}/api/v1/account/bpv/passed/${$scope.form.bankPvNo || 0}`,
            config
          )
          .then((response) => {
            // console.log("got it🚗🚗🚗🚗>>>>>", response);
            if (response.data.status != 0) {
              $scope.form.bankPvNo = response.data.count + 1;
              const inputDate = new Date();
              const day = inputDate.getDate().toString().padStart(2, "0");
              const month = (inputDate.getMonth() + 1)
                .toString()
                .padStart(2, "0");
              const year = inputDate.getFullYear();
              $scope.form.bankPvDate = `${day}-${month}-${year}`;
            }
            $scope.postDataToServer();
          })
          .catch((error) => {
            throw error;
          });
        $scope.getbankdeatil($scope.form.bankAcNo);
        $scope.form.txTypeCode = $scope.form.txTypeCode.toString();
        $scope.changetrx($scope.form.txTypeCode);
      }

      // Assistant-specific logic
      if (
        $scope.role === "assistant" &&
        (voucherStatusCode === "F" || voucherStatusCode === "U")
      ) {
        $scope.form.assistantStaffNo = $scope.details.staffNo;
        $scope.postDataToServer();
      }
      // manager-specific logic
      if ((voucherStatusCode === "R" || voucherStatusCode === "P") && $scope.role === "manager") {
        $scope.form.managerStaffNo = $scope.details.staffNo;
        $scope.postDataToServer();
      }
      if (
        (voucherStatusCode === "A" || voucherStatusCode === "C" || voucherStatusCode === "P") && $scope.role === "cashier") {
        $scope.mgrCashStaffNo = $scope.details.staffNo;
        $scope.form.mgrCashStaffNo = $scope.details.staffNo;
        $scope.postDataToServer();
      } else {
        // console.log("not save yet")
      }
    };

    $scope.sortByDbAmount = function (v) {
      if (v.accountCode) { return v.accountCode; } else { return; }
    };
    // Common logic for saving data to Bank Payment Voucher table
    $scope.postDataToServer = () => {
      let filteredData = Object.fromEntries(
        Object.entries($scope.form).filter(([_, value]) => value)
      );
      console.log("posting data>>>>>>>>", filteredData, $scope.form);
      $http
        .post(path + "/api/v1/account/bpv", filteredData, config)
        .then((response) => {
          toastr.success("Bank Payment Voucher Saved Successfully");
          $scope.getBnakPayVouc(response.data?.bankPvId, response.data?.finYear);
          if (
            $scope.role == "assistant" &&
            $scope.form.voucherStatusCode == "U"
          ) {
            setTimeout(() => {
              $rootScope.tabToggle("2");
            }, 1000);
          } else {
            $scope.goToDataLstRollWiseWDelay();
          }
        })
        .catch((error) => {
          toastr.error("ERROR", "Something Went Wrong !!");
          // Handle the error here or propagate it to the calling code
          console.error(error);
          throw error;
        });
    };

    $scope.handleLink = function (pgname) {
      console.log("abhay", pgname);
      $rootScope.handleLink(pgname);
    };
    //Fetching Voucher Type table
    $scope.voucherType = [];
    $scope.getVoucherType = function () {
      $http.get(path + "/api/v1/account/vst", config).then(
        function successCallback(response) {
          $scope.voucherType = response.data;
          //  // console.log("$scope.voucherType>>>>>>", $scope.voucherType)
          $scope.form = {
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
        var typeCode = bPvData[i].payToTypeCode;
        if (!uniqueTypes[typeCode]) {
          uniqueTypes[typeCode] = true;
          uniqueList.push(bPvData[i]);
        }
      }
      return uniqueList;
    };
    $scope.goToDataLstRollWise = function () {
      console.log("first", $scope.role);
      if ($scope.role === "assistant") {
        console.log("first");
        $scope.handleLink("asst_dash_bankpay_vouchers");
      } else if ($scope.role === "manager") {
        $scope.handleLink("mgr_dash_bankpay_vouchers");
      } else if ($scope.role === "cashier") {
        $scope.handleLink("cash_dash_bankpay_vouchers");
      } else {
        alert("something went wrong!!!");
      }
    };

    $scope.getEmpDscr = function (staffNo) {
      if (staffNo) {
        // console.log("staff No", staffNo)
        for (let i = 0; i < $scope.empData.length; i++) {
          let row = $scope.empData[i];
          if (staffNo == row.staffNo) {
            // // console.log("row", row)
            $scope.form.empDscr = row.fullName;
            $scope.form.address = row.addr1;
            $scope.form.departmentCode = row.departmentCode;
            $scope.setDepDscr(
              $scope.form.departmentCode,
              $scope.departmentData
            );
            $scope.form.collegeCode = row.collegeCode;
            $scope.setClgDscr($scope.form.collegeCode, $scope.collegeData);
            $scope.form.universityCode = row.universityCode;
            $scope.setUniversityDscr(
              $scope.form.universityCode,
              $scope.universityData
            );
            $scope.form.bankIfscCode = row.bankIfscCode;
            $scope.form.bankAccountNo = row.bankAccountNo;
            $scope.form.payTo = row.fullName;
            $scope.form.bankName = row.bankName;
            $scope.form.bankBranch = row.bankBranch;
            $scope.form.bankCity = row.bankCity;
            $scope.form.bankCountry = row.bankCountry;
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
            $scope.form.studentDscr = row.fullName;
            $scope.form.address = row.addres1;
            $scope.form.departmentCode = row.departmentCode;
            $scope.setDepDscr(
              $scope.form.departmentCode,
              $scope.departmentData
            );
            $scope.form.collegeCode = row.collegeCode;
            $scope.setClgDscr($scope.form.collegeCode, $scope.collegeData);
            $scope.form.universityCode = row.universityCode;
            $scope.setUniversityDscr(
              $scope.form.universityCode,
              $scope.universityData
            );
            $scope.form.bankIfscCode = row.bankIfscCode;
            $scope.form.bankAccountNo = row.bankAccountNo;
            $scope.form.payTo = row.fullName;
            $scope.form.bankName = row.bankName;
            $scope.form.bankBranch = row.bankBranch;
            $scope.form.bankCity = row.bankCity;
            $scope.form.bankCountry = row.bankCountry;
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
            $scope.form.garnNo = element.garnNo?.toString();
            $scope.form.garnDate = element.garnDate;
            $scope.form.invoiceNo = element.invoiceNo?.toString();
            $scope.form.invoiceDate = element.invoiceDate;
            $scope.form.billRegNo = element.billRegNo?.toString();
            $scope.form.billRegDate = element.billRegDate;
            $scope.form.passedAmount = element.passedAmount;
            // console.log($scope.form.garnNo, $scope.form.garnDate, $scope.form.invoiceNo, $scope.form.invoiceDate, $scope.form.billRegNo, $scope.form.billRegDate, $scope.form.passedAmount)
          }
        }
      } else {
        $scope.form.garnNo = "";
        $scope.form.garnDate = "";
        $scope.form.invoiceNo = "";
        $scope.form.invoiceDate = "";
        $scope.form.billRegNo = "";
        $scope.form.billRegDate = "";
        $scope.form.passedAmount = "";
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
            $scope.form.vendorDscr = row.fullName;
            $scope.form.payTo = row.fullName;
            $scope.form.address = row.addr1;
            $scope.form.departmentCode = row.departmentCode;
            $scope.form.collegeCode = row.collegeCode;
            $scope.form.universityCode = row.universityCode;
            $scope.form.bankIfscCode = row.bankIfscCode;
            $scope.form.bankAccountNo = row.bankAccountNo;
            $scope.form.bankName = row.bankName;
            $scope.form.bankBranch = row.bankBranch;
            $scope.form.bankCity = row.bankCity;
            $scope.form.bankCountry = row.bankCountry;
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
            $scope.form.planFinYear = element.planFinYear;
            $scope.form.planTypeCode = element.planTypeCode;
            $scope.form.planTitle = element.planTitle;
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
            $scope.form.poDate = element.poDate;
            $scope.form.indentNo = element.indentNo;
            $scope.form.indentDate = element.indentDate;
            $scope.form.poId = element.poId;
            $scope.form.poFinYear = element.poFinYear;
          }
        }
      } else {
        $scope.form.poDate = "";
        $scope.form.indentNo = "";
        $scope.form.indentDate = "";
        $scope.form.poId = "";
        $scope.form.poFinYear = "";
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
          $scope.form.departmentDscr = row.dscr;
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
          $scope.form.collegeDscr = row.dscr;
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
          $scope.form.universityDscr = row.dscr;
          break;
        }
      }
    };
    $scope.deleteBPVD = function (bankPvId, finYear, bankPvDetSlno) {
      $scope.delBPVDList = [
        { bankPvId: bankPvId, finYear: finYear, bankPvDetSlno: bankPvDetSlno }
      ];
      if (bankPvId && finYear && bankPvDetSlno) {
        // console.log("🚀 ~ $scope.setDeleteBPVD ~ $scope.delObj2:", $scope.delBPVDList, config)
        $http({
          method: "DELETE",
          url: path + `/api/v1/account/bpvd`,
          data: $scope.delBPVDList,
          headers: {
            "Content-type": "application/json;charset=utf-8",
            Authorization: "Bearer " + token,
          },
        }).then(
          (response) => {
            if (response.status == 200) {
              $scope.delBPVDList = [];
              console.log("🚀 ~ $scope.deleteBPVD ~ response:", response);
              $scope.getTotalAmmounts();
              toastr.success("Deleted Successfully");
              $scope.getBnakPayVoucDetails($scope.form.bankPvId, $scope.form.finYear);
            }
          },
          (error) => {
            console.log("🚀 ~ $scope.deleteBPVD ~ error:", error);
            toastr.error(
              "Delete Error",
              "Error deleting BPVD. Please try again."
            );
          }
        );
      }
    };

    $scope.fieldDisable = function (payToTypeCode) {
      // console.log(payToTypeCode)
      if (payToTypeCode === "E") {
        // console.log(payToTypeCode)
        $scope.typeF = "Employee";
        $scope.disableVendor = true;
        $scope.disableStu = true;
        $scope.disableEmp = false;
        $scope.hideFlag = true;
        $scope.form.empDscr = "";
        $scope.form.address = "";
        $scope.form.departmentCode = "";
        $scope.form.collegeDscr = "";
        $scope.form.departmentDscr = "";
        $scope.form.universityDscr = "";
        $scope.form.collegeCode = "";
        $scope.form.universityCode = "";
        $scope.form.bankIfscCode = "";
        $scope.form.bankAccountNo = "";
        $scope.form.bankName = "";
        $scope.form.bankBranch = "";
        $scope.form.bankCity = "";
        $scope.form.bankCountry = "";
        $scope.paidByFlag = true;
        $scope.form.vendorCode = "";
        $scope.form.vendorDscr = "";
        // $scope.form.staffNo = ""
        $scope.form.empDscr = "";
        // $scope.form.univRegistrationNo = ""
        $scope.form.studentDscr = "";
        console.log(payToTypeCode);
      } else if (payToTypeCode === "S") {
        $scope.typeF = "Student";
        $scope.disableVendor = true;
        $scope.disableEmp = true;
        $scope.disableStu = false;
        $scope.hideFlag = true;
        $scope.paidByFlag = true;
        $scope.form.empDscr = "";
        $scope.form.address = "";
        $scope.form.departmentCode = "";
        $scope.form.collegeCode = "";
        $scope.form.collegeDscr = "";
        $scope.form.departmentDscr = "";
        $scope.form.universityDscr = "";
        $scope.form.universityCode = "";
        $scope.form.bankIfscCode = "";
        $scope.form.bankAccountNo = "";
        $scope.form.bankName = "";
        $scope.form.bankBranch = "";
        $scope.form.bankCity = "";
        $scope.form.bankCountry = "";
        $scope.form.vendorCode = "";
        $scope.form.vendorDscr = "";
        // $scope.form.staffNo = "";
        $scope.form.empDscr = "";
        $scope.form.studentDscr = "";
        // console.log(payToTypeCode)
      } else if (payToTypeCode === "V") {
        $scope.typeF = "Vendor";
        $scope.disableEmp = true;
        $scope.disableStu = true;
        $scope.disableVendor = false;
        $scope.hideFlag = false;
        $scope.paidByFlag = true;
        $scope.form.empDscr = "";
        $scope.form.address = "";
        $scope.form.departmentCode = "";
        $scope.form.collegeDscr = "";
        $scope.form.departmentDscr = "";
        $scope.form.universityDscr = "";
        $scope.form.collegeCode = "";
        $scope.form.universityCode = "";
        $scope.form.bankIfscCode = "";
        $scope.form.bankAccountNo = "";
        $scope.form.bankName = "";
        $scope.form.bankBranch = "";
        $scope.form.bankCity = "";
        $scope.form.bankCountry = "";
        //$scope.form.vendorCode = ""r
        //$scope.form.vendorDscr = ""
        // $scope.form.staffNo = "";
        $scope.form.empDscr = "";
        $scope.form.univRegistrationNo = "";
        $scope.form.studentDscr = "";
        console.log(payToTypeCode);
      } else if (payToTypeCode === "O") {
        $scope.typeF = "Other";
        $scope.disableEmp = true;
        $scope.disableStu = true;
        $scope.disableVendor = true;
        $scope.hideFlag = true;
        $scope.form.empDscr = "";
        $scope.form.address = "";
        $scope.form.recvdFrom = "";
        $scope.form.departmentCode = "";
        $scope.form.collegeDscr = "";
        $scope.form.departmentDscr = "";
        $scope.form.universityDscr = "";
        $scope.form.collegeCode = "";
        $scope.form.universityCode = "";
        $scope.form.planNo = "";
        $scope.form.bankIfscCode = "";
        $scope.form.bankAccountNo = "";
        $scope.form.bankName = "";
        $scope.form.bankBranch = "";
        $scope.form.bankCity = "";
        $scope.form.bankCountry = "";
        $scope.form.vendorCode = "";
        $scope.form.vendorDscr = "";
        // $scope.form.staffNo = "";
        $scope.form.empDscr = "";
        $scope.form.univRegistrationNo = "";
        $scope.form.studentDscr = "";
        console.log(payToTypeCode);
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
    $scope.getbankByPk = function (bankPvId, finYear) {
      // console.log(">>>>>>>>>>>>>>>>", bankPvId, finYear);
      $http
        .get(path + `/api/v1/account/bpv/${bankPvId}/${finYear}`, config)
        .then(
          function successCallback(response) {
            // console.log("bankPaymentdata", response.data);
            if (response.data.payToTypeCode === "V") {
              $scope.form = response.data;
              $scope.form.vendorDscr = response.data.payTo;
              $scope.form.vendorCode = response.data.vendorCode.toString();
              $scope.form.planTitle = $scope.setonedit(
                response.data.planTypeCode
              );
              $scope.form.bankDscr = $scope.setoneditbankdscr(
                response.data.bankCode
              );
              // $scope.form.garnNo = response.data.garnNo.toString();
            } else if (response.data.payToTypeCode === "E") {
              $scope.form = angular.copy(response.data);
              $scope.form.empDscr = response.data.payTo;
              //$scope.form.departmentDscr = getdepdscr(response.data.);
              $scope.form.departmentDscr = $scope.setoneditDepDscr(
                response.data.departmentCode
              );
              $scope.form.collegeDscr = $scope.setoneditcllgDscr(
                response.data.collegeCode
              );
              $scope.form.universityDscr = $scope.setonedituniDscr(
                response.data.universityCode
              );
              $scope.form.bankDscr = $scope.setoneditbankdscr(
                response.data.bankCode
              );
            } else {
              $scope.form = response.data;
              $scope.form.studentDscr = response.data.payTo;
              $scope.form.departmentDscr = $scope.setoneditDepDscr(
                response.data.departmentCode
              );
              $scope.form.collegeDscr = $scope.setoneditcllgDscr(
                response.data.collegeCode
              );
              $scope.form.universityDscr = $scope.setonedituniDscr(
                response.data.universityCode
              );
              $scope.form.bankDscr = $scope.setoneditbankdscr(
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
    $scope.form = {};
    // $scope.bpvds

    $scope.saveBPVD = function () {
      $(".loaderbg").show();
      console.log(">>>>>>>>>>>>>>222", $scope.bpvds);
      $scope.filteredBanPV = $scope.bpvds
        .filter((row) => row.accountCode !== undefined || row.accountCode !== '' || row.accountCode !== null)
        .map((row) => {
          return { ...row, bankPvId: $scope.form?.bankPvId, finYear: $scope.form?.finYear };
        });
      console.log("saving data bpvd>>>>>", $scope.filteredBanPV);
      $http
        .post(
          path + "/api/v1/account/bpvd",
          $scope.filteredBanPV,
          config
        )
        .then(
          (res) => {
            if (res.status == 200) {
              toastr.success("Data Saved Successfully", "Success");
              console.log(res.data, "saved successfully");
              // $scope.goToDataLstRollWiseWDelay();
              // $(".loaderbg").hide();
            }
            $scope.getBnakPayVoucDetails($scope.form.bankPvId, $scope.form.finYear);
          },
          (err) => {
            toastr.error("ERROR", "Please fill  all the required fields");
            console.log(err);
          }
        );
    };

    $scope.goToDataLstRollWiseWDelay = function () {
      setTimeout(() => {
        $scope.goToDataLstRollWise();
      }, 500);
    };

    $scope.getTotalAmmounts = function () {
      var cre_total = 0;
      var db_total = 0;
      $scope.bpvds.forEach(function (transaction) {
        cre_total += parseFloat(transaction.crAmount) || 0;
        db_total += parseFloat(transaction.dbAmount) || 0;
      });
      $scope.totalCreditAmount = cre_total;
      $scope.totalDebitAmount = db_total;
      $scope.form.voucherNetAmount = db_total - cre_total || 0;
      db_total - cre_total < 0
        ? $scope.negFlag = true
        : $scope.negFlag = false;
        toWords($scope.form.voucherNetAmount);
    };
    $scope.getTotalAmmounts();
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
          $scope.form.finYear = finYear;
        } else {
          $scope.form.finYear = "";
        }
      } else {
        $scope.form.finYear = "";
      }
    };

    $scope.getBnakPayVoucDetails = function (bankPvId, finYear) {
      if (bankPvId && finYear) {
        $(".loaderbg").show();

        $http
          .get(
            path + `/api/v1/account/bpvd/${bankPvId}/${finYear}`,
            config
          )
          .then((resopnse) => {
            if (resopnse.status == 200) {
              $scope.bpvds = resopnse.data.length > 0 ? resopnse.data : [{}];
              $(".loaderbg").hide();
            }
          });
      } else {
        $scope.bpvds = $scope.bpvds.filter(
          (row) =>
            row.accountCode !== undefined ||
            row.accountCode !== "" ||
            row.accountCode !== null
        );
      }
    };

    $scope.planNos = [];
    $scope.setPurchaseOrderDetails = function (vendorCode) {
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
            $scope.form.assistantName = row.fullName;
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
          $scope.form.bankDscr = element.dscr;
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
          $scope.bpvds[index].accDscr = element.dscr;
        } else {
          if (!accountCode) {
            $scope.bpvds[index].accDscr = "";
          }
        }
      }
    };
    // $rootScope.data = getQueryParam('n');
    $scope.getBnakPayVouc = function (bankPvId, finYear) {
      if (bankPvId && finYear) {
        $http
          .get(
            `${path}/api/v1/account/bpv/${bankPvId}/${finYear}`,
            config
          )
          .then(
            async (resopnse) => {
              // console.log("response of bpv", resopnse);
              if ((await resopnse.status) === 200) {
                console.log("for spreding in Form", resopnse.data);
                $scope.form = resopnse.data;
                // console.log("amal??>>>>>>", $scope.assistantStaffNo);
                $scope.form.assistantStaffNo = $scope.tempRole
                  ? $scope.details.staffNo
                  : resopnse.data.assistantStaffNo;
                $scope.assistantStaffNo = $scope.tempRole
                  ? $scope.details.staffNo
                  : resopnse.data.assistantStaffNo;
                $scope.setName(resopnse.data.assistantStaffNo);
                // $scope.setAssisName($scope.assistantStaffNo);
                $scope.form.bankPvNo = resopnse.data.bankPvNo;
                $scope.form.bankPvDate = resopnse.data.bankPvDate;
                // console.log("lllllll>>>>>>>", $scope.form.assistantStaffNo);
                $scope.ammountInWords = toWords(
                  resopnse.data?.voucherNetAmount
                );
                $scope.fieldDisable(resopnse.data.payToTypeCode);
                setTimeout(() => {
                  $scope.setPurchaseOrderDetails(resopnse.data.vendorCode);
                }, 50);
                $scope.disableFuncFlags(resopnse.data?.voucherStatusCode);
                // $scope.setBankDiscription(resopnse.data.bankCode);
                // $scope.setAccountDscr(resopnse.data.accountCode? resopnse.data.accountCode : null,0);
                // $scope.selectplan(form.planNo,data)
                if (resopnse.data.payToTypeCode === "S") {
                  $scope.form.univRegistrationNo =
                    resopnse.data.univRegistrationNo.toString();
                  $scope.form.voucherStatusCode =
                    resopnse.data.voucherStatusCode.toString();
                  $scope.getStudentDscr($scope.form.univRegistrationNo);
                  $scope.disableVendor = true;
                  $scope.disableEmp = true;
                  $scope.typeF = "Student";
                } else if (resopnse.data.payToTypeCode === "E") {
                  $scope.typeF = "Employee";
                  $scope.form.poNumber = resopnse.data.poNumber?.toString();
                  $scope.form.staffNo = resopnse.data.staffNo;
                  $scope.getEmpDscr(resopnse.data.staffNo);
                  $scope.disableVendor = true;
                  $scope.disableStu = true;
                } else if (resopnse.data.payToTypeCode === "V") {
                  $scope.typeF = "Vendor";
                  // console.log("sdsd", resopnse);
                  $scope.getPurchaseOrders();
                  // $scope.setPurchaseOrder(resopnse.data?.vendorCode);
                  $scope.getPurchaseOrderDetails(resopnse.data?.poNumber);
                  $scope.getVendorDscr(
                    resopnse.data?.vendorCode,
                    $scope.supplierData
                  );
                  $scope.form.vendorCode = resopnse.data.vendorCode?.toString();
                  $scope.form.poNumber = resopnse.data.poNumber;
                  $scope.setPoBillDetails(resopnse.data.billSlNo);
                  $scope.form.billSlNo = resopnse.data.billSlNo?.toString();
                  // $scope.form.passedAmount = resopnse.data.passedAmount;
                  $scope.form.planNo = resopnse.data.planNo?.toString();
                  $scope.disPlanNo = true;
                  // // console.log("<<<<>>>>>>>>>>>>>", typeof resopnse.data.planNo)
                  $scope.disableStu = true;
                  $scope.disableEmp = true;
                } else {
                  // // console.log("some thing went wrong!!");
                }
                // $scope.form.txTypeCode = 3;
                $scope.getbankdeatil(resopnse.data.bankAcNo);
                // $scope.form.instrumentNo = resopnse.data.challanInstrumentNo.toString();
                // $scope.form.instrumentDate = resopnse.data.challanInstrumentDate.toString();
                $scope.form.txTypeCode = resopnse.data.txTypeCode?.toString();
                $scope.changetrx($scope.form.txTypeCode);
                // // console.log("resopnse.datappppppppppppppppppppppppppp", resopnse.data);
              }
            },
            (error) => {
              // console.error(error);
            }
          );
      }
    };

    if ($rootScope.data) {
      console.log("Value of n:111", $rootScope.data);
      // $scope.getbankByPk($rootScope.data.bankPvId, $rootScope.data.finYear);
      $scope.isDisable = $rootScope.data.isDisable ? true : false;
      // console.log($scope.isDisable);
      $scope.getTotalAmmounts();
      $scope.getBnakPayVouc($rootScope.data.bankPvId, $rootScope.data.finYear);
      $scope.getBnakPayVoucDetails($rootScope.data.bankPvId, $rootScope.data.finYear);
    }
  }
);