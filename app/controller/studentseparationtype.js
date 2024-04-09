
app.controller('studSepTypeCtrl', function ($scope, $http, $timeout, $window, $rootScope, $filter) {
  $scope.timeoutPromise = null;
  $scope.idDisable = true;
  $rootScope.checkToken();
  const config = $rootScope.config;

  //To save data in student separation type 
  $scope.save = function () {
    $(".loaderbg").show();
    if ($scope.myform.$valid) {
      $http.post(path+"/api/v1/account/stuseptype", $scope.form,config)
        .then(function (response) {
          if(response.status==200 || response.status==201){
            $(".loaderbg").hide();
            toastr.success('Data saved successfully!', 'Success');
            $scope.form = {};
            $scope.getdata();
            $scope.formSubmitted = true;
          }else{
            console.log(response.status);
          }
        }, function (response) {
          toastr.error('An error occurred while saving data.', 'Error');
          console.log("first",response);
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
  //To fetch data in student separation type
  $scope.getdata = function () {
    $(".loaderbg").show();

    $http.get(path+"/api/v1/account/stuseptype",config)
      .then(function (response) {
        $(".loaderbg").hide();
        if(response.status==200){
          $scope.studSepData = response.data;
        }
      }, function (response) {
        console.log("error in fetching student  separation table  ")
      });

  }
  $scope.getdata();

  $scope.checkForDuplicate = function(stuSeparationTypeCode) {
    $http.get(path + `/api/v1/account/stuseptype/${stuSeparationTypeCode}`, config).then(
        function(response) {
            if (response.data.stuSeparationTypeCode == stuSeparationTypeCode) {
                $scope.duplicateCode = true;
            } else {
            }
          }).catch(function(error) {
            console.log("Error fetching data from Student Separation Code", error);
            $scope.duplicateCode = false;
        })   
};

  //To edit 
  $scope.edit = function (n) {
    var targetOffset = $('.scroll-target').offset().top;         
    $('html, body').animate({
        scrollTop: targetOffset
    }, 100);
    $scope.idDisable = true;
    $scope.form = {
      stuSeparationTypeCode: n.stuSeparationTypeCode,
      dscr: n.dscr,
    }
  };
  // $scope.delete=function(n){
  //   console.log(n);
  //   var data = $scope.form;
  //   var sl=n.account_code;
  //   console.log(sl);
  //   var url = 'http://127.0.0.1:9099/api/v1/account/stuseptype/' + sl;
  //   $http.delete(url);
  //   $window.location.reload();
  // }

  // to update data in student separation type table 
  $scope.update = function () {
    var data = $scope.form;
    var sl = data.stuSeparationTypeCode;
    var url = path+'/api/v1/account/stuseptype' + sl;
    $http.put(url, data,config)
      .then(function (response) {
        if(response.status==200){
          $scope.form = {};
          $scope.getdata();
        }
      }, function (response) {
        console.log("error in updating student  separation table  ",response)
      }).catch(function(error){
        console.log("error in updating student  separation table  ",error)
      })
  }
})
