var Config = require("../config");
var Photos = require("../models/photos");
var Users = require("../models/users");
var Aws = require("aws-sdk");

module.exports = {

	view: {
		auth: {
			mode: "optional"
		},
		handler: function (request, reply) {

			if (request.auth.isAuthenticated) {

				var profile = request.auth.credentials;
				Photos.findGallery(profile.id, function(err, data){

					if (data === null) {
						reply.view("profile", {profile: profile});
					}
					else {
						var photos = data.photos;
						reply.view("profile", {
							profile: profile, 
							photos: photos
						});					
					}
				});

			}
			else {
				reply.redirect("/");
			}
		}
	},

	publicView: {
		auth: {
			mode: "optional"
		},
		handler: function (request, reply) {

			var id = request.params.id;
			var profile;

			Users.findUser(id, function (err, data) {

				if (data === null) {
					reply.redirect("/");
				}
				else {
					profile = data;

					Photos.findGallery(profile.id, function(err, data){

						if (data === null) {
							reply.view("publicProfile", { profile: profile });
						}
						else {
							var photos = data.photos;
							reply.view("publicProfile", {
								profile: profile, 
								photos: photos
							});					
						}
					});
				}
			});
		}
	},

	publicPost: {
		auth: {
			mode: "optional"
		},
		handler: function (request, reply) {
			var viewing = Object.keys(request.payload)[0];
			reply.redirect("/profile/" + viewing);
		}
	},

	edit: {
		auth: {
			mode: "optional"
		},
		handler: function (request, reply) {
			var profile = request.auth.credentials;
			reply.view("profileEdit", {profile: profile});
		}
	},

	post: {
		auth: {
			mode: "optional"
		},
		handler: function (request, reply) {

			var profile = request.auth.credentials;
			var update = request.payload;

			profile.firstName = update.firstName;
			profile.lastName = update.lastName;
			profile.website = update.website;

			request.auth.session.set(profile);
			Users.updateUser(profile.id, update, function (err, data) {
				reply.redirect("/profile");
			});

		}
	},

	deletePhoto: {
		auth: {
			mode: "optional"
		},
		handler: function (request, reply) {
			var id = request.auth.credentials.id;

			//Big mess to get url from input
			var mess = Object.keys(request.payload)[0];
			var filename = mess.split(" ")[0];
			var ext = mess.split(" ")[1];
			var path = id + "/" + filename + "." + ext;
			var url = "https://camunity.s3.amazonaws.com/" + path;

			Aws.config.update({
				accessKeyId: Config.s3.key, 
				secretAccessKey: Config.s3.secret
			});
			
			var s3 = new Aws.S3();
			var params = {
			  Bucket: Config.s3.bucket,
			  Key: path,
			};
			s3.deleteObject(params, function(err, data) {

			  	if (err) {
			  		console.log("Error deleting from S3", err, err.stack);
			  	}
			  	else {
			  		console.log("Successfully deleted from S3");
			  	}
			});

			Photos.deletePhoto(id, url, function (err, data) {
				reply.redirect("/profile");
			});
		}
	},

};