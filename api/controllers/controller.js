var Users = require("../models/users");
var Jobs = require("../models/jobs");

module.exports = {

//To serve public files, css, lib, etc
	serveFile: {
		auth: false,
		handler: {
			directory: {
				path: "../public"
			}
		}
	},

	home: {
		auth: {
			mode: "optional"
		},
		handler: function (request, reply) {
			
			if (request.auth.isAuthenticated) {
				reply.redirect("/dashboard");
			}
			else {
				reply.view("home");
			}
		}
	},

	dashboard: {
		auth: {
			mode: "optional"
		},
		handler: function (request, reply) {

			var profile = request.auth.credentials;

			if (request.auth.isAuthenticated) {

				if (profile.usertype === "client") {
					Jobs.getMyJob(profile.id, function (err, data) {
						console.log("client, ", data);
						reply.view("dashboard", { jobs: data, profile: profile });
					});
				}
				else {
					Jobs.getAllJobs(function (err, data) {
						reply.view("dashboard", { jobs: data, profile: profile });
					});
				}
			}
			else {
				reply.redirect("/");
			}
		}
	},

	users: {
		auth: {
			mode: "optional"
		},
		handler: function (request, reply) {

			var id = request.auth.credentials.id;

			Users.getAllUsers(function(err, data) {
				reply.view("users", { users: data, myid: id });
			});
		}
	},

	help: {
		auth: {
			mode: "optional"
		},
		handler: function (request, reply) {
			reply("Help");
		}
	},

	logout: {
		auth: {
			mode: "optional"
		},
		handler: function (request, reply) {
			request.auth.session.clear();
			reply.redirect("/");
		}
	}

};