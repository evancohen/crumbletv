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

  done: function (request, response) {
    var parameters = handleBroadcastRequest(request, response);
    if (!parameters) {
      return;
    }

    User.findOne({ broadcastKey: parameters.key, name: parameters.name }).done(function (error, user) {
      if (error || !user) {
        return responseService.error(response, error);
      }

      userService.getLiveShow(user.id).done(function (error, show) {
        if (error || !show) {
          return responseService.error(response, error);
        }

        show.live = false;
        show.endTime = new Date().toISOString();
        show.save(function (error) {
          if (error) {
            return responseService.error(response, error);
          }

          return responseService.success(response);
        })
      });
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
      value: tcurl
    }
  });
}



