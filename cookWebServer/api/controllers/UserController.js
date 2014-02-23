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

module.exports = {
    
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {},

  login: function (request, response) {
    var bcrypt = require('bcrypt-nodejs');

    User.findOneByEmail(request.body.email).done(function (error, user) {
      if (error) {
        // TODO: String message for "DB Error"?
        return response.serverError([error]);
      }

      if (user) {
        bcrypt.compare(req.body.password, user.password, function (error, match) {
          // TODO: String message for "Server Error"?
          if (error) {
            return response.serverError([error]);
          }


          if (match) {
            // password match
            req.session.user = user.id;
            req.session.authenticated = true;
            res.json(user);
          } else {
            // invalid password
            if (req.session.user) req.session.user = null;
            res.json({ error: 'Invalid password' }, 400);
          }
        });
      } else {
        res.json({ error: 'User not found' }, 404);
      }
    });
  }

};
