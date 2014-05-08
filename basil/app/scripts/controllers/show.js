angular.module("basilApp").controller("showController", [
  "$scope", 
  "Restangular",
  function ($scope, Restangular) {
  	$scope.showTitle = "";
    $scope.startTime = "";//TODO: pull date and time from calendar
    $scope.endTime = "";//TODO: pull date and time from calendar
    $scope.ownerID = ""; //TODO: Pull owner id automatically

    $scope.success = "FALSE";


    $scope.createShow = function() {
      var data = {
        title     : $scope.showTitle,
        owner     : $scope.ownerID,
        startTime : $scope.startTime,
        endTime   : $scope.endTime
      }
        Restangular.all("Show").post(data).then(function(data){
          $scope.success = "TRUE";
          console.log(data);
        });
    };
 }]);