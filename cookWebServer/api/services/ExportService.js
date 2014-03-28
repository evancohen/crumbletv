var ExportService = (function () {
    function ExportService(lodash) {
        this.lodash = lodash;
    }
    ExportService.prototype.createSingletonFromClass = function (classInstance) {
        var _this = this;
        var exportSingleton = {};
        this.lodash.forIn(classInstance, function (method, key) {
            if (_this.lodash.isFunction(method) && !classInstance.hasOwnProperty(key)) {
                exportSingleton[key] = _this.lodash.bind(method, classInstance);
            }
        });
        return exportSingleton;
    };
    return ExportService;
})();

var Export = new ExportService(require("lodash"));
module.exports = Export;
