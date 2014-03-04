/*
    This document is a collection of all the typescript references in the project.
    Each typescript file in the project should reference this file instead of indivdual files.
 */

// Api: Add your API typescript files here!
/// <reference path="api/controllers/classes/IBroadcastController.d.ts"/>
/// <reference path="api/controllers/classes/BroadcastController.ts"/>
/// <reference path="api/controllers/BroadcastController.ts"/>
/// <reference path="api/services/IResponseService.d.ts"/>
/// <reference path="api/services/ResponseService.ts"/>


// Test: Add your test typescript files here
/// <reference path="test/spec/controllers/BroadcastControllerTest.ts"/>
/// <reference path="test/integration/Broadcast.ts"/>

// TSD, external typings
/// <reference path="typings/lodash/lodash.d.ts"/>
/// <reference path="typings/express/express.d.ts"/>
/// <reference path="typings/node/node.d.ts"/>

// Mocha
declare var describe: any;
declare var before: any;
declare var it: any;

// Sails Models
declare var User: any;

// TODO
// Figure out broken sinon typing
// Figure out broken mocha typings
// Figure out better way to reference sails models.