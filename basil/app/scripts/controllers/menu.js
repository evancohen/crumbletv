angular.module("basilApp").controller("menuController", ["$scope", "authService", function ($scope, authService) {
    $scope.name = "";
    authService.getName().then(function(name){
    	$scope.name = name;
    });
}]);
