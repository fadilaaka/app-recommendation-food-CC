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

	// POST

	// UPDATE

	// DELETE
};
