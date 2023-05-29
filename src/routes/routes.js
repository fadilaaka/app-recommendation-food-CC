const apiController = require('../Controllers/apiControllers');

/* eslint-disable global-require */
module.exports = (app) => {
	const router = require('express').Router();

	// const checkValidJWT = require('../Middlewares/userAuthorizationMiddleware');

	// POST account
	// GET USER
	router.get('/get-allusers', apiController.getAllUsers);
	router.get('/get-user/:id', apiController.getOneUser);
	router.get('/get-user-detail/:uuid', apiController.getUserDetail);
	router.get('/activity', apiController.getActivityFactor);
	router.get('/allergy', apiController.getAllergy);
	router.get('/article', apiController.getArticle);
	router.get('/disease', apiController.getDiseaseHistory);
	router.get('/stress', apiController.getStressFactor);

	// router.post('/login', apiController.postLogin);
	// router.get('/get-user/:id', checkValidJWT, apiController.getOneUser);
	// router.get('/protected', checkValidJWT, (req, res) => {
	// 	res.send('Halo Express! (Protected)');
	// });

	app.use('/api/v1', router);
};
