      app.filter('unique', function() {
        return function(collection, keyname) {
        var output = [], 
            keys = [];
          angular.forEach(collection, function(item) {
              var key = item[keyname];
              if (keys.indexOf(key) === -1) {
                  keys.push(key);
                  output.push(item);
              }
          });

          return output;
      };
  });

app.controller("journal-voucher-detailsCtrl", function ($scope, $http, $timeout, $window, $rootScope, $filter) {
        var token;
          const userDetailsJSON = $window.sessionStorage.getItem('userDetails');
          if (userDetailsJSON) {
            const userDetails = JSON.parse(userDetailsJSON);
            if (userDetails.token!=null || userDetails.token!=''){
              $scope.details=angular.copy(userDetails);
              token=$scope.details.token;
            }
          } else {
            $window.location.href = "login.html";
            console.log('User details not found in sessionStorage');
          }
          $scope.logout = function() {
            $window.sessionStorage.removeItem('userDetails');
            $window.location.href = 'login.html';
          }; 

            var config = {
                headers: {
                'Authorization': 'Bearer ' + token
                  },   
                };


          $scope.journaldetailData=[];
          var uniqueAccountCodes = [];
          (function getProjectPlan() {
            $http.get(path+"/api/v1/account/journelvoucher",config)
              .then(function (response) {
                $scope.journaldetailData = response.data;                    
      
                // $scope.journaldetailData.forEach(function (item) {
                //   if (uniqueAccountCodes.indexOf(item.accountCode) === -1) {
                //     uniqueAccountCodes.push(item.accountCode);
                //   }
                // });
                //   console.log("uniqueAccountCodes",uniqueAccountCodes); 
                  console.log("$scope.journaldetailData",$scope.journaldetailData); 
                },
                function errorCallback(response) {
                  console.log("error");
                }
              );
          })();

   
          $scope.jvData=[];
          $scope.searchInDtails = function (jvId,jvDate,jvFinYear,narration,asssistantStaffNo,voucherStatusCode) {
          
                let dd = jvDate?.substring(0, 2);
                let mm = jvDate?.substring(2, 6);
                let yyyy = jvDate?.substring(6, 10);

                let  jvIdDate  = jvDate ? yyyy + mm + dd : null;

            console.log(jvId,jvIdDate,jvFinYear,narration,voucherStatusCode,asssistantStaffNo)
            var JvDetail = {
              jvId: jvId || null,
              jvIdDate: jvIdDate ? jvIdDate : null,   
              jvFinYear: jvFinYear || null,
              narration: narration || null,
              voucherStatusCode: voucherStatusCode || null,
              asssistantStaffNo: asssistantStaffNo || null,
            };
            console.log("k>>>>>", JvDetail);
            var path1 = path+"/api/v1/account/journelvoucher/search";
            $http.post(path1,JvDetail,config).then((res) => {
                $scope.journaldetailData = res.data;
                console.log("JvDetail ",$scope.journaldetailData);
              },
              (err) => {
                console.log("Data Not fetch",err);
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

          // $scope.journalShow = {};
          // $scope.showDetails = (jvId,index) => {
          //   document.getElementById("detailmodal").style.display = "block";   
          //   $http.get(path+`/api/v1/account/journelvoucherdetailData/${jvId}`,config)              
          //   .then( (res) => {
          //         $scope.journalShow = res.data;
          //         console.log("$scope.journalShow",$scope.journalShow);
          //       }, (err) => {
          //         console.error(err);
          //       }
          //     );
          // };

  

          $scope.edit = function (n,index) {
            console.log("edit",index)
            var nObject = {
              planNo: n.planNo,
              planFinYear: n.planFinYear,
              planTypeCode:n.planTypeCode,
              jvDetSlno:n.jvDetSlno,
              jvId:n.jvId,
              accountCode:n.accountCode,
            };
            // var url ="journal-voucher.html?n=" + JSON.stringify(nObject,index);
            var url = "journal-voucher.html?n=" + encodeURIComponent(JSON.stringify(nObject)) + "&index=" + index;
            window.open(url, "_blank");
          }; 


          $scope.showDetails = function (n,index) {
            console.log("edit",index)
            var nObject = {
              planNo: n.planNo,
              planFinYear: n.planFinYear,
              planTypeCode:n.planTypeCode,
              jvDetSlno:n.jvDetSlno,
              jvId:n.jvId,
              accountCode:n.accountCode,
            };
            // var url ="journal-voucher.html?n=" + JSON.stringify(nObject,index);
            var url = "journal-voucher-view.html?n=" + encodeURIComponent(JSON.stringify(nObject)) + "&index=" + index;
            window.open(url, "_blank");
          }; 
          $scope.goBack = function () {
        window.history.back();
      }
        });

