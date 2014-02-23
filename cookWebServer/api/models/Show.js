/**
 * Show
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

  	title: {
  		type: 'string',
  		unique: false,
  		required: true
  	},

  	startTime: {
  		type: 'datetime',
  		unique: false,
  		required: true
  	},

  	endTime: {
  		type: 'datetime',
  		unique: false,
  		required: true
  	},

  	recipeID: {
  		type: 'integer',
  		unique: false,
  		required: true
  	},

  	creationTime: {
  		type: 'datetime',
  		unique: false,
  		required: true
  	}
    
  }

};
