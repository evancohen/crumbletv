var User = (function () {
    function User(sails, bcrypt, uuid, async, paymentService) {
        this.sails = sails;
        this.bcrypt = bcrypt;
        this.uuid = uuid;
        this.async = async;
        this.paymentService = paymentService;
        this.attributes = {
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
        };
    }
    User.prototype.getModel = function () {
        return this.sails.models.user;
    };

    User.prototype.currentUser = function (request) {
        return this.getModel().findOne(request.session.user);
    };

    User.prototype.beforeCreate = function (attributes, callback) {
        var _this = this;
        this.async.parallel([
            function (callback) {
                _this.bcrypt.genSalt(10, function (err, salt) {
                    if (err) {
                        return callback(err);
                    }

                    return _this.bcrypt.hash(attributes.password, salt, null, function (error, hash) {
                        if (error) {
                            return callback(error);
                        }

                        attributes.password = hash;
                        return callback();
                    });
                });
            },
            function (callback) {
                _this.generateBroadcastKey(function (broadcastKey) {
                    attributes.broadcastKey = broadcastKey;
                    callback();
                });
            }
        ], callback);
    };

    User.prototype.afterCreate = function (updatedRecord, callback) {
        var _this = this;
        this.async.parallel([
            function (callback) {
                _this.paymentService.stripe.customers.create({
                    email: updatedRecord.email
                }, function (err, customer) {
                    callback();
                });
            }
        ], callback);
    };

    User.prototype.generateBroadcastKey = function (callback) {
        var _this = this;
        var key = this.uuid.v4();

        this.getModel().findOne({ broadcastKey: key }, function (error, user) {
            if (error) {
                _this.generateBroadcastKey(callback);
            }
            callback(key);
        });
    };
    return User;
})();

var ExportService = require("../services/ExportService.js");
var UserExport = new User(require("sails"), require('bcrypt-nodejs'), require('node-uuid'), require('async'), require('../services/Payment.js'));
UserExport = ExportService.createSingletonFromClass(UserExport);
module.exports = exports = UserExport;
