/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var responseService = require('../services/Response.js');
var userService = require('../services/User.js');

module.exports = {
    
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */

  _config: {},

/*  index: function (request, response){
    User.find().exec(function (error, users){
      if (error || typeof users === "undefined") {
        return responseService.error(response, error);
      }
      for(var i = 0; i < users.length; i++){
        users[i].password = undefined;
        users[i].broadcastKey = undefined;
      }
      return responseService.success(response, users);
    });
  },*/

  login: function (request, response) {
    var bcrypt = require('bcrypt-nodejs');

    User.findOneByEmail(request.body.email).exec(function (error, user) {
      if (error) {
        return responseService.error(response, error);
      }

      if (user) {
        bcrypt.compare(request.body.password, user.password, function (error, match) {
          if (error) {
            return responseService.error(response, error)
          }

          if (match) {
            // password match
            request.session.user = user.id;

            return responseService.success(response, user, null);
          } else {
            // invalid password
            if (request.session.user) {
              request.session.user = null;
            }
            return responseService.invalidParameters(response, ['password'])
          }
        });
      } else {
        return responseService.invalidParameters(response, ['email'])
      }
    });
  },

  logout: function (request, response) {
    request.session.user = null;
    return responseService.success(response, "Successfully logged out");
  },

  me: function (request, response){
    userService.currentUser(request).exec(function (error, user){
      if(error || typeof user === "undefined"){

        if(error == null){
          error = {message: "User is not authenticated", id : 0};
        }

        return responseService.success(response, error);
      }
      user.password = undefined;
      return responseService.success(response, user);
    });
  },

  //accepts a user name and checks to see if they are currently streaming
  live : function (request, response){
    var name = request.param('name');

    User.findOneByName(name).exec(function (error, user){
      if(error || typeof user === "undefined"){
        return responseService.error(response, error);
      }
      Show.findOne({live : true, owner: user.id}).exec(function (error, show){
        if(error || typeof show === "undefined"){
          var data = {owner : user.id, live : false};
          return responseService.success(response, data);
        }
        return responseService.success(response, show);
      })
    });
  }
  /*
{
  "status": 200,
  "message": "Success. Happy Cooking :)!",
  "data": {
    "owner": 8,
    "title": "Untitled Stream",
    "startTime": "2014-05-22T20:19:52.000Z",
    "endTime": null,
    "live": true,
    "id": 18,
    "createdAt": "2014-05-22T20:19:52.000Z",
    "updatedAt": "2014-05-22T20:19:52.000Z"
  }
}
  */

};
