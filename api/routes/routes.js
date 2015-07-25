var controller = require("../controllers/controller.js");

module.exports = [

	{path: "/public/{file*}",	method: "GET",				config:controller.serveFile},
	{path: "/",					method: "GET",				config:controller.home},

	{path: "/signup/iam", 		method: "GET", 				config:controller.signupIam},
	{path: "/client", 			method: "POST", 			config:controller.signupClient},
	{path: "/photographer", 	method: "POST", 			config:controller.signupPhotographer},
	{path: "/signup/social", 	method: "GET", 				config:controller.signupSocial},

	{path: "/facebook",			method: ["GET", "POST"],	config:controller.facebook},
	{path: "/google",			method: ["GET", "POST"],	config:controller.google},
	
	{path: "/dashboard", 		method: "GET", 				config:controller.dashboard},
	{path: "/profile", 			method: "GET", 				config:controller.profile},
	{path: "/profile/edit", 	method: "GET", 				config:controller.profileEdit},	
	{path: "/profile/edit", 	method: "POST", 			config:controller.profileEditP},	

	{path: "/newjob", 			method: "GET", 				config:controller.newJobForm},
	{path: "/newjob", 			method: "POST", 			config:controller.newJobPost},

	{path: "/logout", 			method: "GET", 				config:controller.logout},

	{path: "/help", 			method: "GET", 				config:controller.help},
	{path: "/upload", 			method: "GET", 				config:controller.upload},
	{path: "/sign_s3", 			method: "GET", 				config:controller.signS3},
	{path: "/submit_form", 		method: "POST", 			config:controller.submitForm},

	{path: "/users", 			method: "GET", 				config:controller.users},
	{path: "/chatwith/{user*}", method: "POST", 			config:controller.chatWith},
	{path: "/chat/{id*}", 		method: "GET", 				config:controller.chat},
	{path: "/chat/{id*}", 		method: "POST", 			config:controller.chatSubmit},
	];