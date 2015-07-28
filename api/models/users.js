var User = require("./schema").user;

var addUser = function (data, callback) {

	var newUser = new User(data);

	User.create(newUser, function (err, data) {

		if (err) {
			return callback(err, null);
		}
		else {
			return callback(null, data);
		}
	});
};

var findUser = function (data, callback) {

	var query = { "id": data };

	User.findOne(query, function (err, data) {

		if (err) {
			return callback(err);
		}
		else {
			return callback(null, data);
		}
	});
};

var updateUser = function (data, update, callback){
 	
	var query = { "id": data };

	User.findOneAndUpdate(query, update, function (err, data) {

		if (err) {
			return callback(err);
		}
		else {
			return callback(null, data);
		}
	});
};

var getAllUsers = function (callback) {
	
	User.find(function (err, data) {
		
		if (err) {
			return callback(err, null);
		} else {
			return callback(null, data);
		}
	});
};

module.exports = {
	addUser: addUser,
	findUser: findUser,
	updateUser: updateUser,
	getAllUsers: getAllUsers
};