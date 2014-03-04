/**
 * BroadcastController
 *
 * @description	:: TODO
 */
class BroadcastController implements IBroadcastController {
    // External dependencies
    private user: any;
    private responseService: any; //IResponseService;

    constructor(user: any, responseService: any) {
        this.user = user;
        this.responseService = responseService;
    }

    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to BroadcastController)
     */
    public static _config = {};

    public publish(request, response): any {
        var key = request.body.tcurl;
        var name = request.body.name;

        if (!key) {
            return this.responseService.invalidParameters(response, ['tcurl']);
        }
        if (!name) {
            return this.responseService.invalidParameters(response, ['name']);
        }

        // Split the key from the tcurl, since key is not passed via the params.
        key = key.split("?key=");
        if (key.length === 1) {
            return this.responseService.invalidParameters(response, ['tcurl']);
        }
        key = key[1];

        // Find user with the given broadcastKey and name
        this.user.getModel().findOne({ broadcastKey: key, name: name }, (error, user) => {
            if (error) {
                return this.responseService.error(response, error);
            }
            if (!user) {
                return this.responseService.invalidParameters(response, ['broadcastKey', 'name']);
            }

            return this.responseService.success(response);
        });
    }
}

export = BroadcastController;