var Bell = require("bell");
var Config = require("../config");

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
		// auth: {
		// 	strategy: "facebook",
		// 	},
		handler: function(request, reply) {
			console.log("whats going on");
			// if (request.auth.isAuthenticated) {
			// 	console.log("facebook authenticated");
			// 	var fb = request.auth.credentials;
			// 	reply.redirect("dashboard");
			// }
		}
	},

	google: {
		auth: {
			strategy: "google",
			},
		handler: function(request, reply) {
			// if (request.auth.isAuthenticated) {
				console.log("google authenticated");
				var gPlus = request.auth.credentials;
				reply.redirect("/");
			// }
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
			mode: "optional"
		},
		handler: function(request, reply) {
			reply.view("dashboard");
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
			reply.redirect("/newjob/step2");
		}
	},

	newJobStepTwo: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {
			reply.view("newJobTwo");
		}
	},

	newJobStepTwoP: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {
			reply.redirect("/dashboard");
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
		// auth: {
		// 	strategy: "google" || "facebook",
		// 	},
		handler: function(request, reply) {
			reply.redirect("/");
		}
	}

};