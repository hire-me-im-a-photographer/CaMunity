var Jobs 	= require("../models/jobs");
var Users 	= require("../models/users");

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

			console.log(request.auth.credentials);

			if (request.auth.isAuthenticated) {
				Jobs.getAllJobs(function(err, data) {
					reply.view("dashboard", {jobs: data});
				});
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

			var myid = request.auth.credentials.id;

			Users.getAllUsers(function(err, data) {
				reply.view("users", {users: data, myid: myid});
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