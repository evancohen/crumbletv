module.exports = {
  getLive: function () {
    return Show.find()
      .where({
        startTime: {
          '!=': null
        },
        endTime: {
          '!=': null
        },
        live: {
          '=': true
        }
      })
      .sort('startTime');
  }
};