module.exports = {

	stripe : require('stripe')(this.getStripeKey),

	//Retreive the stripe key from session configuration
	getStripeKey : function(req, res){
		return res.sails.config.session.stripe;
	},

	//data contains a Customer ID and an email
	createCustomer : function(data, callback){
		stripe.customers.create(data, callback);
	},

	getCustomer : function(data, callback){
		stripe.customers.retrieve(id, callback);
	},

	deleteCustomer: function(data, callback){
		stripe.customers.del(data.id, callback);
	},

	tip : function(data, callback){
		stripe.charges.create(data, callback);
	},

	subscribe : function(data, callback){
		stripe.customers.createSubscription(data.id, 
			{
				plan : data.plan,
				quantity : data.quantity
			}, 
			callback);
	},

	//customer ID and subscription ID (obtained from the customer object)
	retrieveSubscription : function(data, callback){
		stripe.customers.retrieveSubscription(data.id, data.subscriptionId, callback);
	},

	updateSubscription : function(data, callback){
		stripe.customers.updateSubscription(data.id, {
				plan : data.plan,
				quantity : data.quantity
			},
			callback)
	},

	cancelSubscription : function(data, callback){
		stripe.customers.cancelSubscription(data.id, data.subscriptionId, callback);
	},

	//gets a list of subscriptions (first 10 can also be found on customer object)
	listSubscriptions : function(data, callback){
		stripe.customers.listSubscriptions(data.id, callback);
	},

	//BELOW are card related wrapper functions

	//if customer has no card their fist create becomes default card
	//needs customer_id, card and returns the card object
	createCard : function(data, callback){
		stripe.customers.createCard(data.id, 
		{
			card: data.cardToken
		},
		callback);
	},

	//Cards can be updated with just some of their
	//stripe.customers.retrieveCard(
	//  {CUSTOMER_ID},
	//  {CARD_ID},
	//  funciton(card) {...}
	//);

	retrieveCard: function(data, callback){
		stripe.customers.retrieveCard(data, callback);
	},

	updateCard: function(data, callback) {
		stripe.customers.updateCard(data,
		{
			name: data.name
		},
		callback);
	},

	deleteCard: function(data, callback){
		stripe.customers.deleteCard(data, callback);
	},


	// Needs the customer_id and returns array of seperate card data as 'data'
	listCards: function(data, callback){
		stripe.customers.listCards(data.id, callback);
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
	},

	// callback accepts 2 paramaters: err, results (list of customers)
	listCustomers : function(callback){
		stripe.customers.list(callback);
	}
}