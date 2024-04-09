app.controller("suppCtrl", function ($scope, $http, $rootScope,$timeout) {
  $scope.flag = false;
  $scope.flag1 = true;
  //console.log($scope.flag);
  $scope.timeoutPromise = null;
  $rootScope.checkToken();
  $scope.details = $rootScope.details;
  const config = $rootScope.config;
  $scope.formSubmitted = false;
  
  $scope.save = function () {
    if ($scope.myform.$valid) {
      $http.post(path + "/api/v1/account/supplier", $scope.form, config).then(
        function (response) {
          if(response.status==200){
            $scope.form = {active:'Y'};
            $scope.getdata();
            $scope.formSubmitted = true;
            toastr.success("Data saved successfully!", "Success");
          }
        },
        function (response) {
          toastr.error("An error occurred while saving data.", "Error");
        }
      );
    } else {
      if (!$scope.timeoutPromise) {
        toastr.error("Please fill in all required fields.", "Error");
        $scope.timeoutPromise = $timeout(function () {
          $scope.timeoutPromise = null;
        }, 3000); // Adjust the timeout value as needed
      }
    }
  };

  $scope.getdata = function () {
    $http
      .get(path + "/api/v1/account/supplier", config)
      .then(function (response) {
        $scope.supplierData = response.data;
        console.log(response);
      });
  };

  $scope.getdata();

  
  // $scope.data3 = [];
  $scope.getdata3 = function () {
    $http
      .get(path + "/api/v1/account/vendor", config)
      .then(function (response) {
        $scope.vendortypeData = response.data;
        console.log("data 3", response.data);
      });
  };
  $scope.getdata3();
  $scope.edit = function (n) {$rootScope.handleLinkWData('supplier',n)};

  const data = $rootScope.data;
  $scope.form = {
    vendorCode: data.vendorCode,
    dscr: data.dscr,
    fullName: data.fullName,
    addr1: data.addr1,
    addr2: data.addr2,
    addr3: data.addr3,
    city: data.city,
    pin: data.pin,
    state: data.state,
    country: data.country,
    bankIfscCode: data.bankIfscCode,
    bankAccountNo: data.bankAccountNo,
    bankName: data.bankName,
    bankBranch: data.bankBranch,
    bankCity: data.bankCity,
    bankCountry: data.bankCountry,
    pan: data.pan,
    tin: data.tin,
    staxRegistration: data.staxRegistration,
    email: data.email,
    mobile: data.mobile,
    gstin: data.gstin,
    vendorTypeCode: data.vendorTypeCode,
    active: data.active,
  };

  $scope.update = function () {
    var data = $scope.form;
    var sl = data.vendorCode;
    var url = path + "/api/v1/account/supplier" + sl;
    $http.put(url, data, config).then(function (response) {
      $scope.form = {};
      $scope.getdata();
    });
  };
});
