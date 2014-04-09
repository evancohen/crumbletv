var responseService = require('./Response.js');

module.exports = {
  getLiveShow: getLiveShow,

  publishShow: function (response, broadcastKey, name, showId) {
    User.findOne({ broadcastKey: broadcastKey, name: name }, function (error, user) {
      if (error) {
        return responseService.error(response, error);
      }
      if (!user) {
        return responseService.invalidParameters(response, ['broadcastKey', 'name']);
      }

      getLiveShow(user.id).done(function (error, show) {
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
    return User.findOne(request.session.user);
  }
};

function getLiveShow(userId, callback) {
  return Show.findOne({
    live: true,
    owner: userId
  })
}


function publishUserFindOneHandler(response, error, show) {
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