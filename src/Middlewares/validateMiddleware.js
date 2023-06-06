const { body, param, validationResult } = require('express-validator');

module.exports.validate = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		return next();
	}
	const extractedErrors = [];
	errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

	return res.status(422).json({
		errors: extractedErrors,
	});
};

module.exports.loginValidator = [
	body('email').isEmail().withMessage('email must valid').notEmpty(),
	body('password').isString().notEmpty(),
];

module.exports.registerValidator = [
	body('name').isString(),
	body('password').isString().withMessage('password must valid').notEmpty()
		.isLength({ min: 8 })
		.isAlphanumeric()
		.withMessage('password must contain at least 8 characters and alphanumeric'),
	body('passwordConfirm').matches('password').withMessage('password did not match'),
	body('email').isEmail().withMessage('email must valid').notEmpty(),
];

module.exports.forgetPasswordValidator = [
	body('email').isEmail().withMessage('email must valid').notEmpty(),
];

module.exports.resetPasswordValidator = [
	body('password').isString().notEmpty()
		.isLength({ min: 8 })
		.isAlphanumeric()
		.withMessage('password must contain at least 8 characters and alphanumeric'),
	body('passwordConfirm').matches('password').withMessage('password did not match'),
];

module.exports.editUserValidator = [
	body('birthday').isString(),
	body('weight').isFloat(),
	body('height').isFloat(),
	body('detail').isObject(),
	body('detail.allergies').isArray(),
	body('detail.disease').isArray(),
	body('detail.stress').isNumeric(),
	body('detail.activities').isNumeric(),
];
