    
app.controller('projectsplansexpenditurereportingCtrl', function ($scope, $http, $timeout, $window, $rootScope, $filter) {
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

      // saving data to Projects Plans Expenditure Reporting  table 
      $scope.save = function () {
        console.log($scope.form);
        $http.post(path+"/api/v1/account/expenditureReporting", $scope.form,config)
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
        $http.get(path+"/api/v1/account/expenditureReporting/data",config)
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
              console.log("Fetching of data failed from Projects Plans Expenditure Reporting table ");
            });


      }
      $scope.getProjectPlanCostCentre();




      $scope.ClgData = [];
      $scope.getCollege = function () {
        $http.get(path+"/api/v1/account/college",config)
          .then(function (response) {
            $scope.ClgData = response.data;
            console.log("ClgData", response.data);

          });

      };
      $scope.getCollege();



      $scope.Employee = [];
      $scope.getEmployee = function () {
        $http.get(path+"/api/v1/account/employee/alldata",config)
          .then(function (response) {
            $scope.Employee = response.data;
            console.log("Employee", response.data);

          });

      };
      $scope.getEmployee();

      $scope.AccountMaster = [];
      $scope.getAccountMaster = function () {
        $http.get(path+"/api/v1/account/accreport",config)
          .then(function (response) {
            $scope.AccountMaster = response.data;
            console.log("AccountMaster", response.data);

          });

      };
      $scope.getAccountMaster();


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
      // To edit the data 
      $scope.edit = function edit(n) {
        $scope.flag = true;

        console.log($scope.form)
        $scope.form = {
          reportingId: n.reportingId,
          costCentreId: n.costCentreId.toString(),
          planNo: n.planNo.toString(),
          planFinYear: n.planFinYear.toString(),
          planTypeCode: n.planTypeCode.toString(),
          reportingDate: n.reportingDate,
          accountCode: n.accountCode,
          allocationFinYear: n.allocationFinYear,
          totalFundTransferred: n.totalFundTransferred,
          totalCapitalTransferred: n.totalCapitalTransferred,
          totalRevenueTransferred: n.totalRevenueTransferred,
          reportingFinYear: n.reportingFinYear,
          cumulativeTotalExpenses: n.cumulativeTotalExpenses,
          cumulativeCapitalExpenses: n.cumulativeCapitalExpenses,
          cumulativeRevenueExpenses: n.cumulativeRevenueExpenses,
          departmentCode: n.departmentCode,
          collegeCode: n.collegeCode.toString(),
          universityCode: n.universityCode.toString(),
          reportingRefNo: n.reportingRefNo,
          reportingOfficer: n.reportingOfficer.toString(),
        }
        console.log($scope.form)
      };
      //To update the data and save the data back to the table 
      $scope.update = function () {

        var data = $scope.form;
        var sl = data.reportingId;
        var url = path+'/api/v1/account/expenditureReporting/{id}' + sl;
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
