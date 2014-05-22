var sails = require("sails");
var responseService = require("../services/Response.js");

module.exports = {

  index: function (request, response) {
    Facet.query('SELECT * FROM facet;', function (error, facets) {
      if (error) {
        return responseService.failed(response, error);
      }
      for(var i = 0; i < facets.rows.length; i++){
      	facets.rows[i].createdAt = undefined;
      	facets.rows[i].updatedAt = undefined;
      }
      return responseService.success(response, facets.rows);
    });
  }

};
