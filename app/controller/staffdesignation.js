
app.controller('staffdesignationCtrl', function ($scope, $http, $timeout, $window, $rootScope, $filter) {
            $scope.form = {};
            $scope.timeoutPromise = null;
            $scope.details=[];
            const token = $window.sessionStorage.getItem('token');
            $scope.logout = function() {
            $window.sessionStorage.removeItem('userDetails');
            $window.location.href = 'index.html';
            };

            var config = {
            headers: {
           'Authorization': 'Bearer ' + token
               },   
            };


            // TO persist data to the staff designation table
            $scope.idDisable = false;
            $scope.save = function () {
                if ($scope.myform.$valid) {
                    $http.post(path+"/api/v1/account/staff/designation", $scope.form,config)
                        .then(function (response) {
                            $scope.idDisable = false;
                            $scope.form = {};
                            $scope.getdata()
                            $scope.formSubmitted = true;
                            toastr.success('Data saved successfully!', 'Success');

                        }, function (response) {
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

            //To fetch data from staff designation table 
            $scope.getdata = function () {
                $http.get(path+"/api/v1/account/staff/designation",config)
                    .then(function (response) {
                        $scope.staffDesigData = response.data;
                        //$window.location.href = '../insertOrdinance.html';
                    }, function (response) {
                        console.log("Error fetching data from from staff designation table ")
                    });

            }
            $scope.getdata();


            // Fetching data from staff grade table 
            $scope.staffGradeData = [];
            $scope.getdata2 = function () {
                $http.get(path+"/api/v1/account/staff/grade",config)
                    .then(function successCallback(response) {
                        $scope.staffGradeData = response.data;



                    },
                        function errorCallback(resopnse) {
                            console.log("Error Fetching staff grade data  ")
                        });


            }
            $scope.getdata2();

            $scope.checkForDuplicate = function(designationCode) {
                $http.get(path + `/api/v1/account/staff/designation/${designationCode}`, config).then(
                    function(response) {
                        if (response.data.designationCode == designationCode) {
                            $scope.duplicateCode = true;
                        } else {
                        }
                      }).catch(function(error) {
                        console.log("Error fetching data from Designation code", error);
                        $scope.duplicateCode = false;
                    })   
            };

            $scope.edit = function (n) {
                //console.log(n)
                var targetOffset = $('.scroll-target').offset().top;         
                $('html, body').animate({
                    scrollTop: targetOffset
                }, 100);
                $scope.idDisable = true;
                $scope.form = {
                    designationCode: n.designationCode,
                    shortName: n.shortName,
                    gradeCode: n.gradeCode,
                    dscr: n.dscr,

                }

            };
                    $scope.goBack = function () {
                    window.history.back();
                }
            // To update Staff designation data
            $scope.update = function () {

                var data = $scope.form;

                var sl = data.designationCode;
                var url = path+'/api/v1/account/staff' + sl;
                $http.put(url, data,config)
                    .then(function (response) {

                        $scope.getdata()
                        $scope.form = {};

                    }, function (response) {
                        console.log("Error updating staff designation table ")
                    });
            }
        })
