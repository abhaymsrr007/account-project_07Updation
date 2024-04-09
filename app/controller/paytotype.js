        app.controller('paytotypeCtrl', function ($scope, $http, $timeout, $window, $rootScope, $filter) {
            $scope.terte = 10;
            $scope.flag = false;
            $scope.timeoutPromise = null;
            $scope.glgroupData = [];
            $scope.details = [];
            $rootScope.checkToken();
            const config = $rootScope.config;
            $scope.save = function () {
                // saving data to accountmaster table
                if ($scope.myform.$valid) {
                    $http.post(path+"/api/v1/account/paytotype", $scope.form,config)
                        .then(function successCallback(response) {
                            const excludedField = ['operative'];
                            const values = {};
                            for (let key in $scope.form) {
                                if (excludedField.includes(key)) {
                                    values[key] = $scope.form[key];
                                }
                            }
                            $scope.form = values;
                            $scope.formSubmitted = true;
                            $scope.flag = false;
                            toastr.success('Data saved successfully!', 'Success');
                            $scope.getdata();
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
            };

            // another GET request function to fetch data from glaccountmaster table

            $scope.search = function (keyword1, keyword2) {
                // Create a request object with the keywords in the request body
                var requestData = {
                    keyword1: keyword1 || '',
                    keyword2: keyword2 || ''
                };

                console.log(requestData)
                //Make the HTTP POST request to your API endpoint with the request data in the body
                $http.post(path+'/api/v1/account/paytotype', requestData,config)
                    .then(function successCallback(response) {
                        console.log("xsd", response);
                    },
                        function errorCallback(error) {
                            console.log("Unable to perform request", error);
                        });
            };
            // $scope.search();
            // Our GET request function to fetch data from accountmaster table
            $scope.payToType = [];
            $scope.getdata = function () {
                $http.get(path+"/api/v1/account/paytotype",config)
                    .then(function successCallback(response) {
                        $scope.payToType = response.data;

                    },
                        function errorCallback(response) {
                            console.log("Unable to perform  request");
                        }

                    );
            }
            $scope.getdata();

            $scope.checkForDuplicate = function(payToTypeCode) {
                $http.get(path + `/api/v1/account/paytotype/${payToTypeCode}`, config).then(
                    function(response) {
                        if (response.data.payToTypeCode == payToTypeCode) {
                            $scope.duplicateCode = true;
                        } else {
                        }
                      }).catch(function(error) {
                        console.log("Error fetching data from pay to Type code", error);
                        $scope.duplicateCode = false;
                    })   
            };
            
            //To edit the data and bind to the form
            $scope.edit = function (n) {
                var targetOffset = $('.scroll-target').offset().top;         
                $('html, body').animate({
                    scrollTop: targetOffset
                }, 100);
                console.log("edit", n)
                $scope.flag = true;

                $scope.form = n

            };

            // to update the form data 
            $scope.update = function () {
                var data = $scope.form;
                console.log(data.payToTypeCode)
                var sl = data.payToTypeCode;
                var url = path+'/api/v1/account/paytotype' + sl;


                $http.put(url, data,config)
                    .then(function successCallback(response) {

                        $scope.form = {};

                    },
                        function errorCallback(response) {
                            console.log("Unable to update  request");


                        });
            }
        })
