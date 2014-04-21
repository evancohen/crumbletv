angular.module("basilApp").controller("eventController", [
  "$scope", 
  "Restangular",
  function ($scope, Restangular) {
  	$scope.eventTitle = "";
    $scope.startDate = "";//TODO: pull date and time from calendar
    $scope.endDate = "";//TODO: pull date and time from calendar
    $scope.ownerID = 2; //TODO: Pull owner id automatically
    $scope.showID = 1; //TODO: Pull show id automatically
    $scope.success = "FALSE";


    $scope.createEvent = function() {
      var data = {
        title     : $scope.eventTitle,
        owner     : $scope.ownerID,
        show      : $scope.showID,
        startDate : $scope.startDate,
        endDate   : $scope.endDate
      }
        Restangular.all("Event").post(data).then(function(data){
          $scope.success = "TRUE";
          console.log(data);
        });
    };
 }]);