var pmongoose = require("mongoose");
var Photo = require("./schema").Photo;

function newGallery(data, callback) {
	var newPhoto = new Photo(data);

	Photo.create(newPhoto, function(err, data) {
		if (err) {
			return callback(err, null);
		}
		else {
			return callback(null, data);
		}

	});
}

function findGallery(data, callback) {

	Photo.findOne( {"user": data}, function(err, data) {

		if (err) {
			return callback(err);
		}
		else {
			return callback(null, data);
		}
	});
}

function newPhoto(id, update, callback) {

	var query = {"user": id};

	Photo.findOneAndUpdate(query, update, function(err, data) {

		if (err) {
			return callback(err);
		}
		else {
			return callback(null, data);
		}
	});	
}


function deleteURL() {

}

module.exports = {
	newGallery: newGallery,
	findGallery: findGallery,
	newPhoto: newPhoto,
	deleteURL: deleteURL
};