
app.controller('locationCtrl', function ($scope, $http, $timeout, $window, $rootScope, $filter) {
            $scope.flag = false;
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
                //Saving data to the location table 
            $scope.save = function () {
                if ($scope.myform.$valid) {
                    $http.post(path+"/api/v1/account/location", $scope.form,config)
                        .then(function successCallback(response) {
                            $scope.flag = false;
                            $scope.form = {};
                            $scope.getdata()
                            $scope.formSubmitted = true;
                            toastr.success('Data saved successfully!', 'Success');

                        }, function errorCallback(response) {
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

            //Fetching data from location table 
            $scope.getdata = function () {
                $http.get(path+"/api/v1/account/location",config)
                    .then(function successCallback(response) {
                        $scope.locationData = response.data;

                    }, function errorCallback(response) {
                        console.log("Error fetching data from the location table ")
                    });

            }
            $scope.getdata();

            $scope.checkForDuplicate = function(locationCode) {
                $http.get(path + `/api/v1/account/location/${locationCode}`, config).then(
                    function(response) {
                        if (response.data.locationCode == locationCode) {
                            $scope.duplicateCode = true;
                        } else {
                        }
                      }).catch(function(error) {
                        console.log("Error fetching data from Account Type code", error);
                        $scope.duplicateCode = false;
                    })   
            };

            //To edit form data 
            $scope.edit = function (n) {
                var targetOffset = $('.scroll-target').offset().top;         
                $('html, body').animate({
                    scrollTop: targetOffset
                }, 100); 
                $scope.flag = true;
                $scope.form = {
                    locationCode: n.locationCode,
                    dscr: n.dscr,
                    bankCode: n.bankCode,
                    accountTypeCode: n.accountTypeCode
                }

            };


            //To update data to the location table 
            $scope.update = function () {

                var data = $scope.form;

                var sl = data.locationCode;
                var url = path+'/api/v1/account/location' + sl;
                $http.put(url, data,config)
                    .then(function successCallback(response) {

                        $scope.getdata()
                        $scope.form = {};

                    },
                        function errorCallback(response) {
                            console.log("Error in persisting datas ")
                        });
            }

        })


