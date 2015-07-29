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
			return callback(err, null);
		}
		else {
			return callback(null, data);
		}
	});
};

var findApplicants = function (data, callback) {
	
	//Query an array, this took me forever to find...
	User.find({"id": { $in: data}}, function (err, data) {

		if (err) {
			return callback(err, null);
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
			return callback(err, null);
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
	findApplicants: findApplicants,
	updateUser: updateUser,
	getAllUsers: getAllUsers
};