/// <reference path="../../References.d.ts"/>

class ResponseService implements IResponseService{
    public invalidParameters(response, parameters) {
        return this.json(response,
            'Invalid Parameters: ' + parameters.join(", "),
            401);
    }

    public success(response, data?, message = 'Success. Happy Cooking :)!') {
        return this.json(response, message, 200, data);
    }

    public forbidden(response, error = "Forbidden") {
        return this.json(response, error, 403);
    }
    public failed(response, error = "Failed") {
        return this.json(response, error, 402);
    }

    public notFound(response, error = "Not Found") {
        return this.json(response, error, 404);
    }

    public error(response, error = "Internal Server Error.") {
        return this.json(response, error, 500);
    }

    private json(response, message, status, data?) {
        var jsonResponse = {
            status: status,
            message: message
        };

        if (data) {
            jsonResponse['data'] = data;
        }

        return response.json(jsonResponse, status);
    }
}

var Export = new ResponseService();
export = Export;