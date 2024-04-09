app.controller(
  "mgrJounalVouchDataCtrl",
  function ($scope, $http, $timeout, $window, $rootScope, $filter, $location) {
    $scope.details = [];
    const token = $window.sessionStorage.getItem("token");
    const userDetailsJSON = $window.sessionStorage.getItem("userDetails");

    if ((userDetailsJSON && token != null) || token != "") {
      $scope.details = angular.copy(JSON.parse(userDetailsJSON));
    } else {
      $window.location.href = "index.html";
    }

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      }
    };

    $scope.handleInitialClick = function (s) {
      $scope.handleClick(s);
    };

    $scope.handleLink = function (pgname) {
      $rootScope.handleLink(pgname);
    };
    // $scope.tabToggleJv = function (id) {
    //   $rootScope.tabToggle(id);
    // };

    $scope.tabToggleJv = function (id) {
      $('.tablink').removeClass('active');
      $(".maintabsec").removeClass('active');
      // $("#tab" + id).addClass('active');
      // $("#t" + id).addClass('active');
  }

    $scope.sdata = [];
    $scope.handleClick = function (s) {
      $scope.status = s;
      $scope.sdata = [];
      for (var a = 0; a < $scope.journaldetailData.length; a++) {
        if ($scope.journaldetailData[a].voucherStatusCode === s) {
          $scope.sdata.push($scope.journaldetailData[a]);
        }
      }
      console.log("sdata", $scope.sdata);
    };

    $scope.journaldetailData = [];
    var uniqueAccountCodes = [];
    $scope.getProjectPlan = function () {
      $http.get(path + "/api/v1/account/journelvoucher", config).then(
        function (response) {
          $scope.journaldetailData = response.data;
          console.log("$scope.journaldetailData", $scope.journaldetailData);
        },
        function errorCallback(response) {
          console.log("error");
        }
      );
    };
    $scope.getProjectPlan();

    $scope.jvData = [];
    $scope.searchInDtails = function (
      jvId,
      jIdDate,
      jvFinYear,
      narration,
      asssistantStaffNo,
      voucherStatusCode,
      jvNo,
      jDate
    ) {
      let dd = jIdDate?.substring(0, 2);
      let mm = jIdDate?.substring(2, 6);
      let yyyy = jIdDate?.substring(6, 10);

      let jvIdDate = jIdDate ? yyyy + mm + dd : null;

      let dd1 = jDate?.substring(0, 2);
      let mm1 = jDate?.substring(2, 6);
      let yyyy1 = jDate?.substring(6, 10);

      let jvDate = jDate ? yyyy1 + mm1 + dd1 : null;

      console.log(
        jvId,
        jIdDate,
        jvFinYear,
        narration,
        voucherStatusCode,
        asssistantStaffNo,
        jvNo,
        jDate
      );
      var JvDetail = {
        jvId: jvId || null,
        jvIdDate: jIdDate ? jIdDate : null,
        jvFinYear: jvFinYear || null,
        narration: narration || null,
        voucherStatusCode: voucherStatusCode || null,
        asssistantStaffNo: asssistantStaffNo || null,
        jvNo: jvNo || null,
        jvDate: jDate ? jDate : null,
      };
      console.log("k>>>>>", JvDetail);
      var path1 = path + "/api/v1/account/journelvoucher/search";
      $http.post(path1, JvDetail, config).then(
        (res) => {
          $scope.journalVData = res.data;
          console.log("JvDetail ", $scope.journalVData);
        },
        (err) => {
          console.log("Data Not fetch", err);
        }
      );
    };

    $scope.suuplierdetail = [];
    $scope.bankpay = [];

    $scope.isDisable = 0;
    $scope.showDetails = function (n) {
      $scope.isDisable = 1;
      var nObject = {
        bankPvId: n.bankPvId,
        finYear: n.finYear,
        isDisable: $scope.isDisable,
      };
      window.location.href =
        "bank-payment-voucher.html?n=" + btoa(JSON.stringify(nObject));
    };

    $scope.filterForStatusAandC = (item) => {
      return item.voucherStatusCode === "C" || item.voucherStatusCode === "A";
    };

    $scope.timeoutPromise = null;
    $scope.data = [];
    $scope.bPvData = [];
    $scope.getdata = function () {
      $http
        .get(path + "/api/v1/account/journelvoucher", config)
        .then(function (response) {
          $scope.journalVData = response.data;
          console.table("journelvoucher", response.data);
        });
    };
    $scope.getdata();

    // $scope.closeDetail = () => {
    //   document.getElementById("detailmodal").style.display = "none";
    // };

    var modal = document.getElementById("detailmodal");
    var closeBtn = document.getElementById("closeBtn");
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        modal.style.display = "none";
      }
    });

    $scope.delete = function (bankPvId, finyear) {
      $http
        .delete(path + `/api/v1/account/bpv/${bankPvId}/${finyear}`, config)
        .then(
          function successCallback(response) {
            $("#deletemodal").modal("hide");
            console.log(response.data);
            toastr.success("Data Deleted Successfully", "Congratulations");
          },
          function errorCallback(response) {
            console.log("Unable to update  request");
          }
        );
    };

    // $scope.edit = function (n) {
    //   var nObject = {
    //     bankPvId: n.bankPvId,
    //     finYear: n.finYear,
    //   };
    //   window.location.href = 'journal-voucher.html?n=' + btoa(JSON.stringify(nObject));;
    // }

    $scope.edit = function (n, index) {
      console.log("edit", index);
      var nObject = {
        planNo: n.planNo,
        planFinYear: n.planFinYear,
        planTypeCode: n.planTypeCode,
        jvDetSlno: n.jvDetSlno,
        jvId: n.jvId,
        accountCode: n.accountCode,
      };
      // var url ="journal-voucher.html?n=" + JSON.stringify(nObject,index);
      var url =
        "journal-voucher.html?n=" +
        encodeURIComponent(JSON.stringify(nObject)) +
        "&index=" +
        index;
      window.open(url, "_blank");
    };

    $scope.confirmDeleteC = function (p) {
      $scope.DeleteData = p;
      document.getElementById("deletemodal").style.display = "block";
      $("#deletemodal").modal("show");
    };

    $scope.closeDeletebtn = () => {
      document.getElementById("deletemodal").style.display = "none";
    };
    var modal = document.getElementById("deletemodal");
    var closeBtn = document.getElementById("closeBtn");

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        modal.style.display = "none";
      }
    });
    $scope.goBack = function () {
      window.history.back();
    };
  }
);
