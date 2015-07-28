var Jobs 	= require("../models/jobs");

module.exports = {

	view: {
		auth: {
			mode: "optional"
		},
		handler: function (request, reply) {

			if (request.auth.isAuthenticated) {
				reply.view("newJob");
			}
			else {
				reply.redirect("/");
			}
		}
	},

	post: {
		auth: {
			mode: "optional"
		},
		handler: function (request, reply) {

			if (request.auth.isAuthenticated) {

			var id = request.auth.credentials.id;

			var d = new Date();

			var new_job = {
				user: id,
				dateAdded: d.toUTCString(),
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

			Jobs.newJob(new_job, function(err, data) {
				reply.redirect("/dashboard");
			});

			}
			else {
				reply.redirect("/");
			}

		}
	},
};