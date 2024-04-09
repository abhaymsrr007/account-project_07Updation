      app.controller(
        "purchOrDetsCtrl",
        function ($scope, $http, $timeout,  $rootScope) {
          $scope.timeoutPromise = null;
          $scope.podata = [];
          $scope.poDataforDropDown = [];
          $scope.uniquePOdata = [];
          $scope.vendorName = "";
          $scope.handleLink = function (pgname) {
            $rootScope.handleLink(pgname);
          };
          $scope.details = [];
          const token = sessionStorage.getItem('token');
          var config = {
            headers: {
              'Authorization': 'Bearer ' + token
            },
          };
          $scope.supplier = [];
          $scope.getSupplier = (function () {
            $http.get(path+"/api/v1/account/supplier",config).then(
              function (response) {
                $scope.supplier = response.data;
                //console.log("supplier", response.data);
              },
              function errorCallback(response) {
                //console.log("error ");
              }
            );
          })();

          $scope.setVenNameFromSupp = function (code) {
            // //console.log(code);
            for (let index = 0; index < $scope.supplier.length; index++) {
              var element = $scope.supplier[index];
              if (element.vendorCode === code) {
                return element.fullName;
              }
            }
          };

          $scope.vendornamedscr = function (vendorcode) {
            //console.log(">>>>>>>>>>>>", vendorcode);
            $scope.vendorName = $scope.setVenNameFromSupp(vendorcode);
          };

          $scope.getpodata = function () {
            $http.get(path+"/api/v1/account/po",config).then(
              function successCallback(response) {
                $scope.podata = response.data;
                //console.log("podata>>>>", $scope.podata);
                $scope.poDataforDropDown = response.data;
                // Create a Set to store unique vendor codes
                var uniqueVendorCodes = new Set();
                // Filter out unique vendor codes and sort them
                var sortedUniqueVendorCodes = response.data;
                sortedUniqueVendorCodes
                  .filter(function (item) {
                    if (!uniqueVendorCodes.has(item.vendorCode)) {
                      uniqueVendorCodes.add(item.vendorCode);
                      return true;
                    }
                    return false;
                  })
                  .sort(function (a, b) {
                    return a.vendorCode.localeCompare(b.vendorCode);
                  });
                //console.log("filttered", sortedUniqueVendorCodes);
                $scope.uniquePOdata = sortedUniqueVendorCodes;
                //console.log("unique podata >>>>>>>>>>>>", $scope.uniquePOdata);

                // Create a map from vendorCode to fullName for faster lookups
                const vendorCodeToFullName = {};

                $scope.supplier.forEach((item) => {
                  vendorCodeToFullName[item.vendorCode] = item.fullName;
                });

                // Update purchaseOrders with fullName based on vendorCode
                $scope.uniquePOdata.forEach((order) => {
                  const fullName = vendorCodeToFullName[order.vendorCode];
                  if (fullName) {
                    order.fullName = fullName;
                  }
                });
                // Now, purchaseOrders will have the fullName property added based on vendorCode
                // console.log(
                //   "purchaseOrders will have the fullName ",
                //   $scope.uniquePOdata
                // );
              },
              function errorCallback(response) {
                //console.log("saving of data failed");
              }
            );
          };
          $scope.getpodata();

          $scope.updatedSuppdata = [];
          //  Function to update suppdata based on common poId
          $scope.updateSuppData = function () {
            if ($scope.podata && $scope.suppdata) {
              // Create a mapping of poId to vendorCode from the 'data' array
              const poIdToVendorCodeMap = {};
              $scope.podata.forEach((item) => {
                poIdToVendorCodeMap[item.poId] = item.vendorCode;
              });

              // Update the 'suppdata' array with the 'vendorCode' from 'data'
              $scope.suppdata.forEach((item) => {
                const vendorCode = poIdToVendorCodeMap[item.poId];
                if (vendorCode !== undefined) {
                  item.vendorCode = vendorCode;
                  // //console.log("merged data",item)
                  $scope.updatedSuppdata.push(item);
                  //console.log($scope.updatedSuppdata, "KKKKKKKKKKK");
                }
              });
            }
          };
          $scope.updateSuppData();

          $scope.searchFields = function (
            vendorCode,
            poid,
            pofinyear,
            potitle,
            podate,
            ponumber
          ) {
            let dd = podate?.substring(0, 2);
            let mm = podate?.substring(2, 6);
            let yyyy = podate?.substring(6, 10);
            let poDate = podate ? yyyy + mm + dd : null;
            //console.log("yyy-MM-dd >>>", yyyy + mm + dd);
            var poDetail = {
              vendorCode: vendorCode || null,
              poId: poid || null,
              poFinYear: pofinyear || null,
              poTitle: potitle?.toUpperCase() || null,
              poDate: podate ? poDate : null,
              poNumber: ponumber || null,
            };
            //console.log("k>>>>>", poDetail);
            var path = path+"/api/v1/account/po/search";
            $http.post(path, poDetail,config).then(
              (res) => {
                $scope.podata = res.data;
                //console.log(res.data);
              },
              (err) => {
                //console.log(err);
              }
            );
          };

          $scope.collegeData = [];
            (function getCollageData() {
              $http.get(path+"/api/v1/account/college",config)
              .then(function successCallback(response) {
                $scope.collegeData = response.data;
                //console.log("Collage Data>>>>>>>>>>>>>>>>>",$scope.collegeData)
              },
              function errorCallback(response) {
                //console.log("Error fetching colllege data")
              });
            })();

          $scope.closeDetail = () => {
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
          
                $scope.goBack = function () {
              window.history.back();
            }
          // Add an event listener for the close button
          closeBtn.addEventListener("click", function () {
            modal.style.display = "none"; // Hide the modal when the close button is clicked
          });
          $scope.podetails = {};
          $scope.showDetails = (poNo, poFinYear) => {
            document.getElementById("detailmodal").style.display = "block";
            $http
              .get(
                `${path}/api/v1/account/po/${poNo}/${poFinYear}`,config
              )
              .then(
                (res) => {
                  $scope.podetails = convertCamelToReadable(res.data);
                  //console.log($scope.podetails);
                },
                (err) => {
                  //console.error(err);
                }
              );
          };
          $scope.edit = function (n) {
            $rootScope.handleLinkWData('purchase-order',n);
          };
        }
      );