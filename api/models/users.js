var mongoose = require("mongoose");
var User = require("./schema").User;

function addUser (data, callback) {
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