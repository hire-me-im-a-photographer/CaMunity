module.exports = {

	database: {
		dburl: process.env.DBURL 						|| require("./creds.json").database.dburl
	},

	s3: {
		key: process.env.S3KEY 							|| require("./creds.json").s3.key,
		secret: process.env.S3SECRET 					|| require("./creds.json").s3.secret,
		bucket: process.env.S3BUCKET 					|| require("./creds.json").s3.bucket,
		acl: process.env.S3ACL 							|| require("./creds.json").s3.acl,
		region: process.env.S3REGION 					|| require("./creds.json").s3.region,
	},
	
	google : {
		password 		: process.env.GPASSWORD			|| require("./creds.json").google.password,
		clientId		: process.env.GCLIENTID 		|| require("./creds.json").google.clientId,
		clientSecret	: process.env.GSECRET			|| require("./creds.json").google.clientSecret,
	},

	facebook : {
		password 		: process.env.FBPASSWORD		|| require("./creds.json").facebook.password,
		clientId		: process.env.FBCLIENTID 		|| require("./creds.json").facebook.clientId,
		clientSecret	: process.env.FBSECRET 			|| require("./creds.json").facebook.clientSecret,
	},

	cookie : {
		password 		: process.env.COOKIEPASS		|| require("./creds.json").cookie.password,
		cookie 			: process.env.COOKIE 			|| profile.cookie.cookie
	}
};