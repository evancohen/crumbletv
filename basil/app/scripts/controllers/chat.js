angular.module("basilApp").controller("chatController", [
  "$scope", 
  "$stateParams",
  function ($scope, $stateParams) {
    	$scope.chat = "http://tlk.io/" + $stateParams.name;
      //Just fucking hack it
      //$('.deadicated-chat').css('height',$(window).height()+'px');
 }]);