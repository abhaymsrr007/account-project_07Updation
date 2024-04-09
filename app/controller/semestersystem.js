app.controller(
  "semSystemCtrl",
  function ($scope, $http, $rootScope, $timeout, $window) {
    $scope.flag = false;
    $scope.timeoutPromise = null;
    $rootScope.checkToken();
    const config = $rootScope.config;
    const a = [];
    $scope.isDisable = false;

    // To persist data in semsester system table
    $scope.save = function () {
    console
      // if (!a.includes($scope.form.semesterSystemCode)) {
      if ($scope.myform.$valid  ) {
        $http.post(path + "/api/v1/account/semsys", $scope.form, config).then(
          function (response) {
            if (response.status == 200 || 201) {
              $scope.form = {};
              $scope.getdata();
              $scope.isDisable = false;
              $scope.formSubmitted = true;
              toastr.success("Data saved successfully!", "Success");
            }
          },
          function (response) {
            console.log(response);
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

    // To fetch data from semsester system table
    $scope.getdata = function () {
      $http.get(path + "/api/v1/account/semsys", config).then(
       async function (response) {
          $scope.semData = response.data;
          for (let i = 0; i <await $scope.semData?.length; i++) {
            const el =await $scope.semData[i];
            a.push(el.semesterSystemCode);
          }
          // console.log("erre", $scope.semData);
        },
        function (response) {
          console.log("Error fetching data in semester system table");
        }
      );
    };
    $scope.getdata();

    $scope.checkForDuplicate = function(semesterSystemCode) {
      $http.get(path + `/api/v1/account/semsys/${semesterSystemCode}`, config).then(
          function(response) {
              if (response.data.semesterSystemCode == semesterSystemCode) {
                  $scope.duplicateCode = true;
              } else {
              }
            }).catch(function(error) {
              console.log("Error fetching data from Semester System code", error);
              $scope.duplicateCode = false;
          })   
  };
    // $scope.semData?.forEach((el) => {
    //   a.push(el.semesterSystemCode);
    // });
    $scope.getSemCode=async function(){
      for (let i = 0; i <await $scope.semData?.length; i++) {
        const el =await $scope.semData[i];
        a.push(el.semesterSystemCode);
      }
      console.log("12333",a);
    }
    $scope.getSemCode();

    //To edit the data
    $scope.edit = function (n) {
      var targetOffset = $('.scroll-target').offset().top;         
      $('html, body').animate({
          scrollTop: targetOffset
      }, 100);
      $scope.flag = true;
      $scope.form = {
        semesterSystemCode: n.semesterSystemCode,
        dscr: n.dscr,
      };
    };

    // $scope.delete=function(n){
    //   console.log(n);
    //   var data = $scope.form;
    //   var sl=n.account_code;
    //   console.log(sl);
    //   var url = 'http://127.0.0.1:9099/api/v1/account/semsys/' + sl;
    //   $http.delete(url);
    //   $window.location.reload();
    // }
    $scope.isExsist = false;
    $scope.isSemCodeExsist = function (code) {
      if (code) {
        const lowerCasecode = code.toLowerCase();
        const upperCasecode = code.toUpperCase();

        if ($scope.semData && Array.isArray($scope.semData)) {
          for (let i = 0; i < $scope.semData.length; i++) {
            const element = $scope.semData[i];
            if (element && element.code) {
              const elementLowerCase = element.code.toLowerCase();
              const elementUpperCase = element.code.toUpperCase();

              if (
                elementLowerCase === lowerCasecode ||
                elementUpperCase === upperCasecode
              ) {
                return true;
              }
            }
          }
        }
      }
      return false;
    };

    //To updata data of semester system table
    $scope.update = function () {
      var data = $scope.form;
      var sl = data.semesterSystemCode;
      var url = path + "/api/v1/account/semsys" + sl;
      $http.put(url, data, config).then(function (response) {
        if (response.status == 200|| 201) {
          toastr.success("Data Updated successfully!", "Success");
          $scope.form = {};
          $scope.getdata();
        }
      });
    };
  }
);
