var mongoose = require("mongoose");
var schema = require("./schema");
var db = require("../database").connect;

function newjobOne(object, callback) {
	console.log("hi");
	var newone = new one(object);
	schema.jobs.save(newone, function (err, data) {
		if (err) {
			return callback(err, null);
		}
		else {
			return callback(null, data);
		}
	});
}

module.exports = {
	newjobOne : newjobOne
};