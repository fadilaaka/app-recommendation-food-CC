const router = require('express').Router();

const {
	editUser,
} = require('../Controllers/userController');
const { verifyToken } = require('../Middlewares/userAuthorizationMiddleware');
const { editUserValidator, validate } = require('../Middlewares/validateMiddleware');

module.exports = (app) => {
	router.post('/user', verifyToken, editUserValidator, validate, editUser);

	app.use('/api/v1', router);
};
