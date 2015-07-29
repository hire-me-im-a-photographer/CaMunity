var Jobs = require("../models/jobs");

module.exports = {

	jobView: {
		auth: {
			mode: "optional"
		},
		handler: function (request, reply) {

			var job = request.params.id;
			var id = request.auth.credentials.id;

			if (request.auth.isAuthenticated) {
				Jobs.findJob(job, function (err, data) {

					var a = data.applications;
					var status;
					
					if(a.indexOf(id) === -1) {
						status = "no";
					}
					else {
						status = "yes";
					}
					reply.view("eachJob", { job: data, status: status });
				});
			}
			else {
				reply.redirect("/");
			}
		}
	},

	newForm: {
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
	apply: {
		auth: {
			mode: "optional"
		},
		handler: function (request, reply) {
			var job = Object.keys(request.payload)[0];
			var id = request.auth.credentials.id;

			Jobs.applyJob(job, id, function (err, data) {
				reply.redirect("/dashboard");
			});
		}
	},
};