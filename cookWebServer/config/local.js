var fs = require('fs');

// Configuration for SSL cert. Comment out locally if you encounter development issues.
module.exports = {
	/*
  express: { serverOptions : {
      key: fs.readFileSync('ssl/myserver.key')
      cert: fs.readFileSync('ssl/server.csr')
    }
  },*/
  port: 80,
  environment: 'development'
};
