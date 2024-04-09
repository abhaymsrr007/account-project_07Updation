// var app = angular.module('myApp', ['ngRoute', 'angular.filter', 'ui.bootstrap']);

// app.config(function ($httpProvider) {
//     var authToken = $('meta[name="csrf-token"]').attr('content');
//     $httpProvider.defaults.headers.common["X-CSRF-TOKEN"] = authToken;
// });

// app.config(['$routeProvider', '$locationProvider',
//     function ($routeProvider, $locationProvider) {
//         $routeProvider
//             .when('/', {
//                 templateUrl: 'view/index.html',
//                 controller: 'loginCtrl'
//             })
//             .when('/accountant_dash_Journal_voucher', {
//                 templateUrl: 'view/accountant_dash_Journal_voucher.html',
//                 controller: 'accountant_dash_Journal_voucherCtrl'
//             })
//             .when('/accountmaster', {
//                 templateUrl: 'view/accountmaster.html',
//                 controller: 'accountmasterCtrl'
//             })
//             .when('/accountsection', {
//                 templateUrl: 'view/accountsection.html',
//                 controller: 'accountsectionCtrl'
//             })
//             .when('/accounttype', {
//                 templateUrl: 'view/accounttype.html',
//                 controller: 'accounttypeCtrl'
//             })
//             .when('/account_dash_jounal_voucher', {
//                 templateUrl: 'view/account_dash_jounal_voucher.html',
//                 controller: 'account_dash_jounal_voucherCtrl'
//             })
//             .when('/admin_dashboard', {
//                 templateUrl: 'view/admin_dashboard.html',
//                 controller: 'admin_dashboardCtrl'
//             })
//             .when('/advance-final-bill', {
//                 templateUrl: 'view/advance-final-bill.html',
//                 controller: 'advance-final-billCtrl'
//             })
//             .when('/advance-fully-deducted', {
//                 templateUrl: 'view/advance-fully-deducted.html',
//                 controller: 'advance-fully-deductedCtrl'
//             })
//             .when('/assistant-dashboard-cashpayment-voucher', {
//                 templateUrl: 'view/assistant-dashboard-cashpayment-voucher.html',
//                 controller: 'assistant-dashboard-cashpayment-voucherCtrl'
//             })
//             .when('/assistant-dashboard-cashreciept-voucher', {
//                 templateUrl: 'view/assistant-dashboard-cashreciept-voucher.html',
//                 controller: 'assistant-dashboard-cashreciept-voucherCtrl'
//             })
//             .when('/assistant_dashboard-payment-Voucher', {
//                 templateUrl: 'view/assistant_dashboard-payment-Voucher.html',
//                 controller: 'assistant_dashboard-payment-VoucherCtrl'
//             })
//             .when('/assistant_dashboard', {
//                 templateUrl: 'view/assistant_dashboard.html',
//                 controller: 'assistant_dashboardCtrl'
//             })
//             .when('/assis_dash_Journal_voucher', {
//                 templateUrl: 'view/assis_dash_Journal_voucher.html',
//                 controller: 'assis_dash_Journal_voucherCtrl'
//             })
//             .when('/asst_main_dashboard', {
//                 templateUrl: 'view/asst_main_dashboard.html',
//                 controller: 'asst_main_dashboardCtrl'
//             })
//             .when('/bank-payment-voucher-details', {
//                 templateUrl: 'view/bank-payment-voucher-details.html',
//                 controller: 'bank-payment-voucher-detailsCtrl'
//             })
//             .when('/bank-payment-voucher', {
//                 templateUrl: 'view/bank-payment-voucher.html',
//                 controller: 'bank-payment-voucherCtrl'
//             })
//             .when('/bank-receipt-voucher-details', {
//                 templateUrl: 'view/bank-receipt-voucher-details.html',
//                 controller: 'bank-receipt-voucher-detailsCtrl'
//             })
//             .when('/bank-reciept-voucher', {
//                 templateUrl: 'view/bank-reciept-voucher.html',
//                 controller: 'bank-reciept-voucherCtrl'
//             })
//             .when('/bank', {
//                 templateUrl: 'view/bank.html',
//                 controller: 'bankCtrl'
//             })
//             .when('/bankaccount', {
//                 templateUrl: 'view/bankaccount.html',
//                 controller: 'bankaccountCtrl'
//             })
//             .when('/cash-payment-voucher', {
//                 templateUrl: 'view/cash-payment-voucher.html',
//                 controller: 'cash-payment-voucherCtrl'
//             })
//             .when('/cash-reciept-voucher', {
//                 templateUrl: 'view/cash-reciept-voucher.html',
//                 controller: 'cash-reciept-voucherCtrl'
//             })
//             .when('/cashier_dashboard-payment-voucher', {
//                 templateUrl: 'view/cashier_dashboard-payment-voucher.html',
//                 controller: 'cashier_dashboard-payment-voucherCtrl'
//             })
//             .when('/cashier_dashboard', {
//                 templateUrl: 'view/cashier_dashboard.html',
//                 controller: 'cashier_dashboardCtrl'
//             })
//             .when('/cashier_main_dashboard', {
//                 templateUrl: 'view/cashier_main_dashboard.html',
//                 controller: 'cashier_main_dashboardCtrl'
//             })
//             .when('/cash_dash_Journal_voucher', {
//                 templateUrl: 'view/cash_dash_Journal_voucher.html',
//                 controller: 'cash_dash_Journal_voucherCtrl'
//             })
//             .when('/caste', {
//                 templateUrl: 'view/caste.html',
//                 controller: 'casteCtrl'
//             })
//             .when('/centralAccount_main_dashboard', {
//                 templateUrl: 'view/centralAccount_main_dashboard.html',
//                 controller: 'centralAccount_main_dashboardCtrl'
//             })
//             .when('/college', {
//                 templateUrl: 'view/college.html',
//                 controller: 'collegeCtrl'
//             })
//             .when('/collegestudentprogram', {
//                 templateUrl: 'view/collegestudentprogram.html',
//                 controller: 'collegestudentprogramCtrl'
//             })
//             .when('/costcentrebudgetallocation', {
//                 templateUrl: 'view/costcentrebudgetallocation.html',
//                 controller: 'costcentrebudgetallocationCtrl'
//             })
//             .when('/dashboard', {
//                 templateUrl: 'view/dashboard.html',
//                 controller: 'dashboardCtrl'
//             })
//             .when('/department', {
//                 templateUrl: 'view/department.html',
//                 controller: 'departmentCtrl'
//             })
//             .when('/employee-details', {
//                 templateUrl: 'view/employee-details.html',
//                 controller: 'employee-detailsCtrl'
//             })
//             .when('/employee', {
//                 templateUrl: 'view/employee.html',
//                 controller: 'employeeCtrl'
//             })
//             .when('/FileListToTextFile', {
//                 templateUrl: 'view/FileListToTextFile.html',
//                 controller: 'FileListToTextFileCtrl'
//             })
//             .when('/glaccountmaster', {
//                 templateUrl: 'view/glaccountmaster.html',
//                 controller: 'glaccountmasterCtrl'
//             })
//             .when('/index', {
//                 templateUrl: 'view/index.html',
//                 controller: 'indexCtrl'
//             })
//             .when('/journal-voucher-details', {
//                 templateUrl: 'view/journal-voucher-details.html',
//                 controller: 'journal-voucher-detailsCtrl'
//             })
//             .when('/journal-voucher-view', {
//                 templateUrl: 'view/journal-voucher-view.html',
//                 controller: 'journal-voucher-viewCtrl'
//             })
//             .when('/journal-voucher', {
//                 templateUrl: 'view/journal-voucher.html',
//                 controller: 'journal-voucherCtrl'
//             })
//             .when('/location', {
//                 templateUrl: 'view/location.html',
//                 controller: 'locationCtrl'
//             })
//             .when('/login', {
//                 templateUrl: 'view/login.html',
//                 controller: 'loginCtrl'
//             })
//             .when('/manager_dashboard-Payment-voucher', {
//                 templateUrl: 'view/manager_dashboard-Payment-voucher.html',
//                 controller: 'manager_dashboard-Payment-voucherCtrl'
//             })
//             .when('/manager_dashboard', {
//                 templateUrl: 'view/manager_dashboard.html',
//                 controller: 'manager_dashboardCtrl'
//             })
//             .when('/mgr_dash_Journal_voucher', {
//                 templateUrl: 'view/mgr_dash_Journal_voucher.html',
//                 controller: 'mgr_dash_Journal_voucherCtrl'
//             })
//             .when('/mgr_main_dashboard', {
//                 templateUrl: 'view/mgr_main_dashboard.html',
//                 controller: 'mgr_main_dashboardCtrl'
//             })
//             .when('/monthly-adjustment-of-advance', {
//                 templateUrl: 'view/monthly-adjustment-of-advance.html',
//                 controller: 'monthly-adjustment-of-advanceCtrl'
//             })
//             .when('/payeedetails', {
//                 templateUrl: 'view/payeedetails.html',
//                 controller: 'payeedetailsCtrl'
//             })
//             .when('/paytotype', {
//                 templateUrl: 'view/paytotype.html',
//                 controller: 'paytotypeCtrl'
//             })
//             .when('/physicallyhandicapped', {
//                 templateUrl: 'view/physicallyhandicapped.html',
//                 controller: 'physicallyhandicappedCtrl'
//             })
//             .when('/plancostcentres', {
//                 templateUrl: 'view/plancostcentres.html',
//                 controller: 'plancostcentresCtrl'
//             })
//             .when('/podetailsfaltu', {
//                 templateUrl: 'view/podetailsfaltu.html',
//                 controller: 'podetailsfaltuCtrl'
//             })
//             .when('/postatus', {
//                 templateUrl: 'view/postatus.html',
//                 controller: 'postatusCtrl'
//             })
//             .when('/project-plan-custodians-details', {
//                 templateUrl: 'view/project-plan-custodians-details.html',
//                 controller: 'project-plan-custodians-detailsCtrl'
//             })
//             .when('/project-plan-custodians-view', {
//                 templateUrl: 'view/project-plan-custodians-view.html',
//                 controller: 'project-plan-custodians-viewCtrl'
//             })
//             .when('/project-plan-custodians', {
//                 templateUrl: 'view/project-plan-custodians.html',
//                 controller: 'project-plan-custodiansCtrl'
//             })
//             .when('/project-plan-details', {
//                 templateUrl: 'view/project-plan-details.html',
//                 controller: 'project-plan-detailsCtrl'
//             })
//             .when('/project-plan', {
//                 templateUrl: 'view/project-plan.html',
//                 controller: 'project-planCtrl'
//             })
//             .when('/projectplanbudgetfundxfer', {
//                 templateUrl: 'view/projectplanbudgetfundxfer.html',
//                 controller: 'projectplanbudgetfundxferCtrl'
//             })
//             .when('/projectplanbudgetsanction', {
//                 templateUrl: 'view/projectplanbudgetsanction.html',
//                 controller: 'projectplanbudgetsanctionCtrl'
//             })
//             .when('/projectplancostcentre', {
//                 templateUrl: 'view/projectplancostcentre.html',
//                 controller: 'projectplancostcentreCtrl'
//             })
//             .when('/projectsplansexpenditurereporting', {
//                 templateUrl: 'view/projectsplansexpenditurereporting.html',
//                 controller: 'projectsplansexpenditurereportingCtrl'
//             })
//             .when('/purchase-order', {
//                 templateUrl: 'view/purchase-order.html',
//                 controller: 'purchase-orderCtrl'
//             })
//             .when('/purchaseorderammendment', {
//                 templateUrl: 'view/purchaseorderammendment.html',
//                 controller: 'purchaseorderammendmentCtrl'
//             })
//             .when('/purchaseorderdetails', {
//                 templateUrl: 'view/purchaseorderdetails.html',
//                 controller: 'purchaseorderdetailsCtrl'
//             })
//             .when('/semestersystem', {
//                 templateUrl: 'view/semestersystem.html',
//                 controller: 'semestersystemCtrl'
//             })
//             .when('/staffdesignation', {
//                 templateUrl: 'view/staffdesignation.html',
//                 controller: 'staffdesignationCtrl'
//             })
//             .when('/staffgrade', {
//                 templateUrl: 'view/staffgrade.html',
//                 controller: 'staffgradeCtrl'
//             })
//             .when('/staffseparationtype', {
//                 templateUrl: 'view/staffseparationtype.html',
//                 controller: 'staffseparationtypeCtrl'
//             })
//             .when('/staffstatus', {
//                 templateUrl: 'view/staffstatus.html',
//                 controller: 'staffstatusCtrl'
//             })
//             .when('/stafftype', {
//                 templateUrl: 'view/stafftype.html',
//                 controller: 'stafftypeCtrl'
//             })
//             .when('/student-details', {
//                 templateUrl: 'view/student-details.html',
//                 controller: 'student-detailsCtrl'
//             })
//             .when('/student', {
//                 templateUrl: 'view/student.html',
//                 controller: 'studentCtrl'
//             })
//             .when('/studentprogram', {
//                 templateUrl: 'view/studentprogram.html',
//                 controller: 'studentprogramCtrl'
//             })
//             .when('/studentseparationtype', {
//                 templateUrl: 'view/studentseparationtype.html',
//                 controller: 'studentseparationtypeCtrl'
//             })
//             .when('/supplier-bill-details', {
//                 templateUrl: 'view/supplier-bill-details.html',
//                 controller: 'supplier-bill-detailsCtrl'
//             })
//             .when('/supplier', {
//                 templateUrl: 'view/supplier.html',
//                 controller: 'supplierCtrl'
//             })
//             .when('/supplierbilldata', {
//                 templateUrl: 'view/supplierbilldata.html',
//                 controller: 'supplierbilldataCtrl'
//             })
//             .when('/tour-advance-payment', {
//                 templateUrl: 'view/tour-advance-payment.html',
//                 controller: 'tour-advance-paymentCtrl'
//             })
//             .when('/tour-advance-refund', {
//                 templateUrl: 'view/tour-advance-refund.html',
//                 controller: 'tour-advance-refundCtrl'
//             })
//             .when('/transactiontype', {
//                 templateUrl: 'view/transactiontype.html',
//                 controller: 'transactiontypeCtrl'
//             })
//             .when('/university', {
//                 templateUrl: 'view/university.html',
//                 controller: 'universityCtrl'
//             })
//             .when('/universitydepartment', {
//                 templateUrl: 'view/universitydepartment.html',
//                 controller: 'universitydepartmentCtrl'
//             })
//             .when('/universitystudentprogram', {
//                 templateUrl: 'view/universitystudentprogram.html',
//                 controller: 'universitystudentprogramCtrl'
//             })
//             .when('/vendortype', {
//                 templateUrl: 'view/vendortype.html',
//                 controller: 'vendortypeCtrl'
//             })
//             .otherwise({ redirectTo: '/login' });
//     }
// ]);

