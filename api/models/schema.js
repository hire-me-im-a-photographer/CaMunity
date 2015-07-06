var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	fb: Boolean,
	google: Boolean,
	
});

var jobsSchema = new mongoose.Schema({
	postingAs: String,
	eventName: String,
	dateTime: Date,
	jobDuration: String,
	location: String,
	description: String,
	useOfPhotos: Array,
	dateRequired: String,
	noOfPhotographers: String
});

var User = mongoose.model('user', userSchema, 'users');
var Job = mongoose.model('job', jobsSchema, 'job');

module.exports = {
	User : User,
	Job : Job
};