var mongoose = require("mongoose");
var Job = require("./schema").Job;
var User = require("./schema").User;
var Chat = require("./schema").Chat;

function newChat(users, callback) {
	var chat = new Chat(users);

	Chat.create(chat, function(err, data) {

		if (err) {
			return callback(err, null);
		}
		else {
			return callback(null, data);
		}
	});
}

function addChat(query, update, callback) {

	Chat.findOneAndUpdate(query, update, function(err, data) {
		
		if(data === null) {
			console.log("data was null");
			var newQuery = {"firstUser": query.secondUser, "secondUser": query.firstUser};

			Chat.findOneAndUpdate(newQuery, update, function(err, data) {
				if (err) {
					return callback(err, null);
				}
				else {
					return callback(null, data);
				}
			});

		}else {
			return callback(null, data);
		}
	});

}

function findChat(query, callback) {

	Chat.find(query, function(err, data) {
		if (err) {
			return callback(err, null);
		}
		else {
			return callback(null, data);
		}
	});
}	

module.exports = {
	newChat: newChat,
	addChat: addChat,
	findChat: findChat
};