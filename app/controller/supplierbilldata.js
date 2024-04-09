// $(".datepicker").datepicker({
//     format: "dd-mm-yyyy",
// });
// setTimeout(function () {
//     $(".selectsearch").selectpicker();
// }, 1000);

app.filter('uniqueVendorCode', function () {
    return function (data) {
        if (angular.isArray(data)) {
            var uniqueVendorCodes = [];
            var uniqueData = [];
            angular.forEach(data, function (item) {
                if (uniqueVendorCodes.indexOf(item.vendorCode) === -1) {
                    uniqueVendorCodes.push(item.vendorCode);
                    uniqueData.push(item);
                }
            });
            return uniqueData;
        }
        return data;
    };
});
app.controller(
  "suppBillDataCtrl",
  function ($scope, $http, $timeout, $window, $rootScope, $filter) {
    $scope.isDropdownOpen = false;
    $scope.details = [];
    const token = $window.sessionStorage.getItem("token");
    const userDetailsJSON = $window.sessionStorage.getItem("userDetails");
    if (userDetailsJSON) {
      const userDetails = JSON.parse(userDetailsJSON);
      if (token != null || token != "" || token != null) {
        $scope.details = angular.copy(userDetails);
      }
    } else {
      $rootScope.handleLink('index');
    //   console.log("User details not found in sessionStorage");
    }
    var config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    $scope.toggleDropdown = function () {
      $scope.isDropdownOpen = !$scope.isDropdownOpen;
    };
    $timeout(function () {
      angular.element(document.querySelector(".selectsearch")).selectpicker();
    }, 200);

    $scope.suuplierdetail = [];
    $scope.showmodal = function (poid, pofinyear, billslno) {
      document.getElementById("detailmodal").style.display = "block";
      $http
        .get(
          path + `/api/v1/account/suppbill/${poid}/${pofinyear}/${billslno}`,
          config
        )
        .then(
          function successCallback(response) {
            console.log("sanction data", response.data);
            $scope.suuplierdetail = response.data;
          },
          function errorCallback(response) {
            console.log("Unable to update  request", response);
          }
        );
    };

    $scope.selectvendorcode = function (vendorcode) {
      $scope.vendorName = $scope.getvendordscr(vendorcode);
    };

    //$scope.vendorName = $scope.getvendordscr(n);
    $scope.timeoutPromise = null;
    // console.log(combinedData)
    $scope.data = [];

    $scope.supplierData = {};
    $scope.getdata = function () {
      $http
        .get(path + "/api/v1/account/supplier", config)
        .then(function (response) {
          $scope.supplierData = response.data;
          console.log(response.data);
        });
    };

    $scope.getdata();

    $scope.getvendordscr = function (v) {
      // console.log(v)
      for (let index = 0; index < $scope.supplierData.length; index++) {
        var element = $scope.supplierData[index];
        if (v === element.vendorCode) {
          return element.fullName;
        }
      }
    };

    $scope.getvendor = function (n) {
      for (let index = 0; index < $scope.data.length; index++) {
        var element = $scope.data[index];
        if (n === element.poId) {
          //  $scope.suppdata[ind].vendorCode=element.vendorCode;
          //  console.log("cccccccccccccccc", $scope.suppdata[ind].vendorCode)
          return element.vendorCode;
        }
      }
    };

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

    $scope.getPodata = function () {
      $http.get(path + "/api/v1/account/po", config).then(
        function successCallback(response) {
          $scope.data = response.data;
          console.log("purchase order>>>>>>>>>>>>", $scope.data);
          // After retrieving data, call the updateSuppData function
          $scope.updateSuppData();
        },
        function errorCallback(response) {
          console.log("saving of data failed");
        }
      );
    };

    $scope.getsuppdata = function () {
      $http.get(path + "/api/v1/account/suppbill/alldata", config).then(
        function successCallback(response) {
          $scope.suppdata = response.data;
          console.log("supplierbill order>>>>>>>>>>>>", $scope.suppdata);
          // After retrieving data, call the updateSuppData function
          $scope.updateSuppData();
        },
        function errorCallback(response) {
          console.log("saving of data failed");
        }
      );
    };

    $scope.getdata = function () {
      $http
        .get(path + "/api/v1/account/supplier", config)
        .then(function (response) {
          $scope.supplierData = response.data;
          console.log(response.data);
        });
    };

    $scope.updatedSuppdata = [];
    //  Function to update suppdata based on common poId
    $scope.updateSuppData = function () {
      if ($scope.data && $scope.suppdata) {
        // Create a mapping of poId to vendorCode from the 'data' array
        const poIdToVendorCodeMap = {};
        $scope.data.forEach((item) => {
          poIdToVendorCodeMap[item.poId] = item.vendorCode;
        });
        // Update the 'suppdata' array with the 'vendorCode' from 'data'
        $scope.suppdata.forEach((item) => {
          const vendorCode = poIdToVendorCodeMap[item.poId];
          if (vendorCode !== undefined) {
            item.vendorCode = vendorCode;
            // Find the corresponding 'vendorName' from 'supplierData'
            const matchingSupplier = $scope.supplierData.find(
              (supplier) => supplier.vendorCode === vendorCode
            );
            if (matchingSupplier) {
              item.vendorName = matchingSupplier.fullName;
            }

            $scope.updatedSuppdata.push(item);
            console.log($scope.updatedSuppdata, "updatedsuppdata");
          }
        });
      }
    };
    $scope.updateSuppData();

    // Initial calls to retrieve data
    $scope.getPodata();
    $scope.getsuppdata();
    $scope.getdata();

    $scope.send = function (n) {
      console.log(n);
      var url = "supplierbilldatadetails.html?n=" + n;
      window.open(url);
    };

    $scope.edit = function (n) {
      console.log(n);
      // Create an array of values for 'n'
      var nObject = {
        poId: n.poId,
        poFinYear: n.poFinYear,
        billSlNo: n.billSlNo,
        // Add more properties if needed
      };
      $rootScope.handleLinkWData('supplier-bill-details',nObject);
    };

    $scope.search = function (
      keyword1,
      keyword2,
      keyword3,
      keyword4,
      keyword5
    ) {
      // Create a request object with the keywords in the request body
      let dd = keyword5?.substring(0, 2);
      let mm = keyword5?.substring(2, 6);
      let yyyy = keyword5?.substring(6, 10);
      let poDate = keyword5 ? yyyy + mm + dd : null;
      console.log("yyy-MM-dd >>>", yyyy + mm + dd);
      var suppdetails = {
        vendorCode: keyword1 || null,
        poId: keyword2 || null,
        poFinYear: keyword3 || null,
        poNumber: keyword4 || null,
        poDate: keyword5 ? poDate : null,
      };

      console.log(suppdetails);
      //  Make the HTTP POST request to your API endpoint with the request data in the body
      $http
        .post(path + "/api/v1/account/search/suppbill", suppdetails, config)
        .then(
          function successCallback(response) {
            $scope.suppdata = response.data;
            console.log("$scope.suppdata>>>>>>>>>>>>>>>>cdcdf", response);
          },
          function errorCallback(error) {
            console.log("Unable to perform request", error);
          }
        );
    };

    $scope.goBack = function () {
      window.history.back();
    };
  }
);
