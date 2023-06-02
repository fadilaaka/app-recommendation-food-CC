const router = require('express').Router();

const {
	getArticle, getArticles, getArticleByPage,
} = require('../Controllers/ArticleController');

module.exports = (app) => {
	router.get('/article/:id', getArticle);
	router.get('/articles', getArticles);
	router.get('/articles/:page', getArticleByPage);

	app.use('/api/v1', router);
};
