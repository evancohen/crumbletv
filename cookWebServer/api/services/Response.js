function json(response, message, status) {
  return response.json({
    status: status,
    message: message
  }, status);
}

module.exports = {
  json: json,
  invalidParameters: function (response, parameters) {
  	return json(response, 
  	  'Invalid Parameters: ' + parameters.join(", "), 
  	  401);
  },
  success: function (response) {
  	return json(response, 
  	  'Success. Happy Cooking :)!', 
  	  200);
  }
}