var sails = require("sails");
var url = require('url');
var responseService = require('../services/Response.js');
var userService = require('../services/User.js');
var suspend = require('suspend');
var resume = suspend.resume;

module.exports = {

  publish: function (request, response) {
    var parameters = handleBroadcastRequest(request, response);
    if (!parameters) {
      return;
    }

    userService.publishShow(response, parameters.key, parameters.name, parameters.tcurl.query.show);
  },

  done: function (request, response) {
    suspend(function*() {
      var parameters = handleBroadcastRequest(request, response);
      if (!parameters) {
        return;
      }

      try {
        var user = yield User.findOne({ broadcastKey: parameters.key, name: parameters.name }).exec(resume());
        if (!user) {
          return responseService.error(response);
        }
        var show = yield userService.getLiveShow(user.id).exec(resume());
        if (!show) {
          return responseService.error(response);
        }
        show.live = false;
        show.endTime = new Date().toISOString();
        show = yield show.save(resume());
        return responseService.success(response);
      } catch (error) {
        return responseService.error(response, error);
      }
    })();
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



