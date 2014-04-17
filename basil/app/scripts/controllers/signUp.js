angular.module("basilApp").controller("signUpController", ["$scope", "Restangular", function ($scope, Restangular) {
    //Things will happen here
    $scope.fname = "";
    $scope.email = "";
    $scope.password = "";
    $scope.success = "FALSE";

    $scope.createUser = function() {
    	var data = {
    		name     : $scope.fname,
    		email    : $scope.email,
    		password : $scope.password
    	}
    	console.log(data);
    	//var user = Restangular.one('User')
      	Restangular.all("User").post(data).then(function(data){
      		console.log(data);
      		$scope.success = "TRUE";
      	});


		 /*$http.post("http://localhost:1337/User", data)
		 	.success(function(){

		 	})
		 	.failure(function(){

		 	});*/
    };
}]);
