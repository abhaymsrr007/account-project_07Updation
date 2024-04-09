        
app.controller('projectplancostcentreCtrl', function ($scope, $http, $timeout, $window, $rootScope, $filter) {
            $scope.form = {};
            $scope.flag = false;

            $scope.details=[];
            var token;
            const userDetailsJSON = $window.sessionStorage.getItem('userDetails');
            if (userDetailsJSON) {
            const userDetails = JSON.parse(userDetailsJSON);
            if (userDetails.token!=null || userDetails.token!=''){
                $scope.details=angular.copy(userDetails);
                token=$scope.details.token;
            }
            } else {
            $window.location.href = "index.html";
            console.log('User details not found in sessionStorage');
            }
            $scope.logout = function() {
            $window.sessionStorage.removeItem('userDetails');
            $window.location.href = 'index.html';
            };

            var config = {
            headers: {
           'Authorization': 'Bearer ' + token
               },   
            };

            // saving data to Project Plan Cost Centre Cost Centre table 
            $scope.save = function () {
                console.log($scope.form);
                $http.post(path+"/api/v1/account/costCentre/data", $scope.form,config)
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
                $http.get(path+"/api/v1/account/costCentre/alldata",config)
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
            $scope.ProjectPlan = [];
            $scope.getProjectPlan = function () {
                $http.get(path+"/api/v1/account/projectPlan/alldata",config)
                    .then(function successCallback(response) {
                        $scope.ProjectPlan = response.data;
                        console.log("Data 2", $scope.ProjectPlan)
                    },
                        function errorCallback(response) {
                            console.log("Fetching of data failed from Project Plan Cost Centre table ");
                        });


            }
            $scope.getProjectPlan();


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



$scope.CostCentre = [];
$scope.getCostCentre = function () {
  $http.get(path+"/api/v1/account/cost",config)
    .then(function (response) {
      $scope.CostCentre = response.data;
      console.log("CostCentre", response.data);

    });

};
$scope.getCostCentre();


 $scope.Employee = [];
$scope.getEmployee = function () {
  $http.get(path+"/api/v1/account/employee/alldata",config)
    .then(function (response) {
      $scope.Employee = response.data;
      console.log("Employee", response.data);

    });

};
$scope.getEmployee();

$scope.BankAccount = [];
$scope.getBankAccount = function () {
  $http.get(path+"/api/v1/account/bankacc",config)
    .then(function (response) {
      $scope.BankAccount = response.data;
      console.log("BankAccount", response.data);

    });

};
$scope.getBankAccount();


$scope.Bank = [];
$scope.getBank = function () {
  $http.get(path+"/api/v1/account/bank",config)
    .then(function (response) {
      $scope.Bank = response.data;
      console.log("Bank", response.data);

    });

};
$scope.getBank();

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
            $scope.getcostCentreDscr = function (n, costCentreCode) {
                //console.log("Caste Data", n, costCentreCode);
                var dscr = null;
                for (var i = 0; i < n.length; i++) {
                    var row = n[i];
                    //console.log(row, i);
                    if (row.costCentreCode === costCentreCode) {
                        //console.log(row.dscr);
                        dscr = row.dscr;
                        break; // Exit the loop if a match is found
                    }
                }
                return dscr;
            };

            $scope.getBankAccountDscr = function (n, bankAccountNo) {
               
               var dscr = null;
               for (var i = 0; i < n.length; i++) {
                   var row = n[i];
                   //console.log(row, i);
                   if (row.bankAccountNo === bankAccountNo) {
                      // console.log(row.dscr);
                       dscr = row.dscr;
                       break; // Exit the loop if a match is found
                   }
               }
               return dscr;
           };

           $scope.getBankDscr = function (n, bankCode) {
               
               var dscr = null;
               for (var i = 0; i < n.length; i++) {
                   var row = n[i];
                   //console.log(row, i);
                   if (row.bankCode === bankCode) {
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
                    costCentreId: n.costCentreId,
                    planNo: n.planNo.toString(),
                    planFinYear: n.planFinYear.toString(),
                    planTypeCode: n.planTypeCode.toString(),       
                    costCentreCode: n.costCentreCode.toString(),
                    departmentCode: n.departmentCode.toString(),
                    collegeCode: n.collegeCode.toString(),
                    universityCode: n.universityCode.toString(),
                    bankAccountNo: n.bankAccountNo.toString(),
                    bankCode: n.bankCode.toString(),
                    scheduledStartDate: n.scheduledStartDate,
                    scheduledCompletionDate: n.scheduledCompletionDate,
                    actualStartDate: n.actualStartDate,
                    actualCompletionDate: n.actualCompletionDate, 
                    executingAuthority: n.executingAuthority,
                    approvalRefNo: n.approvalRefNo,
                    approvingAuthority: n.approvingAuthority,
                    approvalDate: n.approvalDate,
                   
                    
                }
                 console.log($scope.form)

            };


            //To update the data and save the data back to the table 
            $scope.update = function () {

                var data = $scope.form;
                var sl = data.costCentreId;
                var url = path+'/api/v1/account/costCentre/data/{id}' + sl;
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
