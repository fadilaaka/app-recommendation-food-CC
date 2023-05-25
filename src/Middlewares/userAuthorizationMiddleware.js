const { auth } = require('express-oauth2-jwt-bearer');
const env = require('dotenv').config();

const checkValidJWT = auth({
	audience: `${env.AUTH0_AUDIENCE}`,
	issuerBaseURL: `https://${env.AUTH0_DOMAIN}/`,
});

module.exports = checkValidJWT;