// /* Create factory to Disable Browser Back Button only after Logout */
// // app.factory("checkAuth", function ($location, $rootScope) {
// //     return {
// //         getuserInfo: function () {
// //             if ($rootScope.isLoggedIn === undefined || $rootScope.isLoggedIn === null) {
// //                 $location.path('/');
// //             }
// //         }
// //     };
// // });

// app.controller('homeContrl', function ($scope, $http, $timeout, $window,
//     $rootScope, $filter, $location) {
//     console.log("$scope", $scope);
// })
// app.directive('mNumOnly', onlyDigitInput);
// function onlyDigitInput() {
//     return {
//         restrict: 'A',
//         require: 'ngModel',
//         link: function (scope, element, attr, ngModelCtrl) {
//             function fromUser(text) {
//                 if (text) {
//                     var transformedInput = text.replace(/[^0-9-]/g, '');
//                     if (transformedInput !== text) {
//                         ngModelCtrl.$setViewValue(transformedInput);
//                         ngModelCtrl.$render();
//                     }
//                     return transformedInput;
//                 }
//                 return undefined;
//             }
//             ngModelCtrl.$parsers.push(fromUser);
//         }
//     };
// };

// app.directive('fileUpload', function () {
//     return {
//         scope: true, // create a new scope
//         link: function (scope, el, attrs) {
//             el.bind('change', function (event) {
//                 var files = event.target.files;
//                 // iterate files since 'multiple' may be specified on the
//                 // element
//                 for (var i = 0; i < files.length; i++) {
//                     // emit event upward
//                     scope.$emit("fileSelected", {
//                         file: files[i],
//                         name: event.target.id
//                     });
//                 }
//             });
//         }
//     };
// });

// app.filter('indianCurrency', function () {
//     return function (input) {
//         if (isNaN(input) || !input) {
//             return input;
//         } else {
//             var currencySymbol = '₹';
//             var formatted = (input).toLocaleString('en-IN', {
//                 style: 'currency',
//                 currency: 'INR',
//                 maximumFractionDigits: 0
//             });
//             return formatted;
//         }

//     };
// });

// app.directive('datepicker', function () {
//     return {
//         restrict: 'A',
//         link: function (scope, element) {
//             $(element).datepicker({
//                 format: "yyyy-mm-dd",
//                 startDate: new Date('2023-03-20'),
//                 endDate: new Date('2023-12-15')
//             });
//         }
//     };
// });

// app.filter('trustHtml', function ($sce) {
//     return function (html) {
//         return $sce.trustAsHtml(html)
//     }
// });

// app.filter('capitalize', function () {
//     return function (input) {
//         return (angular.isString(input) && input.length > 0) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : input;
//     }
// });

