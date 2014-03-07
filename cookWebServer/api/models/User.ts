/// <reference path="../../References.d.ts"/>

/**
 * User
 *
 * @description :: TODO.
 */
class User implements IBaseModel {

    public attributes = {
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
    };

    constructor(private sails: any,
                private bcrypt: any,
                private uuid: any,
                private async: any,
                private paymentService: any) {}

    public getModel() {
        return this.sails.models.user;
    }

    public currentUser(request) {
        return this.getModel().findOne(request.session.user);
    }

    public beforeCreate(attributes, callback) {
        this.async.parallel([
            (callback) => {
                // bcrypt user password on creation
                this.bcrypt.genSalt(10, (err, salt) => {
                    if (err) {
                        return callback(err);
                    }

                    return this.bcrypt.hash(attributes.password, salt, null, (error, hash) => {
                        if (error) {
                            return callback(error);
                        }

                        attributes.password = hash;
                        return callback();
                    });

                });
            },
            (callback) => {
                this.generateBroadcastKey(function (broadcastKey) {
                    attributes.broadcastKey = broadcastKey;
                    callback();
                });
            }
        ], callback);
    }

    public afterCreate(updatedRecord, callback) {
        this.async.parallel([
            (callback) => {
                //create payment information
                this.paymentService.stripe.customers.create({
                    email : updatedRecord.email
                }, function(err, customer) {
                    // asynchronously called by stripe
                    //TODO: error handeling for Stripe
                    callback();
                });
            }
        ], callback);
    }

    private generateBroadcastKey(callback) {
        var key = this.uuid.v4();

        this.getModel().findOne({ broadcastKey: key }, (error, user) => {
            if (error) {
                // Attempt again?
                this.generateBroadcastKey(callback);
            }
            callback(key);
        });
    }
}

var ExportService  = <IExportService>require("../services/ExportService.js");
var UserExport = new User(require("sails"),
                          require('bcrypt-nodejs'),
                          require('node-uuid'),
                          require('async'),
                          require('../services/Payment.js'));
UserExport = ExportService.exportController(UserExport)
module.exports = exports = UserExport;