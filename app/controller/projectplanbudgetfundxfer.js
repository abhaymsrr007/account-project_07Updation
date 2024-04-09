app.controller(' projectplanbudgetfundxferCtrl', function ($scope, $http, $timeout, $window, $rootScope, $filter) {
    $scope.form = {};
    $scope.flag = false;

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

    // saving data to Project PlanBudget Fund Xfer table 
    $scope.save = function () {
        console.log($scope.form);
        $http.post(path + "/api/v1/account/fundXfer/data", $scope.form, config)
            .then(function successCallback(response) {
                $scope.form = {};
                $scope.getdata()
            },
                function errorCallback(response) {
                    console.log("saving of data failed");
                });
    }

    //Fetching of data from bankaccount table 
    $scope.getdata = function () {
        $http.get(path + "/api/v1/account/fundXfer/alldata", config)
            .then(function successCallback(response) {
                $scope.data = response.data;
                console.log($scope.data)
            },
                function errorCallback(response) {
                    console.log("saving of data failed");
                });

    }
    $scope.getdata();


    // Fetching data from bank table 
    $scope.ProjectPlan = [];
    $scope.getProjectPlan = function () {
        $http.get(path + "/api/v1/account/projectPlan/alldata", config)
            .then(function successCallback(response) {
                $scope.ProjectPlan = response.data;
                console.log("Data 2", $scope.ProjectPlan)
            },
                function errorCallback(response) {
                    console.log("Fetching of data failed from Project Plan table ");
                });


    }
    $scope.getProjectPlan();


    // To edit the data 
    $scope.edit = function edit(n) {
        $scope.flag = true;

        console.log($scope.form)
        $scope.form = {
            transferSlNo: n.transferSlNo,
            planNo: n.planNo.toString(),
            planFinYear: n.planFinYear.toString(),
            planTypeCode: n.planTypeCode,
            bankTransactionId: n.bankTransactionId,
            transferDate: n.transferDate,
            sanctionFinYear: n.sanctionFinYear,
            totalFundTransfer: n.totalFundTransfer,
            capitalTransfer: n.capitalTransfer,
            revenueTransfer: n.revenueTransfer,
            approvalRefNo: n.approvalRefNo,
            approvingAuthority: n.approvingAuthority,
            approvalDate: n.approvalDate,


        }
        console.log($scope.form)

    };


    //To update the data and save the data back to the table 
    $scope.update = function () {

        var data = $scope.form;
        var sl = data.transferSlNo;
        var url = path + '/api/v1/account/fundXfer/data/{id}' + sl;
        $http.put(url, data, config)
            .then(function successCallback(response) {

                $scope.getdata()
                $scope.form = {};

            },
                function errorCallback(response) {
                    console.log("updating of data failed  ");
                });
    }
    $scope.goBack = function () {
        window.history.back();
    }
})
