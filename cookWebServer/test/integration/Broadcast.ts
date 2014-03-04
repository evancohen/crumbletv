var Sails = require('sails');
var assert = require('assert');
var request = require('supertest');

var express;
var sails;


/**
 * Before ALL the test bootstrap the server
 */
//var app;
before(function(done) {
    this.timeout(5000);

    // TODO: test specifc database adapter
    Sails.lift({

        log: {
            level: 'error'
        },

        express: {
            customMiddleware: function (_express) {
                express = _express;
            }
        }

    }, function(err, _sails) {
        sails = _sails;
        done(err, sails);
    });
});

describe('Broadcast', function() {
    var stubName = "LordCodyOfTheRoyalFamily";
    var stubEmail = "email@email.com";
    var stubPassword = "The password is password";
    var stubTcurl = "fooLark?key=";

    describe('/publish', function() {
        this.timeout(5000);
        it('should return 200 for a valid tcurl and name', function (done) {
            User.create({
                name: stubName,
                email: stubEmail,
                password: stubPassword
            }, (error, user) => {
                request(express)
                    .post('/broadcast/publish')
                    .send({
                        'tcurl' : (stubTcurl + user.broadcastKey),
                        'name': stubName
                    })
                    .expect(200, done);
            });
        });
    });
});

after(function(done) {
    // TODO: Clean up db
    sails.lower(done);
});