var assert = require('assert');
var sinon = require('sinon');
var BroadcastController = require('../../../api/controllers/classes/BroadcastController.js');
var lodash = require('lodash');

describe('BroadcastController', function (done) {
    var broadcastController;
    var request;
    var responseService;
    var response;
    var user;

    before(function (done) {
        request = {
            body: {}
        };
        response = {
            json: sinon.spy()
        };
        responseService = {
            invalidParameters: sinon.spy(),
            error: sinon.spy(),
            success: sinon.spy()
        };
        user = {};
        broadcastController = new BroadcastController(user, responseService);
        done();
    });

    describe('.publish', function (done) {
        it("should respond with invalidParameters for a missing tcurl", function (done) {
            broadcastController.publish(request, response);

            assert(responseService.invalidParameters.calledWith(response, ['tcurl']));
            done();
        });

        it("should find one user with the name and parsed broadcastKey and respond with success", function (done) {
            var broadcastKey = "IAmAKey";
            var name = "IAmAName";
            var passedQuery;
            user.findOne = function (query, callback) {
                passedQuery = query;
                callback(null, {});
            };
            request.body.name = name;
            request.body.tcurl = "fakeTCURL?key=" + broadcastKey;

            broadcastController.publish(request, response);

            assert(lodash.isEqual(passedQuery, { broadcastKey: broadcastKey, name: name }));
            assert(responseService.success.calledWith(response));
            done();
        });
    });
});
