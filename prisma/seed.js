/* eslint-disable import/no-extraneous-dependencies */
const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { parse } = require('csv-parse');
const fs = require('fs');

const prisma = new PrismaClient();
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync('12345678', salt);

const dataSnack = [];
const dataFood = [];
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
		console.log('load Data Snacks Success');
	});

fs.createReadStream('./prisma/data/makanan.csv')
	.pipe(parse({ columns: true }))
	.on('data', (r) => {
		dataFood.push({
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
		console.log('load Data Foods Success');
	});

function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

async function snackInsert(item) {
	await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: item.foodName,
			description: faker.lorem.paragraphs({ min: 1, max: 3 }),
			image: item.image,
			price: parseInt(item.price, 10),
			status: 'publish',
			foodTagsOnFood: {
				create: {
					uuid: uuidv4(),
					foodTags: {
						connect: {
							id: 1,
						},
					},
				},
			},
			foodRecipe: {
				create: {
					uuid: uuidv4(),
					name: item.foodName,
					image: item.image,
					description: item.howToCook,
				},
			},
			foodDetail: {
				create: {
					uuid: uuidv4(),
					fat: parseFloat(item.fat),
					protein: parseFloat(item.protein),
					carbohidrat: parseFloat(item.carbohidrat),
					calories: parseFloat(item.calorie),
				},
			},
		},
	});
}
async function foodInsert(item) {
	await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: item.foodName,
			description: faker.lorem.paragraphs({ min: 1, max: 3 }),
			image: item.image,
			price: parseInt(item.price, 10),
			status: 'publish',
			foodTagsOnFood: {
				create: {
					uuid: uuidv4(),
					foodTags: {
						connect: {
							id: randomIntFromInterval(2, 3),
						},
					},
				},
			},
			foodRecipe: {
				create: {
					uuid: uuidv4(),
					name: item.foodName,
					image: item.image,
					description: item.howToCook,
				},
			},
			foodDetail: {
				create: {
					uuid: uuidv4(),
					fat: parseFloat(item.fat),
					protein: parseFloat(item.protein),
					carbohidrat: parseFloat(item.carbohidrat),
					calories: parseFloat(item.calorie),
				},
			},
		},
	});
}

