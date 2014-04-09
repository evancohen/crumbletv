var sails = require("sails");
var url = require('url');
var responseService = require('../services/Response.js');
var userService = require('../services/User.js');

module.exports = {
  publish: function (request, response) {
    var parameters = handleBroadcastRequest(request, response);
    if (!parameters) {
      return;
    }

    userService.publishShow(response, parameters.key, parameters.name, parameters.tcurl.query.show);
  },
  done: function (request, responserequest, response) {
    var parameters = handleBroadcastRequest(response, request);
    if (!parameters) {
      return;
    }

    User.findOne({ broadcastKey: parameters.key, name: parameters.name }, function (error, user) {
      if (error || !user) {
        return responseService.error(response);
      }

      userService.getLiveShow(user.id).done(function (error, show) {
        if (error || !show) {
          return responseService.error(response);
        }

        show.live = false;
        show.save(function (error) {
          if (error) {
            return responseService.error(response);
          }

          return responseService.success(response);

        })
      });

      return responseService.error(response);
    })
  }
};

function handleBroadcastRequest(request, response) {
  var tcurl = url.parse(request.body.tcurl, true);

  return responseService.checkParameters(response, {
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

}



