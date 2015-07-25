var mongoose = require("mongoose");
var Job = require("./schema").Job;

function newjob (data, callback) {

	var newJob = new Job(data);

	Job.create(newJob, function (err, data) {

		if (err) {
			return callback(err, null);
		}
		else {
			return callback(null, data);
		}

	});
}

function getAllJobs (callback) {
	
	Job.find(function (err, data) {
		if (err) {
			return callback(err, null);
		} else {
			return callback(null, data);
		}
	});
}

module.exports = {
	newjob : newjob,
	getAllJobs : getAllJobs
};