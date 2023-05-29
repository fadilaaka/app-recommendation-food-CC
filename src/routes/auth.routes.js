const router = require('express').Router();

const { LoginAttempt, getUser, registerAttempt } = require('../Controllers/AuthController');
const { verifyToken } = require('../Middlewares/userAuthorizationMiddleware');

module.exports = (app) => {
	router.post('/login', LoginAttempt);
	router.post('/register', registerAttempt);

	router.get('/user', verifyToken, getUser);

	app.use('/api/v1', router);
};
