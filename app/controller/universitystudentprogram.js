
    

app.controller('universitystudentprogramCtrl', function ($scope, $http, $timeout, $window, $rootScope, $filter) {
     

      $scope.save = function () {
        $http.post(path+"/api/v1/account/university/student/program", $scope.form)
          .then(function (response) {
            $scope.form = {};
            $scope.getdata();
          });
      }
      $scope.getdata = function () {
        $http.get(path+"/api/v1/account/university/student/program")
          .then(function (response) {
            $scope.data = response.data;
          
          });

      }
      $scope.getdata();

      $scope.data2 = [];
      $scope.getdata2 = function () {
        $http.get(path+"/api/v1/account/university/student/program")
          .then(function (response) {
            $scope.data2 = response.data;
           
          });


      }
      $scope.getdata2();


      $scope.edit = function (n) {
        console.log("thisasadasdas",n)
        $scope.form = {
          studentProgramCode: n.studentProgramCode,
          dscr: n.dscr,
          departmentCode: n.departmentCode,
          universityCode: n.universityCode,
        }

      };

      $scope.goBack = function () {
        window.history.back();
      }
      $scope.update = function () {
        
        var data = $scope.form;
        console.log(data.studentProgramCode)
        var sl = data.studentProgramCode;
        var url = 'http://localhost:9099/api/v1/account/university/student/program' + sl;


        $http.put(url, data)
          .then(function (response) {


            $scope.form = {};
            $scope.getdata();

          });
      }
    })

    function getFocus() {
      document.getElementById("studentProgramCode").focus();
    }
