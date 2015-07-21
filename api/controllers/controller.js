var Bell = require("bell");
var Config = require("../config");
var Jobs = require("../models/jobs");
var Users = require("../models/users");

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
		handler: function(request, reply) {
			
			if(request.auth.isAuthenticated) {
				reply.redirect("/dashboard");
			} else {
				reply.view("home");
			}
		}
	},

	signupSocial: {
			auth: {
				mode: "optional"
			},
		handler: function(request, reply) {
				reply.view("signupSocial");
		}
	},

	facebook: {
		auth: {
			strategy: "facebook"
			},
		handler: function(request, reply) {

			var fb = request.auth.credentials.profile;

			//Setup session with no usertype default
			var profile = {
				auth: "Facebook",
				id: fb.id,
				username: fb.username,
				displayName: fb.displayName,
				firstName: fb.name.first,
				lastName: fb.name.last,
				email: fb.email,
				link: fb.raw.link,
				picture: ('https://graph.facebook.com/' + fb.id + '/picture?width=300&height=300'),
				gender: fb.raw.gender,
				usertype: "nouser"
			};

			request.auth.session.set(profile);

			//Find user if exist, add user if they are a new user
			Users.getUser(fb.id, function(err, data) {

				console.log("Checking if user exists");
				
				if(data === null) {

					Users.addUser(profile, function(err, data){
						console.log("User added to database");
						reply.redirect("/signup/iam");
					});
					
				} else {
					console.log("Found user in database");
					request.auth.session.set("usertype", data.usertype);
					reply.redirect("/dashboard");

				}
			});

		}
	},

	google: {
		auth: {
			strategy: "google"
			},
		handler: function(request, reply) {

			var g = request.auth.credentials.profile;

			//Setup session with no usertype default
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
				usertype: "nouser"
			};

			request.auth.session.set(profile);

			//Find user if exist, add user if they are a new user
			Users.getUser(g.id, function(err, data) {

				console.log("Checking if user exists");

				if(data === null) {

					Users.addUser(profile, function(err, data){
						console.log("User added to database");
						reply.redirect("/signup/iam");
					});
					
				} else {
					console.log("found user in database");
					request.auth.session.set("usertype", data.usertype);
					reply.redirect("/dashboard");

				}
			});
			
		}
	},

	signupIam: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {
			if(request.auth.isAuthenticated) {
				reply.view("signupIam");
			} else {
				reply.redirect("/");
			}
		}
	},

	signupPhotographer: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {

			//Set usertype session and update to database
			request.auth.session.set("usertype", "photographer");
			var id = request.auth.credentials.id;
			var update = {"usertype": "photographer"};

			Users.updateUser(id, update, function(err, data){
				console.log("is it updating");
				reply.redirect("/dashboard");
			});
		}
	},

	signupClient: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {

			//Set usertype session and update to database
			request.auth.session.set("usertype", "client");
			var profile = request.auth.credentials;
			var update = {"usertype": "client"};

			Users.updateUser(profile.id, update, function(err, data){
				console.log("is it updating");
				reply.redirect("/dashboard");
			});
		}
	},

	dashboard: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {

			if(request.auth.isAuthenticated) {
				console.log("user info: ", request.auth.credentials);

				Jobs.getAllJobs(function(err, data) {
					reply.view("dashboard", {jobs: data});
				});
			} else {
				reply.redirect("/");
			}
		}
	},

	profile: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {

			if(request.auth.isAuthenticated) {
				var data = request.auth.credentials;
				reply.view("profile", {data: data});
			} else {
				reply.redirect("/");
			}
		}
	},

	newJobForm: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {

			if(request.auth.isAuthenticated) {
				reply.view("newJob");
			} else {
				reply.redirect("/");
			}
		}
	},

	newJobPost: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {

			if(request.auth.isAuthenticated) {

			var user_id = request.auth.credentials.id;

			var new_job = {
				user: user_id,
				dateAdded: new Date(),
				postingAs: request.payload.postingAs,
				eventName: request.payload.eventName,
				dateTime: request.payload.dateTime,
				jobDuration: request.payload.jobDuration,
				location: request.payload.location,
				description: request.payload.description,
				useOfPhotos: request.payload.useOfPhotos,
				dateRequired: request.payload.dateRequired,
				noOfPhotographers: request.payload.noOfPhotographers
			};

			Jobs.newjob(new_job, function(err, data) {
				reply.redirect("/dashboard");
			});

			} else {
				reply.redirect("/");
			}

		}
	},

	help: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {
			reply("Help");
		}
	},

	logout: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {
			request.auth.session.clear();
			console.log(request.auth);
			reply.redirect("/");
		}
	}

};