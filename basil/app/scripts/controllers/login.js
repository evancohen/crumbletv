angular.module("basilApp").controller("loginController", [
  "$scope", 
  "Restangular",
  "gravatarService",
  "authService",
  function ($scope, Restangular, gravatarService, authService) {
    //Things will happen here
    $scope.email = "";
    $scope.password = "";
    $scope.success = "FALSE";
    $scope.avatar = "http://placehold.it/80x80";

    console.log(authService);

    $scope.login = function() {
      authService.authenticate($scope.email, $scope.password).then(function(res){
        $scope.success = "SUCCESS";
        console.log(res);
        gravatarService.getGravatar(res.name).then(function(img){
          console.log(img);
          $scope.avatar = img;
        });
      });
    };
}]);