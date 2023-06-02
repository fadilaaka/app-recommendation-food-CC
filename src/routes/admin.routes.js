const adminControllers = require('../Controllers/adminControllers');

/* eslint-disable global-require */
module.exports = (app) => {
	const router = require('express').Router();
	// const checkValidJWT = require('../Middlewares/userAuthorizationMiddleware');

	// Login
	router.post('/admin/login', adminControllers.adminLogin);

	router.get('/admin/get-dashboard', adminControllers.viewDashboard);

	// Users
	router.get('/admin/get-users', adminControllers.viewUsers);

	// Articles
	router.get('/admin/get-articles', adminControllers.viewArticles);
	router.get('/admin/detail-article/:id', adminControllers.detailArticle);
	router.get(
		'/admin/get-article-category',
		adminControllers.getArticleCategory,
	);
	router.post('/admin/add-article', adminControllers.addArticle);
	router.post('/admin/edit-article/:id', adminControllers.editArticle);
	router.post('/admin/delete-article/:id', adminControllers.deleteArticle);

	// Articles
	router.get('/admin/get-foods', adminControllers.viewFoods);
	router.get('/admin/detail-food/:id', adminControllers.detailFood);
	router.get('/admin/get-food-category', adminControllers.getArticleCategory);
	router.post('/admin/add-food', adminControllers.addFood);
	router.post('/admin/edit-food/:id', adminControllers.editFood);
	router.post('/admin/delete-food/:id', adminControllers.deleteFood);
	// router.post('/login', apiController.postLogin);
	// router.get('/get-user/:id', checkValidJWT, apiController.getOneUser);
	// router.get('/protected', checkValidJWT, (req, res) => {
	// 	res.send('Halo Express! (Protected)');
	// });

	app.use('/api/v1', router);
};
