var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
	auth: String,
	id: String,
	username: String,
	displayName: String,
	firstName: String,
	lastName: String,
	email: String,
	link: String,
	picture: String,
	gender: String
});

var jobsSchema = new mongoose.Schema({
	user: String,
	dateAdded: Date,
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

var User = mongoose.model('user', userSchema, 'user');
var Job = mongoose.model('job', jobsSchema, 'job');

module.exports = {
	User : User,
	Job : Job
};