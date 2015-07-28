var Chat = require("./schema").chat;

var newChat = function (users, callback) {
	
	var chat = new Chat(users);

	Chat.create(chat, function (err, data) {

		if (err) {
			return callback(err, null);
		}
		else {
			return callback(null, data);
		}
	});
};

var addChat = function (user, anotherUser, update, callback) {

	var query = { "users": { $all: [user, anotherUser] } };

	Chat.findOneAndUpdate(query, update, function (err, data) {
		if (err) {
			return callback(err, null);
		}
		else {
			return callback(null, data);
		}
	});

};

var findChat = function (user, anotherUser, callback) {

	var query = { "users": { $all: [user, anotherUser] } };

	Chat.find(query, function (err, data) {
		if (err) {
			return callback(err, null);
		}
		else {
			return callback(null, data);
		}
	});
};

module.exports = {
	newChat: newChat,
	addChat: addChat,
	findChat: findChat
};