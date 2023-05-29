const router = require('express').Router();

const { LoginAttempt, getUser } = require('../Controllers/AuthController');
const { verifyToken } = require('../Middlewares/userAuthorizationMiddleware');

module.exports = (app) => {
	router.post('/login', LoginAttempt);
	router.get('/user', verifyToken, getUser);

	app.use('/api/v1', router);
};
