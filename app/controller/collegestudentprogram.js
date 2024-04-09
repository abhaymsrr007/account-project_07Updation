    app.controller(
      "collegestudentprogramCtrl",
      function ($scope, $http, $timeout, $window, $rootScope, $filter) {
        $scope.details=[];
      var token;
      const userDetailsJSON = $window.sessionStorage.getItem('userDetails');
      if (userDetailsJSON) {
        const userDetails = JSON.parse(userDetailsJSON);
        if (userDetails.token!=null || userDetails.token!=''){
          $scope.details=angular.copy(userDetails);
          token=$scope.details.token;
        }
      } else {
        $window.location.href = "index.html";
        console.log('User details not found in sessionStorage');
      }
      $scope.logout = function() {
        $window.sessionStorage.removeItem('userDetails');
        $window.location.href = 'index.html';
      }; 

        var config = {
          headers: {
          'Authorization': 'Bearer ' + token
            },   
          };
          $scope.goBack = function () {
        window.history.back();
      }
        $scope.save = function () {
          $http
            .post(
              path+"/api/v1/account/clg/student/program", $scope.form,config)
            .then(function (response) {
              $scope.form = {};
              $scope.getdata();
            });
        };
        $scope.getdata = function () {
          $http
            .get(
              path+"/api/v1/account/clg/student/program",config)
            .then(function (response) {
              $scope.data = response.data;

            });
        };
        $scope.getdata();

        $scope.data2 = [];
        $scope.getdata2 = function () {
          $http.get(path+"/api/v1/account/department/college",config)
            .then(function (response) {
              $scope.data2 = response.data;
              console.log("Data 2", response.data)
            });
        }
        $scope.getdata2();


        $scope.edit = function (n) {
          console.log(n)
          $scope.form = {
            studentProgramCode: n.studentProgramCode,
            dscr: n.dscr,
            departmentCode: n.departmentCode.toString(),
            collegeCode: n.collegeCode.toString(),
            universityCode: n.universityCode.toString(),
          }
        };

        $scope.update = function () {
          var data = $scope.form;
          console.log(data.studentProgramCode);
          var sl = data.studentProgramCode;
          var url = path+"/api/v1/account/clg/student/program" + sl;

          $http.put(url, data,config).then(function (response) {
            $scope.form = {};
            $scope.getdata();
          });
        };
      }
      
    );
