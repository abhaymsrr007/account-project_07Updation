
app.controller('assistant-dashboard-cashreciept-voucherCtrl', function ($scope, $http, $timeout, $window, $rootScope, $filter, $location) {
  $scope.img = profile;
  $scope.details = [];
  var token;
  const userDetailsJSON = $window.sessionStorage.getItem('userDetails');
  
  $scope.logout = function () {
    $window.sessionStorage.removeItem('userDetails');
    $window.location.href = 'index.html';
  };

  var config = {
    //  form: $scope.form,
    headers: {
      'Authorization': 'Bearer ' + token
    },
  };



  $scope.uniquePayToTypes = function (cashRvData) {
    var uniqueTypes = {};
    var uniqueList = [];
    for (var i = 0; i < cashRvData.length; i++) {
      var typeCode = cashRvData[i].payFromTypeCode;
      if (!uniqueTypes[typeCode]) {
        uniqueTypes[typeCode] = true;
        uniqueList.push(cashRvData[i]);
      }
    }
    return uniqueList;
  };

  $scope.setpayFromTypeCode = function (payFromTypeCode) {
    $scope.payFromTypeCodes = [];
    console.log(payFromTypeCode);
    if (payFromTypeCode === "E") {
      $scope.payFromTypeCodes = $scope.cashRvData.filter(x => x.payFromTypeCode === "E");
      console.log("payeeType in Emp", payFromTypeCode);
    }
    if (payFromTypeCode === "V") {
      $scope.payFromTypeCodes = $scope.cashRvData.filter(x => x.payFromTypeCode === "V");
      console.log("payeeType in Ven", payFromTypeCode);
    }
    if (payFromTypeCode === "S") {
      $scope.payFromTypeCodes = $scope.cashRvData.filter(x => x.payFromTypeCode === "S");
      console.log("payeeType in Stu", payFromTypeCode)
    }
    if (payFromTypeCode === "O") {
      $scope.payFromTypeCodes = $scope.cashRvData.filter(x => x.payFromTypeCode === "O");
      console.log("payeeType in Oth", payFromTypeCode);
    }
    // $scope.payFromTypeCodes = $scope.cashRvData.filter(x => x.payFromTypeCode === payeeTypeCode);
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
  $scope.bankpay = [];
  // $scope.showDetails = function (cashRvId, finyear) {
  //   document.getElementById("detailmodal").style.display = "block";
  //   $http.get(path + `/api/v1/account/brv/${cashRvId}/${finyear}`, config)
  //     .then(function successCallback(response) {
  //       console.log("sanction data", response.data)
  //       $scope.bankpay = convertCamelToReadable(response.data);
  //     },
  //       function errorCallback(response) {
  //         console.log("Unable to update  request");
  //       });
  // }
  $scope.isDisable = 0;
  $scope.showDetails = function (n) {
    $scope.isDisable = 1;
    var nObject = {
      cashRvId: n.cashRvId,
      finYear: n.finYear,
      isDisable: $scope.isDisable
      // Add more properties if needed
    };
    window.location.href = 'cash-reciept-voucher.html?n=' + encryptData(JSON.stringify(nObject));
    // $scope.status = true;
  }
  $scope.filterForStatusAandC = (item) => {
    return item.voucherStatusCode === 'C' || item.voucherStatusCode === 'A' || item.voucherStatusCode === 'P';
  }
  $scope.timeoutPromise = null;
  $scope.data = [];
  $scope.cashRvData = [];
  $scope.getdata = function () {
    $http.get(path + '/api/v1/account/crv', config)
      .then(function (response) {
        $scope.cashRvData = response.data;
        console.table(response.data)
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
  $scope.delete = function (cashRvId, finyear) {
    $http.delete(path + `/api/v1/account/crv/${cashRvId}/${finyear}`, config)
      .then(function successCallback(response) {
        console.log(response.data);
        toastr.success("Data Saved Successfully", "Congratulations");
      },
        function errorCallback(response) {
          console.log("Unable to update  request");
        });
  }
  function encryptData(data) { return btoa(data); }
  $scope.edit = function (n) {
    console.log(n)
    // Create an array of values for 'n'
    var nObject = {
      cashRvId: n.cashRvId,
      finYear: n.finYear,
      // Add more properties if needed
    };
    // Encode the object as a JSON string and include it in the URL
    window.location.href = 'cash-reciept-voucher.html?n=' + encryptData(JSON.stringify(nObject));
  }
  $scope.searchFields = function (keyword1, keyword2, keyword3, keyword4, keyword5, payeeTypeCode, payFromTypeCode, recvdFrom) {
    // Create a request object with the keywords in the request body
    let dd = keyword5?.substring(0, 2);
    let mm = keyword5?.substring(2, 6);
    let yyyy = keyword5?.substring(6, 10);
    let dd1 = keyword2?.substring(0, 2);
    let mm1 = keyword2?.substring(2, 6);
    let yyyy1 = keyword2?.substring(6, 10);
    let voucherDate = keyword5 ? yyyy + mm + dd : null;
    let idDate = keyword2 ? yyyy1 + mm1 + dd1 : null;
    // console.log("yyy-MM-dd >>>", yyyy + mm + dd);
    var bankReceiptVoucherDto = {
      cashRvId: keyword1 || null,
      cashRvIdDate: keyword2 ? idDate : null,
      finYear: keyword3 || null,
      bankRvNo: keyword4 || null,
      receiptDate: keyword5 ? voucherDate : null,
      payeeTypeCode: payFromTypeCode || null,
      payFromTypeCode: payeeTypeCode.payeeTypeCode || null,
      recvdFrom: recvdFrom || null
    };
    console.log("bankReceiptVoucherDto", bankReceiptVoucherDto);
    $http.post(path + '/api/v1/account/crv/search', bankReceiptVoucherDto, config)
      .then(function successCallback(response) {
        $scope.cashRvData = response.data;
        $scope.cashRvData = response.data;
        console.table($scope.cashRvData);
      },
        function errorCallback(error) {
          console.log("Unable to perform request", error);
        });
  };
  $scope.goBack = function () {
    window.history.back();
  }
});
