var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	fb: Boolean,
	google: Boolean,
	
});