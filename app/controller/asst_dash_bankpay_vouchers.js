app.controller(
  "asstDashBankPayVouCtrl",
  function ($scope, $http, $timeout, $window, $rootScope) {
    $scope.details = [];
    const token = $window.sessionStorage.getItem("token");
    const userDetailsJSON = $window.sessionStorage.getItem("userDetails");
    if (userDetailsJSON && !(token == null || token == "")) {
      const userDetails = JSON.parse(userDetailsJSON);
      $scope.details = angular.copy(userDetails);
    } else {
      $window.location.href = "index.html";
    }

    var config = {
      //  form: $scope.form,
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    $scope.handleLink = function (p) {
      $rootScope.handleLink(p);
      $rootScope.dataReset();
    };
    $scope.tabToggle = function (p) {
      $rootScope.tabToggle(p);
    };
    // $scope.uniquePayToTypes = function (bPvData) {
    //   var uniqueTypes = {};
    //   var uniqueList = [];
    //   for (var i = 0; i < bPvData.length; i++) {
    //     var typeCode = bPvData[i].payFromTypeCode;
    //     if (!uniqueTypes[typeCode]) {
    //       uniqueTypes[typeCode] = true;
    //       uniqueList.push(bPvData[i]);
    //     }
    //   }
    //   return uniqueList;
    // };
    $scope.orderByDate = function (item) {
     return $rootScope.orderByDate(item);
    };
    // $scope.tempRole = sessionStorage.getItem('tempRole')
    // $scope.goAdminSection = function () {
    //   console.log($scope.tempRole);
    //   if ($scope.tempRole) {
    //     window.location.href = "admin_dashboard.html"
    //   }
    // }
    $scope.payToTypeCodes = [];
    $scope.setpayFromTypeCode = function (payToTypeCode) {
      console.log($scope.bPvData);
      if (payToTypeCode === "E") {
        $scope.payToTypeCodes = $scope.bPvData.filter(
          (x) => x.payToTypeCode === "E"
        );
        console.log("payeeType in Emp", payToTypeCode);
      }
      if (payToTypeCode === "V") {
        $scope.payToTypeCodes = $scope.bPvData.filter(
          (x) => x.payToTypeCode === "V"
        );
        console.log("payeeType in Ven", payToTypeCode);
      }
      if (payToTypeCode === "S") {
        $scope.payToTypeCodes = $scope.bPvData.filter(
          (x) => x.payToTypeCode === "S"
        );
        console.log("payeeType in Stu", payToTypeCode);
      }
      if (payToTypeCode === "O") {
        $scope.payToTypeCodes = $scope.bPvData.filter(
          (x) => x.payToTypeCode === "O"
        );
        console.log("payeeType in Oth", payToTypeCode);
      }
      // $scope.payToTypeCodes = $scope.bPvData.filter(x => x.payToTypeCode === payeeTypeCode);
      console.log(`payeeType ${payToTypeCode}`, $scope.payToTypeCodes);
    };
    $scope.payTo = "";
    $scope.getPayFrom = function (payeeTypeCode, payFromTypeCode) {
      console.log("abhay", payeeTypeCode, payFromTypeCode);
      if (payFromTypeCode != null) {
        for (let i = 0; i < $scope.payFromTypeCodes.length; i++) {
          const x = $scope.payFromTypeCodes[i];
          if (
            (payeeTypeCode === "S" &&
              x.univRegistrationNo === payFromTypeCode.univRegistrationNo) ||
            (payeeTypeCode === "V" &&
              x.vendorCode === payFromTypeCode.vendorCode) ||
            (payeeTypeCode === "E" && x.staffNo === payFromTypeCode.staffNo)
          ) {
            console.log("Matching payeeType", payeeTypeCode);
            $scope.payTo = x.payTo;
            break;
          } else {
            console.log("Matching payeeType", payeeTypeCode);
            if (
              payeeTypeCode === payFromTypeCode.payFromTypeCode &&
              payFromTypeCode.payTo !== $scope.payTo
            ) {
              $scope.payTo = payFromTypeCode.payTo;
            } else {
              $scope.payTo = "";
            }
            break;
          }
        }
      } else {
        $scope.payTo = "";
      }
    };
    $scope.payeeTypeData = [];
    $scope.getPayeeTypeData = function () {
      $http.get(path + "/api/v1/account/paytotype", config).then(
        function (res) {
          // console.log("response", res.data)
          $scope.payeeTypeData = res.data;
          // console.log("$scope.payeeTypeData", $scope.payeeTypeData)
        },
        function (err) {
          console.log(err);
        }
      );
    };
    $scope.getPayeeTypeData();
    $scope.suuplierdetail = [];
    $scope.bankpay = [];
    $scope.isDisable = 0;
    $scope.showDetails = function (n) {
      $scope.isDisable = 1;
      var nObject = {
        bankPvId: n.bankPvId,
        finYear: n.finYear,
        isDisable: $scope.isDisable,
      };
      $rootScope.handleLinkWData("bank-payment-voucher", nObject);
    };
    $scope.filterForStatusAPC = (item) => {
      return (
        item.voucherStatusCode === "C" ||
        item.voucherStatusCode === "A" ||
        item.voucherStatusCode === "P"
      );
    };
    $scope.timeoutPromise = null;
    $scope.data = [];
    $scope.bPvData = [];
    $scope.getdata = function () {
      $http.get(path + "/api/v1/account/bpv", config).then(function (response) {
        $scope.bPvData = response.data;
        // console.table(response.data);
      });
    };
    $scope.getdata();
    $scope.closeDetail = () => {
      document.getElementById("detailmodal").style.display = "none";
    };
    var modal = document.getElementById("detailmodal");
    var closeBtn = document.getElementById("closeBtn");
    // Add an event listener for the "Escape" key press
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        modal.style.display = "none";
      }
    });
    $scope.edit = function (bankPvId, finYear) {
      const nObject = {
        bankPvId: bankPvId,
        finYear: finYear,
      };
      $rootScope.handleLinkWData("bank-payment-voucher", nObject);
    };
    $scope.searchFields = function (
      keyword1,
      keyword2,
      keyword3,
      keyword4,
      keyword5,
      payeeTypeCode,
      payFromTypeCode,
      payTo
    ) {
      let dd = keyword5?.substring(0, 2);
      let mm = keyword5?.substring(2, 6);
      let yyyy = keyword5?.substring(6, 10);
      let dd1 = keyword2?.substring(0, 2);
      let mm1 = keyword2?.substring(2, 6);
      let yyyy1 = keyword2?.substring(6, 10);
      let voucherDate = keyword5 ? yyyy + mm + dd : null;
      let idDate = keyword2 ? yyyy1 + mm1 + dd1 : null;
      var bankPaymentVoucherDto = {
        bankPvId: keyword1 || null,
        bankPvIdDate: keyword2 ? idDate : null,
        finYear: keyword3 || null,
        bankPvNo: keyword4 || null,
        paymentDate: keyword5 ? voucherDate : null,
        payeeTypeCode: payFromTypeCode || null,
        payFromTypeCode: payeeTypeCode || null,
        payTo: payTo || null,
      };
      console.log("bankPaymentVoucherDto", bankPaymentVoucherDto);
      $http
        .post(
          path + "/api/v1/account/bpv/search",
          bankPaymentVoucherDto,
          config
        )
        .then(
          function successCallback(response) {
            $scope.bPvData = response.data;
            $scope.bPvData = response.data;
            console.table($scope.bPvData);
          },
          function errorCallback(error) {
            console.log("Unable to perform request", error);
          }
        );
    };

    $scope.deleteData = function () {
      $(".loaderbg").show();
      const data = {
        bankPvId: $scope.deleteDataInfo.bankPvId,
        finYear: $scope.deleteDataInfo.finYear,
      };
      $http({
        method: "DELETE",
        url: `${path}/api/v1/account/bpv/del/${$scope.deleteDataInfo.bankPvId}/${$scope.deleteDataInfo.finYear}`,
        headers: {
          "Content-type": "application/json;charset=utf-8",
          Authorization: "Bearer " + token,
        },
      })
        .then(function (response) {
       
          if (response.status === 200) {
            toastr.success("Deleted Successfully.2334", { timeOut: 3000 });
            console.log("Deleted successfully", response);      
            $scope.getdata();
            $(".loaderbg").hide();
          } 
        })
        .catch(function (err) {
          console.error(err);
          toastr.error("Error occurred during deletion.", { timeOut: 3000 });
        });
    };

    // $scope.setDeleteData = function (bankPvId, finYear) {
    //   // Set the data to delete
    //   console.log("ranjan>", bankPvId, finYear);
    //   $scope.deleteDataInfo = {
    //     bankPvId: bankPvId,
    //     finYear: finYear,
    //   };
    //   console.log("deleteDataInfo>", $scope.deleteDataInfo);
    // };
    // document.addEventListener("keydown", function (event) {
    //   if (event.key === "Escape") {
    //     modal.style.display = "none";
    //   }
    // });

        //data set for delete model
        $scope.deleteDataModel = {};
        $scope.setDeleteData = function (data) {
          $scope.deleteDataModel = angular.copy(data);
        };

        // $scope.DeleteData = function (bankPvId, finYear) {
        //   $http
        //     .delete(
        //       path +
        //         `/api/v1/account/bpv/del/${bankPvId}/${finYear}`
        //     )
        //     .then(
        //       function (response) {
        //         $("#deleteModal").modal("hide");
                
        //       },
        //       function (error) {
        //         console.log("erroe has occured allhandicaped data", error);
        //         toastr.error("Data Not Deleted !");
        //         $("#deleteModal").modal("hide");
        //       }
        //     );
        // };

        $scope.DeleteData = function (bankPvId, finYear) {
          console.log("data ",bankPvId,finYear);
          // $("#deleteModal").modal("hide");
          $uibModalInstance.dismiss('cancel');
        }


  }
);
