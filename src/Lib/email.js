const formData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);

const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });

const sendEmail = async (sendTo, subject, message) => {
	const data = {
		from: `Dietpedia <no-reply@${process.env.MAILGUN_DOMAIN}>`,
		to: sendTo,
		subject,
		html: message,
	};

	try {
		await mg.messages.create(process.env.MAILGUN_DOMAIN, data);
	} catch (error) {
		throw new Error(error);
	}
};

module.exports = {
	sendEmail,
};
