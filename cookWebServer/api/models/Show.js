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
  		unique: false
  	},

  	endTime: {
  		type: 'datetime',
  		unique: false
  	},

  	recipeID: {
  		type: 'integer',
  		unique: false
  	},

    live: {
      type: 'boolean'
    },

    facets: {
      collection: 'facet',
      via: 'shows',
      dominant: true
    }
    
  },

  getModel: function getModel() {
    return Show;
  },

  getLive: function (callback) {
    return getModel().find()
      .where({
        startTime: {
          '!=': null
        },
        endTime: {
          '!=': null
        },
        live: {
          '=': true
        }
      })
      .sort('startTime');
  }

};
