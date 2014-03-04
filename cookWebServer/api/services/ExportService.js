var ExportService = (function () {
    function ExportService() {
        this.lodash = require("lodash");
    }
    ExportService.prototype.exportController = function (exportObject) {
        var _this = this;
        var exportSingleton = {};
        this.lodash.forIn(exportObject, function (method, key) {
            if (_this.lodash.isFunction(method)) {
                exportSingleton[key] = _this.lodash.bind(method, exportObject);
            }
        });
        return exportSingleton;
    };
    return ExportService;
})();

var Export = new ExportService();
module.exports = Export;
