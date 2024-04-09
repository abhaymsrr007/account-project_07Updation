/**
 * @Rupesh
 */

var app = angular.module('directive', []);
app.directive('fileUpload', function() {
	return {
		scope : true, // create a new scope
		link : function(scope, el, attrs) {
			el.bind('change', function(event) {
				var files = event.target.files;
				// iterate files since 'multiple' may be specified on the
				// element
				for (var i = 0; i < files.length; i++) {
					// emit event upward
					scope.$emit("fileSelected", { file : files[i],
						name : event.target.id });
				}
			});
		} };
});
app.filter('range', function() {
	return function(input, total) {
		total = parseInt(total);
		for (var i = 0; i < total; i++) {
			input.push(i);
		}
		return input;
	};
});
app.directive("limitTo", [ function() {
	return { restrict : "A", link : function(scope, elem, attrs) {
		var limit = parseInt(attrs.limitTo);
		angular.element(elem).on("keypress", function(e) {
			if (this.value.length == limit) e.preventDefault();
		});
	} }
} ]);
app.directive('mName', onlyLettersInput);
function onlyLettersInput() {
	return { require : 'ngModel',
		link : function(scope, element, attr, ngModelCtrl) {
			function fromUser(text) {
				var transformedInput = text.replace(/[^a-zA-Z.\s]/g, '');
				if(transformedInput){
					transformedInput=transformedInput.toUpperCase();
				}
				// console.log(transformedInput);
				// if (transformedInput !== text) {
				ngModelCtrl.$setViewValue(transformedInput);
				ngModelCtrl.$render();
				// }
				return transformedInput;
			}
			ngModelCtrl.$parsers.push(fromUser);
		} };
};
app.directive('mCapitalize', input);
function input() {
	return { require : 'ngModel',
		link : function(scope, element, attr, ngModelCtrl) {
			function fromUser(text) {
				if(text){
					text=text.toUpperCase();	
				}
				ngModelCtrl.$setViewValue(text);
				ngModelCtrl.$render();
				return text;
			}
			ngModelCtrl.$parsers.push(fromUser);
		} };
};
app.directive('dateNow', ['$filter', function($filter) {
	  return { require : 'ngModel',
	    link: function( $scope, $element, $attrs,ngModelCtrl) {
	    	//function fromUser(text) {
				text=$filter('date')(new Date(), $attrs.dateNow);
				ngModelCtrl.$setViewValue(text);
				ngModelCtrl.$render();
				return text;
		//	}
			ngModelCtrl.$parsers.push(fromUser);
//	      $element.text($filter('date')(new Date(), $attrs.dateNow));
//	      $element.val($filter('date')(new Date(), $attrs.dateNow));
	    }
	  };
	}])
		app.directive("dtMonChk", [function() {
		    return {
		        restrict: "A",
		        require: 'ngModel',
		        scope: {
		            ngModel: '='
		        },
		        link: function(scope, elem, attrs) {
		            angular.element(elem).on("blur", function(e) {
		                if (!/^(0[1-9]|1[0-2])\/\d{4}$/.test(scope.ngModel)) {
		                	scope.ngModel='';
		                	scope.$apply();
		                };
		            });
		        }
		    }
		}]);
app.directive('check404', function ($q) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            attrs.$observe('ngSrc', function (ngSrc) {
                var deferred = $q.defer();
                var image = new Image();
                image.onerror = function () {
                    deferred.resolve(false);
                    element.attr('src', 'resources/image/mission_image.jpg'); // set default image
                    viewer.update();
    				viewer.view(0);
                };
                image.onload = function () {
                    deferred.resolve(true);
                    viewer.update();
    				viewer.view(0);
                };
                image.src = ngSrc;
                
                return deferred.promise;
            });
        }
    };
});
app.directive('onlyNumbers', function () {
    return  {
        restrict: 'A',
        require : 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
        	element.on('keydown', function (event) {
                if(event.shiftKey){event.preventDefault(); return false;}
                if ([8, 13, 27, 37, 38, 39, 40].indexOf(event.which) > -1) {
                    // backspace, enter, escape, arrows
                    return true;
                } else if (event.which >= 49 && event.which <= 57) {
                    // numbers
                    return true;
                } else if (event.which >= 96 && event.which <= 105) {
                    // numpad number
                    return true;
                } 
                // else if ([110, 190].indexOf(event.which) > -1) {
                //     // dot and numpad dot
                //     return true;
                // }
                else {
                    event.preventDefault();
                    return false;
                }
            });
        }
    }
});
app.directive('myDatePicker', function () {
	  return {
	    restrict: "A",
	    require: "ngModel",
	    link: function (scope, elem, attrs, ngModelCtrl) {
	      var updateModel = function (dateText) {
	        scope.$apply(function () {
	          ngModelCtrl.$setViewValue(dateText);
	        });
	      };
	      var options = {
	        dateFormat: "dd/mm/yy",
	        changeMonth: true,
	        changeYear: true,
	        minDate: new Date(2015, 01 - 1, 31),
	        maxDate: new Date(2022, 12 - 1, 31),
	        onSelect: function (dateText) {
	          updateModel(dateText);
	        }
	      };
	      elem.datepicker(options);
	    }
	  }
	});
//app.factory('formHelper', function() {
//    return {
//        getCurrentForm: function(scope) {
//            var form = null;
//            var requiredFormProps = ["$error", "$name", "$dirty", "$pristine", "$valid", "$invalid"];
//            for (var p in scope) {
//                if (_.isObject(scope[p]) && !_.isFunction(scope[p]) && !_.isArray(scope[p]) && p.substr(0, 1) != "$") {
//                    var props = _.keys(scope[p]);
//                    if (props.length < requiredFormProps.length) continue;
//                    if (_.every(requiredFormProps, function(item) {
//                        return _.contains(props, item);
//                    })) {
//                        form = scope[p];
//                        break;
//                    }
//                }
//            }
//            return form;
//        }  
//    };
//});
//app.directive('ngRequired', function (formHelper) {
//    return {
//        require: 'ngModel',
//        restrict: "A",
//        link: function (scope, element, attr, ctrl) {
//
////	            if (!attr.name) {
////	                throw "valBubble must be set on an input element that has a 'name' attribute";
////	            }
//                
////	            var currentForm = formHelper.getCurrentForm(scope);
////	            if (!currentForm || !currentForm.$name)
////	                throw "valBubble requires that a name is assigned to the ng-form containing the validated input";
//
//            //watch the current form's validation for the current field name
////	            scope.$watch(currentForm.$name + "." + ctrl.$name + ".$valid", function (isValid, lastValue) {
////	                if (isValid != undefined) {
////	                    //emit an event upwards 
////	                    scope.$emit("valBubble", {
////	                        isValid: isValid,       // if the field is valid
////	                        element: element,       // the element that the validation applies to
////	                        expression: this.exp,   // the expression that was watched to check validity
////	                        scope: scope,           // the current scope
////	                        ctrl: ctrl              // the current controller
////	                    });
////	                }
////	            });
//            element.on('blur', function (s,ctrl) {
//                //write functionality here 
//                var currentForm = formHelper.getCurrentForm(scope);
////	            	alert("Validation changed for field " + currentForm[s.target.name].$valid+ ". Valid? ");
////	            	alert(s.target.validationMessage); // 
////	            	alert(s.target.attributes.reqmsg.value);
//if(!currentForm[s.target.name].$valid){
//            	  M.toast({html: s.target.attributes.reqmsg.value,classes:'red'});
//}
//             });
//        }
//    };
//});