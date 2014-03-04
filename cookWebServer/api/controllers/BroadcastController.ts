/// <reference path="../../References.d.ts"/>



// Dependencies for BroadcastController
var ResponseService = <any>require("../services/ResponseService.js");
var BroadcastController = <any>require("./classes/BroadcastController.js");
var User = <any>require("../models/User.js");
var lodash = require("lodash");



// Exports BroadcastController with the necessary dependencies.
// Since User is not defined when sails first runs, it must be passed in a simple factory.
var BroadcastExport = new BroadcastController(User, new ResponseService());

// Some serious JS foo here.
// TODO: move this to a service so the logic can be reused.
var exportSingleton = {};
lodash.forIn(BroadcastExport, function(method, key) {
    if (lodash.isFunction(method)) {
        exportSingleton[key] = lodash.bind(method, BroadcastExport);

    }
});

// TODO: Figure out a better way to force sails to use the prototype
module.exports = exportSingleton;