var Sails = require('sails');

Sails.lift({
  log: {
    level: 'error'
  }
  //adapters: {
    // TODO: figure out if adapter information is necessary here
  //}
}, function (err, sails) {
  for (var facetName in taxonomy) {
    var show;

    (function(facetName) {
      Facet.create({
        name: facetName
      }, function (error, facet) {
        if (error) {
          return console.log(error);
        }
        console.log(facet);

        var facetOptions = taxonomy[facetName];
        for (var i = 0; i < facetOptions.length; i++) {
          Facet.create({
            name: facetOptions[i],
            parentFacet: facet.id
          }, function (error, facet) {
            if (error) {
              return console.log(error);
            }
            console.log(facet);

            if (!show) {
              show = true;
              Show.create({
                title: facet.name + " SHOW!"
              }, function (error, show) {
                if (error) { return console.log(error); }
                show.facets.add(facet.id);
                show.save(function (err) {
                  if (err) console.log(err);
                });
              });
            }
          });
        }
      });
    })(facetName);


  }
});

// This file is linked in the blog post. If the taxonomy is moved the link must be updated.
// For the time being it seems small enough to just hold in memory as a json file
var taxonomy = {
  "Occasions": [
    "Christmas",
    "Summer",
    "Fall",
    "Thanksgiving",
    "New Year",
    "Spring",
    "Winter",
    "Game Day",
    "Halloween",
    "Hanukkah",
    "Valentine's Day",
    "4th of July",
    "Thanksgivukkah"
  ],
  "Diets": [
    "Pescetarian",
    "Vegetarian",
    "Lacto vegetarian",
    "Ovo vegetarian",
    "Vegan"
  ],
  "Courses": [
    "Main Dishes",
    "Desserts",
    "Side Dishes",
    "Lunch and Snacks",
    "Appetizers",
    "Salads",
    "Breads",
    "Breakfast and Brunch",
    "Soups",
    "Beverages",
    "Condiments and Sauces",
    "Cocktails"
  ],
  "Techniques": [
    "Baking",
    "Browning",
    "Boiling",
    "Sauteeing",
    "Frying",
    "Blending",
    "Grilling",
    "Microwaving",
    "Roasting",
    "Broiling",
    "Marinating",
    "Glazing",
    "Drying",
    "Slow Cooking",
    "Steaming",
    "Frosting",
    "Stir Frying",
    "Poaching",
    "Brining",
    "Braising",
    "Pressure Cooking",
    "Stuffing"
  ],
  "Allergies": [
    "Sesame",
    "Seafood",
    "Peanut",
    "Tree Nut",
    "Soy",
    "Egg",
    "Sulfite",
    "Dairy",
    "Wheat",
    "Gluten"
  ],
  "Cuisines": [
    "North American",
    "South & Central American",
    "European",
    "Asian",
    "Middle Eastern",
    "Indian",
    "Moroccan",
    "African",
    "Hawaiian",
    "Southern & Soul Food",
    "Native American",
    "Southwestern",
    "Northeastern",
    "Cajun & Creole",
    "Canadian",
    "Barbecue",
    "Mexican",
    "Central American",
    "South American",
    "Caribbean",
    "Cuban",
    "Aztec",
    "Maya",
    "Inca",
    "Jamaican",
    "English",
    "Russia",
    "Italian",
    "Spanish",
    "Greek",
    "French",
    "German",
    "Irish",
    "Mediterranean",
    "Hungarian",
    "Portuguese",
    "Swedish",
    "Scandinavian",
    "Chinese",
    "Thai",
    "Vietnamese",
    "Japanese",
    "Korean"
  ],
  "Tastes": [
    "Salty",
    "Savory",
    "Sour",
    "Bitter",
    "Sweet",
    "Spicy"
  ]
};
