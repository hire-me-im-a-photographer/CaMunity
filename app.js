var Server = require("./api/server");
var Database = require("./api/database.js");

Server.start(function () {
	console.log("Server running at: ", Server.info.uri);
});