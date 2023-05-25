const express = require('express');
const env = require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
	res.send('(TESTING CLOUD RUN) Halo Express!');
});

app.listen(env.EXPRESS_PORT || 5000, () => {
	console.log(`App listening on port ${env.EXPRESS_PORT || 5000}`);
});
