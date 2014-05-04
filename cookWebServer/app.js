// Start sails and pass it command line arguments
//to be run on the server with: sudo forever start -c "node --harmony" app.js
require('sails').lift(require('optimist').argv);
