function json(response, message, status, data) {
  var jsonResponse = {
    status: status,
    message: message
  };

  if (data) {
  	jsonResponse['data'] = data;
  }

  return response.json(jsonResponse, status);
}

module.exports = {
  json: json,
  invalidParameters: function (response, parameters) {
  	return json(response, 
  	  'Invalid Parameters: ' + parameters.join(", "), 
  	  401);
  },
  success: function (response, data, message) {
  	if (!message) {
  	  message = 'Success. Happy Cooking :)!';
  	}

  	return json(response, message, 200, data);
  },
  error: function (response, error) {
  	if (!error) {
  	  error = "Internal Server Error."
  	}

  	return json(response, error, 500);
  }
}