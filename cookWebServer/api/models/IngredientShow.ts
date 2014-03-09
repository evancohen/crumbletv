/// <reference path="../../References.d.ts"/>

/**
 * IngredientShow
 *
 * @description :: TODO.
 */
class IngredientShow implements IIngredientShow {
  public attributes = {
    
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

  constructor(private sails: any) {}

  public getModel() {
          return this.sails.models.IngredientShow;
  }
}
var ExportService = <IExportService>require("../services/ExportService.js");
module.exports = ExportService.createSingletonFromClass(new IngredientShow(require("sails")));