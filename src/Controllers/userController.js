const { PrismaClient, Prisma } = require('@prisma/client');
// const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();

const editUser = async (req, res) => {
	try {
		const { uuid } = req.user;

		const user = await prisma.user.findFirstOrThrow({
			where: {
				uuid,
			},
		}).catch((err) => {
			if (err instanceof Prisma.PrismaClientKnownRequestError) return res.status(404).json({ status: 'failed', code: 404, message: 'User not found' });

			return err;
		});

		const {
			gender,
			birthday,
			weight,
			height,
			budget,
			detail,
		} = req.body;
		const {
			allergies,
			disease,
			stress,
			activities,
		} = detail;

		await prisma.userDetail.upsert({
			where: {
				userId: user.id,
			},
			create: {
				uuid: uuidv4(),
				user: {
					connect: {
						uuid,
					},
				},
				allergies: {
					create: allergies.map((item) => ({
						uuid: uuidv4(),
						allergy: {
							connect: {
								id: item,
							},
						},
					})),
				},
				diseaseHistories: {
					create: disease.map((item) => ({
						uuid: uuidv4(),
						diseaseHistory: {
							connect: {
								id: item,
							},
						},
					})),
				},
				activityFactor: {
					connect: {
						id: activities,
					},
				},
				stressFactor: {
					connect: {
						id: stress,
					},
				},
			},
			update: {
				allergies: {
					deleteMany: {
					},
					create: allergies.map((item) => ({
						uuid: uuidv4(),
						allergy: {
							connect: {
								id: item,
							},
						},
					})),
				},
				diseaseHistories: {
					deleteMany: {
					},
					create: disease.map((item) => ({
						uuid: uuidv4(),
						diseaseHistory: {
							connect: {
								id: item,
							},
						},
					})),
				},
				activityFactor: {
					connect: {
						id: activities,
					},
				},
				stressFactor: {
					connect: {
						id: stress,
					},
				},
			},
		});

		const updatedUser = await prisma.user.update({
			where: {
				uuid,
			},
			data: {
				gender,
				birthday: new Date(birthday),
				weight,
				height,
				budget,
			},
			select: {
				uuid: true,
				email: true,
				name: true,
				gender: true,
				birthday: true,
				weight: true,
				height: true,
				budget: true,
				userDetail: {
					select: {
						uuid: true,
						allergies: {
							select: {
								allergy: true,
							},
						},
						diseaseHistories: {
							select: {
								diseaseHistory: true,
							},
						},
						activityFactor: true,
						stressFactor: true,
					},
				},
			},
		});

		return res.status(200).json({
			status: 'success',
			code: 200,
			message: 'User updated',
			data: {
				user: {
					updatedUser,
				},
			},
		});
	} catch (error) {
		return res.status(500).json({ status: 'failed', code: 500, message: `Internal server error: ${error.message}` });
	}
};

module.exports = {
	editUser,
};
