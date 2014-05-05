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

        Restangular.all("user/login").post(data).then(function(res){
          //$cookieStore.put("user.name", res.name);
          deferred.resolve(res);
        });
        return deferred.promise;
    };

    User.getName = function() {
    	var deferred = $q.defer();

        Restangular.one("user", "me").get().then(function(res){
          //$cookieStore.put("user.name", res.name);

          deferred.resolve(res.name);
        });
        return deferred.promise;
    }

	return User;
}]);