module.exports = {
  getFacets: function (name) {
    return taxonomy[name]; // TODO, consider cloning the data to avoid modification. may slow things down..
  }
};

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
  "Cuisines": {
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
  },
  "Tastes": [
    "Salty",
    "Savory",
    "Sour",
    "Bitter",
    "Sweet",
    "Spicy"
  ]
  // TODO: Time
};
