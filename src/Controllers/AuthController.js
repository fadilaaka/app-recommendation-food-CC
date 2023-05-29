const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();

const LoginAttempt = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await prisma.user.findFirst({
			where: {
				email,
			},
		});

		if (!user) {
			return res
				.status(401)
				.json({ status: 'failed', code: 401, message: 'Invalid email & password' });
		}

		const isPasswordMatch = await bcrypt.compare(password, user.password);

		if (!isPasswordMatch) {
			return res
				.status(401)
				.json({ status: 'failed', code: 401, message: "Password doesn't match" });
		}

		const token = jwt.sign(
			{
				uuid: user.uuid,
				email: user.email,
			},
			process.env.JWT_SECRET,
		);

		return res.status(200).json({
			status: 'success',
			code: 200,
			message: 'Success Login Akun',
			token,
		});
	} catch (error) {
		return res.status(500).json({ status: 'failed', code: 500, message: `Internal Server Error: ${error}` });
	}
};

const getUser = async (req, res) => {
	try {
		const { uuid } = req.user;

		const user = await prisma.user.findFirstOrThrow({
			where: {
				uuid,
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
				createdAt: true,

				userDetail: {
					select: {
						allergies: {
							select: {
								allergy: {
									select: {
										name: true,
										uuid: true,
									},
								},
							},
						},

						diseaseHistories: {
							select: {
								diseaseHistory: {
									select: {
										name: true,
										uuid: true,
									},
								},
							},
						},
						activityFactor: {
							select: {
								uuid: true,
								name: true,
							},
						},
						stressFactor: {
							select: {
								uuid: true,
								name: true,
							},
						},
					},
				},
			},
		}).catch((err) => {
			if (err instanceof prisma.NotFoundError) return res.status(404).json({ status: 'failed', code: 404, message: 'User not found' });

			throw err;
		});

		return res.status(200).json({
			status: 'success',
			code: 200,
			message: 'Success Get User',
			data: user,
		});
	} catch (error) {
		return res.status(500).json({ status: 'failed', code: 500, message: `Internal Server Error: ${error}` });
	}
};

const registerAttempt = async (req, res) => {
	try {
		const { email, password, passwordConfirm } = req.body;

		if (password !== passwordConfirm) {
			return res.status(400).json({ status: 'failed', code: 400, message: 'Password not match' });
		}

		const user = await prisma.user.findFirst({
			where: {
				email,
			},
		});

		if (user) {
			return res.status(400).json({ status: 'failed', code: 400, message: 'Email already registered' });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = await prisma.user.create({
			data: {
				email,
				uuid: uuidv4(),
				password: hashedPassword,
			},
		});

		const token = jwt.sign(
			{
				uuid: newUser.uuid,
				email: newUser.email,
			},
			process.env.JWT_SECRET,
		);

		return res.status(200).json({
			status: 'success',
			code: 200,
			message: 'Success Register Akun',
			token,
		});
	} catch (error) {
		console.log(error)
		return res.status(500).json({ status: 'failed', code: 500, message: `Internal Server Error: ${error}` });
	}
};

module.exports = { LoginAttempt, getUser, registerAttempt };
