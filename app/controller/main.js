        var app = angular.module('app', ['ui.bootstrap']);
        app.controller('mainCtrl', function ($scope, $http, $timeout, $location, $window, $rootScope, $filter) {
            $scope.master = false;
            // console.log($window.sessionStorage.getItem('pages'));
            const storedData = $window.sessionStorage.getItem("rolelist");
            console.log("🚀 ~ storedData:", storedData)
            $scope.menuItems = [];
            $scope.submenuItems = [];
            $scope.menuItems.push({ pageName: 'dashboard', icon: 'fa-desktop', desc: 'Dashboard', menu_level: 1, seq_no: 1 });

            // Parse the stored string to an array of entries
            const storedEntries = JSON.parse(storedData);

            console.log("🚀 ~ storedEntries:", storedEntries);
            // Convert the array of entries back to a Map
            // const retrievedMap = new Map(storedEntries);
            // console.log("🚀 ~ retrievedMap:", retrievedMap)
            storedEntries.forEach((values) => {
                if (values.menuLabel == '1') {
                    $scope.menuItems.push(values);
                }
                else if (values.menuLabel == '2') {
                    $scope.submenuItems.push(values);
                }
            });

            console.log("🚀 ~ storedEntries.forEach ~ $scope.submenuItems:", $scope.submenuItems);
            console.log("🚀 ~ storedEntries.forEach ~ $scope.menuItems:", $scope.menuItems);

            let token = $window.sessionStorage.getItem('token');
            $scope.userFullName = $window.sessionStorage.getItem('userFullName');
            $scope.profile_image = $window.sessionStorage.getItem('profile_image');
            // if (sessionStorage.getItem('token') == '' || sessionStorage.getItem('token') == null) {
            //     $window.location.href = "index.html";
            // }
            $scope.logout = function () {
                // $window.sessionStorage.setItem('token', '');
                // $window.sessionStorage.setItem('userid', '');
                $window.sessionStorage.removeItem('token');
                $window.sessionStorage.removeItem('userid');
                $window.location.href = 'index.html';
            }
            $scope.masterrolecheck = function () {
                $scope.rolelist = [];
                $scope.rolelist = $window.sessionStorage.getItem('rolelist');
                var roleArray = $scope.rolelist.split(',');
                for (let i = 0; i <= roleArray.length; i++) {
                    if (roleArray[i] == 'admin' || roleArray[i] == 'master') {
                        $scope.master = true
                    }
                }
            }
            // $scope.masterrolecheck();
            $scope.link = '';
            $scope.sublink = '';
            $rootScope.handleLink = function (pgname) {
                let found = false;
                storedEntries.forEach((values, keys) => {
                    if (values.pageName == pgname) {
                        $('.submenu').parent().removeClass('active');
                        $scope.templateUrl = 'view/' + pgname + '.html';
                        // console.log("🚀 ~ storedEntries.forEach ~ $scope.templateUrl:", pgname, $scope.templateUrl)
                        $scope.link = pgname;
                        $scope.sublink = '';
                        $location.path('/' + pgname);
                        // console.log('Handling link:', $scope.link);
                        found = true;
                    }
                    else if (pgname === 'dashboard') {
                        $scope.templateUrl = 'view/dashboard.html';
                        $scope.link = pgname;
                        $scope.sublink = '';
                        $location.path('/' + pgname);
                        // console.log('Handling link:', $scope.link);
                        found = true;
                    }
                });
                if (!found) {
                    $scope.templateUrl = 'view/404.html';
                }
            };
            $scope.handleSubLink = function (sublink) {
                $scope.link = sublink;
                $scope.templateUrl = 'view/' + sublink + '.html';
                $location.path('/' + sublink);
            };
            $scope.linkurl = window.location.href.split("/")[window.location.href.split("/").length - 1];
            $scope.handleLinkFirstTime = function (pgname) {
                if (pgname == '' || pgname == '' || pgname == 'landingpage.html') {
                    pgname = 'dashboard';
                }
                $scope.handleLink(pgname);
            };
            $scope.handleLinkFirstTime($scope.linkurl);

            $scope.showuserpop = function () {
                $('#userpop').show();
            };
            $scope.closeuserpop = function () {
                $('#userpop').hide();
            };

        });