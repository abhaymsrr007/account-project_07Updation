app.controller("stuDetlCtrl", function ($scope, $http, $location, $rootScope) {
  $scope.flag = false;
  $scope.flag1 = true;
  $scope.flag = false;
  $scope.timeoutPromise = null;

  $scope.handleLink = function (pgname) {
    $rootScope.handleLink(pgname);
  };

  $scope.handleLinkWData = function (pgname,data) {
    $rootScope.handleLinkWData(pgname,data);
  };
  // handleLinkWData
  $scope.details = [];
  const token = sessionStorage.getItem("token");
  var config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };


  
  // $scope.form.aadhaarNumber = ''
  // console.log($scope.flag);
  $scope.timeoutPromise = null;

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

  //Fetching college table table
  $scope.collegeData = [];
  $scope.getClgData = function () {
    $http.get(path + "/api/v1/account/college", config).then(
      function successCallback(response) {
        // console.log(response.data);
        $scope.collegeData = response.data;
      },
      function errorCallback(response) {
        console.log("Error fetching colllege data");
      }
    );
  };
  $scope.getClgData();
  $scope.bindCollegeDscr = function (ClgCode) {
    // console.log(ClgCode)
    for (let i = 0; i < $scope.collegeData.length; i++) {
      const row = $scope.collegeData[i];

      if (ClgCode == row.collegeCode) {
        // console.log(row);
        return row.dscr;
      }
    }
  };

  $scope.fetchDepartmentdata = function () {
    $http.get(path + "/api/v1/account/department", config).then(
      function successCallback(response) {
        $scope.departmentData = response.data;
        //  console.log("department data", response.data)
      },
      function errorCallback(resopnse) {
        console.log("Error Fetching department data ");
      }
    );
  };

  $scope.fetchDepartmentdata();
  $scope.bindDepartmentDscr = function (depCode) {
    for (let i = 0; i < $scope.departmentData?.length; i++) {
      const row = $scope.departmentData[i];
      // console.log("dep Code", row)

      if (depCode == row.departmentCode) {
        return row.dscr;
        // break;
      }
    }
  };

  //Fetching caste data from the caste table
  $scope.getCastdata = function () {
    $http.get(path + "/api/v1/account/caste", config).then(
      function successCallback(response) {
        $scope.casteData = response.data;
      },
      function errorCallback(response) {
        console.log("Error fetching caste table data");
      }
    );
  };
  $scope.getCastdata();

  $scope.bindCastDscr = function (castCode) {
    if (castCode) {
      for (let i = 0; i < $scope.casteData?.length; i++) {
        const row = $scope.casteData[i];
        if (castCode == row.casteCode) {
          return row.dscr;
          // break;
        }
      }
    }
  };

  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  //This functionality is for shows the details of employee by Id
  $scope.studentDetail = {};
  $scope.showDetails = (univRegistrationNo) => {
    // console.log(univRegistrationNo)
    document.getElementById("detailmodal").style.display = "block";

    $http
      .get(`${path}/api/v1/account/student/${univRegistrationNo}`, config)
      .then(
        (res) => {
          //   $scope.studentDetail = convertCamelToReadable(res.data);
          $scope.studentDetail = res.data;
          console.log(res.data, $scope.studentDetail);
        },
        (err) => {
          console.error(err);
        }
      );
  };
  $scope.data = [];
  $scope.getdata = function () {
    $http
      .get(path + "/api/v1/account/students", config)
      .then(function (response) {
        $scope.data = response.data;
        console.log(response.data);
      });
  };

  $scope.getdata();

  $scope.searchF = function (
    uRegNo,
    rollNo,
    departmentCode,
    fullName,
    collegCode,
    dob,
    cc
  ) {
    var studentDto = {
      univRegistrationNo: uRegNo || null,
      collegeRollNo: rollNo || null,
      departmentCode: departmentCode || null,
      fullName: fullName || null,
      collegCode: collegCode || null,
      dob: dob || null,
      casteCode: cc || null,
    };

    console.log(">>>>>", studentDto);
    //Make the HTTP POST request to your API endpoint with the request data in the body
    $http
      .post(path + "/api/v1/account/student/search", studentDto, config)
      .then(
        function successCallback(response) {
          console.log(response);
          if (response.status === 200) {
            $scope.data = response.data;
            console.log("$scope.empData", response.data);
          } else {
            console.log(response.status);
          }
        },
        function errorCallback(error) {
          console.log("Unable to perform request", error);
        }
      );
  };

  $scope.ClgData = [];
  $scope.getCollege = function () {
    $http
      .get(path + "/api/v1/account/college", config)
      .then(function (response) {
        $scope.ClgData = response.data;
        //console.log("Department", response.data);
      });
  };
  $scope.getCollege();

  $scope.UniData = [];
  $scope.getUniversity = function () {
    $http
      .get(path + "/api/v1/account/university", config)
      .then(function (response) {
        $scope.UniData = response.data;
        //console.log("Department", response.data);
      });
  };
  $scope.getUniversity();

  $scope.StaffDesignation = [];
  $scope.getStaffDesignation = function () {
    $http
      .get(path + "/api/v1/account/staff/designation", config)
      .then(function (response) {
        $scope.StaffDesignation = response.data;
        // console.log("StaffDesignation", response.data);
      });
  };
  $scope.getStaffDesignation();

  $scope.StaffStatus = [];
  $scope.getStaffStatus = function () {
    $http
      .get(path + "/api/v1/account/staff/status", config)
      .then(function (response) {
        $scope.StaffStatus = response.data;
        //  console.log("StaffStatus", response.data);
      });
  };
  $scope.getStaffStatus();

  $scope.StaffType = [];
  $scope.getStaffType = function () {
    $http
      .get(path + "/api/v1/account/type/staff", config)
      .then(function (response) {
        $scope.StaffType = response.data;
        //  console.log("StaffType", response.data);
      });
  };
  $scope.getStaffType();

  $scope.Caste = [];
  $scope.getCaste = function () {
    $http.get(path + "/api/v1/account/caste", config).then(function (response) {
      $scope.Caste = response.data;
      //    console.log("Caste", response.data);
    });
  };
  $scope.getCaste();

  $scope.PhysicallyHandicapped = [];
  $scope.getPhysicallyHandicapped = function () {
    $http
      .get(path + "/api/v1/account/phyhandicapped", config)
      .then(function (response) {
        $scope.PhysicallyHandicapped = response.data;
        //console.log("PhysicallyHandicapped", response.data);
      });
  };
  $scope.getPhysicallyHandicapped();

  $scope.StaffSeparationType = [];
  $scope.getStaffSeparationType = function () {
    $http
      .get(path + "/api/v1/account/staff/separation", config)
      .then(function (response) {
        $scope.StaffSeparationType = response.data;
        //    console.log("StaffSeparationType", response.data);
      });
  };
  $scope.getStaffSeparationType();

  // $scope.StaffGrade = [];
  // $scope.getStaffGrade = function () {
  //   $http
  //     .get(path + "/api/v1/account/staff/designation",config)
  //     .then(function (response) {
  //       $scope.StaffGrade = response.data;
  //       //  console.log("StaffGrade", response.data);
  //     });
  // };
  // $scope.getStaffGrade();

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

  $scope.getdptDscr = function (n, departmentCode) {
    var dscr = null;
    for (var i = 0; i < n.length; i++) {
      var row = n[i];

      if (row.departmentCode === departmentCode) {
        dscr = row.dscr;
        break; // Exit the loop if a match is found
      }
    }
    return dscr;
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
    console.log(n);
    $scope.flag = true;
    var nObject = {
      univRegistrationNo: n.univRegistrationNo,
    };
    var url = "student.html?n=" + JSON.stringify(nObject);
    $scope.handleLinkWData('student',nObject);
    

  };

 

  $scope.search = function (keyword1, keyword2, keyword3) {
    var employeeDto = {
      staffNo: keyword1 || "",
      name: keyword2 || "",
      department: keyword3 || 0,
    };

    console.log(employeeDto);
    //Make the HTTP POST request to your API endpoint with the request data in the body
    $http
      .get(path + "/api/v1/account/search/employee", employeeDto, config)
      .then(
        function successCallback(response) {
          $scope.data = response.data;
          console.log("$scope.empData", $scope.data);
        },
        function errorCallback(error) {
          console.log("Unable to perform request", error);
        }
      );
  };
});
