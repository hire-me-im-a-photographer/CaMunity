var Job = require("./schema").job;

var newJob = function (data, callback) {

	var newJob = new Job(data);

	Job.create(newJob, function (err, data) {

		if (err) {
			return callback(err, null);
		}
		else {
			return callback(null, data);
		}

	});
};

var getAllJobs = function (callback) {
	
	Job.find(function (err, data) {
		if (err) {
			return callback(err, null);
		} else {
			return callback(null, data);
		}
	});
};

module.exports = {
	newJob : newJob,
	getAllJobs : getAllJobs
};