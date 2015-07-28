var Jobs = require("../models/jobs");

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

			var p = request.payload;

			var new_job = {
				user: id,
				dateAdded: d.toUTCString(),
				postingAs: p.postingAs,
				eventName: p.eventName,
				dateTime: p.dateTime,
				jobDuration: p.jobDuration,
				location: p.location,
				description: p.description,
				useOfPhotos: p.useOfPhotos,
				watermark: {
					"url": p.watermark[0],
					"location": p.watermark[1]
				},
				dateRequired: p.dateRequired,
				noOfPhotographers: p.noOfPhotographers

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