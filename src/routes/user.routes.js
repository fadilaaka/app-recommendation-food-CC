const router = require('express').Router();

const {
	editUser,
} = require('../Controllers/userController');
const { verifyToken } = require('../Middlewares/userAuthorizationMiddleware');

module.exports = (app) => {
	router.post('/user', verifyToken, editUser);

	app.use('/api/v1', router);
};
