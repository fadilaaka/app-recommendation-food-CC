const adminControllers = require('../Controllers/adminControllers');

/* eslint-disable global-require */
module.exports = (app) => {
	const router = require('express').Router();
	// const checkValidJWT = require('../Middlewares/userAuthorizationMiddleware');

	router.post('/admin/login', adminControllers.adminLogin);

	// router.post('/login', apiController.postLogin);
	// router.get('/get-user/:id', checkValidJWT, apiController.getOneUser);
	// router.get('/protected', checkValidJWT, (req, res) => {
	// 	res.send('Halo Express! (Protected)');
	// });

	app.use('/api/v1', router);
};
