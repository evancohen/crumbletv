var sails = require("sails");
var bcrypt = require('bcrypt-nodejs');
var uuid = require('node-uuid');
var async = require('async');

var Show = require('../models/Show.js');
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
    },

    shows: {
      collection: 'Show',
      via: 'owner'
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

  beforeCreate: function beforeCreate(attributes, callback) {
    async.parallel([
      function (callback) {
        bcrypt.genSalt(10, function (err, salt) {
          if (err) {
            return callback(err);
          }

          return bcrypt.hash(attributes.password, salt, null, function (error, hash) {
            if (error) {
              return callback(error);
            }

            attributes.password = hash;
            return callback();
          });
        });
      },
      function (callback) {
        generateBroadcastKey(function (broadcastKey) {
          attributes.broadcastKey = broadcastKey;
          callback();
        });
      }
    ], callback);
  },

  afterCreate: function afterCreate(updatedRecord, callback) {
    async.parallel([
      function (callback) {
        paymentService.stripe.customers.create({
          email: updatedRecord.email
        }, function (err, customer) {
          callback();
        });
      }
    ], callback);
  }
};

function generateBroadcastKey(callback) {
  var key = uuid.v4();

  sails.models.User.findOne({ broadcastKey: key }, function (error, user) {
    if (error) {
      generateBroadcastKey(callback);
    }
    callback(key);
  });
}


