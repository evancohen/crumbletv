angular.module("basilApp").controller("watchController", [
  "$scope", 
  "$stateParams",
  "gravatarService",
  function ($scope, $stateParams, gravatarService) {
  		$scope.streamName = $stateParams.name;
  		$scope.avatar = "http://placehold.it/100x100";
  		//$scope.chat = "http://beta.crumble.tv";
      	$scope.chat = "http://tlk.io/" + $scope.streamName;
		gravatarService.getGravatar($scope.streamName, 100).then(function(img){
        	$scope.avatar = img;
      	});

 }]);