var mongoose = require("mongoose");
var Job = require("./schema").Job;

function newjob(data, callback) {
	console.log("new job form: ", data);
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

module.exports = {
	newjob : newjob
};