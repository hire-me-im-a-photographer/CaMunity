var Bell = require('bell');
var Config = require('../config');

module.exports = {

//To serve public files, css, lib, etc
	serveFile: {
		auth: false,
		handler: {
			directory: {
				path: '../public'
			}
		}
	},

	home: {
		handler: function(request, reply) {
			reply.view('home');
		}
	},

	login: {
		handler: function(request, reply) {
			reply('login');
		}
	},

	signup: {
		handler: function(request, reply) {
			reply.view('signup');
		}
	},

	signin: {
		handler: function(request, reply) {
			reply.view('Sign In');
		}
	},

	help: {
		handler: function(request, reply) {
			reply('Help');
		}
	}

};