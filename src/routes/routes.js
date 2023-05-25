/* eslint-disable global-require */
module.exports = (app) => {
	const router = require('express').Router();

	const checkValidJWT = require('../Middlewares/userAuthorizationMiddleware');

	router.get('/', (req, res) => {
		res.send('Halo Express!');
	});

	router.get('/protected', checkValidJWT, (req, res) => {
		res.send('Halo Express! (Protected)');
	});

	app.use('/api/v1', router);
};
