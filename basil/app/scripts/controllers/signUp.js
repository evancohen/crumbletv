angular.module("basilApp").controller("signUpController", [
	"$scope", 
    "$state",
	"Restangular", 
	function ($scope, $state, Restangular) {
    //Things will happen here
    $scope.name = "";
    $scope.email = "";
    $scope.password = "";
    $scope.success = "FALSE";

    $scope.createUser = function() {
    	var data = {
    		name     : $scope.name,
    		email    : $scope.email,
    		password : $scope.password
    	}

        if(name.indexOf(' ') >= 0){
            alert("Spaces are not aloud!");
            return false;
        }

    	Restangular.all("User").post(data).then(function(data){
    		console.log(data);
    		$scope.success = "TRUE";
        //Take me to the login page, Scotty!
        $state.go('login');
    	}, function(err){
        alert("Something went wrong", err);
      });
    };
}]);

//pertains to