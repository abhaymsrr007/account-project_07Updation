
        app.directive('fileModel', ['$parse', function ($parse) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var model = $parse(attrs.fileModel);
                    var modelSetter = model.assign;
                    element.bind('change', function () {
                        scope.$apply(function () {
                            modelSetter(scope, element[0].files[0]);
                        });
                    });
                }
            };
        }]);
        app.controller('contr', function ($scope, $http, $timeout, $window, $rootScope, $filter) {
            $scope.login = function () {
                $http.post(path + '/api/v1/user/login', $scope.check)
                    .then( async function (res) {
                        console.log("All data",res)
                        if (await res.data.token) {
                            const userDetails = {
                                profile_image: res.data.userDetails.user.profile_image,
                                name: res.data.userDetails.name,
                                username: res.data.userDetails.user.username,
                                userid: res.data.userDetails.user.id,
                                staffNo: res.data.userDetails.staffNo,
                                sectionCode: res.data.userDetails.sectionCode
                            };
                            console.log(res.data.token);
                            storeUserDetails(await userDetails);
                            var isAdmin = await res.data.userDetails.user.roles.find(row => row.id === "adm");
                            console.log("isAdmin", isAdmin);
                            if(isAdmin){
                                window.location.href = 'admin_dashboard.html';
                            }else{
                                console.log("in else", res.data.userDetails.user.roles)
                                navigateToDashboard(res.data.userDetails.user.roles[0].role);
                            }
                        } else {
                            console.log("Something went wrong");
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            };
            function storeUserDetails(userDetails) {
                window.sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
            }
            function navigateToDashboard(role) {
                // window.location.href = 'main_dashboard.html';
                // if (role === "manager") {
                //     window.location.href = 'manager_dashboard.html';
                // } else if (role === "assistant") {
                //     window.location.href = 'assistant_dashboard.html';
                // } else if (role === "cashier") {
                //     window.location.href = 'cashier_dashboard.html';
                // } else {
                //     alert("Unknown role: " + role);
                // }
                if (role === "manager") {
                    window.location.href = 'mgr_main_dashboard.html';
                } else if (role === "assistant") {
                    window.location.href = 'asst_main_dashboard.html';
                } else if (role === "cashier") {
                    window.location.href = 'cashier_main_dashboard.html';
                } else if (role === "central account") {
                    window.location.href = 'centralAccount_main_dashboard.html';
                } else {
                    alert("Unknown role: " + role);
                }
            }

            // signup 
            $scope.signup = function () {
                if ($scope.form && $scope.form.file) {
                    var formData = new FormData();
                    for (var key in $scope.form) {
                        formData.append(key, $scope.form[key]);
                    }
                    $http.post(path + '/api/v1/user/signup', formData, {
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': undefined,
                        },
                    })
                        .then(function (res) {
                            if (res.data) {
                                alert("Uploaded");
                            } else {
                                console.log("Something went wrong. No token received.");
                            }
                        })
                        .catch(function (err) {
                            console.log("Error while signing up:", err);
                        });
                } else {
                    console.log("Invalid data in $scope.form or $scope.form.file.");
                }
            };
        });
