angular.module("basilApp").controller("menuController", ["$scope", "authService", function ($scope, authService) {
    $scope.name = authService.getName();
}]);
