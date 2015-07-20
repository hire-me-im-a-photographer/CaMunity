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

	signupIam: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {
			reply.view("signupIam");
		}
	},

	signupPhotographer: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {
			console.log("I am a photographer");
			reply.redirect("/signup/social");
		}
	},

	signupClient: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {
			console.log("I am a client");
			reply.redirect("/signup/social");
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
				gender: fb.raw.gender
			};

			request.auth.session.set(profile);

			Users.addUser(profile, function(err, data){
				console.log("User added to database");
			});

			reply.redirect("/dashboard");

		}
	},

	google: {
		auth: {
			strategy: "google"
			},
		handler: function(request, reply) {
			var g = request.auth.credentials.profile;


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
				gender: g.raw.gender
			};

			request.auth.session.set(profile);

			Users.addUser(profile, function(err, data){
				console.log("User added to database");
			});
			
			reply.redirect("/dashboard");
		}
	},

	dashboard: {
		auth: {
			mode: "try"
		},
		handler: function(request, reply) {

			var email;

			if(request.auth.isAuthenticated) {

				email = request.auth.credentials.email;

				Jobs.getAllJobs(email, function(err, data) {
					console.log(request.auth.session);
					reply.view("dashboard", {jobs: data});
				});

			} else {

				email = "test@test.com";

				Jobs.getAllJobs(email, function(err, data) {
					console.log(request.auth.session);
					reply.view("dashboard", {jobs: data});
				});
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
				testdata = {
					auth: "test",
					id: "123",
					username: "test",
					displayName: "test",
					firstName: "test",
					lastName: "test",
					email: "test@test.com",
					link: "test",
					picture: "test",
					gender: "test"
				};
				reply.view("profile", {data: testdata});
			}
		}
	},

	newJobStepOne: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {
			reply.view("newJobOne");
		}
	},

	newJobStepOneP: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {

			var user_email;

			if(request.auth.isAuthenticated) {

				user_email = request.auth.credentials.email;

			} else {

				user_email = "test@test.com";
			}

			var new_job = {
				user: user_email,
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

		}
	},

	newJobStepTwo: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {
			console.log(request.payload);
			reply.view("newJobTwo");
		}
	},

	newJobStepTwoP: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {

			var post = request.payload;

			jobs.newjob(request.payload, function (err, data) {
				reply.redirect("/dashboard");
			});
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