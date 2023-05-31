const { PrismaClient } = require('@prisma/client');

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
			const articles = await prisma.food.findMany();
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
};
