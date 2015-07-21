var Hapi = require("hapi");
var Bell = require("bell");
var Cookie = require("hapi-auth-cookie");
var Path = require("path");

var Routes = require('./routes/routes');
var Config = require('./config');

var server = new Hapi.Server({
	connections: {
		routes: {
			files: {
				relativeTo: Path.join(__dirname, "../public")
			}
		}
	}
});

//Number for heroku
server.connection({
	port: Number(process.env.PORT) || 8080
});

server.views({
	engines: {
		jade: require("jade")
	},
	relativeTo: __dirname,
	path: "./views"
});

server.register([Bell, Cookie], function(err) {

	if (err) {
		console.error(err);
		return process.exit(1);
	}

	server.auth.strategy("session", "cookie", {
		password: Config.cookie.password,
		cookie: Config.cookie.cookie,
		isSecure: false
	});

	server.auth.strategy("facebook", "bell", {
		provider: "facebook",
		password: Config.facebook.password,
		clientId: Config.facebook.clientId,
		clientSecret: Config.facebook.clientSecret,
		isSecure: false,
	});

	server.auth.strategy("google", "bell", {
		provider: "google",
		password: Config.google.password,
		clientId: Config.google.clientId,
		clientSecret: Config.google.clientSecret,
		isSecure: false,
		providerParams: {
			redirectUri : 'http://localhost:8080/google' || "http://camunity.herokuapp.com/google"
		}
	});

	server.auth.default('session');

	server.route(Routes);
});

//Hapi, show jade errors
server.ext('onPreResponse', function (request, reply) {

    var response = request.response;

    if (response.variety === 'view') {
        var source = response.source;

        // Let's pre-render the template here and see if there's any errors

        return server.render(source.template, source.context, function (err) {

            if (err) {
                return reply(err.message);    // transmit the compile error to browser
            }

            reply.continue();
        });
    }

    reply.continue();
});

module.exports = server;