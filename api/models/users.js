var mongoose = require("mongoose");
var User = require("./schema").User;

function addUser (data, callback) {
	console.log("new user: ", data);
	var newUser = new User(data);

	User.create(newUser, function (err, data) {

		if (err) {
			return callback(err, null);
		}
		else {
			return callback(null, data);
		}

	});
}

function getUser (data, callback) {
	console.log("getting user: ", data);
	User.findOne( {id: data}, function(err, data){
		if (err) {
			return callback(err);
		}
		else {
			return callback(null, data);
		}
	});
}

module.exports = {
	addUser : addUser,
	getUser : getUser
};