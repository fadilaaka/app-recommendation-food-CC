const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

module.exports = {
	adminLogin: async (req, res) => {
		try {
			const { email, password } = req.body;
			const admin = await prisma.admin.findUnique({
				where: {
					email,
				},
			});
			if (!admin) {
				return res
					.status(500)
					.json({ message: 'Invalid email & password' });
			}
			const isPasswordMatch = await bcrypt.compare(
				password,
				admin.password,
			);
			if (!isPasswordMatch) {
				return res
					.status(500)
					.json({ message: "Password doesn't match" });
			}
			return res.status(200).json({
				message: 'Success Login Akun',
				admin,
			});
		} catch (error) {
			return res.status(500).json({
				message: `Internal Server Error: ${error}`,
			});
		}
	},

	viewDashboard: async (req, res) => {
		try {
			const users = await prisma.user.findMany();
			const foods = await prisma.food.findMany();
			const articles = await prisma.article.findMany();
			res.status(200).json({
				users: users.length,
				foods: foods.length,
				articles: articles.length,
			});
		} catch (error) {
			res.status(500).json({ message: 'Internal Server Error' });
		}
	},
	viewUsers: async (req, res) => {
		try {
			const users = await prisma.user.findMany();
			res.status(200).json({
				users,
			});
		} catch (error) {
			res.status(500).json({
				message: `Internal Server Error : ${error}`,
			});
		}
	},
	viewArticles: async (req, res) => {
		try {
			const articles = await prisma.article.findMany({
				include: {
					articleCategory: true,
				},
			});
			res.status(200).json({
				articles,
			});
		} catch (error) {
			res.status(500).json({
				message: `Internal Server Error : ${error}`,
			});
		}
	},
	detailArticle: async (req, res) => {
		try {
			const { id } = req.params;
			const idInt = Number(id);
			const article = await prisma.article.findUnique({
				where: {
					id: idInt,
				},
				include: {
					articleCategory: true,
				},
			});
			res.status(200).json({ article });
		} catch (error) {
			res.status(500).json({ message: 'Internal Server Error' });
		}
	},
	getArticleCategory: async (req, res) => {
		try {
			const category = await prisma.articleCategory.findMany();
			res.status(200).json({ category });
		} catch (error) {
			res.status(500).json({ message: 'Internal Server Error' });
		}
	},
	addArticle: async (req, res) => {
		try {
			const {
				title, articleCategoryId, image, description,
			} = req.body;
			const category = await prisma.articleCategory.findUnique({
				where: {
					id: Number(articleCategoryId),
				},
			});
			const article = await prisma.article.create({
				data: {
					uuid: uuidv4(),
					title,
					description,
					image,
					status: 'publish',
					articleCategoryId: category.id,
				},
			});
			await prisma.articleCategoryOnArticle.create({
				data: {
					uuid: uuidv4(),
					articleId: article.id,
					articleCategoryId: category.id,
				},
			});
			res.status(201).json({ message: 'New article has been published' });
		} catch (error) {
			res.status(500).json({
				message: `Internal Server Error: ${error}`,
			});
		}
	},
	editArticle: async (req, res) => {
		try {
			const { id } = req.params;
			const {
				updateTitle,
				updateArticleCategoryId,
				updateImage,
				updateDescription,
			} = req.body;
			const idInt = Number(id);
			const category = await prisma.articleCategory.findUnique({
				where: {
					id: Number(updateArticleCategoryId),
				},
			});
			await prisma.article.update({
				where: {
					id: idInt,
				},
				data: {
					title: updateTitle,
					description: updateDescription,
					image: updateImage,
					articleCategoryId: category.id,
				},
			});
			await prisma.articleCategoryOnArticle.update({
				where: {
					id: idInt,
				},
				data: {
					articleId: idInt,
					articleCategoryId: category.id,
				},
			});
			res.status(201).json({ message: 'New article has been published' });
		} catch (error) {
			res.status(500).json({
				message: `Internal Server Error: ${error}`,
			});
		}
	},
	deleteArticle: async (req, res) => {
		try {
			const { id } = req.params;
			const idInt = Number(id);
			await prisma.article.delete({
				where: {
					id: idInt,
				},
			});
			res.status(201).json({ message: 'Article has been deleted' });
		} catch (error) {
			res.status(500).json({
				message: `Internal Server Error: ${error}`,
			});
		}
	},
};
