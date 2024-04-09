
app.controller('bank-receipt-voucher-detailsCtrl', function ($scope, $http, $timeout, $window, $rootScope, $filter) {
    $scope.details = [];
    var token;
    const userDetailsJSON = $window.sessionStorage.getItem('userDetails');
    if (userDetailsJSON) {
        const userDetails = JSON.parse(userDetailsJSON);
        if (userDetails.token != null || userDetails.token != '') {
            $scope.details = angular.copy(userDetails);
            token = $scope.details.token;
        }
    } else {
        $window.location.href = "index.html";
        console.log('User details not found in sessionStorage');
    }
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

    $scope.setpayFromTypeCode = function (payFromTypeCode) {
        $scope.payFromTypeCodes = [];
        console.log(payFromTypeCode);
        if (payFromTypeCode === "E") {
            $scope.payFromTypeCodes = $scope.bRvData.filter(x => x.payFromTypeCode === "E");
            console.log("payeeType in Emp", payFromTypeCode);
        }
        if (payFromTypeCode === "V") {
            $scope.payFromTypeCodes = $scope.bRvData.filter(x => x.payFromTypeCode === "V");
            console.log("payeeType in Ven", payFromTypeCode);
        }
        if (payFromTypeCode === "S") {
            $scope.payFromTypeCodes = $scope.bRvData.filter(x => x.payFromTypeCode === "S");
            console.log("payeeType in Stu", payFromTypeCode)
        }
        if (payFromTypeCode === "O") {
            $scope.payFromTypeCodes = $scope.bRvData.filter(x => x.payFromTypeCode === "O");
            console.log("payeeType in Oth", payFromTypeCode);
        }
        // $scope.payFromTypeCodes = $scope.bRvData.filter(x => x.payFromTypeCode === payeeTypeCode);
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
    $timeout(function () {
        angular
            .element(document.querySelector(".selectsearch"))
            .selectpicker();
    }, 2000);
    $scope.payeeTypeData = [];
    $scope.getPayeeTypeData = function () {
        $http.get(path + "/api/v1/account/paytotype", config).then(
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
    $scope.showDetails = function (bankRvId, finyear) {
        document.getElementById("detailmodal").style.display = "block";
        $http.get(`${path}/api/v1/account/brv/${bankRvId}/${finyear}`, config)
            .then(function successCallback(response) {
                console.log("sanction data", response.data)
                $scope.bankpay = convertCamelToReadable(response.data);
            },
                function errorCallback(response) {
                    console.log("Unable to update  request");
                });
    }
    $scope.timeoutPromise = null;
    $scope.data = [];
    $scope.bRvData = [];
    $scope.getdata = function () {
        $http.get(path + "/api/v1/account/brv", config)
            .then(function (response) {
                $scope.bRvData = response.data;
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
    $scope.edit = function (n) {
        console.log(n)
        // Create an array of values for 'n'
        var nObject = {
            bankRvId: n.bankRvId,
            finYear: n.finYear,
            // Add more properties if needed
        };
        // Encode the object as a JSON string and include it in the URL
        window.location.href = 'bank-reciept-voucher.html?n=' + JSON.stringify(nObject);;
    }
    //  $scope.searchFields = function (keyword1, bankRvIdDate, keyword3, keyword4, bankRvDate, payeeTypeCode, payFromTypeCode, recvdFrom) {
    $scope.searchFields = function (bankRvId, bankRvIdDate, finYear, bankRvNo, bankRvDate, payFromTypeCode, payeeTypeCode, recvdFrom) {
        // Create a request object with the keywords in the request body
        let dd = bankRvDate?.substring(0, 2);
        let mm = bankRvDate?.substring(2, 6);
        let yyyy = bankRvDate?.substring(6, 10);
        let dd1 = bankRvIdDate?.substring(0, 2);
        let mm1 = bankRvIdDate?.substring(2, 6);
        let yyyy1 = bankRvIdDate?.substring(6, 10);
        let voucherDate = bankRvDate ? yyyy + mm + dd : null;
        let idDate = bankRvIdDate ? yyyy1 + mm1 + dd1 : null;
        // console.log("yyy-MM-dd >>>", yyyy + mm + dd);
        var bankReceiptVoucherDto = {
            bankRvId: bankRvId || null,
            bankRvIdDate: bankRvIdDate ? idDate : null,
            finYear: finYear || null,
            bankRvNo: bankRvNo || null,
            bankRvDate: bankRvDate ? voucherDate : null,
            payeeTypeCode: payeeTypeCode || null,
            payFromTypeCode: payFromTypeCode.payFromTypeCode || null,
            recvdFrom: recvdFrom || null
        };
        console.log("bankReceiptVoucherDto", bankReceiptVoucherDto);
        $http.post(path + '/api/v1/account/brv/search', bankReceiptVoucherDto, config)
            .then(function successCallback(response) {
                $scope.bRvData = response.data;
                console.table($scope.bRvData);
            },
                function errorCallback(error) {
                    console.log("Unable to perform request", error);
                });
    };
    $scope.goBack = function () {
        window.history.back();
    }
})
