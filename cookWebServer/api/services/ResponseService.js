// TODO convert to sails singleton style. see other js
var ResponseService = (function () {
    function ResponseService() {
    }
    ResponseService.prototype.invalidParameters = function (response, parameters) {
        return this.json(response, 'Invalid Parameters: ' + parameters.join(", "), 401);
    };

    ResponseService.prototype.success = function (response, data, message) {
        if (typeof message === "undefined") { message = 'Success. Happy Cooking :)!'; }
        return this.json(response, message, 200, data);
    };

    ResponseService.prototype.forbidden = function (response, error) {
        if (typeof error === "undefined") { error = "Forbidden"; }
        return this.json(response, error, 403);
    };
    ResponseService.prototype.failed = function (response, error) {
        if (typeof error === "undefined") { error = "Failed"; }
        return this.json(response, error, 402);
    };

    ResponseService.prototype.notFound = function (response, error) {
        if (typeof error === "undefined") { error = "Not Found"; }
        return this.json(response, error, 404);
    };

    ResponseService.prototype.error = function (response, error) {
        if (typeof error === "undefined") { error = "Internal Server Error."; }
        return this.json(response, error, 500);
    };

    ResponseService.prototype.json = function (response, message, status, data) {
        var jsonResponse = {
            status: status,
            message: message
        };

        if (data) {
            jsonResponse['data'] = data;
        }

        return response.json(jsonResponse, status);
    };
    return ResponseService;
})();

var Export = new ResponseService();
module.exports = Export;
