app.controller(
  "univerDepartCtrl",
  function ($scope, $http, $timeout, $window, $rootScope, $filter) {
    // To persist data in universityDepartment
    $rootScope.checkToken();
    const config =$rootScope.config;
    $scope.save = function () {
      $http
        .post(path + "/api/v1/account/department/university", $scope.form , config ).then(
          function (response) {
            if(response.status==200){
              $scope.form = {};
              $scope.getdata();
            }
          },
          function (response) {
            console.log("Error  updating data in university Department table ",response);
          }
        );
    };

    //To fetch data from university department
    $scope.getdata = function () {
      $http.get(path + "/api/v1/account/department/university",config ).then(
        function (response) {
          $scope.data = response.data;
        },
        function (response) {
          console.log("Error  Fetching data in universityDepartment  ");
        }
      );
    };
    $scope.getdata();

    // to fetch data from university table
    $scope.data2 = [];
    $scope.getdata2 = function () {
      $http.get(path + "/api/v1/account/university",config ).then(
        function (response) {
          $scope.data2 = response.data;
        },
        function (response) {
          console.log("Error  fetching data in university ");
        }
      );
    };
    $scope.getdata2();

    //To fetch data from location table
    $scope.data3 = [];
    $scope.getdata3 = function () {
      $http.get(path + "/api/v1/account/location",config  ).then(
        function (response) {
          $scope.data3 = response.data;
        },
        function (response) {
          console.log("Error  fetching data in location table ");
        }
      );
    };
    $scope.getdata3();

    // to edit data
    $scope.edit = function (n) {
      console.log("thisasadasdas", n);
      $scope.form = {
        departmentCode: n.departmentCode,
        universityCode: n.universityCode.toString(),
        locationCode: n.locationCode,
        address: n.address,
        city: n.city,
        country: n.country,
        dscr: n.dscr,
        shortName: n.shortName,
        state: n.state,
      };
    };

    // $scope.delete=function(n){
    //   console.log(n);
    //   var data = $scope.form;
    //   var sl=n.account_code;
    //   console.log(sl);
    //   var url = 'http://127.0.0.1:9099/api/v1/account/deletereport/' + sl;
    //   $http.delete(url);
    //   $window.location.reload();
    // }
    $scope.goBack = function () {
      window.history.back();
    };
    //To update data to university department
    $scope.update = function () {
      var sl = data.departmentCode;
      var url =
        "http://localhost:9099/api/v1/account/department/university" + sl;

      $http.put(url, data,config ).then(
        function (response) {
          if(response.statu==200){
            $scope.form = {};
            $scope.getdata();
          }
        },
        function (response) {
          console.log("Error  updating data in university ");
        }
      );
    };
  }
);
