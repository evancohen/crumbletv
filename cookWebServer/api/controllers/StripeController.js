/**
 * StripeController
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
   * Action blueprints:
   *    `/stripe/index`
   *    `/stripe`
   */
   index: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world',
      whatIs : "A list of all of the users current subscriptions"
    });
  },


  /**
   * Action blueprints:
   *    `/stripe/subscribe`
   */
   subscribe: function (req, res) {
    var stripe = require('stripe');
    
    console.log(req.param());

    // Send a JSON response
    return res.json({
      hello: 'world',
      whatIs : "Accepts a username and then addes them to subscriptions",
      param : req.param()
    });
  },


  /**
   * Action blueprints:
   *    `/stripe/tip`
   */
   tip: function (req, res) {
    var stripe = require('stripe');

    // Send a JSON response
    return res.json({
      hello: 'world',
      whatIs : "Tips the given user"
    });
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to StripeController)
   */
  _config: {}

  
};
