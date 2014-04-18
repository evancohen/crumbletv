angular.module("basilApp").controller("signUpController", [
	"$scope", 
	"Restangular", 
	function ($scope, Restangular) {
    //Things will happen here
    $scope.fname = "";
    $scope.email = "";
    $scope.password = "";
    $scope.success = "FALSE";

    $scope.createUser = function() {
    	var data = {
    		name     : $scope.fname,
    		email    : $scope.email,
    		password : $scope.password
    	}

      	Restangular.all("User").post(data).then(function(data){
      		console.log(data);
      		$scope.success = "TRUE";
      	});
    };
}]);

//pertains to