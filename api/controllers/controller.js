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
			reply("login");
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
			reply.redirect("/signup");
		}
	},

	signupClient: {
		handler: function(request, reply) {
			console.log("I am a client");
			reply.redirect("/signup");
		}
	},

	signup: {
		handler: function(request, reply) {
			reply.view("signupForm");
		}
	},

	signin: {
		handler: function(request, reply) {
			reply.view("Sign In");
		}
	},

	help: {
		handler: function(request, reply) {
			reply("Help");
		}
	}

};