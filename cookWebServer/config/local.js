var fs = require('fs');

// Configuration for SSL cert. Comment out locally if you encounter development issues.
module.exports = {
  express: { serverOptions : {
      key: fs.readFileSync('ssl/myserver.key')
      cert: fs.readFileSync('ssl/server.csr')
    }
  },
  port: process.env.PORT || 443,
  environment: process.env.NODE_ENV || 'development'
};