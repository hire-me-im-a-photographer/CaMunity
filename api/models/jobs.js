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

var findJob = function (data, callback) {

	var query = { "_id": data };

	Job.findOne(query, function (err, data) {

		if (err) {
			return callback(err, null);
		}
		else {
			return callback(null, data);
		}
	});
};

var getMyJob = function (data, callback) {

	Job.find(data, function (err, data) {

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
		}
		else {
			return callback(null, data);
		}
	});
};

var applyJob = function (data, id, callback){

	var query = {"_id": data};
	var update = { $push: { "applications": id } };

	Job.findOneAndUpdate(query, update, function (err, data) {
		
		if (err) {
			return callback(err, null);
		}
		else {
			return callback(null, data);
		}
	});
};

var startJob = function (data, id, callback){

	var query = {"_id": data};
	var update = {$push: {"photographers": id }};
	var status = {"status": "current"};

	Job.findOneAndUpdate(query, update, function (err, data) {

		if (err) {
			return callback(err, null);
		}
		else {
			return callback(null, data);
		}
	});

	Job.findOneAndUpdate(query, status, function (err, data) {

		if (err) {
			return callback(err, null);
		}
		else {
			return callback(null, data);
		}
	});
};


module.exports = {
	newJob: newJob,
	findJob: findJob,
	getMyJob: getMyJob,
	getAllJobs: getAllJobs,
	applyJob: applyJob,
	startJob: startJob
};