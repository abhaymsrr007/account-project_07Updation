    app.controller('castContr', function ($scope, $http, $timeout, $window, $rootScope, $filter) {
      $scope.idDisable = false;
      $scope.timeoutPromise = null;

      $scope.details=[];
       $rootScope.checkToken();
    const config = $rootScope.config;
      //Posting data to the caste table 
      $scope.save = function () {
        if ($scope.myform.$valid) {
          $http.post(path+"/api/v1/account/caste", $scope.form,config)
            .then(function successCallback(response) {
              $scope.form = {};
              $scope.getdata();
              $scope.formSubmitted = true;
              $scope.idDisable = true;
              toastr.success('Data saved successfully!', 'Success');


            },
              function errorCallback(response) {
                toastr.error('An error occurred while saving data.', 'Error');

              });
        } else {
          if (!$scope.timeoutPromise) {
            toastr.error('Please fill in all required fields.', 'Error');
            $scope.timeoutPromise = $timeout(function () {
              $scope.timeoutPromise = null;
            }, 3000); // Adjust the timeout value as needed
          }
        }
      }

      //Fetching caste data from the caste table 
      $scope.getdata = function () {
        $http.get(path+"/api/v1/account/caste",config)
          .then(function successCallback(response) {
            $scope.casteData = response.data;

          },
            function errorCallback(response) {
              console.log("Error fetching caste table data");
            });

      }
      $scope.getdata();
      $scope.checkForDuplicate = function(casteCode) {
        $http.get(path + `/api/v1/account/caste/${casteCode}`, config).then(
            function(response) {
                if (response.data.casteCode == casteCode) {
                    $scope.duplicateCode = true;
                } else {
                }
              }).catch(function(error) {
                console.log("Error fetching data from Caste code", error);
                $scope.duplicateCode = false;
            })   
    };
      //To edit the form data 
      $scope.edit = function (n) {
        var targetOffset = $('.scroll-target').offset().top;         
        $('html, body').animate({
            scrollTop: targetOffset
        }, 100);
        $scope.idDisable = true;
        $scope.form = {

          casteCode: n.casteCode,
          dscr: n.dscr,

        }

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


      //To update the caste table data 
      $scope.update = function () {

        var data = $scope.form;
        var sl = data.casteCode;
        var url = path+'/api/v1/account/caste' + sl;


        $http.put(url, data)
          .then(function successCallback(response) {


            $scope.form = {};
            $scope.getdata();

          }, function errorCallback(response) {
            console.log("Error updating data to the caste table")
          });
      }
      $scope.goBack = function () {
        window.history.back();
      }
    })
