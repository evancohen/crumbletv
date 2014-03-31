var taxonomyService = require('../services/Taxonomy.js');
var responseService = require("../services/Response.js");

module.exports = {
  facet: function getFacet(request, response) {
    // TODO: consider handling lowercase facetName param?
    var facetName = request.param('facetName');
    if (!facetName) {
      return responseService.invalidParameters(response, ['facetName']);
    }

    var facets = taxonomyService.getFacets(facetName);
    if (!facets) {
      return responseService.notFound(response, "No facets exist with the name " + facetName);
    }

    return responseService.success(response, facets);
  }
};