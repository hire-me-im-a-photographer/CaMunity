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

	home: {
		handler: function(request, reply) {
			reply.view("home");
		}
	},

	login: {
		handler: function(request, reply) {
			reply.view("login");
		}
	},

	loggedIn: {
		handler: function(request, reply) {
			console.log("logged in");
			reply.redirect("dashboard");
		}
	},

	createdAccount: {
		handler: function(request, reply) {
			console.log("account created");
			reply.redirect("dashboard");
		}
	},

	signupIam: {
		handler: function(request, reply) {
			reply.view("signupIam");
		}
	},

	signupPhotographer: {
		handler: function(request, reply) {
			console.log("I am a photographer");
			reply.redirect("/signup/social");
		}
	},

	signupClient: {
		handler: function(request, reply) {
			console.log("I am a client");
			reply.redirect("/signup/social");
		}
	},

	signupSocial: {
		handler: function(request, reply) {
			reply.view("signupSocial");
		}
	},

	signup: {
		handler: function(request, reply) {
			reply.view("signupForm");
		}
	},

	dashboard: {
		handler: function(request, reply) {
			reply.view("dashboard");
		}
	},

	help: {
		handler: function(request, reply) {
			reply("Help");
		}
	}

};