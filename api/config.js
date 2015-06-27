module.exports = {
	db : {
				dbuser 	: process.env.DBUSER 	|| require('./creds.json').database.dbuser,
				dbpwd  	: process.env.DBPWD 	|| require('./creds.json').database.dbpwd,
				dburl  	: process.env.DBURL 	|| require('./creds.json').database.dburl,
	},
	s3 : {
				key 	: process.env.S3KEY 	|| require('./creds.json').s3.key,
				secret 	: process.env.S3SECRET 	|| require('./creds.json').s3.secret,
				bucket 	: process.env.S3BUCKET 	|| require('./creds.json').s3.bucket,
				acl 	: process.env.S3ACL 	|| require('./creds.json').s3.acl,
				region 	: process.env.S3REGION 	|| require('./creds.json').s3.region,
	},
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