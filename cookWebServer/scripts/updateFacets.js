var Sails = require('sails');

Sails.lift({
  log: {
    level: 'error'
  },
  adapters: {

    'default': 'postgres',

    // Postgres Development
    postgres: {
      module: 'sails-postgresql',
      host: 'ec2-184-73-254-144.compute-1.amazonaws.com',
      port: 5432,
      user: 'cdjcvabznkrjfe',
      password: '21lJ0HoLvs8gwIV07MVtuvafDH',
      database: 'dbre2audbcbm94',
      ssl: true, // Forces SSL connection to database
      schema: true //This makes sure that sails matches
      //the database schema to your models.
    }

  }
}, function (err, sails) {
  for (var facetName in taxonomy) {
    (function(facetName){
      Facet.create({
        name: facetName
      }, function (error, facet) {
        var facetOptions = taxonomy[facetName];
        for (var i = 0; i < facetOptions.length; i++) {
          Facet.create({
            name: facetOptions[i],
            parentFacet: facet.id
          }, function (error, facet) {

          });
        }

      });
    })(facetName);
  }
});



  // TODO: move this into the database.
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

/*
 "North American": [
 "Hawaiian",
 "Southern & Soul Food",
 "Native American",
 "Southwestern",
 "Northeastern",
 "Cajun & Creole",
 "Canadian",
 "Barbecue"
 ],
 "South & Central American": [
 "Mexican",
 "Central American",
 "South American",
 "Caribbean",
 "Cuban",
 "Aztec",
 "Maya",
 "Inca",
 "Jamaican"
 ],
 "European": [
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
 "Scandinavian"
 ],
 "Asian": [
 "Chinese",
 "Thai",
 "Vietnamese",
 "Japanese",
 "Korean"
 ],
 "Middle Eastern": [
 "Indian"
 ],
 "African": [
 "Moroccan"
 ]
 */
