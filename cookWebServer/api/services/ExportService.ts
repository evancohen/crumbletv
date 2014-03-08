class ExportService implements IExportService {

    constructor(private lodash: any) {}

    /**
     * Converts a class instance to a singleton by creating a new function
     * binded to the instance of the classInstance for each method on the prototype.
     *
     * @param classInstance
     * @returns Singleton of the given classInstance
     */
    public createSingletonFromClass(classInstance: Object): Object {
        var exportSingleton = {};
        this.lodash.forIn(classInstance, (method, key) => {
            // Assigns a function with the key of a prototype on the given object
            // if the function does not exist on the object. "Deprototypes" objects
            // since sails ignores the prototype keys of an object.
            if (this.lodash.isFunction(method) && !classInstance.hasOwnProperty(key)) {
                exportSingleton[key] = this.lodash.bind(method, classInstance);
            }
        });
        return exportSingleton;
    }

}

var Export = new ExportService(require("lodash"));
export = Export;