/**
 * StripeController
 *
 * @module      :: Controller
 * @description :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var responseService = require('../services/ResponseService.js');
var paymentService = require('../services/Payment.js');

module.exports = {
  //Ensure that we are using HTTPS before letting any requests through
  //TODO: add a beforeCreate type thing
  isSecure: function (req, res){
    return ('https' == req.protocol);
  },
  //stripe credentials
  
  /**
   * Action blueprints:
   *    `/stripe/index`
   *    `/stripe`
   */
   index: function (req, res) {
    // Send a JSON response
    return res.json({
      whatIs : "A list of all of the users current subscriptions"
    });
  },

  create: function (req, res){
    if(!isAuthenticated()){
      return responseService.forbidden(res);
    }
    var id = req.session.user;
    //do we have to require User?
    User.currentUser(res).done(function(err, user){
      if(err){
        return responseService.failed(res, "Could not find user");
      }
      var data = {id : id, email : user.email};
      //create the Stripe customer
      paymentService.createCustomer(data, function(err, customer){
          if(err){
            return responseService.failed(res, err.type);
          }
        return responseService.success(res, "Customer account created");
      });
    });
  },

  get: function(req, res){
    if(!isAuthenticated()){
      return responseService.forbidden(res);
    }
    var data = {id : req.session.user};
    paymentService.getCustomer(data, function(err, customer) {
      // asynchronously called
      if(err){
        return responseService.notFound(res, "Customer account not found");
      }
      return responseService.success(res, "Customer account exists");
    });
  },

  //If this function is called then the customer account MUST already exist
  //or you will get an error.
  //Also, lets make sure that someone cant use a zero byte image to
  //post to this. that would be dumb. 
  //We may want to force the user to enter their password when doing this.
  tip: function(req, res){
    if(!isAuthenticated()){
      return responseService.forbidden(res);
    }
    //target must be a valid user name
    var target = req.param('target');
    var ammount = req.param('ammount');
    //var password = req.param('password');

    var details = {
      ammount : ammount,
      currency : "usd",
      description : "Tip",
      metadata : {'Destination' : target}
    }

    var card = req.param('card');
    if(!card){
      //If we are not given a card, we will use the customers default value of payment
      details.id = req.session.user;
    }else{
      details.card = card;
    }
    paymentService.tip(details, function(err, charge){
      if(err){
        return responseService.failed(res, "Could not complete transaction");
      }
      return responseService.success(res, {id : charge.id}, "Transaction Complete");
      //TODO send notification to chat server saying X has tipped
    });
  },

  //TODO fix this method to funciton with subscription model
  //check if they are currently subscribed to any other users
  //  if they are then update subscription
  //  otherwise update their subscription to be + 1
  subscribe: function (req, res) {
    var target = req.param('target');

    //get the user object, get their subsciption id, if it doesnt exist, create a subscription

    var data = {
      plan : "subscription",
      id : req.session.user,
      quantity : 1 //TODO this must be computed baised on the number
    }

    if(!target){
      return responseService.invalidParameters(res, ['target']);
    }
    // Send a JSON response
    return responseService.success(res, {
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
