var Controller = require("../controllers/controller.js");
var Profile = require("../controllers/profile");
var Upload = require("../controllers/upload");
var Login = require("../controllers/login");
var Chat = require("../controllers/chat");
var Job = require("../controllers/job");

module.exports = [

	{ path: "/public/{file*}",	method: "GET",				config: Controller.serveFile },
	{ path: "/",				method: "GET",				config: Controller.home },
	{ path: "/dashboard", 		method: "GET", 				config: Controller.dashboard },
	{ path: "/users", 			method: "GET", 				config: Controller.users },
	{ path: "/help", 			method: "GET", 				config: Controller.help },
	{ path: "/logout", 			method: "GET", 				config: Controller.logout },

	{ path: "/signup/social", 	method: "GET", 				config: Login.social },
	{ path: "/facebook",		method: ["GET", "POST"],	config: Login.facebook },
	{ path: "/google",			method: ["GET", "POST"],	config: Login.google },
	{ path: "/signup/iam", 		method: "GET", 				config: Login.iam },
	{ path: "/client", 			method: "POST", 			config: Login.client },
	{ path: "/photographer", 	method: "POST", 			config: Login.photographer },

	{ path: "/profile", 		method: "GET", 				config: Profile.view },
	{ path: "/profile/{id*}", 	method: "GET", 				config: Profile.publicView },
	{ path: "/profile/{id*}", 	method: "POST", 			config: Profile.publicPost },
	{ path: "/profile/edit", 	method: "GET", 				config: Profile.edit },	
	{ path: "/profile/edit", 	method: "POST", 			config: Profile.post },	
	{ path: "/photo/delete", 	method: "POST", 			config: Profile.deletePhoto },	

	{ path: "/upload", 			method: "GET", 				config: Upload.view },
	{ path: "/sign_s3", 		method: "GET", 				config: Upload.signS3 },
	{ path: "/watermark", 		method: "GET", 				config: Upload.watermark },
	{ path: "/submit_form", 	method: "POST", 			config: Upload.submit },

	{ path: "/chat2/{id*}", 	method: "POST", 			config: Chat.recipient },
	{ path: "/chat/{id*}", 		method: "GET", 				config: Chat.view},
	{ path: "/chat/{id*}", 		method: "POST", 			config: Chat.submit },

	{ path: "/newjob", 			method: "GET", 				config: Job.newForm },
	{ path: "/newjob", 			method: "POST", 			config: Job.post },
	{ path: "/job/apply", 		method: "POST", 			config: Job.apply },	

	] ;