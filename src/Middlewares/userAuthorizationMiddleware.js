const { auth } = require('express-oauth2-jwt-bearer');
const jwt = require('jsonwebtoken');

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

module.exports = { checkValidJWT, verifyToken };
