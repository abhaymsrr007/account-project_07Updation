app.controller("empCtrl", function ($scope, $http, $window, $rootScope) {
  $scope.idDisable = false;
  $scope.timeoutPromise = null;
  $scope.formSubmitted = false;
  $rootScope.checkToken();
  const config = $rootScope.config;
  $scope.form = {};
  $scope.save = function () {
    // if ($scope.myform.$valid) {
    console.log($scope.form);
    $scope.form.departmentCode = parseInt($scope.form.departmentCode);
    $scope.form = ConvertToUpperCase($scope.form);
    $http.post(path + "/api/v1/account/employee", $scope.form, config).then(
      function (response) {
        if (response.status == 200) {
          $scope.form = {};
          $scope.getdata();
          $scope.formSubmitted = true;
          $scope.idDisable = false;

          toastr.success("Data saved successfully!", "Success");
        }
      },
      function errorCallback(response) {
        toastr.error("An error occurred while saving data.", "Error");
      }
    );
    // } else {
    //     if (!$scope.timeoutPromise) {
    //     toastr.error('Please fill in all required fields.', 'Error');
    //     $scope.timeoutPromise = $timeout(function () {
    //       $scope.timeoutPromise = null;
    //     }, 3000); // Adjust the timeout value as needed
    //   }
    // }
  };

  $scope.chkAadhar = function () {
    const aadhaar = $scope.form.aadhaar;

    // Clear the input field if it's not a valid numeric value
    if (isNaN(aadhaar)) {
      $scope.form.aadhaar = "";
      return;
    }

    // Check if Aadhaar number has exactly 12 digits
    if (aadhaar.length !== 12) {
      toastr.error("Please enter a 12-digit Aadhaar number");
      $scope.aadharflag = true;
      return;
    }

    // Define matrices for Aadhaar validation
    const D = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
      [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
      [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
      [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
      [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
      [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
      [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
      [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
      [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    ];
    const P = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
      [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
      [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
      [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
      [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
      [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
      [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
    ];

    // Perform Aadhaar validation calculation
    let c = 0;
    for (let i = aadhaar.length - 1; i >= 0; i--) {
      const imod8 = (aadhaar.length - 1 - i) % 8;
      const p = P[imod8][parseInt(aadhaar[i])];
      c = D[c][p];
    }

    // Check if Aadhaar number is valid
    if (c === 0) {
      $scope.aadharflag = false;
      // toastr.success("Valid Aadhaar number");
    } else {
      toastr.error("Invalid Aadhaar number");
      $scope.aadharflag = true;
    }
  };

  $scope.data = [];
  $scope.getdata = function () {
    $http
      .get(path + "/api/v1/account/employee/alldata", config)
      .then(function (response) {
        $scope.data = response.data;
        // console.log(response);
      });
  };

  $scope.getdata();

  $scope.Department = [];
  $scope.getDepartment = function () {
    $http
      .get(path + "/api/v1/account/department", config)
      .then(function (response) {
        $scope.Department = response.data;
        // console.log("Department", response.data);
      });
  };
  $scope.getDepartment();

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


  $scope.StaffDesignation = [];
  $scope.getStaffDesignation = function () {
    $http
      .get(path + "/api/v1/account/staff/designation", config)
      .then(function (response) {
        $scope.StaffDesignation = response.data;
        console.log("StaffDesignation", response.data);
      });
  };
  $scope.getStaffDesignation();

  


  $scope.collegeDscr = "";
  $scope.setCollegeDscr = function (ClgCode) {
    for (let i = 0; i < $scope.ClgData.length; i++) {
      const row = $scope.ClgData[i];
      if (ClgCode == row.collegeCode) {
        $scope.collegeDscr = row.shortName;
        break;
      }
    }

    return dscr;
  };

  $scope.universityDscr = "";
  $scope.setUniversityDscr = function (universityCode) {
    console.log(universityCode)
    if (universityCode) {
      for (let i = 0; i < $scope.UniData.length; i++) {
        const row = $scope.UniData[i];
        console.log(row)
        if (universityCode == row.universityCode) {
          $scope.universityDscr = row.shortName;
          break;
        }
      }
    }
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
  $scope.checkForDuplicate = function (staffNo) {
    console.log(staffNo);
    $http.get(path + `/api/v1/account/employee/${staffNo}`, config).then(
        function(response) {
            if (response.data.staffNo == staffNo) {
                $scope.duplicateCode = true;
            } else {
            }
          }).catch(function(error) {
            console.info("Duplicate info", error);
            $scope.duplicateCode = false;
        })   
};

  $scope.edit = function (n) {
  
    // console.log(n);
    $scope.idDisable = true;
    $scope.form = {
      staffNo: n.staffNo,
      salutation: n.salutation,
      firstName: n.firstName,
      middleName: n.middleName,
      lastName: n.lastName,
      fullName: n.fullName,
      sex: n.sex,
      dateOfBirth: n.dateOfBirth,
      dateOfJoiningUniversity: n.dateOfJoiningUniversity,
      dateOfJoiningCollege: n.dateOfJoiningCollege,
      dateOfJoiningDepartment: n.dateOfJoiningDepartment,
      gradeCode: n.gradeCode?.toString(),
      designationCode: n.designationCode?.toString(),
      separationDate: n.separationDate,
      epfAcNo: n.epfAcNo,
      nationality: n.nationality,
      maritalStatus: n.maritalStatus,
      addr1: n.addr1,
      addr2: n.addr2,
      addr3: n.addr3,
      city: n.city,
      state: n.state,
      pincode: n.pincode,
      country: n.country,
      pan: n.pan,
      aadhaarNumber: n.aadhaarNumber,
      bankIfscCode: n.bankIfscCode,
      bankAccountNo: n.bankAccountNo,
      bankName: n.bankName,
      bankBranch: n.bankBranch,
      bankCity: n.bankCity,
      bankCountry: n.bankCountry,
      departmentCode: n.departmentCode.toString(),
      collegeCode: n.collegeCode.toString(),
      universityCode: n.universityCode.toString(),
      staffStatusCode: n.staffStatusCode.toString(),
      staffTypeCode: n.staffTypeCode.toString(),
      casteCode: n.casteCode,
      phyHandicappedCode: n.phyHandicappedCode?.toString(),
      email: n.email,
      mobile: n.mobile,
      separationTypeCode: n.separationTypeCode?.toString(),
    };
  };

  $scope.update = function () {
    var data = $scope.form;
    var sl = data.staffNo;
    var url = path + "/api/v1/account/employee/data" + sl;

    $http.put(url, data, config).then(function (response) {
      $scope.form = {};
      $scope.getdata();
    });
  };

  $scope.getEmployeeByStaffNo = function (staffNo) {
    $http.get(`${path}/api/v1/account/employee/${staffNo}`, config).then(
      function successCallback(response) {
        if (response.status === 200) {
          $scope.edit(response.data);
          console.log("$scope.empData", $scope.data);
        } else {
          console.error("Backend Error!!!", response.status);
        }
      },
      function errorCallback(error) {
        console.log("Unable to perform request", error);
      }
    );
  };

  $scope.nObject = $rootScope.data;
  // console.log("ashhhh",$rootScope.data)
  // Log the 'nObject' variable
  // console.log('Value of n:', $scope.nObject);
  if ($rootScope.data) {
    console.log("Value of n:>>>>>>>", $rootScope.data);
    $scope.getEmployeeByStaffNo($rootScope.data.staffNo);
  }

  $scope.handleLink = function (pgname) {
    $rootScope.handleLink(pgname);
    $rootScope.data = '';
  };
});
