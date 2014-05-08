angular.module("basilApp").controller("loginController", [
  "$scope", 
  "Restangular",
  function ($scope, Restangular) {
    //Things will happen here
    $scope.email = "";
    $scope.password = "";
    $scope.success = "FALSE";

    $scope.login = function() {
      var data = {
        email    : $scope.email,
        password : $scope.password
      }
        Restangular.all("User/login").post(data).then(function(data){
          $scope.success = "TRUE";
          data.
          console.log(data);
        });
    };
}]);