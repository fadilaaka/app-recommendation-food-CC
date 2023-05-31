const adminControllers = require('../Controllers/adminControllers');

/* eslint-disable global-require */
module.exports = (app) => {
	const router = require('express').Router();
	// const checkValidJWT = require('../Middlewares/userAuthorizationMiddleware');

	// Login
	router.post('/admin/login', adminControllers.adminLogin);

	router.get('/admin/get-dashboard', adminControllers.viewDashboard);
	router.get('/admin/get-users', adminControllers.viewUsers);
	// router.post('/login', apiController.postLogin);
	// router.get('/get-user/:id', checkValidJWT, apiController.getOneUser);
	// router.get('/protected', checkValidJWT, (req, res) => {
	// 	res.send('Halo Express! (Protected)');
	// });

	app.use('/api/v1', router);
};
