/// <reference path="../../References.d.ts"/>

// Dependencies for BroadcastController
var ResponseService = <any>require("../services/ResponseService.js");
var BroadcastController = <any>require("./classes/BroadcastController.js");
var User = <any>require("../models/User.js");

// Exports BroadcastController with the necessary dependencies.
// Since User is not defined when sails first runs, it must be passed in a simple factory.
var BroadcastExport = new BroadcastController(User, new ResponseService());

// TODO: Figure out a better way to force sails to use the prototype
module.exports = {
    publish: (request, response) => {
        return BroadcastExport.publish(request, response);
    }
};

