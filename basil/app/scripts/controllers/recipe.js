angular.module("basilApp").controller("recipeController", [
  "$scope", 
  "Restangular",
  function ($scope, Restangular) {
    $scope.recipeText = "";
    $scope.showID = "";

    $scope.success = "FALSE";


    $scope.createRecipe = function() {
      var data = {
        text    : $scope.recipeText,
        shows   : $scope.showID
      }
        Restangular.all("Recipe").post(data).then(function(data){
          $scope.success = "TRUE";
          console.log(data);
        });
    };
 }]);