app.controller('empDetCtrl', function ($scope, $http, $timeout,$rootScope) {
      $scope.flag = false;
      $scope.flag1 = true;
      $scope.timeoutPromise = null;
      $scope.details = [];
       $rootScope.checkToken();
    const config = $rootScope.config;

      $scope.handleLink = function (pgname) {
        $rootScope.handleLink(pgname);
      };

      

      $scope.closeDetail = () => {
        document.getElementById("detailmodal").style.display = "none";
      };

      var modal = document.getElementById("detailmodal");
      var closeBtn = document.getElementById("closeBtn");

      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          modal.style.display = "none";
        }
      });

      closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
      });

      //This functionality is for shows the details of employee by Id
      $scope.employeeDetail = {};
      $scope.showDetails = (staffNo) => {
        document.getElementById("detailmodal").style.display = "block";

        $http.get(`${path}/api/v1/account/employee/${staffNo}`, config)
          .then(
            (res) => {
              $scope.employeeDetail = convertCamelToReadable(res.data);
              console.log(res.data,$scope.employeeDetail);
            },
            (err) => {
              console.error(err);
            }
          );
      };
      $scope.data = [];
      $scope.getdata = function () {
        $http.get(path+"/api/v1/account/employees", config)
          .then(function (response) {
            $scope.data = response.data;
            console.log(response.data);
          });
      };

      $scope.getdata();

      $scope.Department = [];
      $scope.getDepartment = function () {
        $http.get(path+"/api/v1/account/department", config)
          .then(function (response) {
            $scope.Department = response.data;
            // console.log("Department", response.data);

          });

      };
      $scope.getDepartment();


      $scope.searchF = function (keyword1, keyword2, keyword3) {
        var employeeDto = {
          staffNo: keyword1 || null,
          fullName: keyword2 || "",
          departmentCode: keyword3 || null
        };

        console.log(">>>>>", employeeDto);
        //Make the HTTP POST request to your API endpoint with the request data in the body
        $http.post(path+'/api/v1/account/employee/search', employeeDto, config)
          .then(function successCallback(response) {
            console.log(response)
            if (response.status === 200) {
              $scope.data = response.data;
              console.log("$scope.empData", response.data);
            } else {
              console.log(response.status)
            }
          },
            function errorCallback(error) {
              console.log("Unable to perform request", error);
            });
      };

      $scope.ClgData = [];
      $scope.getCollege = function () {
        $http.get(path+"/api/v1/account/college", config)
          .then(function (response) {
            $scope.ClgData = response.data;
            //console.log("Department", response.data);
          });

      };
      $scope.getCollege();

      $scope.UniData = [];
      $scope.getUniversity = function () {
        $http.get(path+"/api/v1/account/university", config)
          .then(function (response) {
            $scope.UniData = response.data;
            //console.log("Department", response.data);
          });
      };
      $scope.getUniversity();

      $scope.StaffDesignation = [];
      $scope.getStaffDesignation = function () {
        $http.get(path+"/api/v1/account/staff/designation", config)
          .then(function (response) {
            $scope.StaffDesignation = response.data;
            // console.log("StaffDesignation", response.data);

          });

      };
      $scope.getStaffDesignation();



      $scope.StaffStatus = [];
      $scope.getStaffStatus = function () {
        $http.get(path+"/api/v1/account/staff/status", config)
          .then(function (response) {
            $scope.StaffStatus = response.data;
            //  console.log("StaffStatus", response.data);

          });

      };
      $scope.getStaffStatus();


      $scope.StaffType = [];
      $scope.getStaffType = function () {
        $http.get(path+"/api/v1/account/type/staff", config)
          .then(function (response) {
            $scope.StaffType = response.data;
            //  console.log("StaffType", response.data);
          });
      };
      $scope.getStaffType();

      $scope.Caste = [];
      $scope.getCaste = function () {
        $http.get(path+"/api/v1/account/caste", config)
          .then(function (response) {
            $scope.Caste = response.data;
            //    console.log("Caste", response.data);
          });
      };
      $scope.getCaste();


      $scope.PhysicallyHandicapped = [];
      $scope.getPhysicallyHandicapped = function () {
        $http.get(path+"/api/v1/account/phyhandicapped", config)
          .then(function (response) {
            $scope.PhysicallyHandicapped = response.data;
            //console.log("PhysicallyHandicapped", response.data);
          });
      };
      $scope.getPhysicallyHandicapped();
      $scope.StaffSeparationType = [];
      $scope.getStaffSeparationType = function () {
        $http.get(path+"/api/v1/account/staff/separation", config)
          .then(function (response) {
            $scope.StaffSeparationType = response.data;
            //    console.log("StaffSeparationType", response.data);
          });
      };
      $scope.getStaffSeparationType();
      $scope.StaffGrade = [];
      $scope.getStaffGrade = function () {
        $http.get(path+"/api/v1/account/staff/designation", config)
          .then(function (response) {
            $scope.StaffGrade = response.data;
            //  console.log("StaffGrade", response.data);
          });
      };
      $scope.getStaffGrade();
      //to fetch the University description from college Table
      $scope.getUniDscr = function (n, universityCode) {
        var dscr = null;
        for (var i = 0; i < n.length; i++) {
          var row = n[i];
          if (row.universityCode === universityCode) {
            dscr = row.dscr;
            break; // Exit the loop if a match is found
          }
        }
        return dscr;
      };



      $scope.getcllgDscr = function (n, collegeCode) {
        var dscr = null;
        for (var i = 0; i < n.length; i++) {
          var row = n[i];
          if (row.collegeCode === collegeCode) {
            dscr = row.dscr;
            break; // Exit the loop if a match is found
          }
        }
        return dscr;
      };

      $scope.getdptDscr = function (departmentCode) {
        var dscr = null;
        for (var i = 0; i < $scope.Department.length; i++) {
          var row = $scope.Department[i];
          if (row.departmentCode === departmentCode) {
            // console.log(row.dscr);
            return row.dscr;
          }
        }
      };
      $scope.getGradeDscr = function (n, gradeCode) {
        var dscr = null;
        for (var i = 0; i < n.length; i++) {
          var row = n[i];
          if (row.gradeCode === gradeCode) {
            dscr = row.dscr;
            break; // Exit the loop if a match is found
          }
        }
        return dscr;
      };
      $scope.getDesignationDscr = function (n, designationCode) {
        var dscr = null;
        for (var i = 0; i < n.length; i++) {
          var row = n[i];
          if (row.designationCode == designationCode) {
            //console.log("descccc", row.dscr);
            dscr = row.dscr;
            break; // Exit the loop if a match is found
          }
        }
        return dscr;
      };
      $scope.getStaffStsDscr = function (n, staffStatusCode) {
        var dscr = null;
        for (var i = 0; i < n.length; i++) {
          var row = n[i];
          if (row.staffStatusCode === staffStatusCode) {
            dscr = row.dscr;
            break; // Exit the loop if a match is found
          }
        }
        return dscr;
      };
      $scope.getStaffTpDscr = function (n, staffTypeCode) {
        var dscr = null;
        for (var i = 0; i < n.length; i++) {
          var row = n[i];
          if (row.staffTypeCode === staffTypeCode) {
            dscr = row.dscr;
            break; // Exit the loop if a match is found
          }
        }
        return dscr;
      };
      $scope.getSeparationDscr = function (n, separationTypeCode) {
        var dscr = null;
        for (var i = 0; i < n.length; i++) {
          var row = n[i];
          if (row.separationTypeCode === separationTypeCode) {
            dscr = row.dscr;
            break; // Exit the loop if a match is found
          }
        }
        return dscr;
      };
      $scope.getCasteDscr = function (n, casteCode) {
        var dscr = null;
        for (var i = 0; i < n.length; i++) {
          var row = n[i];
          if (row.casteCode === casteCode) {
            dscr = row.dscr;
            break; // Exit the loop if a match is found
          }
        }
        return dscr;
      };
      $scope.getPhysicallyHDscr = function (n, phyHandicappedCode) {
        var dscr = null;
        for (var i = 0; i < n.length; i++) {
          var row = n[i];
          if (row.phyHandicappedCode === phyHandicappedCode) {
            dscr = row.dscr;
            break; // Exit the loop if a match is found
          }
        }
        return dscr;
      };
      $scope.flag = false;
      $scope.edit = function (n) {
        $scope.flag = true;
        $rootScope.handleLinkWData('employee',n);
      };
      $scope.search = function (keyword1, keyword2, keyword3) {
        var employeeDto = {
          staffNo: keyword1 || '',
          name: keyword2 || '',
          department: keyword3 || 0
        };
        console.log(employeeDto)
        //Make the HTTP POST request to your API endpoint with the request data in the body
        $http.get(path+'/api/v1/account/search/employee', employeeDto, config)
          .then(function successCallback(response) {
            $scope.data = response.data;
            console.log("$scope.empData", $scope.data);
          },
            function errorCallback(error) {
              console.log("Unable to perform request", error);
            });
      };
    });
   