app.controller(
  "proPlanCustDetCtrl",
  function ($scope, $http, $timeout, $window, $rootScope, $filter) {
    $scope.details = $rootScope.details; 
    $rootScope.checkToken();
    const config = $rootScope.config;

    $scope.handleLink = function (p) {
      $rootScope.handleLink(p);
    };
    $scope.handleLinkWData = function (p, data) {
      $rootScope.handleLinkWData(p, data);
    };

    $scope.timeoutPromise = null;
    $scope.uniquePlanNos = [];
    $scope.projectPlanCostData = [];
    (function getProjectPlan() {
      $http.get(path + "/api/v1/account/costCentre/alldata", config).then(
        function (response) {
          $scope.projectPlanCostData = response.data;
          console.log("response.data", response.data);

          var uniqueData = {};
          angular.forEach($scope.projectPlanCostData, function (item) {
            if (!uniqueData.hasOwnProperty(item.planNo)) {
              uniqueData[item.planNo] = item;
            }
          });

          var uniqueCollegeCodes = {};
          for (var j = 0; j < $scope.projectPlanCostData.length; j++) {
            var currentCollegeCode = $scope.projectPlanCostData[j].collegeCode;
            if (!uniqueCollegeCodes[currentCollegeCode]) {
              uniqueCollegeCodes[currentCollegeCode] = {
                collegeCode: currentCollegeCode,
              };
            }
          }
          var uniqueCollegeCodesArray = Object.values(uniqueCollegeCodes);

          var uniquePlanTypeCode = {};
          for (var j = 0; j < $scope.projectPlanCostData.length; j++) {
            var currentPlanCode = $scope.projectPlanCostData[j].planTypeCode;
            if (!uniquePlanTypeCode[currentPlanCode]) {
              uniquePlanTypeCode[currentPlanCode] = {
                planTypeCode: currentPlanCode,
              };
            }
          }
          var uniquePlanCodesArray = Object.values(uniquePlanTypeCode);

          $scope.c = uniquePlanCodesArray;
          $scope.u = uniqueCollegeCodesArray;
          $scope.uniquePlanNos = uniqueData;
          console.log("project plan Cost Data1>>>>>>>", $scope.uniquePlanNos);
          console.log("unique college codes ", $scope.u);
          console.log("unique PlanType codes", $scope.c);
        },
        function errorCallback(response) {
          console.log("error");
        }
      );
    })();

    $scope.searchInDtails = function (
      planNo,
      planTypeCode,
      approvingAuthority,
      executingAuthority,
      collegeCode
    ) {
      console.log(
        planNo,
        planTypeCode,
        approvingAuthority,
        executingAuthority,
        collegeCode
      );
      var projectPlanDetail = {
        planNo: planNo || null,
        planTypeCode: planTypeCode || null,
        approvingAuthority: approvingAuthority || null,
        executingAuthority: executingAuthority || null,
        collegeCode: collegeCode || null,
      };
      console.log("k>>>>>", projectPlanDetail);
      var path1 = path + "/api/v1/account/costCentre/search";
      console.log("plan no", planNo);
      $http.post(path1, projectPlanDetail, config).then(
        (res) => {
          $scope.projectPlanCostData = res.data;
          console.log("projectPlanCostData ", $scope.projectPlanCostData);
        },
        (err) => {
          console.log("Data Not fetch", err);
        }
      );
    };

    $scope.closeDetail = () => {
      document.getElementById("detailmodal").style.display = "none";
    };

    var modal = document.getElementById("detailmodal");
    var closeBtn = document.getElementById("closeBtn");

    // Add an event listener for the "Escape" key press
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        modal.style.display = "none"; // Hide the modal when "Escape" key is pressed
      }
    });

    // Add an event listener for the close button
    closeBtn.addEventListener("click", function () {
      modal.style.display = "none"; // Hide the modal when the close button is clicked
    });

    // $scope.showDetails = function (bankPvId, finyear) {
    //       document.getElementById("detailmodal").style.display = "block";
    //       $http.get(path+`/api/v1/account/bpv/${bankPvId}/${finyear}`,config)
    //           .then(function successCallback(response) {
    //               console.log("sanction data", response.data)
    //               $scope.bankpay = convertCamelToReadable(response.data);
    //           },
    //               function errorCallback(response) {
    //                   console.log("Unable to update  request");
    //               });
    //   }

    $scope.isDisable = false;
    $scope.projectPlanCustDetail = [];
    $scope.showDetails = (n) => {
      $scope.isDisable = true;
      const nObject = {
        planNo: n.planNo,
        planFinYear: n.planFinYear,
        planTypeCode: n.planTypeCode,
        collegeCode: n.collegeCode,
        isDisable:$scope.isDisable
      };
      $rootScope.handleLinkWData("project-plan-custodians-view", nObject);
    
    };

    $scope.collegeData = [];
    (function getCollagedata() {
      $http.get(path + "/api/v1/account/college", config).then(
        function successCallback(response) {
          $scope.collegeData = response.data;
          console.log("Collage Data>>>>>>>>>>>>>>>>>", $scope.collegeData);
        },
        function errorCallback(response) {
          console.log("Error fetching colllege data");
        }
      );
    })();

    $scope.universityData = [];
    (function getUniversitydata() {
      $http.get(path + "/api/v1/account/university", config).then(
        function successCallback(response) {
          $scope.universityData = response.data;
          console.log(
            "university Data>>>>>>>>>>>>>>>>>",
            $scope.universityData
          );
        },
        function errorCallback(response) {
          console.log("Error fetching university data");
        }
      );
    })();

    $scope.accountType = [];
    (function getAccountdata() {
      $http.get(path + "/api/v1/account/acctype", config).then(
        function successCallback(response) {
          $scope.accountType = response.data;
          console.log("Account Data>>>>>>>>>>>>>>>>>", $scope.accountType);
        },
        function errorCallback(response) {
          console.log("Error fetching Account data");
        }
      );
    })();

    $scope.setClgName = function (clgCode) {
      for (let index = 0; index < $scope.collegeData.length; index++) {
        const element = $scope.collegeData[index];
        if (element.collegeCode === clgCode) {
          // console.log(">>>>>>>>>>>>>>>>>>>>>>",element)
          return element.dscr;
        }
      }
    };

    $scope.setUniName = function (uniCode) {
      for (let index = 0; index < $scope.universityData.length; index++) {
        const element = $scope.universityData[index];
        if (element.universityCode === uniCode) {
          // console.log(">>>>>>>>>>>>>>>>>>>>>>",element)
          return element.dscr;
        }
      }
    };

    $scope.edit = function (n) {
      const nObject = {
        planNo: n.planNo,
        planFinYear: n.planFinYear,
        planTypeCode: n.planTypeCode,
        collegeCode: n.collegeCode,
      };
      $rootScope.handleLinkWData("project-plan-custodians", nObject);
    };
  }
);
