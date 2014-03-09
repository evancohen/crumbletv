var IngredientShow = (function () {
    function IngredientShow(sails) {
        this.sails = sails;
        this.attributes = {
            ingredientID: {
                type: 'integer',
                unique: false,
                required: true
            },
            showID: {
                type: 'integer',
                unique: false,
                required: true
            },
            quantity: {
                type: 'text',
                unique: false,
                required: false
            }
        };
    }
    IngredientShow.prototype.getModel = function () {
        return this.sails.models.IngredientShow;
    };
    return IngredientShow;
})();
var ExportService = require("../services/ExportService.js");
module.exports = ExportService.createSingletonFromClass(new IngredientShow(require("sails")));
