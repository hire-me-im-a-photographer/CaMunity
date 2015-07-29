var Jobs = require("../models/jobs");
var Users = require("../models/users");

module.exports = {

	jobView: {
		auth: {
			mode: "optional"
		},
		handler: function (request, reply) {

			var job = request.params.id;
			var profile = request.auth.credentials;

			if (request.auth.isAuthenticated) {
				Jobs.findJob(job, function (err, data) {

					var a = data.applications;

					if (profile.usertype === "client") {

						Users.findApplicants(a, function (err, result) {
							console.log(result);
							reply.view("c-job", {
								job: data,
								profile: profile,
								applicants: result
							});
						});
					}
					else if (profile.usertype === "photographer") {

						var status;
						
						if (a.indexOf(profile.id) === -1) {
							status = "no";
						}
						else {
							status = "yes";
						}

						reply.view("p-job", {
							job: data,
							status: status,
							profile: profile
						});
					}
					else {
						reply.redirect("/signupiam");
					}
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
				client: id,
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
			Jobs.newJob(new_job, function (err, data) {
				console.log(new_job);
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