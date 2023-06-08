const { parse } = require('csv-parse');
const fs = require('fs');

const dataSnack = [];
fs.createReadStream('./prisma/data/snack.csv')
	.pipe(parse({ columns: true }))
	.on('data', (r) => {
		dataSnack.push({
			no: r['No.'],
			foodName: r['Food Name'],
			calorie: r.Calorie,
			protein: r.Protein,
			fat: r.Fat,
			carbohidrat: r.Carbohidrat,
			price: r.Price,
			image: r['link foto'],
			howToCook: r['how to cook'],
		});
	})
	.on('end', () => {
		console.log('load Data Snack Success');
	});