async function main() {
	await prisma.admin.create({
		data: {
			uuid: uuidv4(),
			email: 'admin@gmail.com',
			password: bcrypt.hashSync('admin123', salt),
			name: 'admin 1',
		},
	});

	await prisma.diseaseHistory.createMany({
		data: [
			{
				uuid: uuidv4(),
				name: 'Diabetes',
			},
			{
				uuid: uuidv4(),
				name: 'Hipertensión',
			},
			{
				uuid: uuidv4(),
				name: 'Cáncer',
			},
			{
				uuid: uuidv4(),
				name: 'Enfermedad cardiovascular',
			},
			{
				uuid: uuidv4(),
				name: 'Enfermedad pulmonar',
			},
			{
				uuid: uuidv4(),
				name: 'Enfermedad renal',
			},
			{
				uuid: uuidv4(),
				name: 'Enfermedad hepática',
			},
			{
				uuid: uuidv4(),
				name: 'Enfermedad neurológica',
			},
			{
				uuid: uuidv4(),
				name: 'Enfermedad hematológica',
			},
			{
				uuid: uuidv4(),
				name: 'Maag',
			},
			{
				uuid: uuidv4(),
				name: 'Otro',
			},
		],
		skipDuplicates: true,
	});

	await prisma.allergy.createMany({
		data: [
			{
				uuid: uuidv4(),
				name: 'Kacang',
			},
			{
				uuid: uuidv4(),
				name: 'Udang',
			},
			{
				uuid: uuidv4(),
				name: 'Seafood',
			},
		],
		skipDuplicates: true,
	});

	await prisma.stressFactor.createMany({
		data: [
			{
				uuid: uuidv4(),
				name: 'Stres Sangat Berat',
			},
			{
				uuid: uuidv4(),
				name: 'Stres Berat',
			},
			{
				uuid: uuidv4(),
				name: 'Stres Sedang',
			},
			{
				uuid: uuidv4(),
				name: 'Stres Ringan',
			},
		],
		skipDuplicates: true,
	});

	await prisma.ActivityFactor.createMany({
		data: [
			{
				uuid: uuidv4(),
				name: 'Kerja ringan',
			},
			{
				uuid: uuidv4(),
				name: 'Kerja ringan-sedang',
			},
			{
				uuid: uuidv4(),
				name: 'Kerja sedang',
			},
			{
				uuid: uuidv4(),
				name: 'Kerja berat',
			},
			{
				uuid: uuidv4(),
				name: 'Kerja berat sekali',
			},
		],
		skipDuplicates: true,
	});

	const disease = await prisma.diseaseHistory.findFirst({
		where: {
			name: 'Maag',
		},
	});

	const allergy = await prisma.allergy.findFirst({
		where: {
			name: 'Kacang',
		},
	});

	const Stress = await prisma.stressFactor.findFirst({
		where: {
			name: 'Stres Sangat Berat',
		},
	});

	const Activity = await prisma.ActivityFactor.findFirst({
		where: {
			name: 'Kerja berat',
		},
	});

	await prisma.user.create({
		data: {
			uuid: uuidv4(),
			email: faker.internet.email(),
			name: faker.internet.userName(),
			password: hash,
			gender: faker.person.sex(),
			weight: faker.number.float({ min: 35, max: 100, precision: 0.01 }),
			height: faker.number.float({ min: 165, max: 190, precision: 0.01 }),
			birthday: faker.date.birthdate(),
			budget: faker.number.int({ min: 10000, max: 100000 }),
			userDetail: {
				create: {
					uuid: uuidv4(),
					diseaseHistories: {
						create: [
							{
								uuid: uuidv4(),
								diseaseHistory: {
									connect: {
										id: disease.id,
									},
								},
							},
						],
					},
					allergies: {
						create: [
							{
								uuid: uuidv4(),
								allergy: {
									connect: {
										id: allergy.id,
									},
								},
							},
						],
					},
					activityFactor: {
						connect: {
							id: Activity.id,
						},
					},
					stressFactor: {
						connect: {
							id: Stress.id,
						},
					},
				},
			},
		},
	});

	// user login
	await prisma.user.create({
		data: {
			uuid: uuidv4(),
			email: 'test@gmail.com',
			name: faker.internet.userName(),
			password: bcrypt.hashSync('test', salt),
			gender: faker.person.sex(),
			weight: faker.number.float({ min: 35, max: 100, precision: 0.01 }),
			height: faker.number.float({ min: 165, max: 190, precision: 0.01 }),
			birthday: faker.date.birthdate(),
			budget: faker.number.int({ min: 10000, max: 100000 }),
			userDetail: {
				create: {
					uuid: uuidv4(),
					diseaseHistories: {
						create: [
							{
								uuid: uuidv4(),
								diseaseHistory: {
									connect: {
										id: 1,
									},
								},
							},
							{
								uuid: uuidv4(),
								diseaseHistory: {
									connect: {
										id: 2,
									},
								},
							},
						],
					},
					allergies: {
						create: [
							{
								uuid: uuidv4(),
								allergy: {
									connect: {
										id: allergy.id,
									},
								},
							},
						],
					},
					activityFactor: {
						connect: {
							id: Activity.id,
						},
					},
					stressFactor: {
						connect: {
							id: Stress.id,
						},
					},
				},
			},
		},
	});

	// Artikel
	await prisma.articleCategory.createMany({
		data: [
			{
				uuid: uuidv4(),
				name: 'Nutrisi dan Diet',
				description:
					'Artikel dalam kategori ini membahas tentang konsep dasar nutrisi, makanan sehat, asupan gizi yang diperlukan, diet spesifik, serta panduan untuk mencapai dan menjaga berat badan yang sehat.',
			},
			{
				uuid: uuidv4(),
				name: 'Resep dan Masakan Sehat',
				description:
					'Kategori ini berfokus pada resep makanan sehat, baik untuk diet khusus maupun untuk menjaga keseimbangan gizi. Artikel dalam kategori ini memberikan ide dan inspirasi dalam memasak makanan sehat yang lezat dan bergizi.',
			},
			{
				uuid: uuidv4(),
				name: 'Tips Hidup Sehat',
				description:
					'Artikel dalam kategori ini memberikan tips dan saran praktis untuk menjaga gaya hidup sehat secara umum, termasuk pola makan sehat, aktivitas fisik, manajemen stres, tidur yang cukup, dan kebiasaan sehat lainnya.',
			},
		],
		skipDuplicates: true,
	});

	await prisma.article.create({
		data:
		{
			uuid: uuidv4(),
			title: 'Tips Menjaga Kebutuhan Gizi',
			description:
				'Tips Menjaga Kebutuhan Gizi adalah panduan praktis yang memberikan informasi tentang pentingnya menjaga asupan gizi yang seimbang dalam kehidupan sehari-hari. Dalam panduan ini, Anda akan menemukan berbagai saran dan strategi yang dapat membantu Anda menjaga pola makan yang sehat dan memenuhi kebutuhan nutrisi tubuh Anda. Mulai dari pemilihan makanan yang tepat hingga cara memasak yang sehat, panduan ini dirancang untuk memberikan pengetahuan yang mudah dipahami dan dapat diterapkan oleh semua orang.\n\nPentingnya menjaga kebutuhan gizi yang adekuat tidak bisa diremehkan. Kebutuhan gizi yang terpenuhi dapat memberikan manfaat yang besar bagi tubuh, termasuk meningkatkan daya tahan tubuh, menjaga kesehatan jantung, meningkatkan konsentrasi dan fungsi otak, serta meningkatkan kualitas tidur. Dalam panduan ini, Anda juga akan menemukan informasi tentang jenis-jenis makanan yang kaya akan nutrisi, seperti sayuran hijau, biji-bijian, dan protein nabati. Selain itu, Anda akan belajar tentang pentingnya memperhatikan jumlah asupan gula dan lemak jenuh dalam diet harian Anda.',
			image: 'https://stikeshb.ac.id/wp-content/uploads/2022/05/stikeshb-3.jpg',
			status: 'publish',
			articleCategories: {
				create: {
					uuid: uuidv4(),
					articleCategory: {
						connect: {
							id: 1,
						},
					},
				},
			},
		},
	});

	await prisma.article.create({
		data:
		{
			uuid: uuidv4(),
			title: 'Tips Menjaga Kebutuhan Gizi',
			description:
				'Tips Menjaga Kebutuhan Gizi adalah panduan praktis yang memberikan informasi tentang pentingnya menjaga asupan gizi yang seimbang dalam kehidupan sehari-hari. Dalam panduan ini, Anda akan menemukan berbagai saran dan strategi yang dapat membantu Anda menjaga pola makan yang sehat dan memenuhi kebutuhan nutrisi tubuh Anda. Mulai dari pemilihan makanan yang tepat hingga cara memasak yang sehat, panduan ini dirancang untuk memberikan pengetahuan yang mudah dipahami dan dapat diterapkan oleh semua orang.\n\nPentingnya menjaga kebutuhan gizi yang adekuat tidak bisa diremehkan. Kebutuhan gizi yang terpenuhi dapat memberikan manfaat yang besar bagi tubuh, termasuk meningkatkan daya tahan tubuh, menjaga kesehatan jantung, meningkatkan konsentrasi dan fungsi otak, serta meningkatkan kualitas tidur. Dalam panduan ini, Anda juga akan menemukan informasi tentang jenis-jenis makanan yang kaya akan nutrisi, seperti sayuran hijau, biji-bijian, dan protein nabati. Selain itu, Anda akan belajar tentang pentingnya memperhatikan jumlah asupan gula dan lemak jenuh dalam diet harian Anda.',
			image: 'https://stikeshb.ac.id/wp-content/uploads/2022/05/stikeshb-3.jpg',
			status: 'publish',
			articleCategories: {
				create: {
					uuid: uuidv4(),
					articleCategory: {
						connect: {
							id: 2,
						},
					},
				},
			},
		},
	});

	await prisma.foodTags.createMany({
		data: [
			{
				uuid: uuidv4(),
				name: 'Dessert',
				description: 'This is dessert foods',
			},
			{
				uuid: uuidv4(),
				name: 'Makanan Ringan',
				description: 'This is makanan ringan',
			},
			{
				uuid: uuidv4(),
				name: 'Makanan Berat',
				description: 'This is makanan berat',
			},
		],
		skipDuplicates: true,
	});

	// food snack
	dataSnack.map((item) => snackInsert(item));
	dataFood.map((item) => foodInsert(item));
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
