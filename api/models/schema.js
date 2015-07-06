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
	description: String
});

module.exports = {
	user : userSchema,
	jobs : jobsSchema
};