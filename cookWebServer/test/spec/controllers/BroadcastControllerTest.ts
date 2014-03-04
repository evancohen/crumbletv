/// <reference path="../../../References.d.ts"/>

// Common testing requirements
var assert: any = require('assert');
var sinon = require('sinon');
var lodash = <any>require('lodash');

// Test specific requirements
var BroadcastController = <any>require('../../../api/controllers/classes/BroadcastController.js');

describe('BroadcastController', function() {
    // Mocks
    var broadcastController: IBroadcastController;
    var request;
    var responseService;
    var response;
    var user;

    // Stubs
    var stubBroadcastKey = "IAmAKey";
    var stubName = "IAmAName";

    before(function(done) {
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
        it("should respond with invalidParameters for a missing tcurl", function(done) {
            broadcastController.publish(request, response);

            assert(responseService.invalidParameters.calledWith(response, ['tcurl']));
            done();
        });

        it("should respond with invalid parameters when the broadcastKey cannot be parsed from tcurl.", function(done) {
            request.body.name = stubName;
            request.body.tcurl = stubBroadcastKey;
            broadcastController.publish(request, response);

            assert(responseService.invalidParameters.calledWith(response, ['tcurl']));
            done();
        });

        it("should find one user with the name and parsed broadcastKey and respond with success", function(done) {
            var passedQuery;
            user.findOne = function (query, callback) {
                passedQuery = query;
                callback(null, {});
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
