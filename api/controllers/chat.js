var Users = require("../models/users");
var Chat = require("../models/chat");

module.exports = {

	recipient: {
		auth: {
			mode: "optional"
		},
		handler: function (request, reply) {

			var profile = request.auth.credentials;
			var myid = profile.id;
			var chatWith = Object.keys(request.payload)[0];
			var users = { "users": [myid, chatWith] };

			profile.talkingTo = chatWith;
			request.auth.session.set(profile);

			Chat.findChat(myid, chatWith, function (err, data) {

				if (data.length === 0) {

					console.log("New chat");
					Chat.newChat(users, function (err, data){
						reply.redirect("/chat/" + chatWith);
					});

				}
				else {
					console.log("Chat exists");
					reply.redirect("/chat/" + chatWith);
				}
			});

		}
	},

	view: {
		auth: {
			mode: "optional"
		},
		handler: function (request, reply) {

			if (request.auth.isAuthenticated) {

				var profile = request.auth.credentials;
				var myid = profile.id;
				var chatWith = request.params.id;

				Chat.findChat(myid, chatWith, function (err, data) {

						Users.findUser(chatWith, function (err, result){
							reply.view("chat", {
								data: data[0],
								profile: profile,
								talkingTo: result
							});
						});
				});
			}
			else {
				reply.redirect("/");
			}
		}
	},

	submit: {
		auth: {
			mode: "optional"
		},
		handler: function (request, reply) {

			var profile = request.auth.credentials;
			var myid = profile.id;
			var chatWith = profile.talkingTo;
			var d = new Date();

			var chat = { $push: { "chat": {
				"sender": myid,
				"name": profile.firstName + " " + profile.lastName,
				"message": request.payload.chat,	
				"time": d.toUTCString()
			}}};

			Chat.addChat(myid, chatWith, chat, function (err, data) {
				reply.redirect("/chat/"+ chatWith);
			});
		}
	}

};