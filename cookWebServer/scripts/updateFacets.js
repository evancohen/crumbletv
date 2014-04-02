Sails.lift({
  log: {
    level: 'error'
  },
  express: {
    customMiddleware: function (_express) {
      express = _express;
    }
  }
}, function (err, sails) {




  sails = _sails;
  done(err, sails);
});



