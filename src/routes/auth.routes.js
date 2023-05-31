const router = require('express').Router();

const {
	LoginAttempt,
	getUser,
	registerAttempt,
	resetPassword,
	forgetPassword,
} = require('../Controllers/AuthController');
const { verifyToken, verifyValidTokenReset } = require('../Middlewares/userAuthorizationMiddleware');

module.exports = (app) => {
	router.post('/login', LoginAttempt);
	router.post('/register', registerAttempt);

	router.get('/user', verifyToken, getUser);

	router.post('/forget-password', forgetPassword);
	router.post('/reset-password/:token', verifyValidTokenReset, resetPassword);

	app.use('/api/v1', router);
};
