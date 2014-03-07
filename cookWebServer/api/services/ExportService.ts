class ExportService implements IExportService {

    constructor(private lodash: any) {}

    // TODO: rename to exportObject
    public exportController(controller: Object) {
        var exportSingleton = {};
        this.lodash.forIn(controller, (method, key) => {
            // Assigns a function with the key of a prototype on the given object
            // if the function does not exist on the object. "Deprototypes" objects
            // since sails ignores the prototype keys of an object.
            if (this.lodash.isFunction(method) && !controller.hasOwnProperty(key)) {
                exportSingleton[key] = this.lodash.bind(method, controller);
            }
        });
        return exportSingleton;
    }

}

var Export = new ExportService(require("lodash"));
export = Export;