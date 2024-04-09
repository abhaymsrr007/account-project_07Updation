app.controller('paytotypeCtrl', function ($scope, $http, $timeout, $window, $rootScope, $filter) {
    $scope.terte = 10;
    $scope.flag = false;
    $scope.timeoutPromise = null;
    $scope.glgroupData = [];

    $scope.details = [];
    var token;
    const userDetailsJSON = $window.sessionStorage.getItem('userDetails');
    if (userDetailsJSON) {
        const userDetails = JSON.parse(userDetailsJSON);
        if (userDetails.token != null || userDetails.token != '') {
            $scope.details = angular.copy(userDetails);
            token = $scope.details.token;
        }
    } else {
        $window.location.href = "index.html";
        console.log('User details not found in sessionStorage');
    }
    $scope.logout = function () {
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
});
