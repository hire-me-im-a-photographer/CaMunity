var controller = require("../controllers/controller.js");

module.exports = [

	{path: "/public/{file*}",	method:"GET",		config:controller.serveFile},
	{path: "/",					method:"GET",		config:controller.home},

	{path: "/signup/iam", 		method:"GET", 		config:controller.signupIam},
	{path: "/client", 			method:"POST", 		config:controller.signupClient},
	{path: "/photographer", 	method:"POST", 		config:controller.signupPhotographer},
	{path: "/signup/social", 	method:"GET", 		config:controller.signupSocial},
	{path: "/signup/password", 	method:"GET", 		config:controller.signup},
	{path: "/login/email", 		method:"GET", 		config:controller.login},
	{path: "/loggedin", 		method:"POST", 		config:controller.loggedIn},
	{path: "/createdaccount", 	method:"POST", 		config:controller.createdAccount},
	{path: "/dashboard", 		method:"GET", 		config:controller.dashboard},


	{path: "/help", 			method:"GET", 		config:controller.help}

	];