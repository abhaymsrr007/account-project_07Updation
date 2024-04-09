app.controller(
    "voucherStatusTypeCtrl",
    function ($scope, $http, $timeout, $window, $rootScope, $filter) {
        $scope.timeoutPromise = null;
        $scope.idDisable = false;


        const token = $window.sessionStorage.getItem("token");
        $scope.logout = function () {
            $window.sessionStorage.removeItem("userDetails");
            $window.location.href = "index.html";
        };
        var config = {
            headers: {
                Authorization: "Bearer " + token,
            },
        };
        // To save data to vendor report table
        $scope.save = function () {

            if ($scope.myform.$valid) {
                console.log($scope.form);
                $http.post(path + "/api/v1/account/vst", $scope.form, config).then(
                    function (response) {
                        $scope.form = {};
                        $scope.getdata();
                        $scope.formSubmitted = true;
                        toastr.success("Data saved successfully!", "Success");
                    },
                    function (response) {
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


        // To Fetch data from vendor report table
        $scope.getdata = function () {
            $http.get(path + "/api/v1/account/vst", config).then(
                async function (response) {
                    $scope.voucherTypeData = response.data;
                    // for (let i = 0; i < (await $scope.vendorTypeData?.length); i++) {
                    //   const el = await $scope.vendorTypeData[i];
                    //   a.push(el.semesterSystemCode);
                    // }
                },
                function (response) {
                    console.log("Error  fetching data in vendor table  ");
                }
            );
        };
        $scope.getdata();


        // to edit
        $scope.edit = function (n) {
            $scope.idDisable = true;
            $scope.form = {
                voucherStatusCode: n.voucherStatusCode,
                dscr: n.dscr,
            };
        };

        // to update vendor type table
        $scope.update = function () {
            var data = $scope.form;
            var sl = data.voucherStatusCode;
            var url = "path" + "/api/v1/account/vst" + sl;
            $http.put(url, data, config).then(
                function (response) {
                    $scope.getdata();
                    $scope.form = {};
                },
                function (response) {
                    console.log("Error  updating data in vendor tabl;e  ");
                }
            );
        };
    }
);
