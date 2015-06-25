var controller = require('../controllers/controller.js');

module.exports = [
	{path: '/public/{file*}',	method:'GET',		config:controller.serveFile},
	{path: '/',					method:'GET',		config:controller.home},
	{path: '/login', 			method:'POST', 		config:controller.login},
	{path: '/signup', 			method:'GET', 		config:controller.signup}

	];