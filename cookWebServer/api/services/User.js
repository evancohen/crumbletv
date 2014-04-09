var userService = require('./User.js');
var responseService = require('./Response.js');

module.exports = {
  getLiveShow: function (userId, callback) {
    return sails.models.Show.getModel().findOne({
      live: true,
      owner: userId
    })
  },

  publishShow: function (response, broadcastKey, name, showId) {
    User.findOne({ broadcastKey: broadcastKey, name: name }, function (error, user) {
      if (error) {
        return responseService.error(response, error);
      }
      if (!user) {
        return responseService.invalidParameters(response, ['broadcastKey', 'name']);
      }

      userService.getLiveShow(user.id).done(function (error, show) {
        if (error || !show) {
          return responseService.error(response, "Already streaming!");
        }

        if (showId) {
          // lookup show
          Show.findOne(showId).done(function (error, show) {
            publishUserFindOneHandler(response, error, show)
          });
        } else {
          Show.create({
            title: "Untitled Stream",
            startTime: new Date().toISOString(),
            live: true
          }, function (error) {
            if (error) {
              return responseService.error(response);
            }
            return responseService.success(response);
          })
        }
      });
    });
  },

  currentUser: function currentUser(request) {
    return sails.models.User.findOne(request.session.user);
  }
};


function publishUserFindOneHandler(error, show) {
  if (error) {
    return responseService.error(response);
  }

  show.live = true;
  show.save(function (error) {
    if (error) {
      return responseService.error(response);
    }

    return responseService.success(response);
  });
}