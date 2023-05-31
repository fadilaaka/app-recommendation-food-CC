const { PrismaClient, Prisma } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { sendEmail } = require('../Lib/email');

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
			if (err instanceof Prisma.PrismaClientKnownRequestError) return res.status(404).json({ status: 'failed', code: 404, message: 'User not found' });

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
		return res.status(500).json({ status: 'failed', code: 500, message: `Internal Server Error: ${error}` });
	}
};

const forgetPassword = async (req, res) => {
	try {
		const { email } = req.body;

		const user = await prisma.user.findFirst({
			where: {
				email,
			},
		});

		if (!user) {
			return res.status(400).json({ status: 'failed', code: 400, message: 'Email not registered' });
		}

		const token = jwt.sign(
			{
				uuid: user.uuid,
				email: user.email,
			},
			process.env.JWT_SECRET,
			{ expiresIn: '1h' },
		);

		const message = `
			<h1>Reset Password</h1>
			<p>Click this link to reset your password</p>
			<a href="${process.env.CLIENT_URL}/api/v1/reset-password/${token}">Reset Password</a>
			`;

		sendEmail(email, 'Reset Password', message);

		prisma.userTokenResetPassword.create({
			data: {
				token,
				uuid: uuidv4(),
				expire: new Date(Date.now() + 3600000).toISOString().slice(0, 19).replace('T', ' '),
				user: {
					connect: {
						uuid: user.uuid,
					},
				},
			},
		});

		return res.status(200).json({
			status: 'success',
			code: 200,
			message: 'Success Send Email',
			token,
		});
	} catch (error) {
		return res.status(500).json({ status: 'failed', code: 500, message: `Internal Server Error: ${error}` });
	}
};

const resetPassword = async (req, res) => {
	try {
		const { password, passwordConfirm } = req.body;
		const { token } = req.params;

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (password !== passwordConfirm) {
			return res.status(400).json({ status: 'failed', code: 400, message: 'Password not match' });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = await prisma.user.update({
			where: {
				uuid: decoded.uuid,
			},
			data: {
				password: hashedPassword,
			},
			select: {
				uuid: true,
				email: true,
			},
		});

		await prisma.userTokenResetPassword.update({
			where: {
				token,
			},
			data: {
				isUsed: true,
			},
		});

		return res.status(200).json({
			status: 'success',
			code: 200,
			message: 'Success Reset Password',
			data: user,
		});
	} catch (error) {
		return res.status(500).json({ status: 'failed', code: 500, message: `Internal Server Error: ${error}` });
	}
};

module.exports = {
	LoginAttempt,
	getUser,
	registerAttempt,
	forgetPassword,
	resetPassword,
};
