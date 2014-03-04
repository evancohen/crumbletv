var ResponseService = require("../services/ResponseService.js");
var BroadcastController = require("./classes/BroadcastController.js");
var User = require("../models/User.js");

var BroadcastExport = new BroadcastController(User, new ResponseService());
module.exports = BroadcastExport;
