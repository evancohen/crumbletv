var ExportService = (function () {
    function ExportService(lodash) {
        this.lodash = lodash;
    }
    ExportService.prototype.createSingletonFromClass = function (controller) {
        var _this = this;
        var exportSingleton = {};
        this.lodash.forIn(controller, function (method, key) {
            if (_this.lodash.isFunction(method) && !controller.hasOwnProperty(key)) {
                exportSingleton[key] = _this.lodash.bind(method, controller);
            }
        });
        return exportSingleton;
    };
    return ExportService;
})();

var Export = new ExportService(require("lodash"));
module.exports = Export;
