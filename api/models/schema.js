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
	gender: String,
	website: String,
	usertype: String,
	photos: Array,
	workedWith: Array
});

var jobSchema = new mongoose.Schema({
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

var chatSchema = new mongoose.Schema({
	firstUser: String,
	secondUser: String,
	users: Array,
	chat: Array
});

var photoSchema = new mongoose.Schema({
	user: String,
	photos: Array
});

var User = mongoose.model('user', userSchema, 'user');
var Job = mongoose.model('job', jobSchema, 'job');
var Chat = mongoose.model('chat', chatSchema, 'chat');
var Photo = mongoose.model('photo', photoSchema, 'photo');

module.exports = {
	User : User,
	Job : Job,
	Chat : Chat,
	Photo : Photo
};