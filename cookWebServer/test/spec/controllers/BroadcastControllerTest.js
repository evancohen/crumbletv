var assert = require('assert');
var sinon = require('sinon');
var lodash = require('lodash');

var BroadcastController = require('../../../api/controllers/classes/BroadcastController.js');

describe('BroadcastController', function () {
    var broadcastController;
    var request;
    var responseService;
    var response;
    var user;

    var stubBroadcastKey = "IAmAKey";
    var stubName = "IAmAName";

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

    describe('.publish', function () {
        it("should respond with invalidParameters for a missing tcurl", function (done) {
            broadcastController.publish(request, response);

            assert(responseService.invalidParameters.calledWith(response, ['tcurl']));
            done();
        });

        it("should respond with invalid parameters when the broadcastKey cannot be parsed from tcurl.", function (done) {
            request.body.name = stubName;
            request.body.tcurl = stubBroadcastKey;
            broadcastController.publish(request, response);

            assert(responseService.invalidParameters.calledWith(response, ['tcurl']));
            done();
        });

        it("should find one user with a valid name and parsed broadcastKey and respond with success", function (done) {
            var passedQuery;
            user.getModel = function () {
                return {
                    findOne: function (query, callback) {
                        passedQuery = query;
                        callback(null, {});
                    }
                };
            };
            request.body.name = stubName;
            request.body.tcurl = "fakeTCURL?key=" + stubBroadcastKey;

            broadcastController.publish(request, response);

            assert(lodash.isEqual(passedQuery, { broadcastKey: stubBroadcastKey, name: stubName }));
            assert(responseService.success.calledWith(response));
            done();
        });
    });
});
