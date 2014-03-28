/**
 * UserShowController
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

var responseService = require('../services/ResponseService.js');
var UserShow = require('../models/UserShow.js');

module.exports = {
    
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */

  _config: {},

	//get list of show id's by user
	index: function (request, response) {
		var id = request.param('user');
		if (!id) {
			return responseService.failed(response, "Incorrect paramaters");
		}
		UserShow.find().where({UserID : id}).done(function (error, shows){
			if(error){
				return responseService.error(response, error); 
			}
			return responseService.success(response, shows, "Videos found");
		});
	}

  	full: function (request, response) {
  		return response.json({
      		huh : "Should return a list of videos and each of their properties.",
      		whatElse : "Should have some kind of pagination"
    	});
  	}

  }
};