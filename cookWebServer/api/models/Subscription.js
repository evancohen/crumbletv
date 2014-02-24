/**
 * Subscription
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
    /*The subscription/subscriber relation is a little wacky.
        In a one-to-many association one side must have a collection attribute and 
        the other side must contain a model attribute.
      So: A user has many subscribers (our collection is then 'subscribers')
      A subscriber can have meny subscriptions which we group together accordingly
    */
    /*subscriber: {
		model: 'user'
	},
	subscriberPayee: {
		model: 'user'
	}*/
    
  }

};