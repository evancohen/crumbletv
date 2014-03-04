
var ResponseService = (function () {
    function ResponseService() {
    }
    ResponseService.prototype.invalidParameters = function (response, parameters) {
        return this.json(response, 'Invalid Parameters: ' + parameters.join(", "), 401);
    };

    ResponseService.prototype.success = function (response, data, message) {
        if (typeof message === "undefined") { message = 'Success. Happy Cooking :)!'; }
        return this.json(response, message, 200, data);
    };

    ResponseService.prototype.forbidden = function (response, error) {
        if (typeof error === "undefined") { error = "Forbidden"; }
        return this.json(response, error, 403);
    };
    ResponseService.prototype.failed = function (response, error) {
        if (typeof error === "undefined") { error = "Failed"; }
        return this.json(response, error, 402);
    };

    ResponseService.prototype.notFound = function (response, error) {
        if (typeof error === "undefined") { error = "Not Found"; }
        return this.json(response, error, 404);
    };

    ResponseService.prototype.error = function (response, error) {
        if (typeof error === "undefined") { error = "Internal Server Error."; }
        return this.json(response, error, 500);
    };

    ResponseService.prototype.json = function (response, message, status, data) {
        var jsonResponse = {
            status: status,
            message: message
        };

        if (data) {
            jsonResponse['data'] = data;
        }

        return response.json(jsonResponse, status);
    };
    return ResponseService;
})();
var Sails = require('sails');
var assert = require('assert');

var request = require('supertest');
var sinon = require('sinon');
var BroadcastController = require('../../api/controllers/BroadcastController.ts');

var app;
before(function (done) {
    this.timeout(5000);

    Sails.lift({
        log: {
            level: 'error'
        }
    }, function (err, sails) {
        app = sails;
        done(err, sails);
    });
});

describe('BroadcastController', function (done) {
    var broadcastController;
    var request;
    var responseService;
    var response;
    var user;

    before(function (done) {
        request = {
            param: sinon.spy()
        };
        response = {
            json: sinon.spy()
        };
        responseService = {
            invalidParameters: sinon.spy(),
            error: sinon.spy(),
            success: sinon.spy()
        };
        user = {
            findOne: sinon.spy()
        };
        BroadcastController._user = user;
        BroadcastController._responseService = responseService;

        done();
    });

    describe('.publish', function (done) {
        it("should ", function (done) {
            var tcurl = "fakeData";
            var name = "fakeName?key=test";

            broadcastController.publish(request, response);

            done();
        });
    });
});

after(function (done) {
    app.lower(done);
});
