/**
 * TagShow
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
  	tagID: {
  		type: 'integer'.
  		unique: false,
  		required: true
  	},

  	showID: {
  		type: 'integer'.
  		unique: false,
  		required: true
  	}
    
  }

};
