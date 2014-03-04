/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var bcrypt = require('bcrypt-nodejs');
var uuid = require('node-uuid');
var async = require('async');
var paymentService = require('../services/Payment.js');

module.exports = {

  attributes: {

    name: {
      type: 'string',
      unique: true,
      required: true
    },  	

    email: {
      type: 'email',
      unique: true,
      required: true
    },

    password: {
      type: 'string',
      required: true,
      minLength: 6
    },
    
    broadcastKey: {
      type: 'string'
    }

    /*
Cody's quick sketch of the relationship for subscriptions

// User.js
{
  paidSubscriptions: {
    collection: 'Subscription',
    via: 'subscriber'
  },
  collectedSubscriptions: {
    collection: 'Subscription',
    via: 'subscriberPayee'
  }
}


    */

  },

  beforeCreate: function (attrs, next) {
    async.parallel([
      function (callback) {
        // bcrypt user password on creation
        bcrypt.genSalt(10, function(err, salt) {
          if (err) return next(err);

          bcrypt.hash(attrs.password, salt, null, function(err, hash) {
            if (err) return next(err);

            attrs.password = hash;
            callback();
          });

        });
      },
      function (callback) {
        generateBroadcastKey(function (broadcastKey) {
          attrs.broadcastKey = broadcastKey;
          callback();
        });
      }
    ], next);
  },

  afterCreate : function (updatedRecord, next){
    async.parallel([
    function (callback) {
        //create payment information
        paymentService.stripe.customers.create({
          email : updatedRecord.email
        }, function(err, customer) {
          // asynchronously called by stripe
          //TODO: error handeling for Stripe
          callback();
        });
      }
    ], next);
  },

  // Returns a findOne object which you can access using 
  // getUser(res).done(function(err, user){
  //    ...  
  //  });
  currentUser : function (req){
    return User.findOne(req.session.user);
  },

  // TODO: make a base model interface that requires this method!! so offical.
  getModel: function (){
    return User;
  }

};

function generateBroadcastKey(callback) {
  var key = uuid.v4();
  
  User.findOne({ broadcastKey: key }, function (error, user) {
    if (error) {
      // Attempt again?
      generateBroadcastKey();
    }
    callback(key);
  });
}