var controller = require("../controllers/controller.js");

module.exports = [
	{path: "/public/{file*}",	method:"GET",		config:controller.serveFile},
	{path: "/",					method:"GET",		config:controller.home},
	{path: "/login", 			method:"POST", 		config:controller.login},
	{path: "/signup/iam", 		method:"GET", 		config:controller.signupIam},
	{path: "/client", 			method:"POST", 		config:controller.signupClient},
	{path: "/photographer", 	method:"POST", 		config:controller.signupPhotographer},
	{path: "/signup", 			method:"GET", 		config:controller.signup},

	{path: "/signin", 			method:"GET", 		config:controller.signin},
	{path: "/help", 			method:"GET", 		config:controller.help}
	];