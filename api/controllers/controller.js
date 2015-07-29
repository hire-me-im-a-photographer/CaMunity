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
				Jobs.getAllJobs(function (err, data) {

					var status;
					var applications = data[0].applications;
					if (applications.length === 0) {
						status = "No";
					} else {
						for (i=0; i<applications.length; ++i) {
							if (applications[i] === profile.id) {
								status = "Yes";
							}
							else if (applications.length === 0) {
								status = "No";
							}
							else {
								status = "No";
							}
						}
					}
					console.log(applications, status);
					reply.view("dashboard", {
						jobs: data,
						profile: profile,
						status: status
					});
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