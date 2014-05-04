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

module.exports = {
    
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */

  _config: {},

  login: function (request, response) {
    var bcrypt = require('bcrypt-nodejs');

    User.findOneByEmail(request.body.email).exec(function (error, user) {
      if (error) {
        return responseService.error(response, error)
      }

      if (user) {
        bcrypt.compare(request.body.password, user.password, function (error, match) {
          if (error) {
            return responseService.error(response, error)
          }

          if (match) {
            // password match
            console.log(user);
            request.session.user = user.id;

            return responseService.success(response, user);
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

  me: function (request, response){
    User.currentUser(request).exec(function (error, user){
      if(error){
        return responseService.failed(response, error);
      }
      return responseService.success(response, user);
    });
  }

};
