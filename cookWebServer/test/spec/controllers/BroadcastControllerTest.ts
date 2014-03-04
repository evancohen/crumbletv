/// <reference path="../../../References.d.ts"/>

// Common testing requirements
var assert: any = require('assert');
var sinon = require('sinon');
var lodash = <any>require('lodash');
var proxyquire =  require('proxyquire')

describe('BroadcastController', function() {
    // Mocks
    var broadcastController: IBroadcastController;
    var request;
    var responseService;
    var response;
    var user;
    var exportServiceMock

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
        exportServiceMock = {
            export: function (object) {
                return object
            }
        };
        broadcastController = (<IBroadcastController>proxyquire(
            '../../../api/controllers/BroadcastController.js', {
                "../models/User.js": user,
                "../services/ResponseService.js": responseService,
                "../service/ExportService.js": exportServiceMock
            }));
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

        it("should find one user with a valid name and parsed broadcastKey and respond with success", function(done) {
            var passedQuery;
            user.getModel = () => {
                return {
                    findOne: function (query, callback) {
                        passedQuery = query;
                        callback(null, {});
                    }
                }
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
