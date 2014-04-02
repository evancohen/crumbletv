var fs = require('fs');

// Configuration for SSL cert. Comment out locally if you encounter development issues.
module.exports = {
  /*
   express: { serverOptions : {
   key: fs.readFileSync('ssl/myserver.key')
   cert: fs.readFileSync('ssl/server.csr')
   }
   },*/

  port: process.env.PORT || 1337,

  environment: process.env.NODE_ENV || 'development',

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
};
