var responseService = require("../services/Response.js");
var Facet = require("../models/Facet.js");

module.exports = {
  index: function (request, response) {
    Facet.getModel().query('SELECT id,name,parentFacet FROM facet;', function (err, facets) {
      if (err) {
        // TODO: handle error message
        return responseService.failed(response);
      }
      return responseService.success(response, facets.rows);
    });
  }
};
