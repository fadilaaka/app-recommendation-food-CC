const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

module.exports = {
	// GET
	getAllUsers: async (req, res) => {
		try {
			const users = await prisma.user.findMany({
				select: {
					uuid: true,
					name: true,
					gender: true,
					weight: true,
					height: true,
					budget: true,
					birthday: true,
				},
			});
			res.status(200).json({
				users,
			});
		} catch (error) {
			res.status(500).json({
				message: `Internal Server Error: ${error}`,
			});
		}
	},

	getUserDetail: async (req, res) => {
		// Butuh relasional retrieve data table
		try {
			const { uuid } = req.params;
			const user = await prisma.userDetail.findUnique({
				where: {
					uuid,
				},
				// include: {
				// 	uuid: true,
				// 	userId: true,
				// 	diseaseHistory: true,
				// 	allergyId: true,
				// 	activityFactorId: true,
				// 	stressFactorId: true,
				// },
				select: {
					uuid: true,
					user: true,
					diseaseHistory: true,
					allergy: true,
					activityFactor: true,
					stressFactor: true,
				},
			});
			res.status(200).json({
				user,
			});
		} catch (error) {
			res.status(500).json({
				message: `${error}`,
			});
		}
	},

	getOneUser: async (req, res) => {
		try {
			const { id } = req.params;
			const user = await prisma.user.findUnique({
				where: {
					uuid: id,
				},
				select: {
					uuid: true,
					name: true,
					gender: true,
					weight: true,
					height: true,
					budget: true,
					birthday: true,
				},
			});
			res.status(200).json({
				user,
			});
		} catch (error) {
			res.status(500).json({
				message: `Internal Server Error: ${error}`,
			});
		}
	},

	getActivityFactor: async (req, res) => {
		try {
			const activity = await prisma.activityFactor.findMany({
				select: {
					uuid: true,
					name: true,
					description: true,
				},
			});
			res.status(200).json({
				activity,
			});
		} catch (error) {
			res.status(500).json({
				message: `Internal Server Error: ${error}`,
			});
		}
	},

	getAllergy: async (req, res) => {
		try {
			const allergy = await prisma.allergy.findMany({
				select: {
					uuid: true,
					name: true,
					description: true,
				},
			});
			res.status(200).json({
				allergy,
			});
		} catch (error) {
			res.status(500).json({
				message: `Internal Server Error: ${error}`,
			});
		}
	},

	getDiseaseHistory: async (req, res) => {
		try {
			const disease = await prisma.diseaseHistory.findMany({
				select: {
					uuid: true,
					name: true,
					description: true,
				},
			});
			res.status(200).json({
				disease,
			});
		} catch (error) {
			res.status(500).json({
				message: `Internal Server Error: ${error}`,
			});
		}
	},

	getStressFactor: async (req, res) => {
		try {
			const stress = await prisma.stressFactor.findMany({
				select: {
					uuid: true,
					name: true,
					description: true,
				},
			});
			res.status(200).json({
				stress,
			});
		} catch (error) {
			res.status(500).json({
				message: `Internal Server Error: ${error}`,
			});
		}
	},

	getAllFoodswithDetail: async (req, res) => {
		try {
			const foods = await prisma.foodDetail.findMany({
				include: {
					foodRecipe: true,
					food: {
						include: {
							foodTags: true,
						},
					},
				},
			});
			res.status(200).json({
				foods,
			});
		} catch (error) {
			res.status(500).json({
				message: `Internal Server Error : ${error}`,
			});
		}
	},

	getFoodsLimit: async (req, res) => {
		try {
			const { page, limit } = req.query;
			// const numberpage = Number(page);
			// const numberlimit = Number(limit);
			const foods = await prisma.foodDetail.findMany({
				skip: (Number(page) - 1) * Number(limit),
				take: Number(limit),
				include: {
					foodRecipe: true,
					food: {
						include: {
							foodTags: true,
						},
					},
				},
			});
			res.status(200).json({
				foods,
			});
		} catch (error) {
			res.status(500).json({
				message: `Internal Server Error : ${error}`,
			});
		}
	},

	getFoodByUuid: async (req, res) => {
		try {
			const { uuid } = req.params;
			const food = await prisma.foodDetail.findUnique({
				where: {
					uuid,
				},
				include: {
					foodRecipe: true,
					food: {
						include: {
							foodTags: true,
						},
					},
				},
			});
			res.status(200).json({
				food,
			});
		} catch (error) {
			res.status(500).json({
				message: `Internal Server Error : ${error}`,
			});
		}
	},

	postLogin: async (req, res) => {
		try {
			const { email, password } = req.body;
			const user = await prisma.user.findUnique({
				where: {
					email,
				},
			});
			const detailuser = await prisma.userDetail.findUnique({
				where: {
					userId: user.id,
				},
				select: {
					uuid: true,
					user: true,
					diseaseHistory: true,
					allergy: true,
					activityFactor: true,
					stressFactor: true,
				},
			});
			if (!user) {
				return res
					.status(500)
					.json({ message: 'Invalid email & password' });
			}
			const isPasswordMatch = await bcrypt.compare(
				password,
				user.password,
			);
			if (!isPasswordMatch) {
				return res
					.status(500)
					.json({ message: "Password doesn't match" });
			}
			return res.status(200).json({
				message: 'Success Login Akun',
				user,
				detailuser,
			});
		} catch (error) {
			return res.status(500).json({
				message: `Internal Server Error: ${error}`,
			});
		}
	},

	// POST

	// UPDATE

	// DELETE
};
