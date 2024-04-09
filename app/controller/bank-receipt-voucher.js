app.controller(
  "bankRecVouCtrl",
  function ($scope, $http, $timeout, $window, $rootScope, $filter) {
    $scope.disPlanNo = false;
    $scope.details = [];
    $scope.token;
    $scope.t = {};
    $scope.form = {};
    // $scope.manager = 'abhay';
    const token = $window.sessionStorage.getItem("token");
    // const roles = $window.sessionStorage.getItem("roles");
    $scope.role = JSON.parse(
      $window.sessionStorage.getItem("roles")
    )[0].dscr.toLowerCase();
    var config = { headers: { Authorization: "Bearer " + token } };
    const userDetailsJSON = $window.sessionStorage.getItem("userDetails");
    // console.log("kkkkkk>>>", userDetailsJSON);
    if (userDetailsJSON && (token != null || token != "")) {
      const userDetails = JSON.parse(userDetailsJSON);
      // console.log("😒😒😒😒",userDetails)
      $scope.details = angular.copy(userDetails);
      console.log("details", $scope.details, $scope.role)
      $scope.t.staffNo = $scope.details.staffNo;
      if ($scope.role === "assistant") {
        $scope.assistantStaffNo = $scope.details.staffNo;
        $scope.form.assistantStaffNo = $scope.details.staffNo;
        $scope.t.assistantName = $scope.details.userFullName?.toUpperCase();
        $scope.form.assistantName = $scope.details.userFullName;
      } else if ($scope.role === "cashier") {
        $scope.cashier = $scope.details.username;
        $scope.form.cashier = $scope.details.username;
      } else {
        // $scope.managerStaffNo = $scope.details.username;
        // $scope.form.managerStaffNo = $scope.details.username;
        // console.log(">>>>>>>>>>>>>>>>>>S>>>", $scope.form.manager);
        // $scope.manager = $scope.details?.username;
      }
    } else {
      $rootScope.handleLink("index");
      console.log("User details not found in sessionStorage");
    }

    $scope.empData = [];
    $scope.getEmpData = (function () {
      $http
        .get(path + "/api/v1/account/employees", config)
        .then(function (response) {
          if (response.status === 200) {
            $scope.empData = response.data;
            // console.log("employee Data", $scope.empData);
            $scope.setAssisName($scope.details.staffNo);
          } else {
            console.error("Error in API response", response);
          }
        })
        .catch(function (error) {
          console.error("Error fetching employee data", error);
        });
    })();
    $scope.setAssisName = function (staffNo) {
      // console.log("emp Data 7878787", $scope.empData);
      for (let i = 0; i < $scope.empData.length; i++) {
        const row = $scope.empData[i];
        if (row.staffNo === staffNo) {
          if ($scope.role === "assistant") {
            $scope.assistantStaffNo = row.staffNo;
            $scope.form.assistantStaffNo = row.staffNo;
            // console.log("fnc amal trigger", $scope.t.assistantName, $scope.assistantStaffNo, $scope.form.assistantStaffNo);
          } else if ($scope.role === "cashier") {
            $scope.t.cashierName = row.fullName;
            $scope.form.mgrCashStaffNo = row.staffNo;
            $scope.t.mgrCashStaffNo = row.staffNo;
          } else {
            if ($scope.role === "manager") {
              $scope.t.managerName = row.fullName;
              $scope.form.managerStaffNo = row.staffNo;
              $scope.managerStaffNo = row.staffNo;
            } else {
              console.error("Role is ----->", $scope.role);
            }
            // $scope.setAssMrgCsrName(row.staffNo);
          }
          // $scope.t.assistantName = row.fullName;
          // $scope.assistantStaffNo = row.staffNo;
          // $scope.form.assistantStaffNo = row.staffNo;
          // console.log(" in setAssisName>", row.staffNo);
        }
      }
    };

    $scope.saveBrv = () => {
      const role = $scope.role;
      const voucherStatusCode = $scope.form.voucherStatusCode;
      $scope.form.sectionCode = $scope.details.sectionCode;
      // console.log("amlwa>>>>", $scope.form.sectionCode);
      // Common logic for manager role
      if (voucherStatusCode === "P" && role === "manager") {
        $http
          .get(
            `${path}/api/v1/account/brv/passed/${$scope.form.bankRvNo || 0}`,
            config
          )
          .then((response) => {
            console.log("got it🚗🚗🚗🚗>>>>>", response);
            if (response.data.status != 0) {
              $scope.res = response.data.count + 1;
              $scope.form.bankRvNo = $scope.res;
              const inputDate = new Date();
              const day = inputDate.getDate().toString().padStart(2, "0");
              const month = (inputDate.getMonth() + 1)
                .toString()
                .padStart(2, "0");
              const year = inputDate.getFullYear();
              $scope.form.bankRvDate = `${day}-${month}-${year}`;
            }
            console.log("date>>>1223", $scope.form.bankRvDate);
            // Continue with the rest of your logic or call a separate function for manager role
            $scope.postDataToServer();
          })
          .catch((error) => {
            console.log("error", error);
            // Handle the error here or propagate it to the calling code
            throw error;
          });
      }

      if (voucherStatusCode === "A" && role === "cashier") {
        $http
          .get(
            `${path}/api/v1/account/brv/acounting/${$scope.form.receiptNo || 0
            }`,
            config
          )
          .then((response) => {
            console.log("got it 2 🚗🚗🚗🚗>>>>>", response);
            if (response.data.status != 0) {
              $scope.res = response.data.count + 1;
              $scope.form.receiptNo = $scope.res;
              const inputDate = new Date();
              const day = inputDate.getDate().toString().padStart(2, "0");
              const month = (inputDate.getMonth() + 1)
                .toString()
                .padStart(2, "0");
              const year = inputDate.getFullYear();
              $scope.form.receiptDate = `${day}-${month}-${year}`;
            }
            console.log("date>>>1223", $scope.form.receiptDate);
            $scope.t.mgrCashStaffNo = $scope.details.staffNo;
            $scope.form.mgrCashStaffNo = $scope.details.staffNo;
            // Continue with the rest of your logic or call a separate function for manager role
            $scope.postDataToServer();
          })
          .catch((error) => {
            console.log("error", error);
            // Handle the error here or propagate it to the calling code
            throw error;
          });
      }
      // else if (role === "cashier") {
      //   $scope.t.mgrCashStaffNo = $scope.details.staffNo;
      //   $scope.form.mgrCashStaffNo = $scope.details.staffNo;
      //   $scope.postDataToServer();
      // Cashier-specific logic
      // if (role === 'cashier' && (voucherStatusCode === 'A' || voucherStatusCode === 'C')) {
      //   // Implement logic for cashier with status 'P'
      //   // console.log("Cashier logic for status 'P'");
      //   $scope.postDataToServer();
      // }

      // }
      // Assistant-specific logic
      if (
        role === "assistant" &&
        (voucherStatusCode === "F" || voucherStatusCode === "U")
      ) {
        // Implement logic for assistant with status 'F'
        // console.log($scope.form.assistantStaffNo);
        $scope.form.assistantStaffNo = $scope.details.staffNo;
        $scope.t.assistantName = $scope.details.fullName;
        // $scope.setName($scope.form.assistantStaffNo);

        $scope.postDataToServer();
      }
      if (voucherStatusCode === "R" && role === "manager") {
        // Implement logic for cashier with status 'P'
        $scope.postDataToServer();
      }
      if (role === "manager") {
        if (role === "manager" && voucherStatusCode === "P") {
          console.log("yessss..........");
          document.getElementById("#save").classList.remove("tablink");
        }
        $scope.managerStaffNo = $scope.details.staffNo;
        $scope.form.managerStaffNo = $scope.details.staffNo;
        $scope.postDataToServer();
      } else {
        console.log("nii hua");
      }
    };
    $scope.postDataToServer = () => {
      let data = Object.fromEntries(
        Object.entries($scope.form).filter(([_, value]) => value)
      );

      console.log("posting data", $scope.form, data);
      $http
        .post(path + "/api/v1/account/brv", data, config)
        .then((response) => {
          toastr.success("Recipt Voucher Saved Successfully");
          $scope.getBRV(response.data.bankRvId, response.data.finYear);
        })
        .catch((error) => {
          toastr.error("ERROR", "Something Went Wrong !!");
          // Handle the error here or propagate it to the calling code
          throw error;
        });
    };
    // $scope.delBRVDList = [];
    // $scope.setDeleteBRVD = function (bankRvId, finYear, robj) {
    //   $timeout(() => {
    //     console.log(robj);
    //     if (robj.select) {
    //       // Checkbox is checked, add the object to the array.
    //       const delObj = {
    //         bankRvId: bankRvId,
    //         finYear: finYear,
    //         bankRvDetSlno: robj.bankRvDetSlno,
    //       };
    //       $scope.delBRVDList.push(delObj);

    //       console.log("Object added:", $scope.delBRVDList, robj);
    //     } else {
    //       // Checkbox is unchecked, remove the object from the array.
    //       console.log("12345", robj);
    //       $scope.delBRVDList = $scope.delBRVDList.filter(
    //         (obj) =>
    //           !(
    //             obj.bankRvDetSlno === robj.bankRvDetSlno &&
    //             obj.bankRvId === bankRvId &&
    //             obj.finYear === finYear
    //           )
    //       );
    //       console.log("Object removed:", $scope.delBRVDList, robj);
    //     }
    //   }, 100);
    // };
    // deleteBRVD(form.bankRvId, form.finYear, v.bankRvDetSlno, $index);
    $scope.deleteBRVD = function (bankRvId, finYear, bankRvDetSlno) {

      $scope.delBRVDList = [
        { bankRvId: bankRvId, finYear: finYear, bankRvDetSlno: bankRvDetSlno }
      ];
      console.log("🚀 ~ $scope.setdeleteBRVD ~ $scope.delObj2:", $scope.delBRVDList, config);
      $http({
        method: "DELETE",
        url: path + `/api/v1/account/brvd`,
        data: $scope.delBRVDList,
        headers: {
          "Content-type": "application/json;charset=utf-8",
          Authorization: "Bearer " + token,
        },
      }).then(
        (response) => {
          console.log("🚀 ~ $scope.deleteBRVD ~ response:", response);
          if (response.status == 200) {
            $(document).on("click", ".deletebtn", function () {
              $("input:checked").closest(".addcol6").remove();
              $(".deletebtn").prop("disabled", true);
              $scope.delBRVDList = [];
            });
            $scope.getBRVD($scope.form.bankRvId, $scope.form.finYear);
            console.log("🚀 ~ $scope.deleteBRVD ~ response:", response);
            $scope.getTotalAmmounts();
            toastr.success("Deleted Successfully");
            $scope.getBRVD($scope.form.bankRvId, $scope.form.finYear);
          }
        },
        (error) => {
          console.log("🚀 ~ $scope.deleteBRVD ~ error:", error);
          toastr.error(
            "Delete Error",
            "Error deleting BPVD. Please try again."
          );
        }
      );
    };
    $scope.setAccountDscr = function (accountCode, index) {
      //  console.log(`🚗🚗🚗${typeof accountCode}🛺🛺🛺🛺`, index)
      for (let i = 0; i < $scope.accMasterData.length; i++) {
        const element = $scope.accMasterData[i];
        // console.log(element.accountCode, accountCode)
        if (accountCode === element.accountCode) {
          // console.log(element);
          $scope.brvds[index].accDscr = element.dscr;
        } else {
          if (!accountCode) {
            $scope.brvds[index].accDscr = null;
          }
        }
      }
    };
    $scope.saveBrvd = function () {
      $scope.filteredBankRV = $scope.brvds
        .filter((row) => row.accountCode !== undefined)
        .map((row) => {
          return {
            ...row,
            bankRvId: $scope.form?.bankRvId,
            finYear: $scope.form?.finYear,
          };
        });
      // Remove null values
      // console.log("first>>>>>>>>>>>>", $scope.filteredBankRV);

      $http
        .post(path + "/api/v1/account/brvd", $scope.filteredBankRV, config)
        .then(
          function successCallback(res) {
            if (res.status === 200) {
              // toastr.success("Data Saved Successfully");
              $scope.postDataToServer();
              // console.log(res.data);
              // setTimeout(() => {
              //   if ($scope.role === "assistant") {
              //     $window.location.href = 'assistant_dashboard.html';
              //   } else if ($scope.role === "manager") {
              //     $window.location.href = 'manager_dashboard.html';
              //   } else {
              //     $window.location.href = 'cashier_dashboard.html';
              //   }
              // }, 2000)
            }
          },
          function errorCallback(err) {
            // console.error(err);
            toastr.error("Kindly fill All the mandatory fields!!!");
          }
        );
    };

    $scope.goDataLst = function () {
      if ($scope.role === "assistant") {
        $window.location.href = "assistant_dashboard.html";
      } else if ($scope.role === "manager") {
        $window.location.href = "manager_dashboard.html";
      } else {
        $window.location.href = "cashier_dashboard.html";
      }
      // window.location.href = "assistant_dashboard.html";
    };
    $scope.cform = {};
    $scope.getTotalAmmounts = function () {
      var cre_total = 0;
      var db_total = 0;
      if ($scope.brvds?.length > 0) {
        $scope.brvds?.forEach(function (transaction) {
          console.log(transaction)
          cre_total += parseFloat(transaction.crAmount) || 0;
          db_total += parseFloat(transaction.dbAmount) || 0;
        });
        $scope.totalCreditAmount = cre_total;
        $scope.totalDebitAmount = db_total;
        $scope.form.voucherNetAmount = cre_total - db_total || 0;
        console.log("🚀🛺🛺🛺 ~ $scope.form.voucherNetAmount:", $scope.form.voucherNetAmount);
      }
      console.log("🚀 ~ $scope.totalCreditAmount:", $scope.totalCreditAmount)
      console.log("🚀 ~ $scope.cform.totalCreditAmount:", $scope.form.totalCreditAmount)
      if (cre_total - db_total < 0) {
        $scope.negFlag = true;
      } else {
        $scope.negFlag = false;
      }
      console.log("🚀 ~ $scope.cform.totalDebitAmount:", $scope.form.totalDebitAmount)
      toWords($scope.form.voucherNetAmount);
    };
    $scope.getTotalAmmounts();
    $scope.negFlag = false;
    $scope.calculateFinYear = function (idDate) {
      var idDate = idDate;
      //     console.log(idDate);
      var dateParts = idDate.split("-");
      //     console.log(dateParts);
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
          //          console.log(finYear);
          $scope.form.finYear = finYear;
        } else {
          $scope.form.finYear = "";
        }
      } else {
        $scope.form.finYear = "";
      }
    };

    $scope.formattedValue = "";

    $scope.payeeTypeData = [];
    $scope.getPayeeTypeData = function () {
      $http.get(path + "/api/v1/account/paytotype", config).then(
        function (res) {
          //   console.log("response", res.data)
          $scope.payeeTypeData = res.data;
          //  console.log("$scope.payeeTypeData", $scope.payeeTypeData)
        },
        function (err) {
          // console.log(err);
        }
      );
    };
    $scope.getPayeeTypeData();
    $scope.typeFF = "";

    $scope.fieldDisable = function (payToTypeCode) {
      //console.log(payToTypeCode)
      if (payToTypeCode === "E") {
        //console.log(payToTypeCode)
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
        $scope.form.univRegistrationNo = "";
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
        //console.log(payToTypeCode)
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
        $scope.typeF = "";
        $scope.disableEmp = true;
        $scope.disableStu = true;
        $scope.disableVendor = true;
        $scope.hideFlag = true;
        $scope.form.empDscr = "";
        $scope.form.address = "";
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
        // $scope.form.studentDscr = ""
        console.log(payToTypeCode);
      } else {
        console.log("Nhi hoga");
      }
    };

    $scope.disableFlag1 = false;
    $scope.disableFlag2 = false;
    $scope.disableFlag3 = false;
    $scope.disableFuncFlags = function (voucherStatusCode) {
      console.log("2222", $scope.role);
      if (
        voucherStatusCode === "F" ||
        $scope.role === "manager" ||
        $scope.role === "cashier"
      ) {
        $scope.disableFlag1 = true;
        console.log(
          "🚀 ~ erterterterterterterterteterte ~ voucherStatusCode:1234567",
          voucherStatusCode,
          $scope.disableFlag1
        );
      }
      if ($scope.role === "cashier") {
        // $scope.disableFlag2 = false;
        $scope.disableFlag3 = true;
      }
    };
    $scope.brvds = [{}];

    $scope.addObj = function () {
      $scope.brvds.push({});
    };

    // Data from supplier table for vendor
    $scope.supplierData = [];
    $scope.getSupplierData = function () {
      $http
        .get(path + "/api/v1/account/supplier", config)
        .then(function (response) {
          $scope.supplierData = response.data;
          // console.table($scope.supplierData);
        });
    };
    $scope.getSupplierData();
    $scope.goToDataLstRollWise = function () {
      console.log("first", $scope.role);
      if ($scope.role === "assistant") {
        console.log("first", $scope.role);
        $scope.handleLink("asst_dash_bankrec_vouchers");
      } else if ($scope.role === "manager") {
        $scope.handleLink("mgr_dash_bankrec_vouchers");
      } else if ($scope.role === "cashier") {
        $scope.handleLink("cash_dash_bankrec_vouchers");
      } else {
        alert("something went wrong!!!");
      }
    };
    $scope.getVendorDscr = function (vendorCode) {
      for (let i = 0; i < $scope.supplierData?.length; i++) {
        let row = $scope.supplierData[i];
        if (vendorCode === row.vendorCode) {
          $scope.vflag = true;
          $scope.form.vendorDscr = row.fullName;
          $scope.form.recvdFrom = row.fullName;
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
          // $scope.getpodetails(vendorCode);
        }
      }
    };

    $scope.getPurchaseOrders = function () {
      $http.get(path + "/api/v1/account/po", config).then(
        function successCallback(response) {
          // console.table(response.data);
          const uniqueSet = new Set();
          $scope.purchaseOrders = response.data;
          $scope.uniquePurchaseOrders = response.data.filter((x) => {
            const value = x.planNo;
            if (!uniqueSet.has(x.planNo)) {
              uniqueSet.add(value);
              return true;
            }
            return false;
          });
          // console.log("purchase order>>>>1234>>>>>>>>", $scope.purchaseOrders);
          // After retrieving data, call the updateSuppData function
          $scope.getSupplierData();
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
          // console.log("supplierbill order>>>>33333>>>>>>>>", $scope.suppdata);
          // After retrieving data, call the updateSuppData function
          // $scope.updateSuppData();
          $scope.getSupplierData();
        },
        function errorCallback(response) {
          // console.log("saving of data failed");
        }
      );
    };
    $scope.selectplan = function (x) {
      if (x) {
        // console.log("selectplan", x);
        // console.log("function in selectplan", x);
        for (let index = 0; index < $scope.projectPlanData.length; index++) {
          const element = $scope.projectPlanData[index];
          if (element.planNo == x) {
            console.log("meri", element);
            $scope.form.planFinYear = element.planFinYear;
            $scope.form.planTypeCode = element.planTypeCode;
            $scope.form.planTitle = element.planTitle;
          }
        }
      }
    };

    $scope.getPurchaseOrders();
    $scope.getsuppdata();

    $scope.getSupplierData();
    $scope.getPurOrder = function (poNo) {
      console.log("check123");
      if (poNo) {
        console.log("poNo>>>>", poNo);
        $scope.getbillslno(poNo);
        for (let index = 0; index < $scope.purchaseOrders.length; index++) {
          const element = $scope.purchaseOrders[index];
          console.log("rrr", element);
          if (poNo == element.poNumber) {
            $scope.form.poDate = element.poDate;
            $scope.form.poId = element.poId;
            $scope.form.indentNo = element.indentNo;
            $scope.form.indentDate = element.indentDate;
            $scope.form.poFinYear = element.poFinYear;
            // $scope.form.granNo = element.garnNo;
            // $scope.form.granDate = element.garnDate;
            // $scope.form.invoiceNo = element.invoiceNo;
            // $scope.form.invoiceDate = element.invoiceDate;
            // $scope.form.amount = element.invoiceAmount;
            // $scope.form.billRegNo = element.billRegNo;
            // $scope.form.billRegDate = element.billRegDate;
          }
        }
      } else {
        $scope.form.poDate = "";
        $scope.form.poId = "";
        $scope.form.indentNo = "";
        $scope.form.indentDate = "";
        $scope.form.poFinYear = "";
        console.log("poNo", poNo);
      }
    };

    $scope.planno = [];
    $scope.billSlNo = [];

    $scope.getbillslno = function (poNo) {
      $scope.billSlNo = [];
      $scope.planno = []; // Clear the planno array
      for (let index = 0; index < $scope.supplierData.length; index++) {
        const element = $scope.supplierData[index];
        if (poNo == element.poNumber) {
          if (!$scope.billSlNo.includes(element.billSlNo)) {
            $scope.billSlNo.push(element.billSlNo);
          }
          if (
            element.planNo !== undefined &&
            !$scope.planno.includes(element.planNo)
          ) {
            $scope.planno.push(element.planNo);
          }
        }
      }

      // console.log($scope.billSlNo);
      // console.log($scope.planno);
    };

    $scope.poNumbers = [];
    $scope.getpodetails = function (code) {
      // console.log(code, "cod")
      for (let index = 0; index < $scope.supplierData.length; index++) {
        const element = $scope.supplierData[index];
        if (code == element.vendorCode) {
          if (!$scope.poNumbers.includes(element.poNumber)) {
            $scope.poNumbers.push(element.poNumber);
          }
        }
      }
    };

    $scope.getsuppdata();
    // Fetch data from the collgeDepartment table
    $scope.departmentData = [];
    $scope.fetchDepartmentdata = function () {
      $http.get(path + "/api/v1/account/department", config).then(
        function successCallback(response) {
          $scope.departmentData = response.data;
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
        //  console.log("dep Code", row)
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

    //Fetching Voucher Type table
    $scope.voucherType = [];
    $scope.getVoucherType = function () {
      $http.get(path + "/api/v1/account/vst", config).then(
        function successCallback(response) {
          $scope.voucherType = response.data;
          //  console.log("$scope.voucherType>>>>>>", $scope.voucherType)
          $scope.form = {
            voucherStatusCode:
              $scope.voucherType?.length > 0
                ? $scope.voucherType[0].voucherStatusCode
                : null,
          };
        },
        function errorCallback(response) {
          // console.log("Error fetching colllege data")
        }
      );
    };
    $scope.getVoucherType();

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
        // console.log("university Data", row)
        if (uniCode == row.universityCode) {
          $scope.form.universityDscr = row.dscr;
          break;
        }
      }
    };

    $scope.projectPlanData = [];
    $scope.getprojectdata = function () {
      $http.get(path + "/api/v1/account/projectplan/alldata", config).then(
        function successCallback(response) {
          $scope.projectPlanData = response.data;
          console.log("projectPlanData", $scope.projectPlanData);
        },
        function errorCallback(response) {
          console.log("Fetching of data failed");
        }
      );
    };
    $scope.getprojectdata();
    $scope.planNos = [];
    $scope.setPurchaseOrder = function (vendorCode) {
      if (vendorCode) {
        console.log("checking vendor code for purchase oder data", vendorCode);
        $scope.poDetails = $scope.purchaseOrders?.filter((row) => {
          $scope.planNos.push(row.planNo);
          return vendorCode === row.vendorCode;
        });
        // console.log("abc>>>", $scope.planNos);
        $scope.planNos = [...new Set($scope.planNos)];
        // console.log("abc>>>", $scope.planNos);
        // $scope.projectPlans = $scope.purchaseOrders?.map(row => vendorCode === row.vendorCode);
        // console.log("abc", $scope.projectPlanData);
      }
    };
    $scope.setName = (staffNo) => {
      if (staffNo) {
        for (let i = 0; i < $scope.empData.length; i++) {
          const row = $scope.empData[i];
          if (row.staffNo === staffNo) {
            $scope.form.assistantName = row.fullName;
            $scope.assistantName = row.fullName;
            $scope.t.assistantName = row.fullName;
          }
        }
      }
    };


    // $scope.setAssMrgCsrName = (staffNo) => {
    //   for (let i = 0; i < $scope.empData.length; i++) {
    //     const row = $scope.empData[i];
    //     console.log("fnc  in setAssMrgCsrName", row);
    //     if (row.staffNo === staffNo) {
    //       $scope.t.assistantName = row.fullName;
    //     }
    //   }
    // }

    $scope.getEmpDscr = function (staffNo) {
      //  console.log("staff No", staffNo, $scope.empData);
      for (let i = 0; i < $scope.empData.length; i++) {
        let row = $scope.empData[i];
        if (staffNo == row.staffNo) {
          $scope.form.empDscr = row.fullName;
          $scope.form.recvdFrom = row.fullName;
          $scope.form.address = row.addr1;
          $scope.form.departmentCode = row.departmentCode;
          $scope.setDepDscr($scope.form.departmentCode, $scope.departmentData);
          $scope.form.collegeCode = row.collegeCode;
          $scope.setClgDscr($scope.form.collegeCode, $scope.collegeData);
          $scope.form.universityCode = row.universityCode;
          $scope.setUniversityDscr(
            $scope.form.universityCode,
            $scope.universityData
          );
          $scope.form.bankIfscCode = row.bankIfscCode;
          $scope.form.bankAccountNo = row.bankAccountNo;
          $scope.form.bankName = row.bankName;
          $scope.form.bankBranch = row.bankBranch;
          $scope.form.bankCity = row.bankCity;
          $scope.form.bankCountry = row.bankCountry;
          // $scope.getaccountdetails(row.collegeCode);
        }
      }
    };

    $scope.uniquePayToTypes = function (bRvData) {
      var uniqueTypes = {};
      var uniqueList = [];
      for (var i = 0; i < bRvData.length; i++) {
        var typeCode = bRvData[i].payFromTypeCode;
        if (!uniqueTypes[typeCode]) {
          uniqueTypes[typeCode] = true;
          uniqueList.push(bRvData[i]);
        }
      }
      return uniqueList;
    };

    $scope.bankaccountData = [];
    $scope.getbankaccount = function () {
      $http.get(path + "/api/v1/account/bankacc", config).then(
        function (res) {
          if (res.status === 200) {
            $scope.bankaccountData = res.data;
            // console.log("khkjhkjhkjhk", $scope.bankaccount)
          }
        },
        function (err) {
          // console.log(err);
        }
      );
    };
    $scope.getbankaccount();

    // $scope.updatedbankacc = [];
    // $scope.getaccountdetails = function (collegeCode) {
    //   for (let index = 0; index < $scope.bankaccount?.length; index++) {
    //     const element = $scope.bankaccount[index];
    //     if (element.collegeCode === collegeCode) {
    //  console.log("B", $scope.bankaccount);
    //       $scope.updatedbankacc.push(element);
    //  console.log("U",$scope.updatedbankacc);
    //     }
    //   }
    //   $scope.bankaccount = $scope.updatedbankacc;
    // }

    $scope.studentData = [];
    $scope.fetchStudentData = function () {
      $http.get(path + "/api/v1/account/students", config).then(
        function (response) {
          if (response.status === 200) {
            $scope.studentData = response.data;
            //  console.table($scope.studentData);
          }
        },
        function (error) {
          // console.error(error);
        }
      );
    };
    $scope.fetchStudentData();

    //get transaction data
    $scope.trx = [];
    $scope.gettrxdata = function () {
      // keyword = keyword.toLowerCase();
      $http.get(path + "/api/v1/account/txtype", config).then(
        function successCallback(response) {
          $scope.trx = response.data;
          //  console.log("$scope.txTypeData", $scope.txTypeData)
        },
        function errorCallback(err) {
          // console.log(err, "Unable to perform  request");
        }
      );
    };
    $scope.gettrxdata();

    $scope.changetrx = function (n) {
      if (n) {
        for (let index = 0; index < $scope.trx.length; index++) {
          const element = $scope.trx[index];
          // console.log(element)
          if (n == element.txTypeCode) {
            $scope.form.txTypeDscr = element.shortName;
          }
        }
      } else {
        $scope.form.txTypeDscr = "";
      }
    };

    $scope.getStudentDscr = function (univRegistrationNo) {
      if (univRegistrationNo) {
        console.table(
          "univRegistrationNo1212",
          univRegistrationNo,
          $scope.studentData
        );
        for (let i = 0; i < $scope.studentData.length; i++) {
          let row = $scope.studentData[i];
          if (univRegistrationNo === row.univRegistrationNo) {
            $scope.form.studentDscr = row.fullName;
            $scope.form.recvdFrom = row.fullName;
            $scope.form.address = row.addres1;
            $scope.form.departmentCode = row.departmentCode;
            $scope.setDepDscr(row.departmentCode, $scope.departmentData);
            $scope.form.collegeCode = row.collegeCode;
            $scope.setClgDscr($scope.form.collegeCode, $scope.collegeData);
            $scope.form.universityCode = row.universityCode;
            $scope.setUniversityDscr(
              $scope.form.universityCode,
              $scope.universityData
            );
            $scope.form.bankIfscCode = row.bankIfscCode;
            $scope.form.bankAccountNo = row.bankAccountNo;
            $scope.form.bankName = row.bankName;
            $scope.form.bankBranch = row.bankBranch;
            $scope.form.bankCity = row.bankCity;
            $scope.form.bankCountry = row.bankCountry;
            // $scope.getaccountdetails(row.collegeCode);
          }
        }
      }
    };

    $scope.getbankdeatil = function (n) {
      for (let index = 0; index < $scope.bankaccountData.length; index++) {
        const element = $scope.bankaccountData[index];
        if (element.bankAccountNo === n) {
          $scope.form.bankCode = element.bankCode;
          $scope.form.bankDscr = element.dscr;
        }
      }
    };
    $scope.bankaccount = [];
    $scope.getbankaccount = function () {
      $http.get(path + "/api/v1/account/bankacc", config).then(
        function (res) {
          $scope.bankaccount = res.data;
        },
        function (err) {
          console.log(err);
        }
      );
    };
    $scope.getbankaccount();
    // $scope.bankaccountData = [];
    // $scope.getdata = function () {
    //   $http.get(path + "/api/v1/account/bankacc", config).then(
    //     function successCallback(response) {
    //       $scope.bankaccountData = response.data;
    //       $(".loaderbg").hide();
    //     },
    //     function errorCallback(response) { }
    //   );
    // };
    // $scope.getdata();

    $scope.getBRVD = function (bankRvId, finYear) {
      if (bankRvId, finYear) {
        $http
          .get(`${path}/api/v1/account/brvd/${bankRvId}/${finYear}`, config)
          .then((response) => {
            if (response.status == 200) {
              $scope.brvds = response.data.length > 0 ? response.data : [{}];
              // $scope.getTotalAmmounts();
              $(".loaderbg").hide();
            }
          });
      };
    }

    $scope.setBankDiscription = (bankCode) => {
      console.log(bankCode);
      for (let index = 0; index < $scope.bankaccount.length; index++) {
        const element = $scope.bankaccount[index];
        if (element.bankCode === bankCode) {
          $scope.form.bankDscr = element.dscr;
        }
      }
    };

    $scope.isDisable = false;
    // Get the 'n' object from the query parameter
    //console.log("dddddd", $rootScope.data);
    $scope.getBRV = function (bankRvId, finYear) {
      console.log("in get BPV", bankRvId, finYear);
      if (bankRvId && finYear) {
        $http
          .get(`${path}/api/v1/account/brv/${bankRvId}/${finYear}`, config)
          .then(
            async (resopnse) => {
              console.log(resopnse);
              if (await resopnse.status == 200) {
                console.log(
                  "for spreding in Form>>>>>>>>>>>>>>>>>>>>>",
                  resopnse.data
                );
                $scope.form = resopnse.data;
                $scope.assistantStaffNo = resopnse.data?.assistantStaffNo;
                await resopnse.data.assistantStaffNo
                  ? $scope.setName(resopnse.data.assistantStaffNo)
                  : $scope.setName($scope.details.staffNo);
                await resopnse.data.assistantStaffNo
                  ?
                  // $scope.setName(resopnse.data.assistantStaffNo)
                  // $scope.assistantName = row.fullName;
                  $scope.t.assistantName = $scope.userDetails.userFullName
                  :
                  // $scope.setName($scope.details.staffNo);
                  $scope.t.assistantName = $scope.userDetails.userFullName
                $scope.form.assistantStaffNo = resopnse.data.assistantStaffNo
                  ? resopnse.data.assistantStaffNo
                  : $scope.details.staffNo;
                $scope.assistantStaffNo = resopnse.data.assistantStaffNo
                  ? resopnse.data.assistantStaffNo
                  : $scope.details.staffNo;
                // $scope.setAssisName($scope.assistantStaffNo);
                $scope.form.bankRvNo = resopnse.data.bankRvNo;
                $scope.form.bankRvDate = resopnse.data.bankRvDate;
                console.log("lllllll>>>>>>>", $scope.form.assistantStaffNo);
                // $scope.setAccountDscr(resopnse.data.accountCode);
                $scope.setBankDiscription(resopnse.data.bankCode);
                $scope.ammountInWords = toWords(
                  resopnse.data?.voucherNetAmount
                );
                $scope.fieldDisable(resopnse.data.payFromTypeCode);
                // $scope.getPurOrder(resopnse.data.poNumber);
                // $scope.selectplan(form.planNo, data)
                $scope.disableFuncFlags(resopnse.data.voucherStatusCode);
                if (resopnse.data.payFromTypeCode === "S") {
                  $scope.form.univRegistrationNo =
                    resopnse.data.univRegistrationNo.toString();
                  $scope.form.voucherStatusCode =
                    resopnse.data.voucherStatusCode.toString();
                  // $scope.getStudentDscr(typeof $scope.form.univRegistrationNo === typeof "String" ? $scope.form.univRegistrationNo : null);
                  $scope.getStudentDscr(resopnse.data.univRegistrationNo);
                  $scope.disableVendor = true;
                  $scope.disableEmp = true;
                  $scope.typeF = "Student";
                } else if (resopnse.data.payFromTypeCode === "E") {
                  $scope.typeF = "Employee";
                  $scope.form.poNumber = resopnse.data.poNumber?.toString();
                  $scope.getEmpDscr($scope.form.staffNo);
                  $scope.disableVendor = true;
                  $scope.disableStu = true;
                  $scope.form.staffNo = resopnse.data.staffNo;
                } else if (resopnse.data.payFromTypeCode === "V") {
                  $scope.typeF = "Vendor";
                  $scope.getPurchaseOrders();
                  $scope.setPurchaseOrder(resopnse.data?.vendorCode);
                  $scope.selectplan(resopnse.data?.planNo);
                  $scope.getVendorDscr(resopnse.data?.vendorCode);
                  $scope.form.vendorCode = resopnse.data.vendorCode?.toString();
                  $scope.form.poNumber = resopnse.data.poNumber?.toString();
                  $scope.disPlanNo = true;
                  // console.log("<<<<>>>>>>>>>>>>>", typeof resopnse.data.planNo)
                  $scope.disableStu = true;
                  $scope.disableEmp = true;
                } else {
                  // console.log("some thing went wrong!!");
                }
                $scope.form.txTypeCode = resopnse.data.txTypeCode.toString();
                $scope.form.instrumentNo =
                  resopnse.data.challanInstrumentNo.toString();
                $scope.form.instrumentDate =
                  resopnse.data.challanInstrumentDate.toString();
                $scope.changetrx(resopnse.data?.txTypeCode);
                // console.log("resopnse.data", resopnse.data);
              }
            },
            (error) => {
              // console.error(error);
            }
          );
      }
    };
    if ($rootScope.data) {
      console.log("Value of n:", $rootScope.data);
      // $scope.getbankRVByPk($rootScope.data.bankRvId, $rootScope.data.finYear);
      $scope.isDisable = $rootScope.data.isDisable === 1 ? true : false;
      $scope.getBRV($rootScope.data.bankRvId, $rootScope.data.finYear);
      $scope.getBRVD($rootScope.data.bankRvId, $rootScope.data.finYear);
    }
  }
);
