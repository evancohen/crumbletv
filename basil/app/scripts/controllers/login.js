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

    //console.log(authService);

    $scope.login = function() {
      var data = {
        email    : $scope.email,
        password : $scope.password
      }
        Restangular.all("User/login").post(data).then(function(data){
          $scope.success = "TRUE";
          console.log(data);
      authService.authenticate($scope.email, $scope.password).then(function(res){

        //Get the gravatar for the user
        gravatarService.getGravatar(res.name).then(function(img){
          $scope.avatar = img;
        });

        $scope.success = "SUCCESS";
      }, function(err){
        //could not authenticate
        console.log('Could not authenticate');
        alert("Incorrect username or Password!");
      });
    };
}]);