
app.controller('costcentrebudgetallocationCtrl', function ($scope, $http, $timeout, $window, $rootScope, $filter) {
            $scope.form = {};
            $scope.flag = false;
            $scope.details=[];
            
            var token;
            const userDetailsJSON = $window.sessionStorage.getItem('userDetails');
            
            $scope.logout = function() {
              $window.sessionStorage.removeItem('userDetails');
              $window.location.href = 'index.html';
            }; 
            
            var config = {
                  headers: {
                  'Authorization': 'Bearer ' + token
                    },   
                  };


            // saving data to Cost Centre Budget Allocation Cost Centre table 
            $scope.save = function () {
                console.log($scope.form);
                $http.post(path+"/api/v1/account/budgetAllocation", $scope.form,config)
                    .then(function successCallback(response) {
                        $scope.form = {};
                        $scope.getdata()
                    },
                        function errorCallback(response) {
                            console.log("saving of data failed");
                        });
            }

            //Fetching of data from table 
            $scope.getdata = function () {
                $http.get(path+"/api/v1/account/budgetAllocation/data",config)
                    .then(function successCallback(response) {
                        $scope.data = response.data;
                        console.log($scope.data)
                    },
                        function errorCallback(response) {
                            console.log("saving of data failed");
                        });

            }
            $scope.getdata();


            // Fetching data from  table 
            $scope.ProjectPlanCostCentre = [];
            $scope.getProjectPlanCostCentre = function () {
                $http.get(path+"/api/v1/account/costCentre/alldata",config)
                    .then(function successCallback(response) {
                        $scope.ProjectPlanCostCentre = response.data;
                        console.log("Data 2", $scope.ProjectPlanCostCentre)
                    },
                        function errorCallback(response) {
                            console.log("Fetching of data failed from Cost Centre Budget Allocation table ");
                        });


            }
            $scope.getProjectPlanCostCentre();


$scope.Department = [];
$scope.getDepartment = function () {
$http.get(path+"/api/v1/account/department",config)
.then(function (response) {
 $scope.Department = response.data;
   console.log("Department", response.data);
    
 });
 
};
$scope.getDepartment();

$scope.ClgData = [];
$scope.getCollege = function () {
$http.get(path+"/api/v1/account/college",config)
.then(function (response) {
 $scope.ClgData = response.data;
   console.log("ClgData", response.data);
    
 });
 
};
$scope.getCollege();

$scope.UniData = [];
$scope.getUniversity = function () {
$http.get(path+"/api/v1/account/university",config)
.then(function (response) {
 $scope.UniData = response.data;
   console.log("UniData", response.data);
    
 });
 
};
$scope.getUniversity();

 $scope.Employee = [];
$scope.getEmployee = function () {
  $http.get(path+"/api/v1/account/employee/alldata",config)
    .then(function (response) {
      $scope.Employee = response.data;
      console.log("Employee", response.data);

    });

};
$scope.getEmployee();


 //to fetch the University description from Table

 $scope.getUniDscr = function (n, universityCode) {
               // console.log("University", n, universityCode);
                var dscr = null;
                for (var i = 0; i < n.length; i++) {
                    var row = n[i];
                    console.log(row, i);
                    if (row.universityCode === universityCode) {
                       // console.log(row.dscr);
                        dscr = row.dscr;
                        break; // Exit the loop if a match is found
                    }
                }
            
                return dscr;
            };
            $scope.getcllgDscr = function (n, collegeCode) {
                //console.log("data2", n, collegeCode);
                var dscr = null;
                for (var i = 0; i < n.length; i++) {
                    var row = n[i];
                   // console.log(row, i);
                    if (row.collegeCode === collegeCode) {
                       // console.log(row.dscr);
                        dscr = row.dscr;
                        break; // Exit the loop if a match is found
                    }
                }
                return dscr;
            };
            $scope.getdptDscr = function (n, departmentCode) {
                //console.log("department Data", n, departmentCode);
                var dscr = null;
                for (var i = 0; i < n.length; i++) {
                    var row = n[i];
                   // console.log(row, i);
                    if (row.departmentCode === departmentCode) {
                       // console.log(row.dscr);
                        dscr = row.dscr;
                        break; // Exit the loop if a match is found
                    }
                }
                return dscr;
            };
            // To edit the data 
            $scope.edit = function edit(n) {
                $scope.flag = true;

                console.log($scope.form)
                $scope.form = {
                    allocationId: n.allocationId,
                    costCentreId: n.costCentreId.toString(),
                    planNo: n.planNo.toString(),
                    planFinYear: n.planFinYear.toString(),
                    planTypeCode: n.planTypeCode.toString(),       
                    allocationDate: n.allocationDate,
                    allocationFinYear: n.allocationFinYear,
                    totalBudgetAllocated: n.totalBudgetAllocated,
                    capitalAllocated: n.capitalAllocated,
                    revenueAllocated: n.revenueAllocated,
                    departmentCode: n.departmentCode.toString(),
                    collegeCode: n.collegeCode.toString(),
                    universityCode: n.universityCode.toString(),
                    executingAuthority: n.executingAuthority,
                    approvalRefNo: n.approvalRefNo,
                    approvingAuthority: n.approvingAuthority,
                    approvalDate: n.approvalDate,
                }
                //console.log($scope.form)
            };


            //To update the data and save the data back to the table 
            $scope.update = function () {

                var data = $scope.form;
                var sl = data.allocationId;
                var url = path+'/api/v1/account/budgetAllocation/{id}' + sl;
                $http.put(url, data,config)
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
