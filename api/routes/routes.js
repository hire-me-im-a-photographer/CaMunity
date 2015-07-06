var controller = require("../controllers/controller.js");

module.exports = [

	{path: "/public/{file*}",	method:"GET",		config:controller.serveFile},
	{path: "/",					method:"GET",		config:controller.home},

	{path: "/facebook",			method:["GET", "POST"],		config:controller.facebook},
	{path: "/google",			method:["GET", "POST"],		config:controller.google},


	{path: "/signup/iam", 		method:"GET", 		config:controller.signupIam},
	{path: "/client", 			method:"POST", 		config:controller.signupClient},
	{path: "/photographer", 	method:"POST", 		config:controller.signupPhotographer},
	{path: "/signup/social", 	method:"GET", 		config:controller.signupSocial},
	{path: "/signup/password", 	method:"GET", 		config:controller.signup},
	{path: "/login/email", 		method:"GET", 		config:controller.login},
	{path: "/loggedin", 		method:"POST", 		config:controller.loggedIn},
	{path: "/createdaccount", 	method:"POST", 		config:controller.createdAccount},

	{path: "/profile", 			method:"GET", 		config:controller.profile},
	{path: "/dashboard", 		method:"GET", 		config:controller.dashboard},
	{path: "/newjob/step1", 	method:"GET", 		config:controller.newJobStepOne},
	{path: "/newjob/step1", 	method:"POST", 		config:controller.newJobStepOneP},

	{path: "/newjob/step2", 	method:"GET", 		config:controller.newJobStepTwo},
	{path: "/newjob/step2", 	method:"POST", 		config:controller.newJobStepTwoP},

	{path: "/logout", 			method:"GET", 		config:controller.logout},

	{path: "/help", 			method:"GET", 		config:controller.help}

	];