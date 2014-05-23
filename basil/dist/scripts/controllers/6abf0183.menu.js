angular.module("basilApp").controller("menuController", ["$scope", "authService", "gravatarService", "notificationService", function ($scope, authService, gravatarService, notificationService) {
    $scope.name = false;
    $scope.avatar = undefined;

    authService.getName().then(function(name){
    	$scope.name = name;
    }, function(err){
    	//we are not authorised
    	$scope.name = false;
    });

    $scope.logout = function(){
    	authService.logout().then(function(res){
    		$scope.name = false;
    		$scope.avatar = undefined;
    	});
    }

    //when name is updated in the authService have it reflect on the page
    $scope.$watch( function () { return authService.name; }, function (name) {
    	if(!(typeof name === "undefined") &&!(name === null)){
			$scope.name = name;
			//if we don't yet have an avatar set we should
			//console.log($scope.avatar, name);
			if($scope.avatar == undefined && name != false){
				//console.log("Getting avatar");
				gravatarService.getGravatar(name).then(function(img){
					$scope.avatar = img;
		        });
			}
    	}
    });

    $scope.$watch( function () { return notificationService.notification; }, function (notification) {
        console.log("notification changed!");
        if(!(typeof notification === "undefined") &&!(notification === null)){
            $scope.notification = notification;
        }
    });

    //TODO: we want to monitor the users image too
}]);
