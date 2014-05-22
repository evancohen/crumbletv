angular.module("basilApp").service("notificationService", 
function (Restangular, $q) {
	
	var Notification = {
		content : null,
	}

	//with a default size of 80
	function notify(message, duration) {
	    Notification.content = message;
	    Notification.duration = duration || 10000; //default 10 seconds

	    var deferred = $q.defer();

	    setTimeout(function(){
	    	Notification.content = null;
	    	deferred.resolve();
	    }, duration);


	    return deferred.promise;
	}

	return {Notification : Notification, notify: notify};
});