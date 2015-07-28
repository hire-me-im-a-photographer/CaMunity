var Config 	= require("../config");
var Aws 	= require("aws-sdk");
var Photos 	= require("../models/photos");

module.exports = {

	view: {
		auth: {
			mode: "optional"
		},
		handler: function (request, reply) {
			reply.view("upload");
		}
	},

	signS3: {
		auth: {
			mode: "optional"
		},
		handler: function (request, reply) {

			var id = request.auth.credentials.id;
			var query = request.query;
			var randomKey = Math.floor((Math.random() * 1000) + 1);

			//S3 setup
			Aws.config.update({
				accessKeyId: Config.s3.key, 
				secretAccessKey: Config.s3.secret
			});

			var s3 = new Aws.S3();
			var s3_params = {
			    Bucket: Config.s3.bucket,
			    Key: id + "/" + randomKey + "_" + query.file_name,
			    Expires: 60,
			    ContentType: query.file_type,
			    ACL: Config.s3.acl
			};
			// request.query.file_type (type of file you want to upload)

			s3.getSignedUrl("putObject", s3_params, function (err, data){
			    if (err) {
			        console.log(err);
			    }
			    else {
			        var return_data = {
			            signed_request: data,
			            url: 
			            "https://" + Config.s3.bucket + 
			            ".s3.amazonaws.com/" + id + "/" + randomKey + 
			            "_" + query.file_name,
			        };
			        reply(JSON.stringify(return_data));
			    }
			});
		}
	},

	submit: {
		auth: {
			mode: "optional"
		},
		handler: function (request, reply) {

			var id = request.auth.credentials.id;
			var url = request.payload.photo_url;

			var file = url.split("/").slice(4)[0];
			var name = file.split(".")[0];
			var ext = file.split(".")[1];

			var update = { $push: { "photos": {
				"title": request.payload.title,
				"name": name,
				"ext": ext,
				"url": url
			}}};

			Photos.findGallery(id, function (err, data) {

				if (data === null) {

					var object = { "user": id };
					Photos.newGallery(object, function (err, data) {

						Photos.newPhoto(id, update, function (err, data) {
							reply.redirect("/profile");
						});
					});
				}
				else {
					Photos.newPhoto(id, update, function (err, data) {
						reply.redirect("/profile");
					});
				}
			});

		}
	}

};