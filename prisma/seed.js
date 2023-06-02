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
	const DiseaseHistory = await prisma.diseaseHistory.createMany({
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

	const AllergyList = await prisma.allergy.createMany({
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

	const StressFactor = await prisma.stressFactor.createMany({
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
	});

	const ActivityFactor = await prisma.ActivityFactor.createMany({
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
	const ArticleCategory = await prisma.articleCategory.createMany({
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

	const articlecategoryfirst = await prisma.articleCategory.findFirst({
		where: {
			name: 'Nutrisi dan Diet',
		},
	});
	const articlecategorysecond = await prisma.articleCategory.findFirst({
		where: {
			name: 'Resep dan Masakan Sehat',
		},
	});

	const article1 = await prisma.article.create({
		data: {
			uuid: uuidv4(),
			title: 'Tips Menjaga Kebutuhan Gizi',
			description:
				'Tips Menjaga Kebutuhan Gizi adalah panduan praktis yang memberikan informasi tentang pentingnya menjaga asupan gizi yang seimbang dalam kehidupan sehari-hari. Dalam panduan ini, Anda akan menemukan berbagai saran dan strategi yang dapat membantu Anda menjaga pola makan yang sehat dan memenuhi kebutuhan nutrisi tubuh Anda. Mulai dari pemilihan makanan yang tepat hingga cara memasak yang sehat, panduan ini dirancang untuk memberikan pengetahuan yang mudah dipahami dan dapat diterapkan oleh semua orang.\n\nPentingnya menjaga kebutuhan gizi yang adekuat tidak bisa diremehkan. Kebutuhan gizi yang terpenuhi dapat memberikan manfaat yang besar bagi tubuh, termasuk meningkatkan daya tahan tubuh, menjaga kesehatan jantung, meningkatkan konsentrasi dan fungsi otak, serta meningkatkan kualitas tidur. Dalam panduan ini, Anda juga akan menemukan informasi tentang jenis-jenis makanan yang kaya akan nutrisi, seperti sayuran hijau, biji-bijian, dan protein nabati. Selain itu, Anda akan belajar tentang pentingnya memperhatikan jumlah asupan gula dan lemak jenuh dalam diet harian Anda.',
			image: 'https://stikeshb.ac.id/wp-content/uploads/2022/05/stikeshb-3.jpg',
			status: 'publish',
			articleCategoryId: articlecategorysecond.id,
		},
	});
	const article2 = await prisma.article.create({
		data: {
			uuid: uuidv4(),
			title: 'Pemenuhan Nutrisi dengan Diet',
			description:
				'<p>Nutrisi dan diet merupakan dua hal yang saling terkait dalam menjaga kesehatan tubuh. Nutrisi yang seimbang dan diet yang tepat dapat memberikan manfaat yang signifikan bagi kesejahteraan kita. Nutrisi yang baik mengandung zat-zat penting seperti karbohidrat, protein, lemak, vitamin, dan mineral yang diperlukan oleh tubuh untuk menjalankan fungsi-fungsinya secara optimal.</p> <p>Dalam mencapai diet yang sehat, penting untuk memperhatikan keseimbangan antara asupan kalori dengan kebutuhan tubuh. Mengonsumsi makanan yang kaya serat seperti buah-buahan, sayuran, dan biji-bijian dapat membantu menjaga pencernaan yang sehat dan mempercepat rasa kenyang. Selain itu, mengurangi konsumsi makanan yang tinggi lemak jenuh, gula tambahan, dan garam dapat membantu menjaga berat badan yang sehat dan mengurangi risiko penyakit kronis seperti penyakit jantung dan diabetes.</p> <p>Dengan memperhatikan nutrisi dan menjalani diet yang seimbang, kita dapat memberikan dukungan yang kuat bagi kesehatan tubuh kita. Penting untuk mengadopsi gaya hidup sehat secara keseluruhan, termasuk rutin berolahraga, menghindari kebiasaan merokok, dan mengelola stres dengan baik. Dengan memprioritaskan nutrisi dan diet yang tepat, kita dapat meningkatkan kualitas hidup kita dan mencegah berbagai masalah kesehatan yang mungkin timbul.</p>',
			image: 'https://images.genpi.co/uploads/data/images/shutterstock_113341153.jpg',
			status: 'publish',
			articleCategoryId: articlecategoryfirst.id,
		},
	});

	await prisma.articleCategoryOnArticle.create({
		data: {
			uuid: uuidv4(),
			articleId: article1.id,
			articleCategoryId: articlecategorysecond.id,
		},
	});
	await prisma.articleCategoryOnArticle.create({
		data: {
			uuid: uuidv4(),
			articleId: article2.id,
			articleCategoryId: articlecategoryfirst.id,
		},
	});

	const foodTagsSeed1 = await prisma.foodTags.create({
		data: {
			uuid: uuidv4(),
			name: 'Dessert',
			description: 'This is dessert foods',
		},
	});
	await prisma.foodTags.create({
		data: {
			uuid: uuidv4(),
			name: 'Makanan Berat',
			description: 'This is makanan berat',
		},
	});

	const foodRecipeSeed1 = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Emping Beras',
			description:
				'Bahan-bahan: - 50 gram emping beras - Air secukupnya untuk merendam - Minyak goreng secukupnya untuk menggoreng Langkah-langkah: 1. Rendam emping beras dalam air selama minimal 1 jam atau sesuai petunjuk pada kemasan, agar emping menjadi lunak dan mudah digoreng. Pastikan airnya cukup untuk merendam emping. 2. Setelah emping direndam, tiriskan air rendamannya. 3. Panaskan minyak goreng dalam wajan dengan api sedang. 4. Masukkan emping beras ke dalam wajan dengan hati-hati. Pastikan emping terendam minyak secara merata. 5. Goreng emping beras hingga berubah warna menjadi kecokelatan dan teksturnya renyah. Hal ini membutuhkan sekitar 2-3 menit. 6. Angkat emping beras dari wajan dan tiriskan minyaknya menggunakan saringan atau tisu dapur. 7. Biarkan emping beras dingin sebentar sebelum disajikan. 8. Emping beras siap disajikan sebagai camilan atau sebagai pelengkap dalam hidangan lainnya. Selamat menikmati Emping Beras dalam ukuran porsi yang Anda inginkan!',
		},
	});
	const foodRecipeSeed2 = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kue koa',
			description:
				'Bahan-bahan: - 50 gram tepung terigu - 25 gram gula pasir - 1/4 sendok teh vanila - 1/4 sendok teh baking powder - 1 butir telur - 50 ml air matang - Minyak goreng secukupnya untuk menggoreng Langkah-langkah: 1. Campurkan tepung terigu, gula pasir, vanila, dan baking powder dalam sebuah wadah. 2. Tambahkan telur ke dalam campuran tepung dan aduk rata. 3. Tuangkan air sedikit-sedikit sambil terus mengaduk hingga adonan menjadi kental dan tercampur sempurna. Pastikan tidak ada gumpalan dalam adonan. 4. Panaskan minyak goreng dalam wajan dengan api sedang. 5. Ambil satu sendok makan adonan kue koa dan tuang ke dalam wajan dengan minyak panas. Bentuk adonan menjadi lingkaran dengan bantuan sendok. 6. Goreng adonan kue koa hingga berwarna kecokelatan dan teksturnya renyah. Balik adonan jika bagian bawahnya sudah matang. 7. Angkat kue koa dari wajan dan tiriskan minyaknya menggunakan saringan atau tisu dapur. 8. Biarkan kue koa dingin sebentar sebelum disajikan. 9. Kue koa siap disajikan sebagai camilan atau sebagai hidangan penutup. Selamat menikmati Kue Koa dalam ukuran porsi yang Anda inginkan!',
		},
	});

	const foodSeed1 = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Emping beras',
			description: 'Delicious emping beras with various toppings',
			image: 'https://id-test-11.slatic.net/p/8d475dd96749024eb4626810ea458829.jpg',
			price: 10000,
			status: 'publish',
			foodRecipeId: foodRecipeSeed1.id,
			foodTagsId: foodTagsSeed1.id,
		},
	});
	const foodSeed2 = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kue Koa',
			description: 'Delicious kue koa with chocolate',
			image: 'https://img-global.cpcdn.com/recipes/79c863559034d172/680x482cq70/22-kue-koa-2-bahan-foto-resep-utama.jpg',
			price: 5000,
			status: 'publish',
			foodRecipeId: foodRecipeSeed2.id,
			foodTagsId: foodTagsSeed1.id,
		},
	});

	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 10.5,
			protein: 15.2,
			carbohidrat: 30.7,
			calories: 280.5,
			foodId: foodSeed1.id,
			foodRecipeId: foodRecipeSeed1.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 0.4,
			protein: 4.8,
			carbohidrat: 79.3,
			calories: 340,
			foodId: foodSeed2.id,
			foodRecipeId: foodRecipeSeed2.id,
		},
	});

	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeed1.id,
			foodTagsId: foodTagsSeed1.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeed2.id,
			foodTagsId: foodTagsSeed1.id,
		},
	});

	// model Food {
	// 	id          Int     @id @default(autoincrement())
	// 	uuid        String  @unique
	// 	name        String
	// 	description String?
	// 	image       String?
	// 	price       Float?
	// 	status      status  @default(publish)

	// 	foodRecipeId Int?
	// 	foodTagsId   Int?

	// 	createdAt DateTime  @default(now())
	// 	updatedAt DateTime  @updatedAt
	// 	deletedAt DateTime?

	// 	foodDetail     FoodDetail[]
	// 	foodRecipe     FoodRecipe?      @relation(fields: [foodRecipeId], references: [id])
	// 	foodTags       FoodTags?        @relation(fields: [foodTagsId], references: [id])
	// 	foodTagsOnFood FoodTagsOnFood[]
	// }
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
