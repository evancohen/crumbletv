angular.module("basilApp").controller("subscribeController", ["$scope", "Restangular", function ($scope, Restangular) {
    //Things will happen here
    $scope.username = "";
    $scope.subTo = "";
    $scope.success = "FALSE";

    $scope.createSubscription = function() {
    	var data = {
    		subscriber      : $scope.username,
    		subscriberPayee : $scope.subTo
    	}
    	console.log(data);
    	//var user = Restangular.one('User')
      	Restangular.all("Subscription").post(data).then(function(data){
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
