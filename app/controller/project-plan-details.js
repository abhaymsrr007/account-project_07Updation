app.controller(
  "proPlanDetsCtrl",
  function ($scope, $http, $timeout, $window, $rootScope) {
    $scope.timeoutPromise = null;
    $scope.projectPlan = [];
    $scope.details = [];
    const token = $window.sessionStorage.getItem("token");
    var config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    $scope.getProjectPlan = function () {
      $http.post(path + "/api/v1/account/projectplan-search", {}, config).then(
        function successCallback(res) {
          $scope.projectPlan = res.data.map((obj) =>
            convertKeysToCamelCase(obj)
          );
          console.log(">>>>>>>>>>>>>1", res.data);
          console.log(">>>$scope.projectPlan1", $scope.projectPlan);
        }
        ).catch(
        function errorCallback(response) {
          console.log("error ",response);
        }
      )
    };
    $scope.getProjectPlan();
    $scope.setPlanTitle = function (planno) {
      console.log(planno);
      planno
        ? $scope.projectPlan.map((x) => {
            x.planNo == planno ? ($scope.planTitle = x.planTitle) : "";
          })
        : "";
    };
    // $scope.getPlanCostCenterData = function () {
    //   console.log(cccode)
    //   return "Abhay"
    //   // planno ? $scope.projectPlan.map(x=>{x.planNo ==planno?$scope.planTitle=x.planTitle:""}) : ""
    //   $http.get(path+"/api/v1/account/cost", config)
    //     .then(function successCallback(response) {
    //       console.log("pccdscr333>>>", response)
    //       console.log("pccdscr>>>", $scope.pccdscr)
    //     }, function errorCallback(erroe) {
    //       console.log("custdion detail not fetch")
    //     })
    // }
    $scope.searchF = function (
      planno,
      planfinyear,
      plantype,
      plantitle,
      plan_owner_cost_center_code,
      college
    ) {
      const projectPlanDetail = {
        planNo: planno || null,
        planFinYear: planfinyear || null,
        planTypeCode: plantype || null,
        planTitle: plantitle?.toUpperCase() || null,
        costCenterCode: plan_owner_cost_center_code?.toUpperCase() || null,
        collegeCode: college || null,
      };
      console.log("k>>>>>", projectPlanDetail);
      const path = path + "/api/v1/account/projectplan-search";
      $http.post(path, projectPlanDetail, config).then(
        (res) => {
          // $scope.projectplandata = res.data;
          // $scope.projectPlan = res.data;
          $scope.projectPlan = res.data.map((obj) =>
            convertKeysToCamelCase(obj)
          );
          console.log(">>>>>>>>>>>>>", res.data);
          console.log(">>>$scope.projectPlan", $scope.projectPlan);
        },
        (err) => {
          console.log(err);
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
    $scope.projectPlanDetails = {};
    $scope.showDetails = (planNo, planFinYear, planTypeCode) => {
      document.getElementById("detailmodal").style.display = "block";
      $http
        .get(
          `${path}/api/v1/account/projectplan/${planNo}/${planFinYear}/${planTypeCode}`,
          config
        )
        .then(
          (res) => {
            $scope.projectPlanDetails = convertCamelToReadable(res.data);
            console.log($scope.projectPlanDetails);
          },
          (err) => {
            console.error(err);
          }
        );
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

    $scope.setClgName = function (clgCode) {
      for (let index = 0; index < $scope.collegeData.length; index++) {
        const element = $scope.collegeData[index];
        if (element.collegeCode === clgCode) {
          // console.log(">>>>>>>>>>>>>>>>>>>>>>",element)
          return element.dscr;
        }
      }
    };
    $scope.goBack = function () {
      window.history.back();
    };
    $scope.edit = function (n) {
      console.log(n);
      $rootScope.handleLinkWData("project-plan", n);
      // var url = "project-plan.html?n=" + JSON.stringify(nObject);
      // window.open(url, "_blank");
    };
  }
);
