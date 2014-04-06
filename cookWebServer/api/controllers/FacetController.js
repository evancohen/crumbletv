var responseService = require("../services/Response.js");

module.exports = {
  index: function (request, response) {
    Facet.query('SELECT id,name,parent_facet FROM facet;', function (err, facets) {
      if (err) {
        // TODO: handle error message
        return responseService.failed(response);
      }
      return responseService.success(response, facets.rows);
    });
  }
};
