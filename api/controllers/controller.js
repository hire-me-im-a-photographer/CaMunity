var Bell 	= require("bell");
var Config 	= require("../config");
var Jobs 	= require("../models/jobs");
var Users 	= require("../models/users");
var Chat  	= require("../models/chat");
var aws 	= require('aws-sdk');

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
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {
			
			if(request.auth.isAuthenticated) {
				reply.redirect("/dashboard");
			} else {
				reply.view("home");
			}
		}
	},

	signupSocial: {
			auth: {
				mode: "optional"
			},
		handler: function(request, reply) {
				reply.view("signupSocial");
		}
	},

	facebook: {
		auth: {
			strategy: "facebook"
			},
		handler: function(request, reply) {

			var fb = request.auth.credentials.profile;

			//Setup session with no usertype default
			var profile = {
				auth: "Facebook",
				id: fb.id,
				username: fb.username,
				displayName: fb.displayName,
				firstName: fb.name.first,
				lastName: fb.name.last,
				email: fb.email,
				link: fb.raw.link,
				picture: ('https://graph.facebook.com/' + fb.id + '/picture?width=300&height=300'),
				gender: fb.raw.gender,
				usertype: "nouser"
			};

			request.auth.session.set(profile);

			//Find user if exist, add user if they are a new user
			Users.getUser(fb.id, function(err, data) {

				console.log("Checking if user exists");
				
				if(data === null) {

					Users.addUser(profile, function(err, data){
						console.log("User added to database");
						reply.redirect("/signup/iam");
					});
					
				} else {
					console.log("Found user in database");
					request.auth.session.set("usertype", data.usertype);
					reply.redirect("/dashboard");

				}
			});

		}
	},

	google: {
		auth: {
			strategy: "google"
			},
		handler: function(request, reply) {

			var g = request.auth.credentials.profile;

			//Setup session with no usertype default
			var profile = {
				auth: "Google",
				id: g.id,
				username: g.username,
				displayName: g.displayName,
				firstName: g.name.first,
				lastName: g.name.last,
				email: g.email,
				link: g.raw.link,
				picture: g.raw.picture,
				gender: g.raw.gender,
				usertype: "nouser",
				talkingTo: "noone"
			};

			request.auth.session.set(profile);

			//Find user if exist, add user if they are a new user
			Users.getUser(g.id, function(err, data) {

				console.log("Checking if user exists");

				if(data === null) {

					Users.addUser(profile, function(err, data){
						console.log("User added to database");
						reply.redirect("/signup/iam");
					});
					
				} else {
					console.log("found user in database");
					request.auth.session.set("usertype", data.usertype);
					reply.redirect("/dashboard");

				}
			});
			
		}
	},

	signupIam: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {
			if(request.auth.isAuthenticated) {
				reply.view("signupIam");
			} else {
				reply.redirect("/");
			}
		}
	},

	signupPhotographer: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {

			//Set usertype session and update to database
			request.auth.session.set("usertype", "photographer");
			var id = request.auth.credentials.id;
			var update = {"usertype": "photographer"};

			Users.updateUser(id, update, function(err, data){
				reply.redirect("/dashboard");
			});
		}
	},

	signupClient: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {

			//Set usertype session and update to database
			request.auth.session.set("usertype", "client");
			var profile = request.auth.credentials;
			var update = {"usertype": "client"};

			Users.updateUser(profile.id, update, function(err, data){
				reply.redirect("/dashboard");
			});
		}
	},

	dashboard: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {

			if(request.auth.isAuthenticated) {

				Jobs.getAllJobs(function(err, data) {
					reply.view("dashboard", {jobs: data});
				});
			} else {
				reply.redirect("/");
			}
		}
	},

	profile: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {

			if(request.auth.isAuthenticated) {
				var profile = request.auth.credentials;

				Users.getUser(profile.id, function(err, data){

					var photos = data.photos;
					reply.view("profile", {profile: profile, photos: photos});
					
				});
			} else {
				reply.redirect("/");
			}
		}
	},

	newJobForm: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {

			if(request.auth.isAuthenticated) {
				reply.view("newJob");
			} else {
				reply.redirect("/");
			}
		}
	},

	newJobPost: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {

			if(request.auth.isAuthenticated) {

			var user_id = request.auth.credentials.id;

			var new_job = {
				user: user_id,
				dateAdded: new Date(),
				postingAs: request.payload.postingAs,
				eventName: request.payload.eventName,
				dateTime: request.payload.dateTime,
				jobDuration: request.payload.jobDuration,
				location: request.payload.location,
				description: request.payload.description,
				useOfPhotos: request.payload.useOfPhotos,
				dateRequired: request.payload.dateRequired,
				noOfPhotographers: request.payload.noOfPhotographers
			};

			Jobs.newjob(new_job, function(err, data) {
				reply.redirect("/dashboard");
			});

			} else {
				reply.redirect("/");
			}

		}
	},

	upload: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {
			reply.view("upload");
		}
	},

	signS3: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {

			//S3 setup
			aws.config.update({accessKeyId: Config.s3.key, secretAccessKey: Config.s3.secret});
			var s3 = new aws.S3();
			var s3_params = {
			    Bucket: Config.s3.bucket,
			    Key: request.query.file_name,
			    Expires: 60,
			    ContentType: request.query.file_type,
			    ACL: Config.s3.acl
			};

			s3.getSignedUrl('putObject', s3_params, function(err, data){
			    if(err){
			        console.log(err);
			    }
			    else{
			        var return_data = {
			            signed_request: data,
			            url: 'https://'+Config.s3.bucket+'.s3.amazonaws.com/'+request.query.file_name
			        };
			        reply(JSON.stringify(return_data));
			    }
			});
		}
	},

	submitForm: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {

			//Upload url + description to DB
			var upload = { $push: {"photos": {
				"url": request.payload.photo_url,
				"description": request.payload.description
			}}};

			var id = request.auth.credentials.id;

			Users.updateUser(id, upload, function(err, data) {
				reply.redirect("/profile");
			});
		}
	},

	users: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {

			var myid = request.auth.credentials.id;

			Users.getAllUsers(function(err, data) {
				reply.view("users", {users: data, myid: myid});
			});
		}
	},

	chatWith: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {

			var profile = request.auth.credentials;
			var myid = profile.id;
			var chatWith = Object.keys(request.payload)[0];
			var users = {"firstUser": myid, "secondUser": chatWith};

			profile.talkingTo = chatWith;
			request.auth.session.set(profile);

			//Crazy stuff
			Chat.findChat(users, function(err, data) {

				if(data.length === 0) {

					console.log("Users are in the wrong order");
					var newusers = {"firstUser": chatWith, "secondUser": myid};

					Chat.findChat(newusers, function(err, data) {

						if(data.length === 0) {

							console.log("New chat");

							Chat.newChat(newusers, function(err, data) {
								reply.redirect("/chat/" + chatWith);
							});

						} else {

							console.log("Chat exist");
							reply.redirect("/chat/" + chatWith);
						}
					});

				} else {

					console.log("Chat exist");
					reply.redirect("/chat/" + chatWith);
				}

			});
		}
	},

	chat: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {
			var profile = request.auth.credentials;
			var myid = profile.id;
			var chatWith = profile.talkingTo;
			var users = {"firstUser": myid, "secondUser": chatWith};

			//Some crazy stuff
			Chat.findChat(users, function(err, data) {

				if(data.length === 0) {

					console.log("Users are in the wrong order");
					var newusers = {"firstUser": chatWith, "secondUser": myid};

					Chat.findChat(newusers, function(err, data) {

						console.log(data[0].chat);
						var sender = "sender";
						reply.view("chat", {data: data[0].chat, myid: myid});
					});

				} else {

					console.log(data[0].chat);
					var sender = "sender";
					reply.view("chat", {data: data[0].chat, myid: myid});
				}
			});
		}
	},

	chatSubmit: {
		auth: {
			mode: "optional"
		},
		handler: function(request, reply) {

			var profile = request.auth.credentials;
			var myid = profile.id;
			var chatWith = profile.talkingTo;
			var users = {"firstUser": myid, "secondUser": chatWith};

			var chat = { $push: {"chat": {
				"sender": myid,
				"name": profile.firstName + " " + profile.lastName,
				"message": request.payload.chat,	
				"time": Date()
			}}};

			Chat.addChat(users, chat, function(err, data) {
				reply.redirect("/chat/"+ profile.talkingTo);
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