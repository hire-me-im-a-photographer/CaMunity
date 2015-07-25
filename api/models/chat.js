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

function addChat(user, anotherUser, update, callback) {

	var query = {"users": {$all: [user, anotherUser]}};

	Chat.findOneAndUpdate(query, update, function(err, data) {
		if (err) {
			return callback(err, null);
		}
		else {
			return callback(null, data);
		}
	});

}

function findChat(user, anotherUser, callback) {

	var query = {"users": {$all: [user, anotherUser]}};

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