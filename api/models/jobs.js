var mongoose = require("mongoose");
var Job = require("./schema").Job;
var User = require("./schema").User;

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

// function newjob(data, callback) {
// 	console.log("new job form: ", data);

// 	var currentUser = "jasoncluu@gmail.com"; //Adding mock user because no session

// 	var query = {email: currentUser};
// 	var update = {$push: {"jobs": data}};
// 	var options = {new: true};

// 	User.findOneAndUpdate(query, update, options, function (err, user) {
// 		console.log("Found and updated a user with a new job");
// 	});
// }

module.exports = {
	newjob : newjob
};