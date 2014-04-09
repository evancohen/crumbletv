var User = require("../models/User.js");
var url = require('url');
var responseService = require('../services/Response.js');

module.exports = {
  publish: function publish(request, response) {
    var tcurl = url.parse(request.body.tcurl, true);

    var parameters = responseService.checkParameters(response, {
      key: {
        value: tcurl.query.key
      },
      name: {
        value: request.body.name
      },
      tcurl: {
        value: url.parse(request.body.tcurl, true)
      }
    });
    if (!parameters) {
      return;
    }

    User.publishShow(response, parameters.key, parameters.name, parameters.tcurl.query.show);
  }
};



