class ExportService {
    private lodash: any;

    constructor() {
        this.lodash = require("lodash");
    }

    public exportController(exportObject: Object) {
        var exportSingleton = {};
        this.lodash.forIn(exportObject, (method, key) => {
            if (this.lodash.isFunction(method)) {
                exportSingleton[key] = this.lodash.bind(method, exportObject);

            }
        });
        return exportSingleton;
    }
}

var Export = new ExportService();
export = Export;