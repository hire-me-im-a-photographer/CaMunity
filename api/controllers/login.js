var Users = require("../models/users");

module.exports = {

	social: {
			auth: {
				mode: "optional"
			},
		handler: function (request, reply) {
				reply.view("signupSocial");
		}
	},

	facebook: {
		auth: {
			strategy: "facebook"
			},
		handler: function (request, reply) {

			var fb = request.auth.credentials.profile;

			var d = new Date();

			var profile = {
				auth: "Facebook",
				id: fb.id,
				username: fb.username,
				displayName: fb.displayName,
				firstName: fb.name.first,
				lastName: fb.name.last,
				email: fb.email,
				link: fb.raw.link,
				picture: (
					"https://graph.facebook.com/" + 
					fb.id + 
					"/picture?width=300&height=300"
					),
				gender: fb.raw.gender,
				dateJoined: d.toUTCString(),
				website: "",
				usertype: "nouser",
				talkingTo: "noone"
			};

			//Find user if exist, add user if they are a new user
			Users.findUser(fb.id, function (err, data) {

				console.log("Checking if user exists");
				
				if (data === null) {

					Users.addUser(profile, function (err, data){

						request.auth.session.set(profile);
						console.log("User added to database");
						reply.redirect("/signup/iam");
					});
					
				}
				else {

					profile = {
						auth: data.auth,
						id: data.id,
						username: data.userName,
						displayName: data.displayName,
						firstName: data.firstName,
						lastName: data.lastName,
						email: data.email,
						link: data.link,
						picture: data.picture,
						gender: data.gender,
						dateJoined: data.dateJoined,
						website: data.website,
						usertype: data.usertype,
						talkingTo: "noone"
					};

					request.auth.session.set(profile);
					console.log("Found user in database");
					reply.redirect("/dashboard");

				}
			});

		}
	},

	google: {
		auth: {
			strategy: "google"
			},
		handler: function (request, reply) {

			var g = request.auth.credentials.profile;

			var d = new Date();

			var profile = {
				auth: "Google",
				id: g.id,
				username: g.username,
				displayName: g.displayName,
				firstName: g.name.first,
				lastName: g.name.last,
				email: g.email,
				link: g.raw.link,
				picture: g.raw.picture,
				gender: g.raw.gender,
				dateJoined: d.toUTCString(),
				website: "",
				usertype: "nouser",
				talkingTo: "noone"
			};

			console.log(d, d.toUTCString());

			//Find user if exist, add user if they are a new user
			Users.findUser(g.id, function (err, data) {

				console.log("Checking if user exists");

				if (data === null) {

					Users.addUser(profile, function (err, data){

						request.auth.session.set(profile);
						console.log("User added to database");
						reply.redirect("/signup/iam");
					});
					
				}
				else {

					profile = {
						auth: data.auth,
						id: data.id,
						username: data.userName,
						displayName: data.displayName,
						firstName: data.firstName,
						lastName: data.lastName,
						email: data.email,
						link: data.link,
						picture: data.picture,
						gender: data.gender,
						dateJoined: data.dateJoined,
						website: data.website,
						usertype: data.usertype,
						talkingTo: "noone"
					};

					request.auth.session.set(profile);
					console.log("found user in database");
					reply.redirect("/dashboard");

				}
			});
			
		}
	},

	iam: {
		auth: {
			mode: "optional"
		},
		handler: function (request, reply) {

			if (request.auth.isAuthenticated) {
				reply.view("signupIam");
			}
			else {
				reply.redirect("/");
			}
		}
	},

	photographer: {
		auth: {
			mode: "optional"
		},
		handler: function (request, reply) {

			//Set usertype session and update to database
			request.auth.session.set("usertype", "photographer");
			var id = request.auth.credentials.id;
			var update = { "usertype": "photographer" };

			Users.updateUser(id, update, function (err, data){
				reply.redirect("/dashboard");
			});
		}
	},

	client: {
		auth: {
			mode: "optional"
		},
		handler: function (request, reply) {

			//Set usertype session and update to database
			request.auth.session.set("usertype", "client");
			var profile = request.auth.credentials;
			var update = { "usertype": "client" };

			Users.updateUser(profile.id, update, function (err, data){
				reply.redirect("/dashboard");
			});
		}
	},

};