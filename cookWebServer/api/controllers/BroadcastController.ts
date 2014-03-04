/// <reference path="../../References.d.ts"/>

// Dependencies for BroadcastController
var ResponseService = <any>require("../services/ResponseService.js");
var BroadcastController = <any>require("./classes/BroadcastController.js");
var User = require("../models/User.js");

// Exports BroadcastController with the necessary dependencies.
// Since User is not defined when sails first runs, it must be passed in a simple factory.
var BroadcastExport = new BroadcastController(User, new ResponseService());
export = BroadcastExport;

