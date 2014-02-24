module.exports = {

	stripe : require('stripe')(this.getStripeKey),

	//Retreive the stripe key from session configuration
	getStripeKey : function(req, res){
		return res.sails.config.session.stripe;
	},

	// Note: Node.js API does not throw exceptions (except in
	// the case of missing arguments)
	//
	// An error from the Stripe API or an otheriwse asynchronous error
	// will be available as the first argument of any Stripe method's callback:
	// E.g. stripe.customers.create({...}, function(err, result) {});
	//
	// Or in the form of a rejected promise.
	// E.g. stripe.customers.create({...}).then(
	//        function(result) {},
	//        function(err) {}
	//      );
	

	error : function(err){
		switch (err.type) {
			case 'StripeCardError':
				// A declined card error
				err.message; // => e.g. "Your card's expiration year is invalid."
				break;
			case 'StripeInvalidRequestError':
				// Invalid parameters were supplied to Stripe's API
				break;
			case 'StripeAPIError':
				// An error occurred internally with Stripe's API
				break;
			case 'StripeConnectionError':
				// Some kind of error occurred during the HTTPS communication
				break;
			case 'StripeAuthenticationError':
				// We probably used an incorrect API key
				break;
			}
	}
}