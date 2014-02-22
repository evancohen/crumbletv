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
    streamingKey: {
      type: 'string',
    }

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
        generateStreamingKey(function (streamingKey) {
          attrs.streamingKey = streamingKey;
          callback();
        });
      }
    ], next);
  }

};

function generateStreamingKey(callback) {
  var streamingKey = uuid.v4();
  
  User.findOne({ streamingKey: streamingKey }, function (error, user) {
    if (error) {
      generateStreamingKey();
    }
    callback(streamingKey);
  });
}

