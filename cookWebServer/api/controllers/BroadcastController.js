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

var responseService = require('../services/Response.js');

module.exports = {
    
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to BroadcastController)
   */
  _config: {},


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to BroadcastController)
   */
  publish: function (request, response) {
    var key = request.param("tcurl");
    var name = request.param("name");

    if (!key) {
      return responseService.invalidParameters(response, ['tcurl']);
    }
    if (!name) {
      return responseService.invalidParameters(response, ['name']);
    }

    // Split the key from the tcurl, since key is not passed via the params.
    key = key.split("?key=")[1];

    // Find user with the given broadcastKey and name
  	User.findOne({ broadcastKey: key, name: name }, function (error, user) {
  		if (error) {
        return responseService.error(response, error);
  		}
  		if (!user) {
        return responseService.invalidParameters(response, ['broadcastKey', 'name']);
  		}

      return responseService.success(response);
  	});
  }

};
