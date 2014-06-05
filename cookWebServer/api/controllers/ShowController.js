/**
 * ShowController
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
   * (specific to ShowController)
   */
  _config: {},
  //On create be sure to also create a User->Show and Tag->Show
  /*
	index: function (request, response){
		var id = request.param('id');
		if (!id) {
			return responseService.failed(response, "Incorrect paramaters");
		}
		Show.findOne(id, function(error, show){
			if(error){
				return responseService.failed(response, "Could not find video with that ID");
			}
			return responseService.success(response, show, "Show found!");
		});
	},
	*/

	current: function(request, response){

	},

	//find a list of shows by a specific recepie
	recipie: function (request, response){
		var id = request.param('id');
		if (!id) {
			return responseService.failed(response, "Incorrect paramaters");
		}
		Show.find().where({recipeID: id}).exec(function(error, shows){
			if(error){
				return responseService.error(response, error); 
			}
			return responseService.success(response, shows, "Video(s) found");
		});
	},

	upcoming: function (request, response){
		var count = request.param('count') || 20; //default number is 20
		Show.find()
			//.where({ startTime: { '>=': 100 }}) //TODO figure out Sails datetime format
			.limit(count)
			.exec(function(error, shows){
				if(error){
					return responseService.error(response, error); 
				}
				return responseService.success(response, shows, "Video(s) found");
			});
	},

	find: function (request, response){
		Show.find().exec(function(error, shows){
			if(error){
				return responseService.error(response, error); 
			}
			return responseService.success(response, shows, "Video(s) found");
		});
	},

	findme: function (request, response){
		//This needs to get the user id from the cookie
		//if (!id) {
			//return responseService.failed(response, "Incorrect paramaters");
		//}
		Show.find({owner: request.param('owner')}).exec(function(error, shows){
			if(error){
				return responseService.error(response, error);
			}
			return responseService.success(response, shows, "Video(s) found");
		});
	}
};

/*

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
 },

 */
