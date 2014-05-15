angular.module("basilApp").controller("watchController", [
	"$scope", 
	'$stateParams',
	function ($scope, $stateParams) {
		//todo check the name passed in
		$scope.streamName = "omelet";
	}
]);
