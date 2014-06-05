angular.module("basilApp").controller("profileController", [
  "$scope", 
  "authService",
  "gravatarService",
  function ($scope, authService, gravatarService) {
    $scope.banner = "/static/images/banner.jpg";
    authService.getSelf().then(function (self){
      $scope.self = self;
      gravatarService.getGravatar(self.name, 500).then(function(img){
        $scope.avatar = img;
      });
    }, function (err){
      //alert('Please log in!');
    })
 }]);
/*
  broadcastKey: "d41ab821-855f-4257-b3c4-9cdec805733a"
  createdAt: "2014-05-22T20:58:37.000Z"
  email: "evanbtcohen@gmail.com"
  id: 1
  name: "evan"
  password: "$2a$10$MwxF65wcmplqXp8lPkZCs.ShNY6ksrUh03KENrPEHLSWLmN20xvuO"
  updatedAt: "2014-05-22T20:58:37.000Z"
*/