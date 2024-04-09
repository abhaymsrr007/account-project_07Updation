app.controller(
  "glaccountmasterCtrl",
  function ($scope, $http, $timeout, $window, $rootScope, $filter) {
    $scope.timeoutPromise = null;
    $scope.idDisable = false;

    $rootScope.checkToken();
    const config = $rootScope.config;
    //To persist data in gl Account master table
    $scope.save = function () {
      if ($scope.myform.$valid) {
        $(".loaderbg").show();  
        $http.post(path + "/api/v1/account/glgroup", $scope.form, config).then(
          function successCallback(response) {
            // console.log(response);
            if (response.status == 200) {
              $scope.idDisable = false;
                $scope.form.dscr = "";
                $scope.form.glGroupCode = "";
                $scope.formSubmitted = true;
                toastr.success("Data saved successfully!", "Success");
                $scope.form = {operative:'Y'};
                $scope.getdata();
                $(".loaderbg").hide();  
            }
          },
          function errorCallback(response) {
            $(".loaderbg").hide(); 
            toastr.error("An error occurred while saving data.", "Error");
            console.log(response)
          }
        );
      } else {
        if (!$scope.timeoutPromise) {
          toastr.error("Please fill in all required fields.", "Error");
          $(".loaderbg").hide(); 
          $scope.timeoutPromise = $timeout(function () {
            $scope.timeoutPromise = null;
          }, 3000); // Adjust the timeout value as needed
        }
      }
    };

    // Fetching data from gl account master table
    $scope.glgroupData = [];
    $scope.getdata = function () {
        $(".loaderbg").show();  
      $http.get(path + "/api/v1/account/glgroup", config).then(
        function (response) {
        $(".loaderbg").hide();  

          $scope.glgroupData = response.data;
        },
        function (response) {
          $(".loaderbg").show();  
          console.log("Error fetching data from gl account master", response);
        }
      );
    };
    $scope.getdata();

    $scope.checkForDuplicate = function() {
      $http.get(path + `/api/v1/account/glgroup/${$scope.form.glGroupCode}`, config).then(
          function(response) {
              if (response.data.glGroupCode === $scope.form.glGroupCode) {
                  $scope.duplicateGlCode = true;
              } else {
              }
            }).catch(function(error) {
              console.log("Error fetching data from gl account master", error);
              $scope.duplicateGlCode = false;
          })   
  };
  
  
    // To edit the form  data
    $scope.edit = function (n) {
      var targetOffset = $('.scroll-target').offset().top;         
      $('html, body').animate({
          scrollTop: targetOffset
      }, 100);

      $scope.idDisable = true;
      $scope.form = {
        glGroupCode: n.glGroupCode,
        dscr: n.dscr,
        operative: n.operative,
      };
    };

    // To update the data to the gl acoount  master
    $scope.update = function () {
      var data = $scope.form;

      var sl = data.glGroupCode;
      var url = path + "/api/v1/account/glgroup" + sl;
      $http.put(url, data, config).then(
        function successCallback(response) {
            if(response.status==200){
                $scope.getdata();
                $scope.form = {operative:'Y'};
            }
        },
        function errorCallback(response) {
          console.log("Error updating data to the gl acount master");
        }
      );
    };

    $scope.search = function (keyword1, keyword2) {
      // Create a request object with the keywords in the request body
      var requestData = {
        keyword1: keyword1 || "",
        keyword2: keyword2 || "",
      };
      console.log(requestData);
      //Make the HTTP POST request to your API endpoint with the request data in the body
      $http.post(path + "/api/v1/account/glsearch", requestData, config).then(
        function successCallback(response) {
          $scope.glgroupData = response.data;
        //   console.log("$scope.glgroupData", $scope.glgroupData);
        },
        function errorCallback(error) {
          console.log("Unable to perform request", error);
        }
      );
    };
  }
);
