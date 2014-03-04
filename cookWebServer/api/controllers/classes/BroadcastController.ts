/**
 * Created by codys_000 on 3/3/14.
 */

interface IBroadcastController {
    //static publish(request, response): void;
}

/**
 * BroadcastController
 *
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
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
        if (key.length === 0) {
            return this.responseService.invalidParameters(response, ['tcurl']);
        }
        key = key[1];

        // Find user with the given broadcastKey and name
        this.user.findOne({ broadcastKey: key, name: name }, (error, user) => {
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