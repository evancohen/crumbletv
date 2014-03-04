var BroadcastController = (function () {
    function BroadcastController() {
        this.user = require("../models/User.js");
        this.responseService = require("../services/ResponseService.js");
    }
    BroadcastController.prototype.publish = function (request, response) {
        var _this = this;
        var key = request.body.tcurl;
        var name = request.body.name;

        if (!key) {
            return this.responseService.invalidParameters(response, ['tcurl']);
        }
        if (!name) {
            return this.responseService.invalidParameters(response, ['name']);
        }

        key = key.split("?key=");
        if (key.length === 1) {
            return this.responseService.invalidParameters(response, ['tcurl']);
        }
        key = key[1];

        this.user.getModel().findOne({ broadcastKey: key, name: name }, function (error, user) {
            if (error) {
                return _this.responseService.error(response, error);
            }
            if (!user) {
                return _this.responseService.invalidParameters(response, ['broadcastKey', 'name']);
            }

            return _this.responseService.success(response);
        });
    };
    BroadcastController._config = {};
    return BroadcastController;
})();

var ExportService = require("../services/ExportService.js");
var BroadcastExport = ExportService.exportController(new BroadcastController());
module.exports = BroadcastExport;
