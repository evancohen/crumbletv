/**
 * StripeController
 *
 * @module      :: Controller
 * @description :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to responsepond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var responseService = require('../services/responseService.js');
var paymentService = require('../services/Payment.js');
var User = require('../models/User.js');

module.exports = {
  //Ensure that we are using HTTPS before letting any requestuests through
  //TODO: add a beforeCreate type thing
  isSecure: function (request, response){
    return ('https' == request.protocol);
  },
  
  index: function (request, response) {
    // Send a JSON response
    return response.json({
      whatIs : "A list of all of the users current subscriptions"
    });
  },

  create: function (request, response){
    if(!isAuthenticated()){
      return responseService.forbidden(response);
    }
    var id = request.session.user;
    //do we have to request User?
    User.currentUser(response).done(function(err, user){
      if(err){
        return responseService.failed(response, "Could not find user");
      }
      var data = {id : id, email : user.email};
      //create the Stripe customer
      paymentService.createCustomer(data, function(err, customer){
          if(err){
            return responseService.failed(response, err.type);
          }
        return responseService.success(response, "Customer account created");
      });
    });
  },

  get: function(request, response){
    if(!isAuthenticated()){
      return responseService.forbidden(response);
    }
    var data = {id : request.session.user};
    paymentService.getCustomer(data, function(err, customer) {
      // asynchronously called
      if(err){
        return responseService.notFound(response, "Customer account not found");
      }
      return responseService.success(response, "Customer account exists");
    });
  },

  //If this function is called then the customer account MUST already exist
  //or you will get an error.
  //Also, lets make sure that someone cant use a zero byte image to
  //post to this. that would be dumb. 
  //We may want to force the user to enter their password when doing this.
  tip: function(request, response){
    if(!isAuthenticated()){
      return responseService.forbidden(response);
    }
    //target must be a valid user name
    var target = request.param('target');
    var ammount = request.param('ammount');
    //var password = request.param('password');

    //TODO insure that paramters are valid otherwise error out

    var details = {
      ammount : ammount,
      currency : "usd",
      description : "Tip",
      metadata : {'Destination' : target}
    }

    var card = request.param('card');
    if(!card){
      //If we are not given a card, we will use the customers default value of payment
      details.id = request.session.user;
    }else{
      details.card = card;
    }
    paymentService.tip(details, function(err, charge){
      if(err){
        return responseService.failed(response, "Could not complete transaction");
      }
      return responseService.success(response, {id : charge.id}, "Transaction Complete");
      //TODO send notification to chat server saying X has tipped
    });
  },

  //TODO fix this method to funciton with subscription model
  //check if they are currently subscribed to any other users
  //  if they are then update subscription
  //  otherwise update their subscription to be + 1
  subscribe: function (request, response) {
    var target = request.param('target');

    //get the user object, get their subsciption id, if it doesnt exist, create a subscription

    var data = {
      plan : "subscription",
      id : request.session.user,
      quantity : 1 //TODO this must be computed baised on the number
    }

    if(!target){
      return responseService.invalidParameters(response, ['target']);
    }
    // Send a JSON response
    return responseService.success(response, {
      whatIs : "Accepts a username and then addes them to subscriptions",
      target : target
    });
  },

  



  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to StripeController)
   */
  _config: {}

  
};
