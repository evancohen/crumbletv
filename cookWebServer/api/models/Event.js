/**
 * Event
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

  	startDate: {
  		type: 'datetime',
  		required: true
  	},
  	
  	endDate: {
  		type: 'datetime',
  		required: true
  	},
  	owner: {
  		model: 'user'
  	},
  	show: {
  		model: 'show'
  	}
    
  }

};
