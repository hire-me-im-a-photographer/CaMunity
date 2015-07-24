var Config = require("./config");
var mongoose = require('mongoose');

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };       
 
//REMOTE DB
mongoose.connect(Config.database.dburl, options);

//LOCAL DB
// mongoose.connect('mongodb://127.0.0.1:27017/camunity');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function (callback) {
	console.log("database connection successful");
});