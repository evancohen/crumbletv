angular.module("basilApp").service("authService", ["Restangular", "$q",
function (Restangular, $q) {
	var User = {
    name : null
  };

	//with a default size of 80
	User.authenticate = function(email, password) {
    var _self = this;
		var deferred = $q.defer();

    Restangular.all("user/login").post({email : email, password : password }).then(
      function(res){
      //$cookieStore.put("user.name", res.name);
      if(!(typeof res === "undefined")){
        _self.name = res.name;
        deferred.resolve(res);
      }
      deferred.reject(res);
    }, function(err){
      console.log(err);
      deferred.reject(err);
    });
    return deferred.promise;
  };

  User.getName = function() {
    var _self = this;
  	var deferred = $q.defer();

      Restangular.one("user", "me").get().then(function(res){
        //$cookieStore.put("user.name", res.name);
        if(!(typeof res === "undefined")){
          _self.name = res.name;
          deferred.resolve(res.name);
        }
        deferred.reject('User is not logged in');
      });
      return deferred.promise;
  };

  User.logout = function() {
    var deferred = $q.defer();
    Restangular.one("user", "logout").get().then(function(res){
      //this can not fail
      deferred.resolve(res);
    });
    return deferred.promise;
  };

	return User;
}]);
