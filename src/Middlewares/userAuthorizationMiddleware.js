const { auth } = require('express-oauth2-jwt-bearer');
const jwt = require('jsonwebtoken');
const { PrismaClient, Prisma } = require('@prisma/client');

const prisma = new PrismaClient();

const checkValidJWT = auth({
	audience: `${process.env.AUTH0_AUDIENCE}`,
	issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
});

const verifyToken = (req, res, next) => {
	const bearerHeader = req.headers.authorization;

	try {
		if (typeof bearerHeader !== 'undefined') {
			const bearer = bearerHeader.split(' ');
			const bearerToken = bearer[1];

			const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);

			req.user = decoded;

			next();
		} else {
			throw new Error('No token provided');
		}
	} catch (error) {
		res.status(403).json({
			status: 'failed',
			code: 403,
			message: 'Forbidden',
			data: 'No token provided',
		});
	}
};

const verifyValidTokenReset = async (req, res, next) => {
	const { token } = req.params;

	try {
		if (typeof token !== 'undefined') {
			const userToken = await prisma.userTokenResetPassword.findFirstOrThrow({
				where: {
					token: parseInt(token, 10),
				},
				select: {
					id: true,
					token: true,
					isUsed: true,
					createdAt: true,
					updatedAt: true,
					userId: true,
					user: {
						select: {
							uuid: true,
						},
					},
				},
			}).catch((err) => {
				if (err instanceof Prisma.PrismaClientKnownRequestError) {
					throw Object.assign(new Error('Token Not Found'), { code: 404 });
				}
			});

			if (userToken.isUsed) {
				throw Object.assign(new Error('Token already used'), { code: 400 });
			}

			req.userToken = userToken;
			next();
		} else {
			throw Object.assign(new Error('Token not provided'), { code: 403 });
		}
	} catch (error) {
		res.status(error.code || 500).json({
			status: 'failed',
			code: error.code || 500,
			message: error.message,
			data: error.message,
		});
	}
};

module.exports = { checkValidJWT, verifyToken, verifyValidTokenReset };
