
      app.controller(
        "podetailsfaltuCtrl",
        function ($scope, $http, $window, $rootScope) {
          $scope.data = {};
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

          $scope.fetchPoByPk = (poNo, poFinYear) => {
            $http
              .get(
                path+`/api/v1/account/po/${poNo}/${poFinYear}`,config
              )
              .then(
                (res) => {
                  console.log(res);
                  $scope.data = res.data;
                },
                (err) => {
                  console.log(err);
                }
              );
          };
          // Function to get the value of a query parameter by name
          function getQueryParam(name) {
            const urlParams = new URLSearchParams(window.location.search);
            const paramValue = urlParams.get(name);
            try {
              // Attempt to parse the JSON string into an object
              return JSON.parse(paramValue);
            } catch (error) {
              // Handle any parsing errors (e.g., invalid JSON)
              console.error(`Error parsing query parameter '${name}':`, error);
              return null; // Return null or an appropriate default value
            }
          }
          // Get the 'n' object from the query parameter
          $scope.nObject = getQueryParam("n");
          // Log the 'nObject' variable
          console.log("Value of n:", $scope.nObject);
          $scope.poIdDisable = false;
          if ($scope.nObject) {
            $scope.fetchPoByPk($scope.nObject.poId, $scope.nObject.poFinYear);
            $scope.poIdDisable = true;
          }
        }
      );
 
