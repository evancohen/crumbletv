var responseService = require("../services/Response.js");

module.exports = {
  index: function (request, response) {
    Facet.query('SELECT id,name FROM facet;', function (err, facets) {
      if (err) {
        // TODO: handle error message
        return responseService.failed(response);
      }
      return responseService.success(response, facets.rows);
    });
  },
  get: function(request, response) {
    var facetId = request.param('facetId');
    Facet.query('SELECT id,name FROM facet WHERE `parentFacet`=' + facetId + ';', function (err, facets) {
      if (err) {
        // TODO: handle error message
        console.log(err);
        return responseService.failed(response);
      }
      return responseService.success(response, facets.rows);
    });
  }
};
