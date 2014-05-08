/**
 * Recipe
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
  	text: {
  		type: 'text',
  		unique: false,
  		required: false
  	},

    shows: {
      collection: 'Show',
      via: 'recipes'
    },

    /*ingredients: {
      collection: 'Ingredient',
      via: 'recipes',
      dominant: true
    }*/
 
  }

};
