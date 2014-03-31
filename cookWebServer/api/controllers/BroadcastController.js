var responseService = require("../services/ResponseService.js");
var User = require("../models/User.js");

module.exports = {
  publish: function publish(request, response) {
    var key = request.body.tcurl;
    var name = request.body.name;

    if (!key) {
      return responseService.invalidParameters(response, ['tcurl']);
    }
    if (!name) {
      return responseService.invalidParameters(response, ['name']);
    }

    key = key.split("?key=");
    if (key.length === 1) {
      return responseService.invalidParameters(response, ['tcurl']);
    }
    key = key[1];

    User.getModel().findOne({ broadcastKey: key, name: name }, function (error, user) {
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
