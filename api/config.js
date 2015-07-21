var creds = require("./creds.json");

module.exports = {

	database: {
		dburl: process.env.DBURL 						|| creds.database.dburl
	},

	s3: {
		key: process.env.S3KEY 							|| creds.s3.key,
		secret: process.env.S3SECRET 					|| creds.s3.secret,
		bucket: process.env.S3BUCKET 					|| creds.s3.bucket,
		acl: process.env.S3ACL 							|| creds.s3.acl,
		region: process.env.S3REGION 					|| creds.s3.region,
	},
	
	google : {
		password 		: process.env.GPASSWORD			|| creds.google.password,
		clientId		: process.env.GCLIENTID 		|| creds.google.clientId,
		clientSecret	: process.env.GSECRET			|| creds.google.clientSecret,
	},

	facebook : {
		password 		: process.env.FBPASSWORD		|| creds.facebook.password,
		clientId		: process.env.FBCLIENTID 		|| creds.facebook.clientId,
		clientSecret	: process.env.FBSECRET 			|| creds.facebook.clientSecret,
	},

	cookie : {
		password 		: process.env.COOKIEPASS		|| creds.cookie.password,
		cookie 			: process.env.COOKIE 			|| creds.cookie.cookie
	}
};