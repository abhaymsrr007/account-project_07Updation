app.controller('cashPayVouDetsCtrl', function ($scope, $http, $timeout, $window, $rootScope, $filter) {
    $scope.details = [];
    const token = $window.sessionStorage.getItem('token');
    if(token==null || token == undefined || token==''){
        $scope.handleLink('index');
    }
    var config = {
        //  form: $scope.form 
        headers: {
            'Authorization': 'Bearer ' + token
        },
    };
    $scope.uniquePayToTypes = function (bankpaydata) {
        var uniqueTypes = {};
        var uniqueList = [];
        for (var i = 0; i < bankpaydata.length; i++) {
            var typeCode = bankpaydata[i].payToTypeCode;
            if (!uniqueTypes[typeCode]) {
                uniqueTypes[typeCode] = true;
                uniqueList.push(bankpaydata[i]);
            }
        }
        return uniqueList;
    };
    $scope.handleLink = function (pgname) {
        $rootScope.handleLink(pgname);
    };
    $scope.payeeTypeCodes = [];
    $scope.setPayeeTypeCode = function (payToTypeCode) {
        console.log(typeof payToTypeCode, payToTypeCode, payToTypeCode === "E");
        if (payToTypeCode === "E") {
            $scope.payeeTypeCodes = $scope.bankpaydata.filter(x => x.payToTypeCode === "E");
            // console.log("payeeType", $scope.payeeTypeCodes)
        } else if (payToTypeCode === "V") {
            $scope.payeeTypeCodes = $scope.bankpaydata.filter(x => x.payToTypeCode === "V");
            // console.log("payeeType", $scope.payeeTypeCodes)

        } else if (payToTypeCode === "S") {
            $scope.payeeTypeCodes = $scope.bankpaydata.filter(x => x.payToTypeCode === "S");
            // console.log("payeeType", $scope.payeeTypeCodes)

        } else {
            $scope.payeeTypeCodes = [];
        }
    }
    $scope.payTo = '';
    $scope.setPayToo = function (payToTypeCode, code) {
        if (payToTypeCode != null && code != null) {
            console.log("payToTypeCode", payToTypeCode, code);

            for (let i = 0; i < $scope.bankpaydata.length; i++) {
                const x = $scope.bankpaydata[i];
                console.log(x);

                if (code === 'S') {
                    if (x.univRegistrationNo === payToTypeCode) {
                        $scope.payTo = x.payTo;
                        return;
                    }
                } else if (code === 'V') {
                    if (x.vendorCode === payToTypeCode) {
                        $scope.payTo = x.payTo;
                        return;
                    }
                } else {
                    if (x.staffNo === payToTypeCode) {
                        $scope.payTo = x.payTo;
                        return;
                    }
                }
            }
        }
    };
    // $timeout(function () {
    //     angular
    //         .element(document.querySelector(".selectsearch"))
    //         .selectpicker();
    // }, 200);

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
    $scope.showDetails = function (cashPvId, finYear) {
        const isDisable = false;
        // document.getElementById("detailmodal").style.display = "block";
        // $http.get(path + `/api/v1/account/bpv/${cashPvId}/${finyear}`, config)
        //     .then(function successCallback(response) {
        //         console.log("sanction data", response.data)
        //         $scope.bankpay = convertCamelToReadable(response.data);
        //     },
        //         function errorCallback(response) {
        //             console.log("Unable to update  request");
        //         });
        const nObject = {
            cashPvId:cashPvId,
            finYear:finYear,
            isDisable:!isDisable
            // Add more properties if needed
        };
        // Encode the object as a JSON string and include it in the URL
        $rootScope.handleLinkWData('cash-payment-voucher',nObject);
    }

    $scope.timeoutPromise = null;

    $scope.data = [];

    $scope.bankpaydata = {};
    $scope.getdata = function () {
        $http.get(path + "/api/v1/account/cpv", config)
            .then(function (response) {
                $scope.bankpaydata = response.data;
                console.log("<<<<<<<<<<<<<<<<<", $scope.bankpaydata);
            });
    };
    $scope.getdata();
    $scope.closeDetail = () => {
        console.log("hiiiiiiiii")
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
    $scope.send = function (n) {
        console.log(n)
        var url = 'supplierbilldatadetails.html?n=' + n;
        window.open(url,);
    }
    $scope.edit = function (n) {
        console.log(n)
        // Create an array of values for 'n'
        const nObject = {
            cashPvId: n.cashPvId,
            finYear: n.finYear,
            // Add more properties if needed
        };
        // Encode the object as a JSON string and include it in the URL
        $rootScope.handleLinkWData('cash-payment-voucher',nObject);
        // var url = 'bank-payment-voucher.html?n=' + JSON.stringify(nObject);
        // window.open(url,);
        // window.location.href = url;
    }
    $scope.searchFields = function (keyword1, keyword2, keyword3, keyword4, keyword5, payToTypeCode, payeeTypeCode, payTo) {
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
        var bankpaydetails = {
            cashPvId: keyword1 || null,
            cashPvIdDate: keyword2 ? idDate : null,
            finYear: keyword3 || null,
            cashPvNo: keyword4 || null,
            cashPvDate: keyword5 ? voucherDate : null,
            payToTypeCode: payToTypeCode || null,
            payeeTypeCode: payeeTypeCode || null,
            payTo: payTo || null
        };
        console.log("bankpaydetails", bankpaydetails);
        $http.post(path + '/api/v1/account/bpv/search', bankpaydetails, config)
            .then(function successCallback(response) {
                $scope.bankpaydata = response.data;
                console.log("$scope.suppdata>>>>>>>>>>>>>>>>cdcdf", $scope.bankpaydata);
            },
                function errorCallback(error) {
                    console.log("Unable to perform request", error);
                });
    };
    $scope.goBack = function () {
        window.history.back();
    }
})
