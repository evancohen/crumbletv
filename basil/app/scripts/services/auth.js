angular.module("basilApp").service("authService", ["Restangular", "$q",
function (Restangular, $q) {
	var User = {name : null};

	//with a default size of 80
	User.authenticate = function(email, password) {
		var deferred = $q.defer();

		var data = {
			email    : email,
			password : password
		}

        Restangular.all("User/login").post(data).then(function(res){
          //$cookieStore.put("user.name", res.name);
          deferred.resolve(res);
        });
        return deferred.promise;
    };

	return User;
}]);