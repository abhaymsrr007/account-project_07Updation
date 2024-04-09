
        app.controller('cashDashBankPayVouCtrl', function ($scope, $http, $timeout, $window, $rootScope, $filter, $location) {
          $scope.details = [];
          const token = $window.sessionStorage.getItem('token');
          const userDetailsJSON = $window.sessionStorage.getItem('userDetails');
          if (userDetailsJSON && (token != null || token != '')) {
            const userDetails = JSON.parse(userDetailsJSON);
              $scope.details = angular.copy(userDetails);
          } else {
            $window.location.href = "index.html";
          }
          var config = {
            //  form: $scope.form,
            headers: {
              'Authorization': 'Bearer ' + token
            },
          };
          $scope.uniquePayToTypes = function (bPvData) {
            var uniqueTypes = {};
            var uniqueList = [];
            for (var i = 0; i < bPvData?.length; i++) {
              var typeCode = bPvData[i]?.payFromTypeCode;
              if (!uniqueTypes[typeCode]) {
                uniqueTypes[typeCode] = true;
                uniqueList.push(bPvData[i]);
              }
            }
            return uniqueList;
          };
          $scope.setpayFromTypeCode = function (payFromTypeCode) {
            $scope.payFromTypeCodes = [];
            console.log(payFromTypeCode);
            if (payFromTypeCode === "E") {
              $scope.payFromTypeCodes = $scope.bPvData.filter(x => x.payFromTypeCode === "E");
              console.log("payeeType in Emp", payFromTypeCode);
            }
            if (payFromTypeCode === "V") {
              $scope.payFromTypeCodes = $scope.bPvData.filter(x => x.payFromTypeCode === "V");
              console.log("payeeType in Ven", payFromTypeCode);
            }
            if (payFromTypeCode === "S") {
              $scope.payFromTypeCodes = $scope.bPvData.filter(x => x.payFromTypeCode === "S");
              console.log("payeeType in Stu", payFromTypeCode)
            }
            if (payFromTypeCode === "O") {
              $scope.payFromTypeCodes = $scope.bPvData.filter(x => x.payFromTypeCode === "O");
              console.log("payeeType in Oth", payFromTypeCode);
            }
            // $scope.payFromTypeCodes = $scope.bPvData.filter(x => x.payFromTypeCode === payeeTypeCode);
            console.log(`payeeType ${payFromTypeCode}`, $scope.payFromTypeCodes);
          };
          $scope.payTo = '';
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
                  $scope.payTo = x.payTo;
                  break;
                } else {
                  console.log("Matching payeeType", payeeTypeCode);
                  if (payeeTypeCode === payFromTypeCode.payFromTypeCode && payFromTypeCode.payTo !== $scope.payTo) {
                    $scope.payTo = payFromTypeCode.payTo;
                  } else {
                    $scope.payTo = '';
                  }
                  break;
                }
              }
            } else {
              $scope.payTo = '';
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
          $scope.isDisable = 0;
          $scope.showDetails = function (n) {
            $scope.isDisable = 1;
            var nObject = {
              bankPvId: n.bankPvId,
              finYear: n.finYear,
              isDisable: $scope.isDisable
            };
            $rootScope.handleLinkWData('bank-payment-voucher',nObject);
          }
          $scope.timeoutPromise = null;
          $scope.data = [];

          $scope.bPvData = [];
          $scope.getdata = function () {
            $http.get(path + '/api/v1/account/bpv', config)
              .then(function (response) {
                $scope.bPvData = response.data;
                console.table($scope.bPvData)

              });
          };
          $scope.getdata();
          $scope.closeDetail = () => {
            document.getElementById("detailmodal").style.display = "none";
          };
          var modal = document.getElementById("detailmodal");
          var closeBtn = document.getElementById("closeBtn");
          document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
              modal.style.display = "none";
            }
          });
          $scope.edit = function (n) {
            const nObject = {
              bankPvId: n.bankPvId,
              finYear: n.finYear,
              
            };
            $rootScope.handleLinkWData('bank-payment-voucher',nObject);
          }
          $scope.searchFields = function (keyword1, keyword2, keyword3, keyword4, keyword5, payeeTypeCode, payFromTypeCode, payTo) {
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
              bankPvId: keyword1 || null,
              bankPvIdDate: keyword2 ? idDate : null,
              finYear: keyword3 || null,
              bankPvNo: keyword4 || null,
              receiptDate: keyword5 ? voucherDate : null,
              payeeTypeCode: payFromTypeCode || null,
              payFromTypeCode: payeeTypeCode.payeeTypeCode || null,
              payTo: payTo || null
            };
            console.log("bankReceiptVoucherDto", bankReceiptVoucherDto);
            $http.post(path + '/api/v1/account/bpv/search', bankReceiptVoucherDto, config)
              .then(function successCallback(response) {
                $scope.bPvData = response.data;
                console.log($scope.bPvData);
                console.table($scope.bPvData);
              },
                function errorCallback(error) {
                  console.log("Unable to perform request", error);
                });
          };
          $scope.confirmDeleteC = function (p) {
            $scope.DeleteData = p;
            $('#deletemodal').modal('show');
          };
        });
