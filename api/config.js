module.exports = {
	google : {
				password 	: process.env.GOOGLEPASSWORD		|| require('./creds.json').google.password,
				clientId	: process.env.GOOGLECLIENTID 		|| require('./creds.json').google.clientId,
				clientSecret	: process.env.GOOGLECLIENTSECRET	|| require('./creds.json').google.clientSecret,
	},
	facebook : {
				password 	: process.env.FACEBOOKPASSWORD		|| require('./creds.json').facebook.password,
				clientId	: process.env.FACEBOOKCLIENTID 		|| require('./creds.json').facebook.clientId,
				clientSecret	: process.env.FACEBOOKCLIENTSECRET 	|| require('./creds.json').facebook.clientSecret,
	},
	cookie : {
				password: process.env.COOKIEPASSWORD || require('./creds.json').cookiePassword
	}
};