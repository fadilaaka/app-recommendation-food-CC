const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync('12345678', salt);

async function main() {
	await prisma.admin.create({
		data: {
			uuid: uuidv4(),
			email: 'admin@gmail.com',
			password: bcrypt.hashSync('admin123', salt),
			name: 'admin 1',
		},
	});
	const DiseaseHistory = await prisma.diseaseHistory.createMany(
		{
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
		},
	);

	const AllergyList = await prisma.allergy.createMany(
		{
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
		},
	);

	const StressFactor = await prisma.stressFactor.createMany(
		{
			data: [
				{
					uuid: uuidv4(),
					name: 'Berat',
				},
				{
					uuid: uuidv4(),
					name: 'Ringan',
				},
				{
					uuid: uuidv4(),
					name: 'Sedang',
				},
				{
					uuid: uuidv4(),
					name: 'Sangat Berat',
				},
			],
			skipDuplicates: true,
		},
	);

	const ActivityFactor = await prisma.ActivityFactor.createMany(
		{
			data: [
				{
					uuid: uuidv4(),
					name: 'Berat',
				},
				{
					uuid: uuidv4(),
					name: 'Ringan',
				},
				{
					uuid: uuidv4(),
					name: 'Sedang',
				},
				{
					uuid: uuidv4(),
					name: 'Berat',
				},
				{
					uuid: uuidv4(),
					name: 'Sangat Berat',
				},
			],
			skipDuplicates: true,
		},
	);

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
			name: 'Berat',
		},
	});

	const Activity = await prisma.ActivityFactor.findFirst({
		where: {
			name: 'Berat',
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
							id: Stress.id,
						},
					},
					stressFactor: {
						connect: {
							id: Activity.id,
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
							id: Stress.id,
						},
					},
					stressFactor: {
						connect: {
							id: Activity.id,
						},
					},
				},
			},
		},
	});

	// Artikel
	const ArticleCategory = await prisma.articleCategory.createMany(
		{
			data: [
				{
					uuid: uuidv4(),
					name: 'Nutrisi dan Diet',
					description: 'Artikel dalam kategori ini membahas tentang konsep dasar nutrisi, makanan sehat, asupan gizi yang diperlukan, diet spesifik, serta panduan untuk mencapai dan menjaga berat badan yang sehat.',
				},
				{
					uuid: uuidv4(),
					name: 'Resep dan Masakan Sehat',
					description: 'Kategori ini berfokus pada resep makanan sehat, baik untuk diet khusus maupun untuk menjaga keseimbangan gizi. Artikel dalam kategori ini memberikan ide dan inspirasi dalam memasak makanan sehat yang lezat dan bergizi.',
				},
				{
					uuid: uuidv4(),
					name: 'Tips Hidup Sehat',
					description: 'Artikel dalam kategori ini memberikan tips dan saran praktis untuk menjaga gaya hidup sehat secara umum, termasuk pola makan sehat, aktivitas fisik, manajemen stres, tidur yang cukup, dan kebiasaan sehat lainnya.',
				},
			],
			skipDuplicates: true,
		},
	);

	const article = await prisma.articleCategory.findFirst({
		where: {
			name: 'Resep dan Masakan Sehat',
		},
	});

	await prisma.article.create({
		data: {
			uuid: uuidv4(),
			title: 'Tips Menjaga Kebutuhan Gizi',
			description: 'Tips Menjaga Kebutuhan Gizi adalah panduan praktis yang memberikan informasi tentang pentingnya menjaga asupan gizi yang seimbang dalam kehidupan sehari-hari. Dalam panduan ini, Anda akan menemukan berbagai saran dan strategi yang dapat membantu Anda menjaga pola makan yang sehat dan memenuhi kebutuhan nutrisi tubuh Anda. Mulai dari pemilihan makanan yang tepat hingga cara memasak yang sehat, panduan ini dirancang untuk memberikan pengetahuan yang mudah dipahami dan dapat diterapkan oleh semua orang.\n\nPentingnya menjaga kebutuhan gizi yang adekuat tidak bisa diremehkan. Kebutuhan gizi yang terpenuhi dapat memberikan manfaat yang besar bagi tubuh, termasuk meningkatkan daya tahan tubuh, menjaga kesehatan jantung, meningkatkan konsentrasi dan fungsi otak, serta meningkatkan kualitas tidur. Dalam panduan ini, Anda juga akan menemukan informasi tentang jenis-jenis makanan yang kaya akan nutrisi, seperti sayuran hijau, biji-bijian, dan protein nabati. Selain itu, Anda akan belajar tentang pentingnya memperhatikan jumlah asupan gula dan lemak jenuh dalam diet harian Anda.',
			image: 'https://stikeshb.ac.id/wp-content/uploads/2022/05/stikeshb-3.jpg',
			status: 'publish',
			articleCategoryId: article.id,
			// connect article
			// articlecategoryonarticle
		},
	});
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
