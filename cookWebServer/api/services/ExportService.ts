class ExportService implements IExportService {

    constructor(private lodash: any) {}

    public exportController(controller: Object) {
        var exportSingleton = {};
        this.lodash.forIn(controller, (method, key) => {
            if (this.lodash.isFunction(method) && !controller.hasOwnProperty(key)) {
                console.log(key)

                exportSingleton[key] = this.lodash.bind(method, controller);
            }
        });
        return exportSingleton;
    }

}


var Export = new ExportService(require("lodash"));
export = Export;