var ResponseService = require("../services/ResponseService.js");
var BroadcastController = require("./classes/BroadcastController.js");
var User = require("../models/User.js");
var lodash = require("lodash");

var BroadcastExport = new BroadcastController(User, new ResponseService());

var exportSingleton = {};
lodash.forIn(BroadcastExport, function (method, key) {
    if (lodash.isFunction(method)) {
        exportSingleton[key] = lodash.bind(method, BroadcastExport);
    }
});

module.exports = exportSingleton;
