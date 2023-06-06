const router = require('express').Router();

const {
	LoginAttempt,
	getUser,
	registerAttempt,
	resetPassword,
	forgetPassword,
} = require('../Controllers/AuthController');
const { verifyToken, verifyValidTokenReset } = require('../Middlewares/userAuthorizationMiddleware');
const {
	loginValidator,
	registerValidator,
	forgetPasswordValidator,
	resetPasswordValidator,
	validate,
} = require('../Middlewares/validateMiddleware');

module.exports = (app) => {
	router.post('/login', loginValidator, validate, LoginAttempt);
	router.post('/register', registerValidator, validate, registerAttempt);

	router.get('/user', verifyToken, getUser);

	router.post('/forget-password', forgetPasswordValidator, validate, forgetPassword);
	router.post('/reset-password/:token', verifyValidTokenReset, resetPasswordValidator, validate, resetPassword);

	app.use('/api/v1', router);
};
