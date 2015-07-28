var Photo = require("./schema").photo;

var newGallery = function (data, callback) {

	var newPhoto = new Photo(data);

	Photo.create(newPhoto, function (err, data) {

		if (err) {
			return callback(err, null);
		}
		else {
			return callback(null, data);
		}

	});
};

var findGallery = function (data, callback) {

	var query = { "user": data };

	Photo.findOne(query, function (err, data) {

		if (err) {
			return callback(err, null);
		}
		else {
			return callback(null, data);
		}
	});
};

var newPhoto = function (id, update, callback) {

	var query = { "user": id };

	Photo.findOneAndUpdate(query, update, function (err, data) {

		if (err) {
			return callback(err, null);
		}
		else {
			return callback(null, data);
		}
	});	
};


var deletePhoto = function (id, url, callback) {

	var query = { "user": id };
	var remove = { $pull: { "photos": { "url": url } } };

	Photo.findOneAndUpdate(query, remove, function (err, data) {

		if (err) {
			return callback(err, null);
		}
		else {
			return callback(null, data);
		}
	});
};

module.exports = {
	newGallery: newGallery,
	findGallery: findGallery,
	newPhoto: newPhoto,
	deletePhoto: deletePhoto
};