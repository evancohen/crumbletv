angular.module("basilApp").service("gravatarService", ["Restangular", "$q", 
function (Restangular, $q) {
	
	var Gravatar = {
		init : true,
		stored : {}
	}

	//with a default size of 80
	function getGravatar(name, size) {
	    var size = size || 80;

	    var deferred = $q.defer();

	    //if we already have the url stored don't fetch it again
	    if(!(typeof Gravatar.stored[name] === "undefined")){
	    	deferred.resolve(Gravatar.stored[name] + "?s=" + size);
	    }

	    Restangular.all("gravatar").one('get', name).get().then(function(res){
	    	Gravatar.stored[name] = res.image;
	    	deferred.resolve(Gravatar.stored[name] + "?s=" + size);
	    });

	    return deferred.promise;
	}

	return {getGravatar: getGravatar};
}]);