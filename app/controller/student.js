app.controller("studentCtrl", function ($scope, $window, $http, $rootScope) {
  $scope.flag = false;
  $scope.flag1 = true;
  // $scope.form.aadhaarNumber = ''
  // console.log($scope.flag);
  $scope.timeoutPromise = null;
  if ($rootScope.isLoggedIn) {
    $window.href = "index.html";
  }
  $rootScope.isLoggedIn ? ($window.href = "index.html") : "";
  $scope.details = $rootScope.details;
  const config = $rootScope.config;
  $scope.data = [];

  $scope.form = {};
  $scope.save = function () {
    // if ($scope.myform.$valid) {
    // console.log("s",$scope.form);
    $scope.form = ConvertToUpperCase($scope.form);
    // console.log("s",$scope.form);
    $http.post(path + "/api/v1/account/student", $scope.form, config).then(
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

  $scope.collegeDscr = "";
  $scope.setCollegeDscr = function (ClgCode) {
    for (let i = 0; i < $scope.ClgData.length; i++) {
      const row = $scope.ClgData[i];
      if (ClgCode == row.collegeCode) {
        $scope.collegeDscr = row.shortName;
        break;
      }
    }
  };

  $scope.universityDscr = "";
  $scope.setUniversityDscr = function (universityCode) {
    console.log(universityCode);
    if (universityCode) {
      for (let i = 0; i < $scope.UniData.length; i++) {
        const row = $scope.UniData[i];
        console.log(row);
        if (universityCode == row.universityCode) {
          $scope.universityDscr = row.shortName;
          break;
        }
      }
    }
  };

  $scope.getdata = function () {
    $http
      .get(path + "/api/v1/account/students", config)
      .then(function (response) {
        $scope.data = response.data;
        // console.log("innner  $scope.data",$scope.data);
      });
  };
  $scope.getdata();

  $scope.Department = [];
  $scope.getDepartment = function () {
    $http
      .get(path + "/api/v1/account/department", config)
      .then(function (response) {
        $scope.Department = response.data;
        console.log("Department", response.data);
      });
  };
  $scope.getDepartment();

  $scope.ClgData = [];
  $scope.getCollege = function () {
    $http
      .get(path + "/api/v1/account/college", config)
      .then(function (response) {
        $scope.ClgData = response.data;
        console.log("ClgData", response.data);
      });
  };
  $scope.getCollege();

  $scope.UniData = [];
  $scope.getUniversity = function () {
    $http
      .get(path + "/api/v1/account/university", config)
      .then(function (response) {
        $scope.UniData = response.data;
        console.log("UniData", response.data);
      });
  };
  $scope.getUniversity();

  $scope.handleLink = function (pgname) {
    $rootScope.handleLink(pgname);
  };

  $scope.Caste = [];
  $scope.getCaste = function () {
    $http.get(path + "/api/v1/account/caste", config).then(function (response) {
      $scope.Caste = response.data;
      console.log("Caste", response.data);
    });
  };
  $scope.getCaste();

  $scope.PhysicallyHandicapped = [];
  $scope.getPhysicallyHandicapped = function () {
    $http
      .get(path + "/api/v1/account/phyhandicapped", config)
      .then(function (response) {
        $scope.PhysicallyHandicapped = response.data;
        console.log("PhysicallyHandicapped", response.data);
      });
  };
  $scope.getPhysicallyHandicapped();

  $scope.StuSeparation = [];
  $scope.getStudentSeparationType = function () {
    $http
      .get(path + "/api/v1/account/stuseptype", config)
      .then(function (response) {
        $scope.StuSeparation = response.data;
        console.log("StudentSeparationType", response.data);
      });
  };
  $scope.getStudentSeparationType();

  $scope.StudentProgram = [];
  $scope.getstudentProgram = function () {
    $http
      .get(path + "/api/v1/account/studentprogram", config)
      .then(function (response) {
        $scope.StudentProgram = response.data;
        console.log("StudentProgram", response.data);
      });
  };
  $scope.getstudentProgram();

  $scope.SemesterSystem = [];
  $scope.getsemesterSystem = function () {
    $http
      .get(path + "/api/v1/account/semsys", config)
      .then(function (response) {
        $scope.SemesterSystem = response.data;
        console.log("SemesterSystem", response.data);
      });
  };
  $scope.getsemesterSystem();

  //to fetch the University description from college Table

  // $scope.getUniDscr = function (n, universityCode) {
  //   // console.log("University", n, universityCode);
  //   var dscr = null;
  //   for (var i = 0; i < n.length; i++) {
  //     var row = n[i];
  //     console.log(row, i);
  //     if (row.universityCode === universityCode) {
  //       // console.log(row.dscr);
  //       dscr = row.dscr;
  //       break; // Exit the loop if a match is found
  //     }
  //   }

  //   return dscr;
  // };

  // $scope.getcllgDscr = function (n, collegeCode) {
  //   //console.log("data2", n, collegeCode);
  //   var dscr = null;
  //   for (var i = 0; i < n.length; i++) {
  //     var row = n[i];
  //     // console.log(row, i);
  //     if (row.collegeCode === collegeCode) {
  //       // console.log(row.dscr);
  //       dscr = row.dscr;
  //       break; // Exit the loop if a match is found
  //     }
  //   }
  //   return dscr;
  // };
  $scope.departmentDscr = "";
  $scope.setDepartmentDscr = function (departmentCode) {
    console.log("department code", departmentCode);
    if (departmentCode) {
      for (var i = 0; i < $scope.Department.length; i++) {
        var row = $scope.Department[i];
        // console.log(row, i);
        if (row.departmentCode == departmentCode) {
          // console.log(row.dscr);
          $scope.departmentDscr = row.dscr;
          break; // Exit the loop if a match is found
        }
      }
    }
  };

  $scope.getCasteDscr = function (n, casteCode) {
    //console.log("Caste Data", n, casteCode);
    var dscr = null;
    for (var i = 0; i < n.length; i++) {
      var row = n[i];
      //console.log(row, i);
      if (row.casteCode === casteCode) {
        // console.log(row.dscr);
        dscr = row.dscr;
        break; // Exit the loop if a match is found
      }
    }
    return dscr;
  };

  $scope.getPhysicallyHDscr = function (n, phyHandicappedCode) {
    console.log("PhysicallyHandicapped  Data", n, phyHandicappedCode);
    var dscr = null;
    for (var i = 0; i < n.length; i++) {
      var row = n[i];
      console.log("row , i", row, i);
      if (row.phyHandicappedCode === phyHandicappedCode) {
        // console.log(row.dscr);
        dscr = row.dscr;
        break; // Exit the loop if a match is found
      }
    }
    return dscr;
  };

  $scope.getStuProgramDscr = function (n, studentProgramCode) {
    //console.log("studentProgram Data", n, studentProgramCode);
    var dscr = null;
    for (var i = 0; i < n.length; i++) {
      var row = n[i];
      // console.log(row, i);
      if (row.studentProgramCode === studentProgramCode) {
        //  console.log(row.dscr);
        dscr = row.dscr;
        break; // Exit the loop if a match is found
      }
    }
    return dscr;
  };

  $scope.getStuSeparationDscr = function (n, stuSeparationTypeCode) {
    //console.log("StuSeparation Data", n, stuSeparationTypeCode);
    var dscr = null;
    for (var i = 0; i < n.length; i++) {
      var row = n[i];
      // console.log(row, i);
      if (row.stuSeparationTypeCode === stuSeparationTypeCode) {
        // console.log(row.dscr);
        dscr = row.dscr;
        break; // Exit the loop if a match is found
      }
    }
    return dscr;
  };

  $scope.getSemesterSystemDscr = function (n, semesterSystemCode) {
    // console.log("StuSeparation Data", n, semesterSystemCode);
    var dscr = null;
    for (var i = 0; i < n.length; i++) {
      var row = n[i];
      //console.log(row, i);
      if (row.semesterSystemCode === semesterSystemCode) {
        // console.log(row.dscr);
        dscr = row.dscr;
        break; // Exit the loop if a match is found
      }
    }
    return dscr;
  };
  
  $scope.checkForDuplicate = function(univRegistrationNo) {
    $http.get(path + `/api/v1/account/student/${univRegistrationNo}`, config).then(
        function(response) {
            if (response.data.univRegistrationNo == univRegistrationNo) {
                $scope.duplicateCode = true;
            } else {
            }
          }).catch(function(error) {
            console.log("Error fetching data from Student", error);
            $scope.duplicateCode = false;
        })   
};

  $scope.flag = false;
  $scope.edit = function (n) {
    $scope.flag = true;
    console.log("You r in Edit", n);
   
    $scope.form = {
      univRegistrationNo: n.univRegistrationNo,
      univRollNumber: n.univRollNumber,
      collegeAdmissionNo: n.collegeAdmissionNo,
      collegeRollNo: n.collegeRollNo,
      salutation: n.salutation,
      firstName: n.firstName,
      middleName: n.middleName,
      lastName: n.lastName,
      fullName: n.fullName,
      sex: n.sex,
      dob: n.dob,
      dojUniversity: n.dojUniversity,
      dojCollege: n.dojCollege,
      dojDepartment: n.dojDepartment,
      nationality: n.nationality,
      addr1: n.addr1,
      addr2: n.addr2,
      addr3: n.addr3,
      city: n.city,
      state: n.state,
      pin: n.pin,
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
      studentProgramCode: n.studentProgramCode.toString(),
      studentYear: n.studentYear,
      semesterSystemCode: n.semesterSystemCode.toString(),
      casteCode: n.casteCode.toString(),
      phyHandicappedCode: n.phyHandicappedCode.toString(),
      email: n.email,
      mobile: n.mobile,
      separationTypeCode: n.separationTypeCode,
      stuSeparationTypeCode: n.stuSeparationTypeCode,
      stuSeparationDate: n.stuSeparationDate,
    };

  };

  $scope.update = function () {
    var data = $scope.form;
    var sl = data.univRegistrationNo;
    var url = path + "/api/v1/account/student/data" + sl;

    $http.put(url, data, config).then(function (response) {
      $scope.form = {};
      $scope.getdata();
    });
  };

  $scope.getStudentByUregNo = function (univRegistrationNo) {
    var url = `${path}/api/v1/account/student/${univRegistrationNo}`;
    $http.get(url, config).then(function (response) {
      console.log(response.data);
      $scope.form = response.data;
      $scope.form.departmentCode = response.data.departmentCode?.toString();
      $scope.form.collegeCode = response.data.collegeCode?.toString();
      $scope.form.universityCode = response.data.universityCode?.toString();
      $scope.form.studentProgramCode =
        response.data.studentProgramCode?.toString();
      $scope.form.casteCode = response.data.casteCode?.toString();
      $scope.form.phyHandicappedCode =
        response.data.phyHandicappedCode?.toString();
      $scope.form.stuSeparationTypeCode =
        response.data.stuSeparationTypeCode?.toString();

        $scope.setCollegeDscr($scope.form.collegeCode);
        $scope.setDepartmentDscr($scope.form.departmentCode);
        $scope.setUniversityDscr($scope.form.universityCode);
    });
  };
  console.log("Value of n:", $rootScope.data);
  if ($rootScope.data) {
    console.log("Value of n:>>>>>>>", $rootScope.data);
    $scope.getStudentByUregNo($rootScope.data.univRegistrationNo);
   
  }
});
