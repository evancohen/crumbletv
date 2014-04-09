var sails = require("sails");
var bcrypt = require('bcrypt-nodejs');
var uuid = require('node-uuid');
var async = require('async');
var paymentService = require('../services/Payment.js');
var responseService = require('../services/ResponseService.js');

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

  getModel: function getModel() {
    return User;
  },

  publishShow: function (response, broadcastKey, name, showId) {
    getModel().findOne({ broadcastKey: broadcastKey, name: name }, function (error, user) {
      if (error) {
        return responseService.error(response, error);
      }
      if (!user) {
        return responseService.invalidParameters(response, ['broadcastKey', 'name']);
      }

      if (showId) {
        // lookup show
        Show.getModel().findOne(showId).done(function (error, show) {
          publishUserFindOneHandler(response, error, show)
        });
      } else {
        Show.getModel().create({
          startTime: new Date().toISOString(),
          live: true
        }, function (error) {
          if (error) {
            return responseService.error(response, error);
          }
          return responseService.success(response);
        })
      }


    });

  },

  currentUser: function currentUser(request) {
    return getModel().findOne(request.session.user);
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

  getModel().findOne({ broadcastKey: key }, function (error, user) {
    if (error) {
      generateBroadcastKey(callback);
    }
    callback(key);
  });
}


function publishUserFindOneHandler(error, show) {
  if (error) {
    return responseService.error(response, error);
  }

  show.live = true;
  show.save(function (error) {
    if (error) {
      return responseService.error(response, error);
    }

    return responseService.success(response);
  });
}
