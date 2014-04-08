module.exports = {

  attributes: {

    name: {
      type: 'string',
      unique: true,
      required: true
    },

    parentFacet: {
      model: 'facet'
    },

    shows: {
      collection: 'show',
      via: 'facets'
    }

  },

  getModel: function () {
    return Facet;
  }

};
