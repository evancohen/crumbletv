module.exports = {

  attributes: {

    name: {
      type: 'string',
      unique: true,
      required: true
    },

    parentFacet: {
      model: 'facet'
    }

  }

};