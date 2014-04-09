var sails = require("sails");
var responseService = require("../services/Response.js");

module.exports = {

  index: function (request, response) {
    Facet.query('SELECT id,name,parentFacet FROM facet;', function (error, facets) {
      if (error) {
        return responseService.failed(response, error);
      }
      return responseService.success(response, facets.rows);
    });
  }

};
