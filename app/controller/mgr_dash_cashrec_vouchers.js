app.controller('mgrDashCashRecVouCtrl', function ($scope, $http, $timeout, $window, $rootScope, $filter, $location) {
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
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    $scope.handleLink = function (pgname) {
      $rootScope.handleLink(pgname);
    };

    $scope.tabToggle = function (id) {
      $rootScope.tabToggle(id);
    };

    var config = {
      headers: {
        'Authorization': 'Bearer ' + token
      },
    };
    $scope.uniquePayToTypes = function (cRvData) {
      var uniqueTypes = {};
      var uniqueList = [];
      for (var i = 0; i < cRvData?.length; i++) {
        var typeCode = cRvData[i]?.payFromTypeCode;
        if (!uniqueTypes[typeCode]) {
          uniqueTypes[typeCode] = true;
          uniqueList.push(cRvData[i]);
        }
      }
      return uniqueList;
    };

    $scope.setpayFromTypeCode = function (payFromTypeCode) {
      $scope.payFromTypeCodes = [];
      console.log(payFromTypeCode);
      if (payFromTypeCode === "E") {
        $scope.payFromTypeCodes = $scope.cRvData.filter(x => x.payFromTypeCode === "E");
        console.log("payeeType in Emp", payFromTypeCode);
      }
      if (payFromTypeCode === "V") {
        $scope.payFromTypeCodes = $scope.cRvData.filter(x => x.payFromTypeCode === "V");
        console.log("payeeType in Ven", payFromTypeCode);
      }
      if (payFromTypeCode === "S") {
        $scope.payFromTypeCodes = $scope.cRvData.filter(x => x.payFromTypeCode === "S");
        console.log("payeeType in Stu", payFromTypeCode)
      }
      if (payFromTypeCode === "O") {
        $scope.payFromTypeCodes = $scope.cRvData.filter(x => x.payFromTypeCode === "O");
        console.log("payeeType in Oth", payFromTypeCode);
      }
      // $scope.payFromTypeCodes = $scope.cRvData.filter(x => x.payFromTypeCode === payeeTypeCode);
      console.log(`payeeType ${payFromTypeCode}`, $scope.payFromTypeCodes);
    };
    $scope.recvdFrom = '';
    $scope.getPayFrom = function (payeeTypeCode, payFromTypeCode) {
      console.log("abhay", payeeTypeCode, payFromTypeCode);
      if (payFromTypeCode != null) {
        for (let i = 0; i < $scope.payFromTypeCodes.length; i++) {
          const x = $scope.payFromTypeCodes[i];

          if ((payeeTypeCode === 'S' && x.univRegistrationNo === payFromTypeCode.univRegistrationNo) ||
            (payeeTypeCode === 'V' && x.vendorCode === payFromTypeCode.vendorCode) ||
            (payeeTypeCode === 'E' && x.staffNo === payFromTypeCode.staffNo)
          ) {
            console.log("Matching payeeType", payeeTypeCode);
            $scope.recvdFrom = x.recvdFrom;
            break;
          } else {
            console.log("Matching payeeType", payeeTypeCode);
            if (payeeTypeCode === payFromTypeCode.payFromTypeCode && payFromTypeCode.recvdFrom !== $scope.recvdFrom) {
              $scope.recvdFrom = payFromTypeCode.recvdFrom;
            } else {
              $scope.recvdFrom = '';
            }
            break;
          }
        }
      } else {
        $scope.recvdFrom = '';
      }
    };
    $scope.payeeTypeData = [];
    $scope.getPayeeTypeData = function () {
      $http.get(path + '/api/v1/account/paytotype', config).then(
        function (res) {
          // console.log("response", res.data)
          $scope.payeeTypeData = res.data
          // console.log("$scope.payeeTypeData", $scope.payeeTypeData)
        },
        function (err) {
          console.log(err)
        }
      )
    }
    $scope.getPayeeTypeData();
    $scope.suuplierdetail = [];
    $scope.bankpay = {};

    $scope.isDisable=false;
   
    $scope.showDetails = function (n) {
      
      const nObject = {
        cashRvId: n.cashRvId,
        finYear: n.finYear,
        isDisable:!$scope.isDisable
        // Add more properties if needed
      };
      $rootScope.handleLinkWData('cash-receipt-voucher',nObject);
    }
  $scope.edit = function (cashRvId,finYear) {
      const nObject = {
        cashRvId: cashRvId,
        finYear: finYear,
      };
      $rootScope.handleLinkWData('cash-receipt-voucher',nObject);
    }
    $scope.timeoutPromise = null;
    $scope.data = [];
    $scope.cRvData = [];
    $scope.getdata = function () {
      $http.get(path + '/api/v1/account/crv', config)
        .then(function (response) {
          $scope.cRvData = response.data;
      });
    };
    $scope.getdata();
    $scope.closeDetail = () => {
      // console.log("hiiiiiiiii")
      document.getElementById("detailmodal").style.display = "none";
    };
    var modal = document.getElementById("detailmodal");
    var closeBtn = document.getElementById("closeBtn");
    // Add an event listener for the "Escape" key press
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        modal.style.display = "none"; // Hide the modal when "Escape" key is pressed
      }
    });

    $scope.filterForStatusAandC = (item)=>{
      return  item.voucherStatusCode === 'C' || item.voucherStatusCode === 'A';
    }
    
    
    $scope.searchFields = function (cashRvId, cashRvIdDate, finYear, cashRvNo, cashRvDate, payFromTypeCode, payeeTypeCode, recvdFrom) {
      // Create a request object with the keywords in the request body
      let dd = cashRvDate?.substring(0, 2);
      let mm = cashRvDate?.substring(2, 6);
      let yyyy = cashRvDate?.substring(6, 10);
      let dd1 = cashRvIdDate?.substring(0, 2);
      let mm1 = cashRvIdDate?.substring(2, 6);
      let yyyy1 = cashRvIdDate?.substring(6, 10);
      let voucherDate = cashRvDate ? yyyy + mm + dd : null;
      let idDate = cashRvIdDate ? yyyy1 + mm1 + dd1 : null;
      // console.log("yyy-MM-dd >>>", yyyy + mm + dd);
      var bankReceiptVoucherDto = {
        cashRvId: cashRvId || null,
        cashRvIdDate: cashRvIdDate ? idDate : null,
        finYear: finYear || null,
        cashRvNo: cashRvNo || null,
        cashRvDate: cashRvDate ? voucherDate : null,
        payeeTypeCode: payeeTypeCode || null,
        payFromTypeCode: payFromTypeCode || null,
        recvdFrom: recvdFrom || null
      };
      console.log("bankReceiptVoucherDto", bankReceiptVoucherDto);
      $http.post(path+'/api/v1/account/crv/search', bankReceiptVoucherDto, config)
        .then(function successCallback(response) {
          $scope.cRvData = response.data;
          console.table($scope.cRvData);
        },
          function errorCallback(error) {
            console.log("Unable to perform request", error);
          });
    };
  });
