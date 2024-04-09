  var app = angular.module('journal-voucher-viewCtrl', []);

  app.controller('contr', function ($scope, $http, $timeout, $window, $rootScope, $filter) {

    $scope.flag = false;
    $scope.timeoutPromise = null;
    $scope.glgroupData = [];
    $scope.form=[];



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
    

 
  //   $scope.journalData = [
  //   {
  //     jvDetSlno: "",
  //     payToTypeCode: "",
  //     venderCode: "",
  //     staffNo: "",
  //     univRegistrationNo: "",
  //     bankAccountNo: "",
  //     accountDisc: "",
  //     debitAmount: "",
  //     creditAmount: "",
  //     remarks: ""

  //   }
  // ];


  //     $scope.addFields = function () {
  //     var newField = {
  //       jvDetSlno: "",
  //     payToTypeCode: "",
  //     venderCode: "",
  //     staffNo: "",
  //     univRegistrationNo: "",
  //     bankAccountNo: "",
  //     accountDisc: "",
  //     debitAmount: "",
  //     creditAmount: "",
  //     remarks: ""
  //   };
  //   $scope.journalData.push(newField);
  // };




            //get All Employee Data
          $scope.empdata=[];
          $scope.getEmployee = function () {
          $http.get(path+`/api/v1/account/employee/alldata`,config)
          .then(function (response) {   
          $scope.empdata=response.data;           
          console.log("All Employee Data", $scope.empdata)
          },
            function (error) {
              console.log("erroe has occured Employee data")
            }
          );       
      };
      $scope.getEmployee();

          //get All Status
          $scope.statusdata=[];
          $scope.getStatus = function () {
          $http.get(path+`/api/v1/account/vst`,config)
          .then(function (response) {   
          $scope.statusdata=response.data;       
          console.log("All Status Data", $scope.statusdata)
          },
            function (error) {
              console.log("erroe has occured Status data")
            }
          );       
      };
      $scope.getStatus();

        //get All Pat to type
          $scope.paydata=[];
          $scope.getPay = function () {
          $http.get(path+`/api/v1/account/paytotype`,config)
          .then(function (response) {   
          $scope.paydata=response.data;           
          console.log("All pays Data", $scope.paydata)
          },
            function (error) {
              console.log("erroe has occured Pays data")
            }
          );       
      };
      $scope.getPay();

          //get All supplier
          $scope.supplierdata=[];
          $scope.getsupplier = function () {
          $http.get(path+`/api/v1/account/supplier`,config)
          .then(function (response) {   
          $scope.supplierdata=response.data;           
          console.log("All supplierdata Data", $scope.supplierdata)
          },
            function (error) {
              console.log("erroe has occured Pays data")
            }
          );       
      };
      $scope.getsupplier();

          //get All student
          $scope.studentdata=[];
          $scope.getstudent = function () {
          $http.get(path+`/api/v1/account/student`,config)
          .then(function (response) {   
          $scope.studentdata=response.data;           
          console.log("All studentdata Data", $scope.studentdata)
          },
            function (error) {
              console.log("erroe has occured Pays data")
            }
          );       
      };
      $scope.getstudent();

          //get All Department
          $scope.departmentdata=[];
          $scope.getdepartment = function () {
          $http.get(path+`/api/v1/account/department`,config)
          .then(function (response) {   
          $scope.departmentdata=response.data;           
          console.log("All departmentdata Data", $scope.departmentdata)
          },
            function (error) {
              console.log("erroe has occured Pays data")
            }
          );       
      };
      $scope.getdepartment();

      
          //get  Department data by id
          $scope.departmentIddata=[];
          $scope.getdepartmentIddata = function (departmentCode,index) {
          $http.get(path+`/api/v1/account/department/${departmentCode}`,config)
          .then(function (response) {   
          $scope.departmentIddata=response.data;
           $scope.jvdetail.deptdscr=$scope.departmentIddata.dscr;
           $scope.jvdetail.collegeCode=$scope.departmentIddata.collegeCode;
           $scope.jvdetail.universityCode=$scope.departmentIddata.universityCode;
           $scope.collegeData($scope.departmentIddata.collegeCode);
          $scope.universityData($scope.departmentIddata.universityCode)           
          console.log("department Id Data", $scope.jvdetail)
          },
            function (error) {
              console.log("erroe has occured department Id data")
            }
          );       
      };


            //get college data by id           
            $scope.collegeData = function (college_code) {
            $http.get(path+`/api/v1/account/college/${college_code}`,config)
           .then(function (response) {
            console.log("college data",response.data)
            $scope.jvdetail.clgdscr=response.data.dscr;
             console.log("dddddd",response.data.dscr)
            // console.log("college name",$scope.dataArray)
          },
            function (error) {
              console.log("erroe has occured clgGet")
            }
          );
      };


      $scope.universityData = function (universityCode) {      
        $http.get(path+`/api/v1/account/university/${universityCode}`,config)
          .then(function (response) {
            console.log("university data",response.data)
            $scope.jvdetail.univerdscr=response.data.dscr;
          // console.log("university name", $scope.dataArray)
          },
            function (error) {
              console.log("erroe has occured in uniGet")
            }
          );
      };
    

          //get All Account
          $scope.accountdata=[];
          $scope.getaccount = function () {
          $http.get(path+`/api/v1/account/accreport`,config)
          .then(function (response) {   
          $scope.accountdata=response.data;           
          console.log("All account Master Data", $scope.accountdata)
          },
            function (error) {
              console.log("erroe has occured account data")
            }
          );       
      };
      $scope.getaccount();



      // $scope.flag1 = false;
      // $scope.flag2 = false;
      // $scope.flag3 = false;
      // $scope.jwc=false;
      // $scope.hideFlag = true;
      // $scope.fieldDisable = function (x) {
      //   if (x.txIndivTypeCode == "E") {
      //     $scope.flag1 = true
      //     $scope.flag3 = true
      //     $scope.flag2 = false
      //     $scope.hideFlag = false
      //     $scope.jwc=true;
      //     x.vendorCode = "";
      //     x.univRegistrationNo="";              
      //   }
      //   if (x.txIndivTypeCode == "S") {
      //     $scope.flag1 = true
      //     $scope.flag2 = true        
      //     $scope.flag3 = false
      //     $scope.hideFlag = false
      //     $scope.jwc=true;  
      //     x.vendorCode = "";
      //     x.staffNo="";          
      //   }
      //   if (x.txIndivTypeCode == "V") {
      //     $scope.flag2 = true
      //     $scope.flag3 = true
      //     $scope.flag1 = false
      //     $scope.hideFlag = false
      //     $scope.jwc=false;  
      //     x.univRegistrationNo = "";
      //     x.staffNo="";    
      //   }
      // };




          //get data by Account Master 
          $scope.accountIdData=[];
          $scope.getAccIdData = function (account_code,index) {
          $http.get(path+`/api/v1/account/accreport/${account_code}`,config)
          .then(function (response) {   
          $scope.accountIdData=response.data;
          $scope.journalData[index].accountDisc=$scope.accountIdData.dscr;                
          console.log("accountIdData ID  Data", $scope.accountIdData)
          },
            function (error) {
              console.log("erroe has occured Employee id data")
            }
          );       
      };
      
      
        //post  data in JOURNAL VOUCHER
      //   $scope.sub=true;
      //   $scope.journel =[];
      //   $scope.postJournel = function () { 
      //    $scope.form.asssistantStaffNo=$scope.details.userid;
      //    $scope.form.managerStaffNo=$scope.details.userid;
      //    $scope.form.mgrcaStaffNo=$scope.details.userid;
      //    $scope.form.autoManual='M';
      //    $http.post(path+"/api/v1/account/journelvoucher",$scope.form,config)
      //     .then(function successCallback(response) {
      //       $scope.sub=false;
      //       $scope.journel=response.data;
      //       $scope.form.jvId=response.data.jvId;

      //       console.log("JOURNEL VOUCHER Data saved", $scope.journel)
      //       alert("data saved ")
      //     } 
      //   ,function errorCallback(response) {
      //          console.log("Saving of data failed in journel");
      //         // toastr.error('An error occurred while saving data.', 'Error');
      //     }       
      //   );
      // };

      //post All data in JOURNAL VOUCHER DETAILS   
      //   $scope.postJournelDetail = function () { 
      //     if($scope.journel){
      //           var jdata = {
      //               jvId: $scope.journel.jvId,
      //               jvFinYear: $scope.journel.jvFinYear
      //          }
      //         }else{
      //             var jdata = {
      //             jvId: $scope.form.jvId,
      //             jvFinYear: $scope.form.jvFinYear
      //               }
      //         }
      //   $scope.jdetail = $scope.journalData.filter((x) => { return x.jvDetSlno !== "" })
      //   console.log($scope.jdetail, "filtered");
      //   $scope.jdetail = $scope.journalData.map((row, i) => { return { ...row, ...jdata } })
      //   console.log($scope.jdetail, "filtered after merged");
   
      //     console.log("$scope.journalData",$scope.jdetail)
      //    $http.post(path+"/api/v1/account/journelvoucherdetail",$scope.jdetail,config)
      //     .then(function successCallback(response) {           
      //      $scope.journalData=response.data;
      //      $scope.getAccIdData($scope.journalData[0].accountCode,0);
      //      alert("data saved ")
      //       console.log("journel Detail saved All Data", $scope.journalData);
      //       console.log("after saved Data", $scope.journalData);
      //     } 
      //   ,function errorCallback(response) {
      //          console.log("Saving of All data failed in journel Detail");
      //         // toastr.error('An error occurred while saving data.', 'Error');
      //     }       
      //   );
      // };  

      //post One data in JOURNAL VOUCHER DETAILS
      // $scope.postJournelDetailOne = function (index) { 
      //   console.log("index",index);

      //   if($scope.journel!=0){
      //     $scope.journalData[index].jvId=$scope.journel.jvId;
      //    $scope.journalData[index].jvFinYear=$scope.journel.jvFinYear;
      //   }else{
      //     $scope.journalData[index].jvId=$scope.form.jvId;
      //     $scope.journalData[index].jvFinYear=$scope.form.jvFinYear;
      //   }  
      //   console.log("$scope.journalData",$scope.journalData[index])
      //    $http.post(path+"/api/v1/account/journeldetail",$scope.journalData[index],config)
      //     .then(function successCallback(response) {           
      //       $scope.journalData[index]=response.data;
      //       $scope.getAccIdData($scope.journalData[index].accountCode,index);
      //      alert("data saved ")
      //       console.log("journel Detail saved Single Data", $scope.journalData);
      //       console.log("after saved Data", $scope.journalData);
      //     } 
      //   ,function errorCallback(response) {
      //          console.log("Saving of Single data failed in journel Detail");
      //         // toastr.error('An error occurred while saving data.', 'Error');
      //     }       
      //   );
      // }; 

    
      // $scope.postJournelDetail1 = function () { 
      //   $scope.jvdetailList=[];
      //    console.log("Post agian data",$scope.jvdetail)
      //   //  $scope.jvdetailList.push($scope.jvdetail);
      //    $http.post(path+"/api/v1/account/journeldetail",$scope.jvdetail,config)
      //     .then(function successCallback(response) {           
      //       console.log("jData Update",response.data);
      //       alert("save Data")
      //     } 
      //   ,function errorCallback(response) {
      //          console.log("Saving of data failed in again Detail");
      //     }       
      //   );
      // };



      $scope.jvdetail={};
      
      $scope.showdetail=function(x,index){      
        document.getElementById("details").style.display="block";
        $scope.getJvtDetail(x,index); 
      };

          //get project plan data by id
          $scope.jvtData=[];
          $scope.getJvtDetail = function (jvDetSlno,index) {
          $http.get(path+`/api/v1/account/journelvoucherdetail/${jvDetSlno}`,config)
          .then(function (response) {   
          $scope.jvtData=response.data;
          $scope.jvdetail.jvDetSlno=response.data.jvDetSlno;
          $scope.jvdetail.remarks=response.data.remarks;
          $scope.jvdetail.txIndivTypeCode=response.data.txIndivTypeCode;
          $scope.jvdetail.staffNo=response.data.staffNo;
          $scope.jvdetail.univRegistrationNo=response.data.univRegistrationNo;
          $scope.jvdetail.vendorCode=response.data.vendorCode;
          $scope.jvdetail.accountCode=response.data.accountCode;
          $scope.jvdetail.refNo=response.data.refNo;
          $scope.jvdetail.refDate=response.data.refDate;
          $scope.jvdetail.jvNo=response.data.jvNo;
          $scope.jvdetail.jvDate=response.data.jvDate;
          $scope.jvdetail.planNo=response.data.planNo;
          $scope.jvdetail.planFinYear=response.data.planFinYear;
          $scope.jvdetail.planTypeCode=response.data.planTypeCode;
          $scope.jvdetail.costCentreId=response.data.costCentreId;
          $scope.jvdetail.planFinYear=response.data.planFinYear;
          $scope.jvdetail.planTypeCode=response.data.planTypeCode;
          $scope.jvdetail.collegeCode=response.data.collegeCode;
          $scope.jvdetail.universityCode=response.data.universityCode;
          $scope.jvdetail.departmentCode=response.data.departmentCode;
           $scope.jvdetail.poId=response.data.poId;
           $scope.jvdetail.poFinYear=response.data.poFinYear;
          // $scope.jvdetail.poNumber=response.data.poNumber;
          // $scope.jvdetail.poDate=response.data.poDate;
          $scope.jvdetail.advanceId=response.data.advanceId;
          $scope.jvdetail.advanceFinYear=response.data.advanceFinYear;
          $scope.jvdetail.indentNo=response.data.indentNo;
          $scope.jvdetail.indentDate=response.data.indentDate;

   

          console.log("Display data",$scope.form)
          $scope.getPurchData(response.data.poId,response.data.poFinYear);
          $scope.getCollege(response.data.collegeCode);
          $scope.getUniversity(response.data.universityCode);
          $scope.getdepartment(response.data.departmentCode);

  

          $scope.getEmpIdData(response.data.staffNo,index);
          $scope.getSuplierData(response.data.vendorCode,index);
          $scope.getStudentData(response.data.univRegistrationNo,index); 

           $scope.getJvIdDetail(response.data.jvId);
           console.log("jv  jvdetail", $scope.jvdetail)
        
          },
            function (error) {
              console.log("erroe has occured jvt  data")
            }
          );       
      };

      $scope.purchasData=[];
          $scope.getPurchData = function (poId,poFinYear,index) {
            console.log("Success purchase",poId,poFinYear)
          $http.get(path+`/api/v1/account/po/${poId}/${poFinYear}`,config)
          .then(function (response) {   
          $scope.purchasData=response.data;
          $scope.jvdetail.poNumber=response.data.poNumber;
          $scope.jvdetail.poDate=response.data.poDate;     
          console.log("account show ID  Data", $scope.journalData)
          },
            function (error) {
              console.log("erroe has occured Employee id data")
            }
          );       
      };

        $scope.accountData1=[];
          $scope.getAccountData = function (account_code,index) {
            console.log("Success Account",index)
          $http.get(path+`/api/v1/account/accreport/${account_code}`,config)
          .then(function (response) {   
          $scope.accountData1=response.data;
           $scope.journalData[index].accountDisc=response.data.dscr;       
          console.log("account show ID  Data", $scope.journalData)
          },
            function (error) {
              console.log("erroe has occured Employee id data")
            }
          );       
      };


                //get data by employee id 
          $scope.empIdData=[];
          $scope.getEmpIdData = function (staffNo,index) {
          console.log("staffNo",staffNo)
          if(staffNo){
          $http.get(path+`/api/v1/account/employee/${staffNo}`,config)
          .then(function (response) {   
          $scope.empIdData=response.data;
          $scope.jvdetail.employeeName=response.data.firstName;
          $scope.getCollege(response.data.collegeCode);
          $scope.getUniversity(response.data.universityCode);
          $scope.getdepartment(response.data.departmentCode);
          $scope.jvdetail.studentName="";
          $scope.jvdetail.vendorName="";
          console.log(" empIdData ID  Data", $scope.empIdData)
          },
            function (error) {
              console.log("erroe has occured Employee id data")
            }
          );  
            }else{
              console.log("data Not send")
            }     
      };

        //get college data by id
          $scope.clgData=[];
          $scope.getCollege = function (college_code) {
          if(college_code){
          $http.get(path+`/api/v1/account/college/${college_code}`,config)
          .then(function (response) {   
          $scope.clgData=response.data;
          $scope.jvdetail.collegeCode=response.data.collegeCode;
          $scope.jvdetail.clgdscr=response.data.dscr;
          console.log("college Data", $scope.jvdetail)
          },
            function (error) {
              console.log("erroe has occured college data")
            }
          ); 
            }else{
              console.log("data not send")
            }      
      };

          //get university data by id
          $scope.uniData=[];
          $scope.getUniversity = function (university_code) {
          if(university_code){
          $http.get(path+`/api/v1/account/university/${university_code}`,config)
          .then(function (response) {   
          $scope.uniData=response.data;
          $scope.jvdetail.universityCode=response.data.universityCode;
          $scope.jvdetail.univerdscr=response.data.dscr;
          console.log("college Data", $scope.jvdetail)
          },
            function (error) {
              console.log("erroe has occured college data")
            }
          ); 
            }else{
              console.log("data not send")
            }      
      };

                //get university data by id
          $scope.deptData=[];
          $scope.getdepartment = function (departmentCode) {
          if(departmentCode){
          $http.get(path+`/api/v1/account/department/${departmentCode}`,config)
          .then(function (response) {   
          $scope.deptData=response.data;
          $scope.jvdetail.departmentCode=response.data.departmentCode;
          $scope.jvdetail.deptdscr=response.data.dscr;
          console.log("department Data", $scope.deptData)
          },
            function (error) {
              console.log("erroe has occured college data")
            }
          ); 
            }else{
              console.log("data not send")
            }      
      };

          //get data by Vendor id by supplier
          $scope.suplierIdData=[];
          $scope.getSuplierData = function (vendorCode,index) {
          console.log("vendorCode",vendorCode)
          if(vendorCode){
          $http.get(path+`/api/v1/account/supplier/${vendorCode}`,config)
          .then(function (response) {   
          $scope.suplierIdData=response.data; 
          $scope.jvdetail.vendorName=response.data.fullName;
          $scope.getCollege(response.data.collegeCode);
          $scope.getUniversity(response.data.universityCode);
          $scope.getdepartment(response.data.departmentCode);
          $scope.jvdetail.studentName="";
          $scope.jvdetail.employeeName="";
          console.log(" vendorCode ID  Data", $scope.suplierIdData)
          },
            function (error) {
              console.log("erroe has occured vendorCode id data")
            }
          );
            }else{
              console.log("data not send")
            }       
      };

          //get data by student RegsNo
          $scope.studentIdData=[];
          $scope.getStudentData = function (univRegistrationNo,index) {
          console.log("univRegistrationNo",univRegistrationNo)
          if(univRegistrationNo){
          $http.get(path+`/api/v1/account/student/${univRegistrationNo}`,config)
          .then(function (response) {   
          $scope.studentIdData=response.data;
          $scope.jvdetail.studentName=response.data.fullName;
          $scope.getCollege(response.data.collegeCode);
          $scope.getUniversity(response.data.universityCode);
          $scope.getdepartment(response.data.departmentCode);
          $scope.jvdetail.vendorName="";
          $scope.jvdetail.employeeName="";
          console.log("Student Id Data", $scope.studentIdData)
          },
            function (error) {
              console.log("erroe has occured vendorCode id data")
            }
          ); 
            }else{
              console.log("data not send")
            }      
      };

          $scope.jvtIdData=[];
          $scope.getJvIdDetail = function (jvId) {
            console.log("jvId",jvId)
          $http.get(path+`/api/v1/account/journelvoucher/${jvId}`,config)
          .then(function (response) {   
          $scope.jvtIdData=response.data;
          console.log(" jvd Id Data", $scope.jvtIdData);
          $scope.jvdetail.jvId=response.data.jvId;
          $scope.jvdetail.jvIdDate=response.data.jvIdDate;
          $scope.jvdetail.jvFinYear=response.data.jvFinYear;
          $scope.jvdetail.jvNo=response.data.jvNo;
          $scope.jvdetail.jvDate=response.data.jvDate;
          },
            function (error) {
              console.log("erroe has occured jvt Id data")
            }
          );       
      };


          //get data of Project plan cost center
          $scope.projectPlanData=[];
          $scope.getprojectPalnData = function () {
          $http.get(path+`/api/v1/account/costCentre/alldata`,config)
          .then(function (response) {   
          $scope.projectPlanData=response.data;
          console.log("projectPlanData all  Data", $scope.projectPlanData)
          },
            function (error) {
              console.log("erroe has occured projectPlanData all data")
            }
          );       
      };
      $scope.getprojectPalnData();


          //get project plan data by id
          $scope.projectplanIdData=[];
          $scope.getProjectplanIdData = function (planNo,index) {
          $http.get(path+`/api/v1/account/costCentre/all/${planNo}`,config)
          .then(function (response) {   
          $scope.projectplanIdData=response.data;
          $scope.jvdetail.planFinYear=$scope.projectplanIdData[0].planFinYear;
          $scope.jvdetail.planTypeCode=$scope.projectplanIdData[0].planTypeCode;
          $scope.jvdetail.costCentreId=$scope.projectplanIdData[0].costCentreId;
          console.log("jvdetail ID  Data", $scope.jvdetail)
          },
            function (error) {
              console.log("erroe has occured projectplanIdData id data")
            }
          );       
      };

          //get all data of department 
          $scope.departmentData=[];
          $scope.getdepartmentData = function () {
          $http.get(path+`/api/v1/account/department`,config)
          .then(function (response) {   
          $scope.departmentData=response.data;
          console.log("departmentData all  Data", $scope.departmentData)
          },
            function (error) {
              console.log("erroe has occured departmentData all data")
            }
          );       
      };
      $scope.getdepartmentData();

          //get all data of purchase order 
          $scope.purchaseOrderData=[];
          $scope.getpurchaseData = function () {
          $http.get(path+`/api/v1/account/po`,config)
          .then(function (response) {   
          $scope.purchaseOrderData=response.data;
          console.log("purchaseOrderData all  Data", $scope.purchaseOrderData)
          },
            function (error) {
              console.log("erroe has occured purchaseOrderData all data")
            }
          );       
      };
      $scope.getpurchaseData();

      //get data by purchaseOrder poid and poFinYear
      $scope.getpurchaseOrder=function(poId,poFinYear){
        $http.get(path+`/api/v1/account/po/${poId}/${poFinYear}`,config)
          .then(function (response) {   
          $scope.purchaseOrder=response.data;
          console.log("purchaseOrder   Data", $scope.purchaseOrder)
          $scope.jvdetail.poNumber=$scope.purchaseOrder.poNumber;
          $scope.jvdetail.poDate=$scope.purchaseOrder.poDate;

          $scope.jvdetail.planNo=$scope.purchaseOrder.planNo;
          $scope.jvdetail.planFinYear=$scope.purchaseOrder.planFinYear;
          $scope.jvdetail.planTypeCode=$scope.purchaseOrder.planTypeCode;
          $scope.jvdetail.costCentreId=$scope.purchaseOrder.costCentreId;
          $scope.jvdetail.collegeCode=$scope.purchaseOrder.collegeCode;
          $scope.jvdetail.universityCode=$scope.purchaseOrder.universityCode;
          console.log("purchaseOrder   Data", $scope.jvdetail)
          },
            function (error) {
              console.log("erroe has occured purchaseOrder all data")
            }
          ); 
      };



           //get all data of Budget Allocation  
          $scope.budgetData=[];
          $scope.uniqueAllocationFinYearsArray=[];
          $scope.getbudgetData = function () {
          $http.get(path+`/api/v1/account/budgetAllocation/data`,config)
          .then(function (response) {   
          $scope.budgetData=response.data;        
          console.log("budgetData all  Data",  $scope.budgetData)
          },
            function (error) {
              console.log("erroe has occured budgetData all data")
            }
          );       
      };
      $scope.getbudgetData();


      // $scope.calculateFinYear = function (jvIdDate) {
      //   var jvIdDate = jvIdDate;
      //   var dateParts = jvIdDate.split('-');
      //   console.log(dateParts);
      //   if (dateParts.length === 3) {
      //     var day = parseInt(dateParts[0]);
      //     var month = parseInt(dateParts[1]);
      //     var year = parseInt(dateParts[2]);

      //     if (day >= 1 && day <= 31 && month >= 1 && month <= 12) {
      //       var jvFinYear;
      //       if (month >= 4) {
      //         jvFinYear = year + '-' + (year + 1);
      //       } else {
      //         jvFinYear = (year - 1) + '-' + year;
      //       }
      //       console.log(jvFinYear);
      //       $scope.form.jvFinYear = jvFinYear;
      //     } else {
      //       $scope.form.jvFinYear = '';
      //     }
      //   } else {
      //     $scope.form.jvFinYear = '';
      //   }

      // };


        $scope.getJvtDetailShow = function (jvId,index) {
        console.log("index",index)
          $http.get(path+`/api/v1/account/journelvoucherdetailData/${jvId}`,config)
          .then(function (response) { 
            $scope.journalData=[];
            $scope.journalData=response.data;
              // $scope.journalData.push(response.data);
              console.log("$scope.journalData detail data",$scope.journalData);

              for (var a = 0; a < $scope.journalData.length; a++) {
              $scope.getAccountData($scope.journalData[a].accountCode,a);
              }
     
              var a=$scope.journalData[0].jvId;
               $scope.getJvIdDetailShow(a)

              console.log("$scope.journalData detail data",response.data);
              console.log("$scope.journalData[0].jvId",$scope.journalData[0].jvId);
          }
          )};

      

          $scope.jvtIdDataShow=[];
          $scope.getJvIdDetailShow = function (jvId) {
          console.log("jvId",jvId)
          $http.get(path+`/api/v1/account/journelvoucher/${jvId}`,config)
          .then(function (response) {   
          $scope.jvtIdDataShow=response.data;
           console.log("jvd Id Data show", response.data);
          $scope.form.jvId=response.data.jvId;
          $scope.form.jvIdDate=response.data.jvIdDate;
          $scope.form.jvFinYear=response.data.jvFinYear;
          $scope.form.jvNo=response.data.jvNo;
          $scope.form.narration=response.data.narration;
          $scope.form.jvNo=response.data.jvNo;
          $scope.form.jvDate=response.data.jvDate;
          $scope.form.voucherStatusCode=response.data.voucherStatusCode;
          },
            function (error) {
              console.log("erroe has occured jvt Id data show")
            }
          );       
      };




      function getQueryParam(name,index) {
        // console.log("index 1",index)
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
            $scope.nObject = getQueryParam('n');
            var index = getQueryParam('index');
            console.log('Value of index:', index);
            console.log('Value of n:', $scope.nObject);
            //$scope.poIdDisable =false;
            
            if($scope.nObject){
              $scope.getJvtDetailShow($scope.nObject.jvId,index);
              // $scope.getAccIdDetail($scope.nObject.accountCode)
              // $scope.getCheckIdBudget($scope.nObject.costCentreId);
              // $scope.getCheckIdFund($scope.nObject.costCentreId)
            };

            $scope.getSvtSno = function (n){
           $scope.jvDetSlno =n;
         }

            $scope.deleteCust = function () {
        for (var i = $scope.journalData.length - 1; i >= 0; i--) {
            if ($scope.journalData[i].selected) {
                $scope.journalData.splice(i, 1);
            }          
        }      
    };
            

            $scope.deletevoucherDetail = function (jvDetSlno) {
            console.log("jvDetSlno",jvDetSlno)
            $http.delete(path+`/api/v1/account/journelvoucherdetail/${jvDetSlno}`,config)
           .then(function (response) {   
           console.log("jvd Id Data show", response.data);
           alert("Delete SuucessFully")
          },
            function (error) {
              console.log("erroe has occured jvt Id data show")
            }
          );       
      };




        // Function to update the total sum
        $scope.updatedeb = function () {
            $scope.totaldeb = 0;
            // Loop through all items and update the total
            angular.forEach($scope.journalData, function (x) {
                if (!isNaN(parseFloat(x.dbAmount))) {
                    $scope.totaldeb += parseFloat(x.dbAmount);
                }
            });
        };

                // Function to update the total sum
            $scope.updatecrd = function () {
            $scope.totalcrd = 0;
            // Loop through all items and update the total
            angular.forEach($scope.journalData, function (x) {
                if (!isNaN(parseFloat(x.crAmount))) {
                    $scope.totalcrd += parseFloat(x.crAmount);
                }
            });
        };
  

        $scope.isPopupVisible = false;
        $scope.togglePopup = function(isVisible) {
            $scope.isPopupVisible = isVisible;
        };


            // Initialize totaldeb
    $scope.totaldeb = 0;
    // Watch for changes in journalData and recalculate the sum
    $scope.$watchCollection('journalData', function(newValues) {
      $scope.totaldeb = calculateTotalDebit1(newValues);
    });

    // Function to calculate the sum of x.dbAmount
    function calculateTotalDebit1(data) {
      var sum1 = 0;
      angular.forEach(data, function(item) {
        sum1 += parseFloat(item.dbAmount) || 0;
      });
      return sum1;
    }


        // Initialize totaldeb
        $scope.totalcrd = 0;
        // Watch for changes in journalData and recalculate the sum
        $scope.$watchCollection('journalData', function(newValues) {
        $scope.totalcrd = calculateTotalDebit(newValues);
        });

        // Function to calculate the sum of x.dbAmount
        function calculateTotalDebit(data) {
          var sum = 0;
          angular.forEach(data, function(item) {
            sum += parseFloat(item.crAmount) || 0;
          });
          return sum;
        }
});
 