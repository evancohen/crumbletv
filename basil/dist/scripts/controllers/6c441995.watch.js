angular.module("basilApp").controller("watchController", [
  "$scope", 
  "stateParams",
  function ($scope, stateParams) {
  		$scope.streamName = $stateParams.name;
 }]);