var sails = require("sails");
var responseService = require("../services/Response.js");

module.exports = {
  index: function (request, response) {
    Facet.query('SELECT id,name,parentFacet FROM facet;', function (err, facets) {
      if (err) {
        // TODO: handle error message
        return responseService.failed(response);
      }
      return responseService.success(response, facets.rows);
    });
  }
};
