/// <reference path="../../References.d.ts"/>

/*
var BroadcastExport: IBroadcastController = new BroadcastController(User, new ResponseService());
export = BroadcastExport;
*/

var BroadcastController = <any>require("./classes/BroadcastController.js");

var BroadcastExport = new BroadcastController(User, null);
export = BroadcastExport;

