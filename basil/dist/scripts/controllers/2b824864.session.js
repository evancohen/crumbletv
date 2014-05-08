angular.module("basilApp").controller("sessionController", [
	"$scope", 
	"Restangular",
	function ($scope, Restangular) {
    $scope.success = "FALSE";
    console.log("Controller loaded")
    $scope.checkSession = function() {
    	console.log("Checking session");
      	Restangular.all("user").one("me").get().then(function(data){
      		console.log(data);
      		$scope.success = "TRUE";
      	});
    };
}]);

//pertains to