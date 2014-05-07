var AS;

angular.module("basilApp").controller("menuController", ["$scope", "authService", function ($scope, authService) {
    AS = authService;
    $scope.name = false;

    authService.getName().then(function(name){
    	$scope.name = authService.name;
    }, function(err){
    	$scope.name = false;
    });

    //when name is updated in the authService have it reflect on the page
    $scope.$watch( function () { return authService.name; }, function ( name ) {
    	if(!(name === null)){
			$scope.name = name;
    	}
    });
}]);
