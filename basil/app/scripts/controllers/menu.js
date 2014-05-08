angular.module("basilApp").controller("menuController", ["$scope", "authService", "gravatarService", function ($scope, authService, gravatarService) {
    $scope.name = false;
    $scope.avatar = false;

    authService.getName().then(function(name){
    	$scope.name = name;
    }, function(err){
    	console.log("We are not logged in");
    	$scope.name = false;
    });

    $scope.logout = function(){
    	authService.logout().then(function(res){
    		$scope.name = false;
    		$scope.avatar = false;
    	});
    }

    //when name is updated in the authService have it reflect on the page
    $scope.$watch( function () { return authService.name; }, function (name) {
    	console.log("name changed!");
    	if(!(typeof name === "undefined") &&!(name === null)){
			$scope.name = name;
			//if we don't yet have an avatar set we should
			//console.log($scope.avatar, name);
			if($scope.avatar == false && name != false){
				//console.log("Getting avatar");
				gravatarService.getGravatar(name).then(function(img){
					$scope.avatar = img;
		        });
			}
    	}
    });

    //TODO: we want to monitor the users image too
}]);
