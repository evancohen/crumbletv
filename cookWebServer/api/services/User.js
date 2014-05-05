var responseService = require('./Response.js');

module.exports = {
  getLiveShow: getLiveShow,

  publishShow: function (response, broadcastKey, name, showId) {
    User.findOne({ broadcastKey: broadcastKey, name: name }).exec(function (error, user) {
      if (error) {
        return responseService.error(response, error);
      }
      if (!user) {
        return responseService.invalidParameters(response, ['broadcastKey', 'name']);
      }

      getLiveShow(user.id).exec(function (error, show) {
        if (error || show) {
          return responseService.error(response, "Already streaming!");
        }

        if (showId) {
          // lookup show
          Show.findOne(showId).exec(function (error, show) {
            publishUserFindOneHandler(response, error, show)
          });
        } else {
          Show.create({
            title: "Untitled Stream",
            startTime: new Date().toISOString(),
            live: true,
            owner: user.id
          }, function (error) {
            if (error) {
              return responseService.error(response, error);
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

function getLiveShow(userId) {
  return Show.findOne({
    live: true,
    owner: userId
  })
}


function publishUserFindOneHandler(response, error, show) {
  if (error) {
    return responseService.error(response, error);
  }

  show.live = true;
  show.save(function (error) {
    if (error) {
      return responseService.error(response, error);
    }

    return responseService.success(response, error);
  });
}