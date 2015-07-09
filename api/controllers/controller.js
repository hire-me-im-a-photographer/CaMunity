var Bell = require("bell");
var Config = require("../config");
var jobs = require("../models/jobs");

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

	facebook: {
		auth: {
			strategy: "facebook"
			},
		handler: function(request, reply) {
			if (request.auth.isAuthenticated) {
				console.log("facebook authenticated", request.auth.credentials);

				var fb = request.auth.credentials.profile;

				var profile = {
					auth: "facebook",
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

				request.auth.session.clear();
				request.auth.session.set(profile);

				reply.redirect("/dashboard");

			} else {
				reply.redirect("/");
			}
		}
	},

	google: {
		auth: {
			strategy: "google"
			},
		handler: function(request, reply) {
			if (request.auth.isAuthenticated) {
				console.log("google authenticated", request.auth.credentials);

				var g = request.auth.credentials.profile;

				var profile = {
					auth: "google",
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

				request.auth.session.clear();
				request.auth.session.set(profile);

				reply.redirect("/dashboard");

			} else {
				reply.redirect("/");
			}
		}
	},

	home: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {
			reply.view("home");
		}
	},

	login: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {
			reply.view("login");
		}
	},

	loggedIn: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {
			console.log("logged in");
			reply.redirect("dashboard");
		}
	},

	createdAccount: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {
			console.log("account created");
			reply.redirect("dashboard");
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
			if(request.auth.authenticated) {
				reply.redirect("/");
			}
		}
	},

	signup: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {
			reply.view("signupForm");
		}
	},

	dashboard: {
		auth: {
			strategy: "session"
		},
		handler: function(request, reply) {
			console.log("profile ", request.auth.credentials.profile);
			reply.view("dashboard");
		}
	},

	profile: {
		auth: {
			strategy: "session"
		},
		handler: function(request, reply) {
			console.log("profile ", request.auth.credentials.profile);
			reply.view("profile");
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

			var post = request.payload;

			jobs.newjob(request.payload, function (err, data) {
				reply.redirect("/newjob/step2");
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
			reply.redirect("/");
		}
	}

};