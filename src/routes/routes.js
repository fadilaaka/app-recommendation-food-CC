const apiController = require('../Controllers/apiControllers');
const { listLikeDislikeFood, foodLikeAttempt, foodDisLikeAttempt } = require('../Controllers/foodController');
const { verifyToken } = require('../Middlewares/userAuthorizationMiddleware');

/* eslint-disable global-require */
module.exports = (app) => {
	const router = require('express').Router();

	// const checkValidJWT = require('../Middlewares/userAuthorizationMiddleware');

	// POST account
	// GET USER
	router.get('/get-user/:uuid', apiController.getOneUserData);
	router.get('/activity', apiController.getActivityFactor);
	router.get('/allergy', apiController.getAllergy);
	router.get('/disease', apiController.getDiseaseHistory);
	router.get('/stress', apiController.getStressFactor);

	router.get('/foods', apiController.getAllFoodswithDetail);
	router.get('/foods-get', apiController.getFoodsLimit);
	router.get('/foods/status', verifyToken, listLikeDislikeFood);
	router.get('/foods/:uuid', apiController.getFoodByUuid);

	router.post('/food/like', verifyToken, foodLikeAttempt);
	router.post('/food/dislike', verifyToken, foodDisLikeAttempt);
	// router.get('/article', apiController.getArticle);
	// router.post('/login', apiController.postLogin);
	// router.get('/get-user/:id', checkValidJWT, apiController.getOneUser);
	// router.get('/protected', checkValidJWT, (req, res) => {
	// 	res.send('Halo Express! (Protected)');
	// });

	app.use('/api/v1', router);
};
