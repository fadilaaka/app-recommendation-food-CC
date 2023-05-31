/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const device = require('express-device');

// eslint-disable-next-line no-underscore-dangle
global.__basedir = __dirname;

const app = express();
const PORT = process.env.PORT || 5000;
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
const corsOptions = {
	origin: process.env.ORIGIN_CORS,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(device.capture());
app.use(morgan('combined', { stream: accessLogStream }));

require('./routes/routes')(app);
require('./routes/auth.routes')(app);

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
