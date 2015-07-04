var server = require("./api/server");
var db = require("./api/database.js");

server.start(function () {
	console.log("Server running at: ", server.info.uri);
});