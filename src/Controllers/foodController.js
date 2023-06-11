const { PrismaClient, Prisma } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();

const listLikeDislikeFood = async (req, res) => {
	try {
		const { uuid } = req.user;

		const userFood = await prisma.user
			.findFirstOrThrow({
				where: {
					uuid,
				},
				select: {
					foodLike: true,
					foodDislike: true,
				},
			})
			.catch((err) => {
				if (err instanceof Prisma.PrismaClientKnownRequestError) {
					return res.status(404).json({
						status: 'failed',
						code: 404,
						message: 'user not found',
					});
				}

				throw err;
			});

		return res.status(200).json({
			status: 'success',
			code: 200,
			like: userFood.foodLike,
			dislike: userFood.foodDislike,
		});
	} catch (error) {
		return res.status(500).json({
			status: 'failed',
			code: 500,
			message: `Internal Server Error: ${error}`,
		});
	}
};

const foodLikeAttempt = async (req, res) => {
	try {
		const { uuid } = req.user;
		const { foodUuid } = req.body;

		const userFood = await prisma.user
			.findFirstOrThrow({
				where: {
					uuid,
				},
				select: {
					foodLike: true,
				},
			})
			.catch((err) => {
				if (err instanceof Prisma.PrismaClientKnownRequestError) {
					return res.status(404).json({
						status: 'failed',
						code: 404,
						message: 'user not found',
					});
				}

				throw err;
			});

		const { foodLike } = userFood;

		if (foodLike.includes(foodUuid)) {
			return res.status(400).json({
				status: 'failed',
				code: 400,
				message: 'food already liked',
			});
		}

		const user = await prisma.foodLike.create({
			data: {
				uuid: uuidv4(),
				user: {
					connect: {
						uuid,
					},
				},
				food: {
					connect: {
						uuid: foodUuid,
					},
				},
			},
		});

		return res.status(200).json({
			status: 'success',
			code: 200,
			message: 'food liked',
			data: user,
		});
	} catch (error) {
		return res.status(500).json({
			status: 'failed',
			code: 500,
			message: `Internal Server Error: ${error}`,
		});
	}
};

const foodDisLikeAttempt = async (req, res) => {
	try {
		const { uuid } = req.user;
		const { foodUuid } = req.body;

		const userFood = await prisma.user
			.findFirstOrThrow({
				where: {
					uuid,
				},
				select: {
					foodLike: true,
				},
			})
			.catch((err) => {
				if (err instanceof Prisma.PrismaClientKnownRequestError) {
					return res.status(404).json({
						status: 'failed',
						code: 404,
						message: 'user not found',
					});
				}

				throw err;
			});

		const { foodLike } = userFood;

		if (foodLike.includes(foodUuid)) {
			return res.status(400).json({
				status: 'failed',
				code: 400,
				message: 'food already liked',
			});
		}

		const user = await prisma.foodDislike.create({
			data: {
				uuid: uuidv4(),
				user: {
					connect: {
						uuid,
					},
				},
				food: {
					connect: {
						uuid: foodUuid,
					},
				},
			},
		});

		return res.status(200).json({
			status: 'success',
			code: 200,
			message: 'food liked',
			data: user,
		});
	} catch (error) {
		return res.status(500).json({
			status: 'failed',
			code: 500,
			message: `Internal Server Error: ${error}`,
		});
	}
};

module.exports = {
	listLikeDislikeFood,
	foodLikeAttempt,
	foodDisLikeAttempt,
};
