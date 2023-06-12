const { PrismaClient, Prisma } = require('@prisma/client');
// const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();

const getArticle = async (req, res) => {
	try {
		const { id } = req.params;

		const article = await prisma.article
			.findFirstOrThrow({
				where: {
					id: parseInt(id, 10),
					status: 'publish',
				},
				select: {
					id: true,
					uuid: true,
					title: true,
					description: true,
					image: true,
					createdAt: true,
					updatedAt: true,
				},
			})
			.catch((err) => {
				if (err instanceof Prisma.PrismaClientKnownRequestError) {
					return res.status(404).json({
						status: 'failed',
						code: 404,
						message: 'Article not found',
					});
				}

				throw err;
			});

		article.image = article.image
			? `${article.image}`
			: null;

		return res.status(200).json({ status: 'success', code: 200, article });
	} catch (error) {
		return res.status(500).json({
			status: 'failed',
			code: 500,
			message: `Internal Server Error: ${error}`,
		});
	}
};

const getArticles = async (req, res) => {
	try {
		const articles = await prisma.article.findMany({
			select: {
				id: true,
				uuid: true,
				title: true,
				description: true,
				image: true,
				createdAt: true,
				updatedAt: true,
			},
			take: 5,
			orderBy: {
				createdAt: 'desc',
			},
		});

		const data = await articles.map((article) => {
			article.image = article.image
				? `${article.image}`
				: null;

			return article;
		});

		return res.status(200).json({ status: 'success', code: 200, data });
	} catch (error) {
		return res.status(500).json({
			status: 'failed',
			code: 500,
			message: `Internal Server Error: ${error}`,
		});
	}
};

const getArticleByPage = async (req, res) => {
	try {
		const { page } = req.params;

		const articles = await prisma.article.findMany({
			select: {
				id: true,
				uuid: true,
				title: true,
				description: true,
				image: true,
				createdAt: true,
				updatedAt: true,
			},
			skip: parseInt(page, 10) * 5,
			take: 5,
			orderBy: {
				createdAt: 'desc',
			},
		});

		const data = await articles.map((article) => {
			article.image = article.image
				? `${article.image}`
				: null;

			return article;
		});

		return res.status(200).json({ status: 'success', code: 200, data });
	} catch (error) {
		return res.status(500).json({
			status: 'failed',
			code: 500,
			message: `Internal Server Error: ${error}`,
		});
	}
};

module.exports = {
	getArticle,
	getArticles,
	getArticleByPage,
};
