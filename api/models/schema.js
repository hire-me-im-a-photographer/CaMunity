var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;

var userSchema = new Schema({
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
	dateJoined: String,
	website: String,
	usertype: String,
	photos: Array,
	workedWith: Array
});

var jobSchema = new Schema({
	user: String,
	dateAdded: Date,
	postingAs: String,
	eventName: String,
	dateTime: Date,
	jobDuration: String,
	location: String,
	description: String,
	useOfPhotos: Array,
	watermark: Array,
	dateRequired: String,
	noOfPhotographers: String
});

var chatSchema = new Schema({
	firstUser: String,
	secondUser: String,
	users: Array,
	chat: Array
});

var photoSchema = new Schema({
	user: String,
	photos: Array
});


var user = Mongoose.model('user', userSchema, 'user');
var job = Mongoose.model('job', jobSchema, 'job');
var chat = Mongoose.model('chat', chatSchema, 'chat');
var photo = Mongoose.model('photo', photoSchema, 'photo');

module.exports = {
	user : user,
	job : job,
	chat : chat,
	photo : photo
};