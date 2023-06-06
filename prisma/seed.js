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

	const ActivityFactor = await prisma.ActivityFactor.createMany({
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
	const foodTagsSeedMakananRingan = await prisma.foodTags.create({
		data: {
			uuid: uuidv4(),
			name: 'Makanan Ringan',
			description: 'This is dessert foods',
		},
	});
	const foodTagsSeedMakananBerat = await prisma.foodTags.create({
		data: {
			uuid: uuidv4(),
			name: 'Makanan Berat',
			description: 'This is makanan berat',
		},
	});

	const foodRecipeSeedDodolBali = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Dodol bali',
			description:
				'Bahan-bahan: - 100 gram tepung ketan - 200 ml air - 100 ml santan - 100 gram gula merah, serut halus - 1/4 sendok teh garam - Daun pisang secukupnya untuk membungkus Langkah-langkah: 1. Campur tepung ketan dengan air, aduk rata hingga tidak ada gumpalan. 2. Panaskan santan dalam panci kecil dengan api sedang. Setelah santan hangat, tambahkan gula merah serut dan garam. Aduk hingga gula merah larut dalam santan. 3. Tambahkan campuran tepung ketan ke dalam panci. Aduk terus dengan api kecil hingga adonan mengental dan berubah menjadi seperti adonan dodol yang kenyal. 4. Siapkan daun pisang, panggang sebentar di atas api untuk membuatnya lebih fleksibel. 5. Ambil sejumput adonan dodol dan letakkan di atas daun pisang yang telah dipanggang. Bentuk adonan menjadi bulat atau lonjong, lalu bungkus dengan rapi menggunakan daun pisang. 6. Biarkan dodol Bali dingin dan mengeras sebelum disajikan. Selamat menikmati Dodol Bali!',
		},
	});
	const foodSeedDodolBali = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Dodol bali',
			description: 'Ini adalah dodol bali.',
			image: 'https://img-global.cpcdn.com/recipes/d6c40d46efeae75c/680x482cq70/jaje-dodol-injin-bali-dodol-ketan-hitam-bali-foto-resep-utama.jpg',
			price: 20000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedDodolBali.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.1,
			protein: 3.7,
			carbohidrat: 65.9,
			calories: 298,
			foodId: foodSeedDodolBali.id,
			foodRecipeId: foodRecipeSeedDodolBali.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedDodolBali.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedDodolGalamai = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Dodol galamai',
		},
	});
	const foodSeedDodolGalamai = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Dodol galamai',
			description: 'Ini adalah dodol galamai.',
			image: 'https://www.saribundo.biz/wp-content/uploads/2017/07/Resep-Galamai-Legit-Dodol-Khas-Sumatera-Barat.jpg',
			price: 25000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedDodolGalamai.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 3.8,
			protein: 0.4,
			carbohidrat: 76.1,
			calories: 348,
			foodId: foodSeedDodolGalamai.id,
			foodRecipeId: foodRecipeSeedDodolGalamai.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedDodolGalamai.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedDodolKedondong = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Dodol kedondong',
		},
	});
	const foodSeedDodolKedondong = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Dodol kedondong',
			description: 'Ini adalah dodol kedondong.',
			image: 'https://melayupedia.com/foto_berita/2021/11/2021-11-17-uniknya-oleh-oleh-khas-riau-olahan-kedondong-jadi-dodol.jpeg',
			price: 15000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedDodolKedondong.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 7.6,
			protein: 1.9,
			carbohidrat: 51.9,
			calories: 331,
			foodId: foodSeedDodolKedondong.id,
			foodRecipeId: foodRecipeSeedDodolKedondong.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedDodolKedondong.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedDodolManado = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Dodol manado',
		},
	});
	const foodSeedDodolManado = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Dodol manado',
			description: 'Ini adalah dodol manado.',
			image: 'https://ksmtour.com/media/images/articles9/dodol-amurang-manado.jpg',
			price: 18000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedDodolManado.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 16.5,
			protein: 4.3,
			carbohidrat: 51.9,
			calories: 373,
			foodId: foodSeedDodolManado.id,
			foodRecipeId: foodRecipeSeedDodolManado.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedDodolManado.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedEmpingBeras = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Emping beras',
			description:
				'Bahan-bahan: - 50 gram emping beras - Air secukupnya untuk merendam - Minyak goreng secukupnya untuk menggoreng Langkah-langkah: 1. Rendam emping beras dalam air selama minimal 1 jam atau sesuai petunjuk pada kemasan, agar emping menjadi lunak dan mudah digoreng. Pastikan airnya cukup untuk merendam emping. 2. Setelah emping direndam, tiriskan air rendamannya. 3. Panaskan minyak goreng dalam wajan dengan api sedang. 4. Masukkan emping beras ke dalam wajan dengan hati-hati. Pastikan emping terendam minyak secara merata. 5. Goreng emping beras hingga berubah warna menjadi kecokelatan dan teksturnya renyah. Hal ini membutuhkan sekitar 2-3 menit. 6. Angkat emping beras dari wajan dan tiriskan minyaknya menggunakan saringan atau tisu dapur. 7. Biarkan emping beras dingin sebentar sebelum disajikan. 8. Emping beras siap disajikan sebagai camilan atau sebagai pelengkap dalam hidangan lainnya. Selamat menikmati Emping Beras dalam ukuran porsi yang Anda inginkan!',
		},
	});
	const foodSeedEmpingBeras = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Emping beras',
			description: 'Ini adalah Emping beras.',
			image: 'https://id-test-11.slatic.net/p/8d475dd96749024eb4626810ea458829.jpg',
			price: 12000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedEmpingBeras.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 10.6,
			carbohidrat: 85.3,
			calories: 403,
			foodId: foodSeedEmpingBeras.id,
			foodRecipeId: foodRecipeSeedEmpingBeras.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedEmpingBeras.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedGemblong = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Gemblong',
		},
	});
	const foodSeedGemblong = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Gemblong',
			description: 'Ini adalah Gemblong.',
			image: 'https://asset.kompas.com/crops/I3Y-iWTZTZ0TLo5ZTtNqPtrya_s=/0x73:1280x926/750x500/data/photo/2020/08/16/5f3913fdc5e69.jpg',
			price: 10000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedGemblong.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 5.4,
			protein: 1.7,
			carbohidrat: 55.5,
			calories: 274,
			foodId: foodSeedGemblong.id,
			foodRecipeId: foodRecipeSeedGemblong.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedGemblong.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedGendarGoreng = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Gendar goreng',
		},
	});
	const foodSeedGendarGoreng = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Gendar goreng',
			description: 'Ini adalah Gendar goreng.',
			image: 'https://img-global.cpcdn.com/recipes/1e4a5c555465abf2/1200x630cq70/photo.jpg',
			price: 8000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedGendarGoreng.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 28.2,
			protein: 7.6,
			carbohidrat: 32.0,
			calories: 407,
			foodId: foodSeedGendarGoreng.id,
			foodRecipeId: foodRecipeSeedGendarGoreng.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedGendarGoreng.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedIntipGoreng = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Intip goreng',
		},
	});
	const foodSeedIntipGoreng = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Intip goreng',
			description: 'Ini adalah Intip goreng.',
			image: 'https://img-global.cpcdn.com/recipes/4dece0e171a7ee52/1200x630cq70/photo.jpg',
			price: 10000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedIntipGoreng.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 21.6,
			protein: 7.6,
			carbohidrat: 62.3,
			calories: 474,
			foodId: foodSeedIntipGoreng.id,
			foodRecipeId: foodRecipeSeedIntipGoreng.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedIntipGoreng.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedJagungGerontol = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Jagung gerontol',
		},
	});
	const foodSeedJagungGerontol = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Jagung gerontol',
			description: 'Ini adalah Jagung gerontol.',
			image: 'https://img-global.cpcdn.com/recipes/763fb46246f99eb2/680x482cq70/grontol-jagung-foto-resep-utama.jpg',
			price: 5000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedJagungGerontol.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 1.3,
			protein: 2.7,
			carbohidrat: 33.3,
			calories: 156,
			foodId: foodSeedJagungGerontol.id,
			foodRecipeId: foodRecipeSeedJagungGerontol.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedJagungGerontol.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedJagungTiti = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Jagung titi',
			description:
				'Bahan-bahan: - 1 buah jagung manis - Air secukupnya - Garam secukupnya (opsional) - Mentega secukupnya (opsional) Langkah-langkah: 1. Kupas kulit jagung manis dan bersihkan dari serabutnya. 2. Potong jagung menjadi beberapa bagian sesuai keinginan. 3. Siapkan panci dengan air yang cukup untuk merebus jagung. 4. Panaskan air dalam panci hingga mendidih. 5. Masukkan potongan jagung ke dalam air mendidih. 6. Rebus jagung selama sekitar 8-10 menit, atau sampai jagung matang dan teksturnya lembut. 7. Setelah jagung matang, tiriskan dari air. 8. Jika diinginkan, taburi garam secukupnya pada jagung yang telah direbus. 9. Jagung Titi siap disajikan. Anda juga bisa menambahkan mentega sebagai pelengkap untuk memberikan rasa yang lebih kaya. Selamat menikmati Jagung Titi!',
		},
	});
	const foodSeedJagungTiti = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Jagung titi',
			description: 'Ini adalah Jagung titi.',
			image: 'https://cdn-2.tstatic.net/kupang/foto/bank/images/jagung-titi_20150423_162505.jpg',
			price: 7000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedJagungTiti.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedJagungTiti.id,
			foodRecipeId: foodRecipeSeedJagungTiti.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedJagungTiti.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	// need to edit food detail
	const foodRecipeSeedKueBangen = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kue bangen',
		},
	});
	const foodSeedKueBangen = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kue bangen',
			description: 'Ini adalah Kue bangen.',
			image: 'https://nilaigizi.com/assets/images/produk/produk_1538366586.JPG',
			price: 6000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKueBangen.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKueBangen.id,
			foodRecipeId: foodRecipeSeedKueBangen.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKueBangen.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKueGelang = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kue gelang',
		},
	});
	const foodSeedKueGelang = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kue gelang',
			description: 'Ini adalah Kue gelang.',
			image: 'https://khalfani.co.id/wp-content/uploads/2022/01/kukis-gelang.jpg',
			price: 7000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKueGelang.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKueGelang.id,
			foodRecipeId: foodRecipeSeedKueGelang.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKueGelang.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKueJahe = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kue jahe',
		},
	});
	const foodSeedKueJahe = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kue jahe',
			description: 'Ini adalah Kue jahe.',
			image: 'https://img.inews.co.id/media/822/files/inews_new/2021/12/24/Kue_jahe.jpg',
			price: 8000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKueJahe.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKueJahe.id,
			foodRecipeId: foodRecipeSeedKueJahe.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKueJahe.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKueKelapa = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kue kelapa',
		},
	});
	const foodSeedKueKelapa = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kue kelapa',
			description: 'Ini adalah Kue kelapa.',
			image: 'https://img-global.cpcdn.com/recipes/Recipe_2014_06_07_16_47_15_144_58897c/1200x630cq70/photo.jpg',
			price: 9000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKueKelapa.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKueKelapa.id,
			foodRecipeId: foodRecipeSeedKueKelapa.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKueKelapa.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKueKoa = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kue koa',
			description:
				'Bahan-bahan: - 50 gram tepung terigu - 25 gram gula pasir - 1/4 sendok teh vanila - 1/4 sendok teh baking powder - 1 butir telur - 50 ml air matang - Minyak goreng secukupnya untuk menggoreng Langkah-langkah: 1. Campurkan tepung terigu, gula pasir, vanila, dan baking powder dalam sebuah wadah. 2. Tambahkan telur ke dalam campuran tepung dan aduk rata. 3. Tuangkan air sedikit-sedikit sambil terus mengaduk hingga adonan menjadi kental dan tercampur sempurna. Pastikan tidak ada gumpalan dalam adonan. 4. Panaskan minyak goreng dalam wajan dengan api sedang. 5. Ambil satu sendok makan adonan kue koa dan tuang ke dalam wajan dengan minyak panas. Bentuk adonan menjadi lingkaran dengan bantuan sendok. 6. Goreng adonan kue koa hingga berwarna kecokelatan dan teksturnya renyah. Balik adonan jika bagian bawahnya sudah matang. 7. Angkat kue koa dari wajan dan tiriskan minyaknya menggunakan saringan atau tisu dapur. 8. Biarkan kue koa dingin sebentar sebelum disajikan. 9. Kue koa siap disajikan sebagai camilan atau sebagai hidangan penutup. Selamat menikmati Kue Koa dalam ukuran porsi yang Anda inginkan!',
		},
	});
	const foodSeedKueKoa = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kue koa',
			description: 'Ini adalah Kue koa.',
			image: 'https://img-global.cpcdn.com/recipes/79c863559034d172/680x482cq70/22-kue-koa-2-bahan-foto-resep-utama.jpg',
			price: 10000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKueKoa.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKueKoa.id,
			foodRecipeId: foodRecipeSeedKueKoa.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKueKoa.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKueKuTemu = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kue ku temu',
		},
	});
	const foodSeedKueKuTemu = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kue ku temu',
			description: 'Ini adalah Kue ku temu.',
			image: 'https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/sasefoto/original/29195_kue-ku.jpg',
			price: 8000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKueKuTemu.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKueKuTemu.id,
			foodRecipeId: foodRecipeSeedKueKuTemu.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKueKuTemu.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKueLumpur = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kue lumpur',
		},
	});
	const foodSeedKueLumpur = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kue lumpur',
			description: 'Ini adalah Kue lumpur.',
			image: 'https://img.kurio.network/u_ismzhaT5An97OjUr0AzVYEjCE=/1200x900/filters:quality(80)/https://kurio-img.kurioapps.com/21/09/21/eec4bac2-8193-41bd-b249-22a4afc28519.jpe',
			price: 6000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKueLumpur.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKueLumpur.id,
			foodRecipeId: foodRecipeSeedKueLumpur.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKueLumpur.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKuePelita = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kue pelita',
		},
	});
	const foodSeedKuePelita = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kue pelita',
			description: 'Ini adalah Kue pelita.',
			image: 'https://cdn1-production-images-kly.akamaized.net/gV0DKPWiS0EMLeuRwtdY_0y0CcA=/0x263:5184x3185/1200x675/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3075761/original/005885800_1584086295-kue_pelita.jpg',
			price: 7000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKuePelita.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKuePelita.id,
			foodRecipeId: foodRecipeSeedKuePelita.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKuePelita.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKuePutuCangkir = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kue putu cangkir',
		},
	});
	const foodSeedKuePutuCangkir = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kue putu cangkir',
			description: 'Ini adalah Kue putu cangkir.',
			image: 'https://cdn0-production-images-kly.akamaized.net/qmBhOqFuP47FoFihCGveaq5HHuY=/0x55:999x618/469x260/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3604119/original/074802300_1634357850-shutterstock_35503279.jpg',
			price: 9000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKuePutuCangkir.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKuePutuCangkir.id,
			foodRecipeId: foodRecipeSeedKuePutuCangkir.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKuePutuCangkir.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKueSus = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kue sus',
			description:
				'Bahan-bahan: - 50 ml air - 25 gram mentega - 30 gram tepung terigu - 1 butir telur - Gula halus secukupnya - Isian krim atau selai (sesuai selera) Langkah-langkah: 1. Panaskan oven pada suhu 200 derajat Celsius. 2. Siapkan panci kecil, masukkan air dan mentega. Panaskan hingga mentega meleleh dan air mendidih. 3. Setelah air mendidih, matikan api. Tambahkan tepung terigu ke dalam panci dan aduk dengan cepat hingga adonan tercampur rata dan membentuk bola yang elastis. 4. Biarkan adonan sedikit dingin. Kemudian, tambahkan telur satu per satu sambil terus diaduk hingga adonan menjadi kental dan licin. 5. Letakkan adonan dalam kantong plastik segitiga dengan ujungnya dipotong kecil atau menggunakan spuit kue. 6. Semprotkan adonan dalam bentuk bulat atau lonjong dengan ukuran sesuai selera di atas loyang yang telah dilapisi kertas baking. 7. Panggang kue sus dalam oven yang telah dipanaskan selama 20-25 menit, atau hingga mengembang dan berwarna kecokelatan. 8. Setelah matang, keluarkan kue sus dari oven dan biarkan dingin. 9. Setelah kue sus dingin, potong secara horizontal dan isi dengan krim atau selai favorit Anda. 10. Taburi gula halus di atas kue sus sebagai hiasan tambahan. Kue Sus siap disajikan. Nikmati kue sus dalam ukuran porsi yang Anda inginkan! Catatan: Waktu dan suhu pemanggangan dapat bervariasi, jadi perhatikan kondisi kue selama proses pemanggangan untuk mendapatkan hasil yang optimal.',
		},
	});
	const foodSeedKueSus = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kue sus',
			description: 'Ini adalah Kue sus.',
			image: 'https://img.kurio.network/oOO3Qd0BJX-ZeIC4mRlWyflRM-E=/320x320/filters:quality(80)/https://kurio-img.kurioapps.com/21/12/13/c53ce98b-3582-4fb9-88ed-77204f332289.jpe',
			price: 5000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKueSus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKueSus.id,
			foodRecipeId: foodRecipeSeedKueSus.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKueSus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKueThipan = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kue thipan',
		},
	});
	const foodSeedKueThipan = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kue thipan',
			description: 'Ini adalah Kue thipan.',
			image: 'https://asset.kompas.com/crops/fXb2bs6UVUJNODIGbh7aFfAzUE4=/41x33:950x639/750x500/data/photo/2021/03/05/6041b846aa175.jpg',
			price: 6000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKueThipan.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKueThipan.id,
			foodRecipeId: foodRecipeSeedKueThipan.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKueThipan.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedMartabakIndia = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Martabak india',
		},
	});
	const foodSeedMartabakIndia = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Martabak india',
			description: 'Ini adalah Martabak india.',
			image: 'https://assets-pergikuliner.com/Mta-46xzR0yJTQ2TFciBeycRsME=/fit-in/1366x768/smart/filters:no_upscale()/https://assets-pergikuliner.com/uploads/image/picture/1675341/picture-1573192664.jpg',
			price: 25000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedMartabakIndia.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedMartabakIndia.id,
			foodRecipeId: foodRecipeSeedMartabakIndia.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedMartabakIndia.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedMartabakMesir = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Martabak mesir',
		},
	});
	const foodSeedMartabakMesir = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Martabak mesir',
			description: 'Ini adalah Martabak mesir.',
			image: 'https://awsimages.detik.net.id/community/media/visual/2022/07/24/perbedaan-martabak-telur-dan-martabak-mesir-4.jpeg?w=1200',
			price: 30000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedMartabakMesir.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedMartabakMesir.id,
			foodRecipeId: foodRecipeSeedMartabakMesir.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedMartabakMesir.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedPutriSelat = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Putri selat',
		},
	});
	const foodSeedPutriSelat = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Putri selat',
			description: 'Ini adalah Putri selat.',
			image: 'https://img-global.cpcdn.com/recipes/de8f4d96b379da75/1200x630cq70/photo.jpg',
			price: 15000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedPutriSelat.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedPutriSelat.id,
			foodRecipeId: foodRecipeSeedPutriSelat.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedPutriSelat.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedPutuSopa = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Putu sopa',
		},
	});
	const foodSeedPutuSopa = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Putu sopa',
			description: 'Ini adalah Putu sopa.',
			image: 'https://www.tagar.id/Asset/uploads2019/1601422802750-putu-soppa.jpg',
			price: 12000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedPutuSopa.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedPutuSopa.id,
			foodRecipeId: foodRecipeSeedPutuSopa.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedPutuSopa.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedRenggiGoreng = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Renggi goreng',
		},
	});
	const foodSeedRenggiGoreng = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Renggi goreng',
			description: 'Ini adalah Renggi goreng.',
			image: 'https://cdn.idntimes.com/content-images/community/2020/11/melirik-usaha-kue-kering-rengginang-makin-renyah-pasarnya-535a7e298d34dbb6801aed4f4a39447b_600x400.jpg',
			price: 7000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedRenggiGoreng.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedRenggiGoreng.id,
			foodRecipeId: foodRecipeSeedRenggiGoreng.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedRenggiGoreng.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedRenggiGoreng.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedRotiBoong = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Roti boong',
		},
	});
	const foodSeedRotiBoong = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Roti boong',
			description: 'Ini adalah Roti boong.',
			image: 'https://assets.indozone.id/content/2021/10/19/1xs5Wq4/resep-kue-bohong-khas-medan-enaknya-asli-gak-bohongan88_700.jpg',
			price: 10000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedRotiBoong.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedRotiBoong.id,
			foodRecipeId: foodRecipeSeedRotiBoong.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedRotiBoong.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedRotiBoong.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedRotiWarnaSawoMatang = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Roti warna sawo matang',
		},
	});
	const foodSeedRotiWarnaSawoMatang = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Roti warna sawo matang',
			description: 'Ini adalah Roti warna sawo matang.',
			image: 'https://soc-phoenix.s3-ap-southeast-1.amazonaws.com/wp-content/uploads/2017/07/12194115/Roti-Putih-atau-Roti-Cokelat-2.jpg',
			price: 9000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedRotiWarnaSawoMatang.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedRotiWarnaSawoMatang.id,
			foodRecipeId: foodRecipeSeedRotiWarnaSawoMatang.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedRotiWarnaSawoMatang.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedRotiWarnaSawoMatang.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedSarimuka = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Sarimuka',
		},
	});
	const foodSeedSarimuka = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Sarimuka',
			description: 'Ini adalah Sarimuka.',
			image: 'https://img-global.cpcdn.com/recipes/d903354d32abc5c8/400x400cq70/photo.jpg',
			price: 8000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedSarimuka.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedSarimuka.id,
			foodRecipeId: foodRecipeSeedSarimuka.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedSarimuka.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedSarimuka.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedGetukPisang = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Getuk pisang',
			description:
				'Bahan-bahan: - 1 buah pisang matang - 50 gram tepung ketan - 25 gram gula pasir - 50 ml air - Kelapa parut secukupnya Langkah-langkah: 1. Kupas pisang dan haluskan dengan garpu atau blender hingga lembut. 2. Campurkan tepung ketan dan gula pasir dalam sebuah wadah. 3. Panaskan air dalam panci hingga mendidih. 4. Tuangkan air mendidih ke dalam campuran tepung ketan dan gula pasir. Aduk rata hingga adonan menjadi kalis dan tidak lengket. 5. Tambahkan pisang yang telah dihaluskan ke dalam adonan tepung ketan. Aduk hingga semua bahan tercampur merata. 6. Ambil sejumput adonan dan bulatkan menjadi bentuk getuk. 7. Gulingkan getuk dalam kelapa parut hingga seluruh permukaan tertutup rata. 8. Ulangi langkah 6 dan 7 untuk sisa adonan hingga habis. 9. Getuk pisang siap disajikan. Nikmati sebagai camilan atau hidangan penutup. Selamat menikmati Getuk Pisang!',
		},
	});
	const foodSeedGetukPisang = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Getuk pisang',
			description: 'Ini adalah Getuk pisang.',
			image: 'https://suarakonsumen.co/asset/foto_berita/IMG20201126084156.jpg',
			price: 12000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedGetukPisang.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedGetukPisang.id,
			foodRecipeId: foodRecipeSeedGetukPisang.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedGetukPisang.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedGetukPisang.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedTapaiBeras = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Tapai beras',
		},
	});
	const foodSeedTapaiBeras = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Tapai beras',
			description: 'Ini adalah Tapai beras.',
			image: 'https://img-global.cpcdn.com/recipes/a97ef509e54f9546/680x482cq70/tape-beras-khas-kandangan-kalimantan-selatan-foto-resep-utama.jpg',
			price: 15000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedTapaiBeras.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedTapaiBeras.id,
			foodRecipeId: foodRecipeSeedTapaiBeras.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedTapaiBeras.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedTapaiBeras.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedMisoa = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Misoa',
		},
	});
	const foodSeedMisoa = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Misoa',
			description: 'Ini adalah Misoa.',
			image: 'https://cdn.idntimes.com/content-images/community/2022/10/fromandroid-31608d4bfe31b1cb50e6309724e69c96.jpg',
			price: 12000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedMisoa.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedMisoa.id,
			foodRecipeId: foodRecipeSeedMisoa.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedMisoa.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedMisoa.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedRotiPutih = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Roti putih',
		},
	});
	const foodSeedRotiPutih = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Roti putih',
			description: 'Ini adalah Roti putih.',
			image: 'https://res.cloudinary.com/dk0z4ums3/image/upload/v1630305969/attached_image/ini-alasan-konsumsi-roti-tawar-putih-sebaiknya-dibatasi.jpg',
			price: 3000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedRotiPutih.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedRotiPutih.id,
			foodRecipeId: foodRecipeSeedRotiPutih.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedRotiPutih.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedRotiPutih.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedAmparanTatak = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Amparan tatak',
		},
	});
	const foodSeedAmparanTatak = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Amparan tatak',
			description: 'Ini adalah Amparan tatak.',
			image: 'https://img.kurio.network/3-fpUOTduqjwC5j2EN8ECvj8S3E=/320x320/filters:quality(80)/https://kurio-img.kurioapps.com/22/01/07/aa368de4-71aa-49da-8edb-6632ed1ce7d0.jpe',
			price: 8000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedAmparanTatak.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedAmparanTatak.id,
			foodRecipeId: foodRecipeSeedAmparanTatak.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedAmparanTatak.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedAmparanTatak.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedApangKukusKue = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Apang kukus, kue',
			description:
				'Bahan-bahan: - 75 gram tepung ketan putih - 25 gram tepung terigu - 40 gram gula pasir - 1/4 sendok teh ragi instan - 50 ml air hangat - 25 ml santan kental - 1/4 sendok teh vanila - Sejumput garam - Pewarna makanan (opsional) - Daun pisang untuk membungkus (opsional) Langkah-langkah: 1. Campurkan ragi instan dengan air hangat. Aduk rata dan biarkan selama beberapa menit hingga ragi aktif dan berbusa. 2. Dalam sebuah wadah, campurkan tepung ketan putih, tepung terigu, gula pasir, vanila, dan garam. Aduk rata. 3. Tambahkan campuran ragi dan santan kental ke dalam adonan tepung. Aduk rata hingga menjadi adonan yang lembut dan tidak bergerindil. 4. Jika ingin memberikan warna pada apang kukus, tambahkan beberapa tetes pewarna makanan sesuai selera. Aduk rata. 5. Siapkan loyang atau cetakan kukus yang telah dialasi dengan daun pisang (jika menggunakan). Tuangkan adonan ke dalam cetakan hingga setengah penuh. 6. Panaskan panci pengukus dengan air hingga mendidih. Letakkan cetakan dengan adonan apang kukus di atas panci. 7. Kukus apang selama sekitar 15-20 menit hingga matang dan teksturnya menjadi kenyal. 8. Setelah matang, angkat apang kukus dari panci dan biarkan sedikit dingin sebelum disajikan. 9. Apang kukus siap disantap sebagai camilan atau hidangan penutup. Selamat menikmati Apang Kukus dalam ukuran porsi yang Anda inginkan!',
		},
	});
	const foodSeedApangKukusKue = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Apang kukus, kue',
			description: 'Ini adalah Apang kukus, kue.',
			image: 'https://awsimages.detik.net.id/content/2011/06/10/1037/ApangCoeCVR.jpg',
			price: 5000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedApangKukusKue.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedApangKukusKue.id,
			foodRecipeId: foodRecipeSeedApangKukusKue.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedApangKukusKue.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedApangKukusKue.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedApemKue = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Apem, kue',
		},
	});
	const foodSeedApemKue = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Apem, kue',
			description: 'Ini adalah Apem, kue.',
			image: 'https://cdn1-production-images-kly.akamaized.net/o0YCeq51Qo7q2AdU7YIFML3-oSI=/733x0:3541x3745/469x625/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3003675/original/003404800_1577085953-shutterstock_599728544.jpg',
			price: 4000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedApemKue.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedApemKue.id,
			foodRecipeId: foodRecipeSeedApemKue.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedApemKue.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedApemKue.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedBiskuit = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Biskuit',
		},
	});
	const foodSeedBiskuit = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Biskuit',
			description: 'Ini adalah Biskuit.',
			image: 'https://asset.kompas.com/crops/YuxvVn7BcQ_u2xAGMR6iHVo4dIM=/0x0:360x240/750x500/data/photo/2020/07/09/5f0685eb683db.jpg',
			price: 4000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedBiskuit.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedBiskuit.id,
			foodRecipeId: foodRecipeSeedBiskuit.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedBiskuit.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedBiskuit.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedBakpiaKue = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Bakpia, kue',
		},
	});
	const foodSeedBakpiaKue = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Bakpia, kue',
			description: 'Ini adalah Bakpia, kue.',
			image: 'https://asset.kompas.com/crops/BZ6Z25Y0XcjtoHBInh10nGsMM2Q=/3x0:700x465/750x500/data/photo/2021/03/17/60514d8851d3e.jpeg',
			price: 10000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedBakpiaKue.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedBakpiaKue.id,
			foodRecipeId: foodRecipeSeedBakpiaKue.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedBakpiaKue.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedBakpiaKue.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedBakwan = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Bakwan',
		},
	});
	const foodSeedBakwan = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Bakwan',
			description: 'Ini adalah Bakwan.',
			image: 'https://cdn0-production-images-kly.akamaized.net/fAtwCwjlS_WHau99Y-nsx8tkkZI=/1x110:1000x673/1200x675/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3242626/original/060217000_1600489935-shutterstock_1674069004.jpg',
			price: 7000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedBakwan.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedBakwan.id,
			foodRecipeId: foodRecipeSeedBakwan.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedBakwan.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedBakwan.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedBikaAmbon = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Bika ambon',
			description:
				'Bahan-bahan: - 50 gram tepung terigu - 25 gram tepung tapioka - 50 gram gula pasir - 1/4 sendok teh ragi instan - 1 butir telur - 100 ml santan - 1/4 sendok teh pasta pandan (opsional) - Minyak untuk olesan Langkah-langkah: 1. Siapkan wadah dan campurkan tepung terigu, tepung tapioka, gula pasir, dan ragi instan. Aduk rata. 2. Tambahkan telur ke dalam campuran tepung dan gula. Aduk hingga tercampur rata. 3. Tuangkan santan sedikit demi sedikit sambil terus diaduk hingga adonan menjadi licin dan tidak bergerindil. 4. Jika menggunakan pasta pandan, tambahkan pasta pandan ke dalam adonan dan aduk rata. 5. Tutup adonan dengan serbet atau plastik wrap dan diamkan selama kurang lebih 1 jam hingga adonan mengembang. 6. Panaskan oven pada suhu 180 derajat Celsius. 7. Olesi loyang Bika Ambon dengan minyak secara merata. 8. Setelah adonan mengembang, aduk kembali adonan untuk menghilangkan gas yang terbentuk. 9. Tuang adonan ke dalam loyang yang telah diolesi minyak. 10. Panggang dalam oven yang telah dipanaskan selama 30-40 menit atau hingga bagian atas Bika Ambon berwarna keemasan dan matang. 11. Setelah matang, keluarkan Bika Ambon dari oven dan biarkan dingin sejenak. 12. Potong Bika Ambon menjadi beberapa bagian dan sajikan. Selamat menikmati Bika Ambon dalam ukuran porsi yang Anda inginkan! Catatan: Waktu dan suhu pemanggangan dapat bervariasi, jadi perhatikan kondisi Bika Ambon selama proses pemanggangan untuk mendapatkan hasil yang optimal.',
		},
	});
	const foodSeedBikaAmbon = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Bika ambon',
			description: 'Ini adalah Bika ambon.',
			image: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Kue_bika_ambon.JPG',
			price: 25000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedBikaAmbon.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedBikaAmbon.id,
			foodRecipeId: foodRecipeSeedBikaAmbon.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedBikaAmbon.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedBikaAmbon.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedBingka = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Bingka',
		},
	});
	const foodSeedBingka = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Bingka',
			description: 'Ini adalah Bingka.',
			image: 'https://img.kurio.network/T0boWklfUdhAu-mH6CusmZQlXiU=/1200x1200/filters:quality(80)/https://kurio-img.kurioapps.com/22/07/11/4dc12f7f-fb0b-47f5-8c2e-0762868a61b6.jpg',
			price: 12000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedBingka.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedBingka.id,
			foodRecipeId: foodRecipeSeedBingka.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedBingka.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedBingka.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedBobengka = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Bobengka',
		},
	});
	const foodSeedBobengka = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Bobengka',
			description: 'Ini adalah Bobengka.',
			image: 'https://img-global.cpcdn.com/recipes/b696770750f0d15f/680x482cq70/bobengka-manado-ala-sajian-sedap-foto-resep-utama.jpg',
			price: 9000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedBobengka.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedBobengka.id,
			foodRecipeId: foodRecipeSeedBobengka.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedBobengka.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedBobengka.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedBoluPeca = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Bolu peca',
		},
	});
	const foodSeedBoluPeca = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Bolu peca',
			description: 'Ini adalah Bolu peca.',
			image: 'https://img-global.cpcdn.com/recipes/8640e6ddadd4f19d/1200x630cq70/photo.jpg',
			price: 8000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedBoluPeca.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedBoluPeca.id,
			foodRecipeId: foodRecipeSeedBoluPeca.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedBoluPeca.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedBoluPeca.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedBrem = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Brem',
		},
	});
	const foodSeedBrem = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Brem',
			description: 'Ini adalah Brem.',
			image: 'https://jessicabakery.com/wp-content/uploads/2021/12/Resep-Brem-Kue-Kering-Khas-Madiun.jpg',
			price: 10000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedBrem.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedBrem.id,
			foodRecipeId: foodRecipeSeedBrem.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedBrem.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedBrem.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedBuburTinotuan = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Bubur tinotuan (Manado)',
			description:
				'Bahan-bahan: - 50 gram beras - 1 liter air - 50 gram jagung manis, pipil - 50 gram labu kuning, potong dadu kecil - 50 gram kangkung, petiki daunnya - 50 gram bayam, petiki daunnya - 50 gram daun singkong, petiki daunnya - 50 gram daun melinjo, petiki daunnya - 1 batang serai, memarkan - 2 lembar daun salam - 2 lembar daun jeruk - Garam secukupnya - Merica bubuk secukupnya - Bawang merah goreng, untuk taburan (opsional) - Kerupuk, untuk pelengkap (opsional) Langkah-langkah: 1. Cuci beras hingga bersih, kemudian rendam dalam air selama sekitar 30 menit. Tiriskan. 2. Rebus air dalam panci hingga mendidih. Masukkan beras yang telah direndam. Masak dengan api kecil sambil diaduk-aduk hingga beras menjadi bubur. 3. Tambahkan jagung manis, labu kuning, kangkung, bayam, daun singkong, dan daun melinjo ke dalam panci. Aduk rata. 4. Masukkan serai, daun salam, dan daun jeruk ke dalam panci. Lanjutkan memasak dengan api kecil hingga semua bahan matang dan kuah sedikit mengental. Aduk sesekali agar tidak lengket di bagian bawah panci. 5. Setelah bubur matang, tambahkan garam dan merica bubuk secukupnya. Aduk rata dan cicipi rasanya, sesuaikan jika diperlukan. 6. Angkat bubur tinotuan dari panci dan sajikan dalam mangkuk. 7. Taburi bubur tinotuan dengan bawang merah goreng sebagai taburan tambahan. Anda juga bisa menambahkan kerupuk sebagai pelengkap. 8. Bubur tinotuan siap disajikan dan nikmati selagi hangat. Selamat menikmati Bubur Tinotuan (Manado) dalam ukuran porsi yang Anda inginkan!',
		},
	});
	const foodSeedBuburTinotuan = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Bubur tinotuan (Manado)',
			description: 'Ini adalah Bubur tinotuan (Manado).',
			image: 'https://asset.kompas.com/crops/8IPl4RcIfLh3fkwXhKHPuPHqoz8=/81x22:892x563/750x500/data/photo/2020/05/13/5ebbdec618a37.jpg',
			price: 15000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedBuburTinotuan.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedBuburTinotuan.id,
			foodRecipeId: foodRecipeSeedBuburTinotuan.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedBuburTinotuan.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedCakeTape = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Cake tape',
		},
	});
	const foodSeedCakeTape = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Cake tape',
			description: 'Ini adalah Cake tape.',
			image: 'https://resepkoki.id/wp-content/uploads/2016/12/Resep-Bolu-Tape.jpg',
			price: 20000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedCakeTape.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedCakeTape.id,
			foodRecipeId: foodRecipeSeedCakeTape.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedCakeTape.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedCangkuning = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Cangkuning',
		},
	});
	const foodSeedCangkuning = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Cangkuning',
			description: 'Ini adalah Cangkuning.',
			image: 'https://i.ytimg.com/vi/xONH7Sk5Id8/maxresdefault.jpg',
			price: 5000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedCangkuning.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedCangkuning.id,
			foodRecipeId: foodRecipeSeedCangkuning.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedCangkuning.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKeleponKue = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kelepon, kue',
			description:
				'Bahan-bahan: - 50 gram tepung ketan - 25 ml air pandan (dari daun pandan yang diblender dan disaring) - Gula merah secukupnya (potong menjadi 1 cm x 1 cm) - Kelapa parut kasar secukupnya Langkah-langkah: 1. Campurkan tepung ketan dan air pandan dalam sebuah wadah. Aduk hingga terbentuk adonan yang lembut dan kalis. 2. Ambil sejumput adonan ketan, pipihkan dengan tangan, lalu letakkan sepotong gula merah di tengahnya. 3. Bentuk adonan menjadi bulat dan rapatkan agar gula merah tertutup sempurna. 4. Rebus air dalam panci hingga mendidih. 5. Setelah air mendidih, masukkan kelepon ke dalam air rebus. Biarkan hingga kelepon mengapung dan matang, sekitar 3-5 menit. 6. Angkat kelepon dengan menggunakan saringan atau sendok berlubang, lalu tiriskan. 7. Gulingkan kelepon dalam kelapa parut kasar hingga seluruh permukaan tertutup. 8. Kelepon siap disajikan. Nikmati sebagai camilan atau hidangan penutup. Selamat menikmati Kelepon dalam ukuran porsi yang Anda inginkan!',
		},
	});
	const foodSeedKeleponKue = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kelepon, kue',
			description: 'Ini adalah Kelepon, kue.',
			image: 'https://images.tokopedia.net/img/KRMmCm/2022/9/21/4a444fbd-fe4f-46d7-8822-3c4897ce7c44.jpg',
			price: 6000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKeleponKue.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKeleponKue.id,
			foodRecipeId: foodRecipeSeedKeleponKue.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKeleponKue.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKereput = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kereput',
		},
	});
	const foodSeedKereput = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kereput',
			description: 'Ini adalah Kereput.',
			image: 'https://img.ws.mms.shopee.co.id/f67c5ba2083943b455fac60ad79d3789',
			price: 8000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKereput.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKereput.id,
			foodRecipeId: foodRecipeSeedKereput.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKereput.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKeripikGadung = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Keripik gadung',
		},
	});
	const foodSeedKeripikGadung = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Keripik gadung',
			description: 'Ini adalah Keripik gadung.',
			image: 'https://img.ws.mms.shopee.co.id/f67c5ba2083943b455fac60ad79d3789',
			price: 10000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKeripikGadung.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKeripikGadung.id,
			foodRecipeId: foodRecipeSeedKeripikGadung.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKeripikGadung.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKeripikKentang = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Keripik kentang',
		},
	});
	const foodSeedKeripikKentang = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Keripik kentang',
			description: 'Ini adalah Keripik kentang.',
			image: 'https://asset.kompas.com/crops/8R6DJ3huHovC0eSjJKKFd3sMHnw=/32x12:1000x657/375x240/data/photo/2022/05/25/628d7e2eb24a9.jpg',
			price: 15000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKeripikKentang.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKeripikKentang.id,
			foodRecipeId: foodRecipeSeedKeripikKentang.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKeripikKentang.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKeripikSingkong = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Keripik singkong',
		},
	});
	const foodSeedKeripikSingkong = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Keripik singkong',
			description: 'Ini adalah Keripik singkong.',
			image: 'https://img-global.cpcdn.com/recipes/236b8efeb18d8d4c/1200x630cq70/photo.jpg',
			price: 12000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKeripikSingkong.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKeripikSingkong.id,
			foodRecipeId: foodRecipeSeedKeripikSingkong.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKeripikSingkong.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKeripikSingkongBerbumbu =		await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Keripik singkong berbumbu',
		},
	});
	const foodSeedKeripikSingkongBerbumbu = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Keripik singkong berbumbu',
			description: 'Ini adalah Keripik singkong berbumbu.',
			image: 'https://img-global.cpcdn.com/recipes/633f1c8d57de294b/1200x630cq70/photo.jpg',
			price: 15000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKeripikSingkongBerbumbu.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKeripikSingkongBerbumbu.id,
			foodRecipeId: foodRecipeSeedKeripikSingkongBerbumbu.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKeripikSingkongBerbumbu.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKeripikUbi = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Keripik ubi',
		},
	});
	const foodSeedKeripikUbi = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Keripik ubi',
			description: 'Ini adalah Keripik ubi.',
			image: 'https://kurio-img.kurioapps.com/21/09/02/38b4842e-bbd0-4c81-9ac4-2f41364dfbfc.jpe',
			price: 13000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKeripikUbi.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKeripikUbi.id,
			foodRecipeId: foodRecipeSeedKeripikUbi.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKeripikUbi.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKerupukCumiGoreng = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kerupuk cumi goreng',
		},
	});
	const foodSeedKerupukCumiGoreng = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kerupuk cumi goreng',
			description: 'Ini adalah Keripik cumi goreng.',
			image: 'https://www.agrowindo.com/wp-content/uploads/2017/07/peluang-usaha-kerupuk-cumi.jpg',
			price: 18000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKerupukCumiGoreng.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKerupukCumiGoreng.id,
			foodRecipeId: foodRecipeSeedKerupukCumiGoreng.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKerupukCumiGoreng.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKerupukKemplang = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kerupuk kemplang (ikan) mentah',
		},
	});
	const foodSeedKerupukKemplang = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kerupuk kemplang (ikan) mentah',
			description: 'Ini adalah Kerupuk kemplang (ikan) mentah.',
			image: 'https://images.tokopedia.net/img/cache/500-square/product-1/2020/5/11/732896908/732896908_17c76e35-3d0b-46df-bb52-5fe6a8a9c7f4_1560_1560.jpg',
			price: 16000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKerupukKemplang.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKerupukKemplang.id,
			foodRecipeId: foodRecipeSeedKerupukKemplang.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKerupukKemplang.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKerupukKemplangGoreng = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kerupuk kemplang goreng',
		},
	});
	const foodSeedKerupukKemplangGoreng = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kerupuk kemplang goreng',
			description: 'Ini adalah Kerupuk kemplang goreng.',
			image: 'https://asset.kompas.com/crops/Qu-uGRiw6A4NINs_6VhIZBrvp1I=/0x386:667x831/750x500/data/photo/2021/05/12/609b4a1d9af08.jpg',
			price: 18000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKerupukKemplangGoreng.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKerupukKemplangGoreng.id,
			foodRecipeId: foodRecipeSeedKerupukKemplangGoreng.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKerupukKemplangGoreng.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKerupukKemplangPanggang =		await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kerupuk kemplang panggang',
			description:
					'Bahan-bahan: - 50 gram tepung tapioka - 25 ml air - 1/4 sendok teh garam - 1/4 sendok teh penyedap rasa (opsional) - Minyak untuk olesan Langkah-langkah: 1. Campurkan tepung tapioka, air, garam, dan penyedap rasa (jika digunakan) dalam sebuah wadah. Aduk rata hingga terbentuk adonan yang kalis dan tidak lengket. 2. Panaskan wajan anti lengket dengan api sedang. 3. Ambil sejumput adonan dan pipihkan dengan tangan atau alat khusus kemplang. Berikan sedikit minyak pada permukaan adonan agar tidak lengket. 4. Letakkan adonan pipih di atas wajan yang telah dipanaskan. Panggang dengan api sedang hingga kerupuk kemplang berwarna kuning kecoklatan dan mengembang. 5. Balikkan kerupuk kemplang dan panggang sisi lainnya hingga matang sempurna. 6. Angkat kerupuk kemplang dari wajan dan biarkan dingin sejenak. 7. Kerupuk kemplang panggang siap disajikan. Nikmati sebagai camilan atau pendamping hidangan lainnya. Selamat menikmati Kerupuk Kemplang Panggang dalam ukuran porsi yang Anda inginkan!',
		},
	});
	const foodSeedKerupukKemplangPanggang = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kerupuk kemplang panggang',
			description: 'Ini adalah Kerupuk kemplang panggang.',
			image: 'https://asset.kompas.com/crops/Qu-uGRiw6A4NINs_6VhIZBrvp1I=/0x386:667x831/750x500/data/photo/2021/05/12/609b4a1d9af08.jpg',
			price: 20000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKerupukKemplangPanggang.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKerupukKemplangPanggang.id,
			foodRecipeId: foodRecipeSeedKerupukKemplangPanggang.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKerupukKemplangPanggang.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKerupukMieKuningGoreng = await prisma.foodRecipe.create(
		{
			data: {
				uuid: uuidv4(),
				name: 'Kerupuk mie kuning goreng',
			},
		},
	);
	const foodSeedKerupukMieKuningGoreng = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kerupuk mie kuning goreng',
			description: 'Ini adalah Kerupuk mie kuning goreng.',
			image: 'https://img-global.cpcdn.com/recipes/5fb34af30ac89440/680x482cq70/menggoreng-kerupuk-mie-kuning-foto-resep-utama.jpg',
			price: 10000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKerupukMieKuningGoreng.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKerupukMieKuningGoreng.id,
			foodRecipeId: foodRecipeSeedKerupukMieKuningGoreng.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKerupukMieKuningGoreng.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKerupukUdangGoreng = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kerupuk udang goreng',
		},
	});
	const foodSeedKerupukUdangGoreng = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kerupuk udang goreng',
			description: 'Ini adalah Kerupuk udang goreng.',
			image: 'https://asset.kompas.com/crops/Vol7WU4iu3WSWKNB3nhw8RFCJdE=/0x9:1000x675/750x500/data/photo/2021/07/27/60ff6fb81ffaf.jpg',
			price: 12000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKerupukUdangGoreng.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKerupukUdangGoreng.id,
			foodRecipeId: foodRecipeSeedKerupukUdangGoreng.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKerupukUdangGoreng.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKueBangket = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kue bangket',
		},
	});
	const foodSeedKueBangket = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kue bangket',
			description: 'Ini adalah Kue bangket.',
			image: 'https://o-cdn-cas.sirclocdn.com/parenting/original_images/Resep_Kue_Bangket_Jahe.png',
			price: 8000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKueBangket.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKueBangket.id,
			foodRecipeId: foodRecipeSeedKueBangket.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKueBangket.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedPutuSingkong = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kue putu singkong',
		},
	});
	const foodSeedPutuSingkong = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kue putu singkong',
			description: 'Ini adalah Kue putu singkong.',
			image: 'https://asset.kompas.com/crops/xu0NV5H6dOJ7OA6rL67FZruW54U=/0x0:1000x667/780x390/data/photo/2021/06/10/60c19ee3dbc24.jpg',
			price: 9000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedPutuSingkong.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedPutuSingkong.id,
			foodRecipeId: foodRecipeSeedPutuSingkong.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedPutuSingkong.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKacangBogorRebus = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kacang bogor, rebus',
			description:
				'Bahan-bahan: - 100 gram kacang bogor kering - Air secukupnya untuk merebus - 1/2 sendok teh garam - 1/4 sendok teh merica bubuk (opsional) - Daun jeruk secukupnya (opsional) - Air es untuk penyajian (opsional) Langkah-langkah: 1. Rendam kacang bogor dalam air selama minimal 4 jam atau semalaman agar kacang menjadi lebih lunak saat direbus. Jika terlalu keras, rendam lebih lama. 2. Setelah direndam, tiriskan kacang bogor dan cuci bersih dengan air mengalir. 3. Masukkan kacang bogor ke dalam panci dan tambahkan air secukupnya untuk merebus. Pastikan air cukup menutupi kacang. 4. Panaskan panci dengan api sedang dan biarkan kacang bogor mendidih. Setelah mendidih, kecilkan api dan biarkan kacang bogor merebus selama sekitar 30-40 menit atau hingga kacang bogor menjadi lembut. Arahkan sesekali dan tambahkan air jika diperlukan. 5. Setelah kacang bogor matang dan lembut, tambahkan garam, merica bubuk, dan daun jeruk (jika menggunakan) ke dalam panci. Aduk rata dan biarkan merebus selama beberapa menit lagi agar bumbu meresap. 6. Angkat kacang bogor dari panci dan tiriskan. 7. Untuk penyajian, Anda dapat menyajikan kacang bogor rebus dalam keadaan hangat atau dingin. Jika ingin menyajikannya dingin, rendam kacang bogor dalam air es selama beberapa menit sebelum disajikan. 8. Kacang Bogor rebus siap disajikan sebagai camilan atau tambahan dalam hidangan lain, seperti gado-gado atau pecel. Selamat menikmati Kacang Bogor rebus dalam ukuran porsi yang Anda inginkan!',
		},
	});
	const foodSeedKacangBogorRebus = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kacang bogor, rebus',
			description: 'Ini adalah Kacang bogor, rebus.',
			image: 'https://img-global.cpcdn.com/recipes/3e2a0f784cdea6c1/680x482cq70/kacang-bogor-rebus-foto-resep-utama.jpg',
			price: 5000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKacangBogorRebus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKacangBogorRebus.id,
			foodRecipeId: foodRecipeSeedKacangBogorRebus.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKacangBogorRebus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKacangGude = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kacang gude, rebus',
		},
	});
	const foodSeedKacangGude = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kacang gude, rebus',
			description: 'Ini adalah Kacang gude, rebus.',
			image: 'https://m.andrafarm.com/_andra_farm/gambar_kelompok/a127.jpg',
			price: 6000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKacangGude.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKacangGude.id,
			foodRecipeId: foodRecipeSeedKacangGude.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKacangGude.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKacangHijauRebus = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kacang hijau, rebus',
		},
	});
	const foodSeedKacangHijauRebus = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kacang hijau, rebus',
			description: 'Ini adalah Kacang hijau, rebus.',
			image: 'https://img-global.cpcdn.com/recipes/ce1593f8adfb5530/1200x630cq70/photo.jpg',
			price: 4000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKacangHijauRebus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKacangHijauRebus.id,
			foodRecipeId: foodRecipeSeedKacangHijauRebus.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKacangHijauRebus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKacangKedelaiGoreng = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kacang kedelai, goreng',
		},
	});
	const foodSeedKacangKedelaiGoreng = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kacang kedelai, goreng',
			description: 'Ini adalah Kacang kedelai, goreng.',
			image: 'https://img-global.cpcdn.com/recipes/e4e2747431572f24/680x482cq70/kacang-kedelai-goreng-foto-resep-utama.jpg',
			price: 7000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKacangKedelaiGoreng.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKacangKedelaiGoreng.id,
			foodRecipeId: foodRecipeSeedKacangKedelaiGoreng.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKacangKedelaiGoreng.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKacangKedelaiRebus = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kacang kedelai, rebus',
		},
	});
	const foodSeedKacangKedelaiRebus = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kacang kedelai, rebus',
			description: 'Ini adalah Kacang kedelai, rebus.',
			image: 'https://img-global.cpcdn.com/recipes/16506aa7fea39497/1200x630cq70/photo.jpg',
			price: 5000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKacangKedelaiRebus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKacangKedelaiRebus.id,
			foodRecipeId: foodRecipeSeedKacangKedelaiRebus.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKacangKedelaiRebus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKacangMerahKering = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kacang merah kering, rebus',
			description:
				'Bahan-bahan: - 100 gram kacang merah kering - Air secukupnya untuk merendam dan merebus - 1/2 sendok teh garam (opsional) Langkah-langkah: 1. Rendam kacang merah kering dalam air selama minimal 8 jam atau semalam agar menjadi lunak dan mudah direbus. Pastikan airnya cukup untuk merendam kacang. 2. Setelah kacang merah direndam, tiriskan air rendamannya. 3. Masukkan kacang merah ke dalam panci dan tambahkan air secukupnya untuk merebus. Pastikan airnya cukup menutupi kacang. 4. Letakkan panci di atas kompor dengan api sedang hingga air mendidih. 5. Setelah air mendidih, kecilkan api menjadi kecil hingga masak perlahan. Tutup panci dengan tutup panci yang longgar untuk mempercepat proses pemasakan. 6. Rebus kacang merah selama 1-1,5 jam atau hingga kacang merah menjadi lunak dan empuk. Periode pemasakan dapat bervariasi tergantung pada jenis kacang merah yang digunakan. 7. Setelah kacang merah matang, tambahkan garam ke dalam panci dan aduk rata (opsional). 8. Angkat kacang merah dari panci dan tiriskan airnya. 9. Kacang merah rebus siap disajikan sebagai bahan tambahan dalam hidangan lainnya atau sebagai hidangan utama. Selamat menikmati Kacang Merah Rebus dalam ukuran porsi yang Anda inginkan!',
		},
	});
	const foodSeedKacangMerahKering = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kacang merah kering, rebus',
			description: 'Ini adalah Kacang merah kering, rebus.',
			image: 'https://asset.kompas.com/crops/fA-swbO75hof2SfnmEsSTtWbuDc=/6x64:806x597/780x390/data/photo/2022/02/16/620c996b3cb39.jpg',
			price: 6000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKacangMerahKering.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKacangMerahKering.id,
			foodRecipeId: foodRecipeSeedKacangMerahKering.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKacangMerahKering.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKacangMerahSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kacang merah segar, rebus',
		},
	});
	const foodSeedKacangMerahSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kacang merah segar, rebus',
			description: 'Ini adalah Kacang merah segar, rebus.',
			image: 'https://asset-a.grid.id/crop/0x0:0x0/360x240/photo/2021/09/02/2082228738jpg-20210428015013jpg-20210902093225.jpg',
			price: 5000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKacangMerahSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKacangMerahSegar.id,
			foodRecipeId: foodRecipeSeedKacangMerahSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKacangMerahSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKacangMeteJambu = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kacang mete/biji jambu monyet, goreng',
		},
	});
	const foodSeedKacangMeteJambu = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kacang mete/biji jambu monyet, goreng',
			description: 'Ini adalah Kacang mete/biji jambu monyet, goreng.',
			image: 'https://img-global.cpcdn.com/recipes/4f25cc206ec3ac25/680x482cq70/kacang-metemede-goreng-dengan-tips-foto-resep-utama.jpg',
			price: 12000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKacangMeteJambu.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKacangMeteJambu.id,
			foodRecipeId: foodRecipeSeedKacangMeteJambu.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKacangMeteJambu.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKacangTanahRebusKulit = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kacang tanah rebus dg kulit',
		},
	});
	const foodSeedKacangTanahRebusKulit = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kacang tanah rebus dg kulit',
			description: 'Ini adalah Kacang tanah rebus dg kulit.',
			image: 'https://img-global.cpcdn.com/recipes/7ceb3859fe3a57b3/400x400cq70/photo.jpg',
			price: 3000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKacangTanahRebusKulit.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKacangTanahRebusKulit.id,
			foodRecipeId: foodRecipeSeedKacangTanahRebusKulit.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKacangTanahRebusKulit.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKacangTanahGoreng = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kacang tanah, goreng',
		},
	});
	const foodSeedKacangTanahGoreng = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kacang tanah, goreng',
			description: 'Ini adalah Kacang tanah, goreng.',
			image: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2021/6/16/b69972aa-7b2f-4762-8cbb-eb15ff50e7ee.jpg',
			price: 5000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKacangTanahGoreng.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKacangTanahGoreng.id,
			foodRecipeId: foodRecipeSeedKacangTanahGoreng.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKacangTanahGoreng.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKacangTanahRebus = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kacang tanah, rebus',
			description:
				'Bahan-bahan: - 100 gram kacang tanah mentah dengan kulit - Air secukupnya untuk merebus - 1/2 sendok teh garam - Daun salam secukupnya (opsional) Langkah-langkah: 1. Rendam kacang tanah dalam air selama minimal 4 jam atau semalaman agar kulitnya lebih mudah dikupas setelah direbus. Jika tidak ingin mengupas kulitnya, Anda dapat menggunakan kacang tanah dengan kulit langsung. 2. Setelah direndam, tiriskan kacang tanah dan cuci bersih dengan air mengalir. 3. Masukkan kacang tanah ke dalam panci dan tambahkan air secukupnya untuk merebus. Pastikan air cukup menutupi kacang. 4. Panaskan panci dengan api sedang dan biarkan kacang tanah mendidih. Setelah mendidih, kecilkan api dan biarkan kacang tanah merebus selama sekitar 30-40 menit atau hingga kacang tanah menjadi lunak. Arahkan sesekali dan tambahkan air jika diperlukan. 5. Setelah kacang tanah matang, tambahkan garam dan daun salam (jika menggunakan) ke dalam panci. Aduk rata dan biarkan merebus selama beberapa menit lagi agar bumbu meresap. 6. Angkat kacang tanah dari panci dan tiriskan. 7. Kacang Tanah Rebus siap disajikan sebagai camilan atau tambahan dalam hidangan lain, seperti pecel atau gado-gado. Selamat menikmati Kacang Tanah Rebus dalam ukuran porsi yang Anda inginkan!',
		},
	});
	const foodSeedKacangTanahRebus = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kacang tanah, rebus',
			description: 'Ini adalah Kacang tanah, rebus.',
			image: 'https://img-global.cpcdn.com/recipes/7ceb3859fe3a57b3/400x400cq70/photo.jpg',
			price: 4000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKacangTanahRebus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKacangTanahRebus.id,
			foodRecipeId: foodRecipeSeedKacangTanahRebus.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKacangTanahRebus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKacangToloTunggak = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kacang tolo / tunggak, rebus',
		},
	});
	const foodSeedKacangToloTunggak = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kacang tolo / tunggak, rebus',
			description: 'Ini adalah Kacang tolo / tunggak, rebus.',
			image: 'https://img-global.cpcdn.com/recipes/e486ea31cffe0892/680x482cq70/kacang-tolo-kacang-tunggak-rebus-5307-foto-resep-utama.jpg',
			price: 6000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKacangToloTunggak.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKacangToloTunggak.id,
			foodRecipeId: foodRecipeSeedKacangToloTunggak.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKacangToloTunggak.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedEmpingKerupukMelinjo = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Emping (kerupuk melinjo)',
		},
	});
	const foodSeedEmpingKerupukMelinjo = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Emping (kerupuk melinjo)',
			description: 'Ini adalah Emping (kerupuk melinjo).',
			image: 'https://assets.indozone.id/content/2021/10/31/qEsgvo3/gampang-ini-cara-membuat-emping-melinjo-yang-gurih-dan-renyah30_700.jpg',
			price: 10000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedEmpingKerupukMelinjo.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedEmpingKerupukMelinjo.id,
			foodRecipeId: foodRecipeSeedEmpingKerupukMelinjo.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedEmpingKerupukMelinjo.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedTahuGoreng = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Tahu goreng',
		},
	});
	const foodSeedTahuGoreng = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Tahu goreng',
			description: 'Ini adalah Tahu goreng.',
			image: 'https://cdn.yummy.co.id/content-images/images/20221230/n8yT9kDhMU5FbWDRL36WlELdLsYMFymn-31363732333836373933d41d8cd98f00b204e9800998ecf8427e.jpg?x-oss-process=image/format,webp',
			price: 5000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedTahuGoreng.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedTahuGoreng.id,
			foodRecipeId: foodRecipeSeedTahuGoreng.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedTahuGoreng.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedBayamRebus = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Bayam, rebus',
		},
	});
	const foodSeedBayamRebus = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Bayam, rebus',
			description: 'Ini adalah Bayam, rebus.',
			image: 'https://img-global.cpcdn.com/recipes/48c22a75184ac503/680x482cq70/bayam-rebus-minyak-wijen-foto-resep-utama.jpg',
			price: 3000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedBayamRebus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedBayamRebus.id,
			foodRecipeId: foodRecipeSeedBayamRebus.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedBayamRebus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedBuncisRebus = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Buncis, rebus',
			description:
				'Bahan-bahan: - 100 gram buncis segar - Air secukupnya untuk merebus - 1/2 sendok teh garam (opsional) Langkah-langkah: 1. Bersihkan buncis dengan mencuci mereka di bawah air mengalir. Potong ujung buncis yang keras dan buang bagian yang tidak diinginkan. 2. Siapkan panci dan tambahkan air secukupnya untuk merebus buncis. Pastikan airnya cukup untuk menutupi buncis. 3. Letakkan panci di atas kompor dengan api sedang hingga air mendidih. 4. Setelah air mendidih, masukkan buncis ke dalam panci. 5. Rebus buncis selama sekitar 5-7 menit atau hingga buncis menjadi lembut namun tetap renyah. Jangan direbus terlalu lama agar buncis tidak terlalu lembek. 6. Setelah matang, tambahkan garam ke dalam panci dan aduk rata (opsional). 7. Angkat buncis dari panci dan tiriskan airnya. 8. Buncis rebus siap disajikan sebagai hidangan pendamping atau sebagai bahan dalam hidangan lainnya. Selamat menikmati Buncis Rebus dalam ukuran porsi yang Anda inginkan!',
		},
	});
	const foodSeedBuncisRebus = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Buncis, rebus',
			description: 'Ini adalah Buncis, rebus.',
			image: 'https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/2021/08/31/manfaat-buncis-rebussjpg-20210831114212.jpg',
			price: 4000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedBuncisRebus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedBuncisRebus.id,
			foodRecipeId: foodRecipeSeedBuncisRebus.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedBuncisRebus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedDaunKacangPanjang = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Daun kacang panjang, kukus',
			description:
				'Bahan-bahan: - 100 gram daun kacang panjang segar - Air secukupnya untuk merebus Langkah-langkah: 1. Bersihkan daun kacang panjang dengan mencucinya di bawah air mengalir. Potong ujung daun yang keras dan buang bagian yang tidak diinginkan. 2. Siapkan panci kukus dan tambahkan air secukupnya ke dalamnya. 3. Panaskan air dalam panci kukus hingga mendidih. 4. Letakkan daun kacang panjang dalam wadah kukusan atau dalam keranjang kukusan. 5. Letakkan wadah kukusan di atas panci kukus yang sudah mendidih. 6. Tutup panci kukus dengan rapat dan biarkan daun kacang panjang dikukus selama sekitar 5-10 menit atau hingga daun kacang panjang menjadi lembut. 7. Setelah matang, angkat daun kacang panjang dari kukusan. 8. Daun kacang panjang kukus siap disajikan sebagai hidangan pendamping atau digunakan dalam hidangan lainnya. Selamat menikmati Daun Kacang Panjang Kukus dalam ukuran porsi yang Anda inginkan!',
		},
	});
	const foodSeedDaunKacangPanjang = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Daun kacang panjang, kukus',
			description: 'Ini adalah Daun kacang panjang, kukus.',
			image: 'https://img-global.cpcdn.com/recipes/e292903f72bdfe4d/680x482cq70/bening-daun-kacang-foto-resep-utama.jpg',
			price: 6000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedDaunKacangPanjang.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedDaunKacangPanjang.id,
			foodRecipeId: foodRecipeSeedDaunKacangPanjang.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedDaunKacangPanjang.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedDaunKatukRebus = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Daun katuk, rebus',
			description:
				'Bahan-bahan: - 1 genggam daun katuk segar - Air secukupnya - Garam secukupnya (opsional) Langkah-langkah: 1. Bersihkan daun katuk dengan mencucinya di bawah air mengalir. 2. Siapkan panci dengan air yang cukup untuk merebus daun katuk. 3. Panaskan air dalam panci hingga mendidih. 4. Masukkan daun katuk ke dalam air mendidih. 5. Rebus daun katuk selama sekitar 3-5 menit, atau sampai daun katuk layu dan sedikit lembut. 6. Setelah daun katuk direbus, tiriskan dari air. 7. Jika diinginkan, taburi garam secukupnya pada daun katuk yang telah direbus. 8. Daun katuk yang telah direbus siap disajikan sebagai sayuran pelengkap atau digunakan dalam hidangan lain sesuai keinginan. Selamat menikmati daun katuk rebus!',
		},
	});
	const foodSeedDaunKatukRebus = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Daun katuk, rebus',
			description: 'Ini adalah Daun katuk, rebus.',
			image: 'https://img-global.cpcdn.com/recipes/95359e13fd948795/680x482cq70/daun-katuk-bening-menu-sehat-foto-resep-utama.jpg',
			price: 5000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedDaunKatukRebus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedDaunKatukRebus.id,
			foodRecipeId: foodRecipeSeedDaunKatukRebus.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedDaunKatukRebus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedDaunKelorRebus = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Daun kelor, rebus',
			description:
				'Bahan-bahan: - 1 genggam daun kelor segar - Air secukupnya - Garam secukupnya (opsional) Langkah-langkah: 1. Bersihkan daun kelor dengan mencuci mereka di bawah air mengalir. 2. Siapkan panci dengan air yang cukup untuk merebus daun kelor. 3. Panaskan air dalam panci hingga mendidih. 4. Masukkan daun kelor ke dalam air mendidih. 5. Rebus daun kelor selama sekitar 3-5 menit, atau sampai daun kelor layu dan sedikit lembut. 6. Setelah daun kelor direbus, tiriskan dari air. 7. Jika diinginkan, taburi garam secukupnya pada daun kelor yang telah direbus. 8. Daun kelor yang telah direbus siap disajikan sebagai sayuran pelengkap atau digunakan dalam hidangan lain sesuai keinginan. Selamat menikmati daun kelor rebus!',
		},
	});
	const foodSeedDaunKelorRebus = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Daun kelor, rebus',
			description: 'Ini adalah Daun kelor, rebus.',
			image: 'https://img-global.cpcdn.com/recipes/ed600b784cb28839/680x482cq70/daun-kelor-rebus-foto-resep-utama.jpg',
			price: 4000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedDaunKelorRebus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedDaunKelorRebus.id,
			foodRecipeId: foodRecipeSeedDaunKelorRebus.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedDaunKelorRebus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedDaunMengkuduKukus = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Daun mengkudu, kukus',
		},
	});
	const foodSeedDaunMengkuduKukus = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Daun mengkudu, kukus',
			description: 'Ini adalah Daun mengkudu, kukus.',
			image: 'https://img-global.cpcdn.com/recipes/49833231f339c1b4/680x482cq70/pilas-pindang-daun-mengkudu-foto-resep-utama.jpg',
			price: 6000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedDaunMengkuduKukus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedDaunMengkuduKukus.id,
			foodRecipeId: foodRecipeSeedDaunMengkuduKukus.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedDaunMengkuduKukus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedDaunSingkongRebus = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Daun singkong, rebus',
		},
	});
	const foodSeedDaunSingkongRebus = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Daun singkong, rebus',
			description: 'Ini adalah Daun singkong, rebus.',
			image: 'https://asset.kompas.com/crops/siQ7ZepxQQUkCIuAlcOvlgclmNM=/0x35:1024x718/750x500/data/photo/2022/02/13/6208f0bb3eb63.jpg',
			price: 3000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedDaunSingkongRebus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedDaunSingkongRebus.id,
			foodRecipeId: foodRecipeSeedDaunSingkongRebus.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedDaunSingkongRebus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedDaunTalasRebus = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Daun talas, rebus',
		},
	});
	const foodSeedDaunTalasRebus = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Daun talas, rebus',
			description: 'Ini adalah Daun talas, rebus.',
			image: 'https://cdn-2.tstatic.net/belitung/foto/bank/images/buntil-daun-talas.jpg',
			price: 3000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedDaunTalasRebus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedDaunTalasRebus.id,
			foodRecipeId: foodRecipeSeedDaunTalasRebus.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedDaunTalasRebus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedDaunUbiMerah = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Daun ubi merah, kukus',
		},
	});
	const foodSeedDaunUbiMerah = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Daun ubi merah, kukus',
			description: 'Ini adalah Daun ubi merah, kukus.',
			image: 'https://img-global.cpcdn.com/recipes/5b7c6c2313a52ba2/680x482cq70/gulai-daun-singkong-foto-resep-utama.jpg',
			price: 5000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedDaunUbiMerah.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedDaunUbiMerah.id,
			foodRecipeId: foodRecipeSeedDaunUbiMerah.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedDaunUbiMerah.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKacangPanjangKukus = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kacang panjang, kukus',
		},
	});
	const foodSeedKacangPanjangKukus = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kacang panjang, kukus',
			description: 'Ini adalah Kacang panjang, kukus.',
			image: 'https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/2021/08/20/kacang-panjangjpg-20210820065144.jpg',
			price: 7000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKacangPanjangKukus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKacangPanjangKukus.id,
			foodRecipeId: foodRecipeSeedKacangPanjangKukus.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKacangPanjangKukus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKacangPanjangRebus = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kacang panjang, rebus',
		},
	});
	const foodSeedKacangPanjangRebus = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kacang panjang, rebus',
			description: 'Ini adalah Kacang panjang, rebus.',
			image: 'https://asset-a.grid.id/crop/0x0:0x0/x/photo/2021/11/19/603b44e137d47jpg-20211119110638.jpg',
			price: 6000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKacangPanjangRebus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKacangPanjangRebus.id,
			foodRecipeId: foodRecipeSeedKacangPanjangRebus.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKacangPanjangRebus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKacangKukus = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kangkung, kukus',
		},
	});
	const foodSeedKacangKukus = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kangkung, kukus',
			description: 'Ini adalah Kangkung, kukus.',
			image: 'https://4.bp.blogspot.com/-RMbMCWFD_ZU/UMNJSUXxeWI/AAAAAAAACVk/rxXf3taeKEg/s1600/rujak+kangkung+8.jpg',
			price: 4000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKacangKukus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKacangKukus.id,
			foodRecipeId: foodRecipeSeedKacangKukus.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKacangKukus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedKacangRebus = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Kangkung, rebus',
		},
	});
	const foodSeedKacangRebus = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Kangkung, rebus',
			description: 'Ini adalah Kangkung, rebus.',
			image: 'https://asset-a.grid.id/crop/0x0:0x0/360x240/photo/2021/09/26/air-rebusan-kangkungjpg-20210926111727.jpg',
			price: 3000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedKacangRebus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedKacangRebus.id,
			foodRecipeId: foodRecipeSeedKacangRebus.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedKacangRebus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedPariaPutihKukus = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Paria putih, kukus',
		},
	});
	const foodSeedPariaPutihKukus = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Paria putih, kukus',
			description: 'Ini adalah Paria putih, kukus.',
			image: 'https://img-global.cpcdn.com/recipes/35ddee8875d754d6/1200x630cq70/photo.jpg',
			price: 8000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedPariaPutihKukus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedPariaPutihKukus.id,
			foodRecipeId: foodRecipeSeedPariaPutihKukus.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedPariaPutihKukus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedSeladaRebus = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Selada, rebus',
		},
	});
	const foodSeedSeladaRebus = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Selada, rebus',
			description: 'Ini adalah Selada, rebus.',
			image: 'https://asset-a.grid.id/crop/0x0:0x0/360x240/photo/2022/06/07/lettuce-in-water-1024x684jpg-20220607081345.jpg',
			price: 5000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedSeladaRebus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedSeladaRebus.id,
			foodRecipeId: foodRecipeSeedSeladaRebus.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedSeladaRebus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedTaogeGoreng = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Taoge, goreng',
		},
	});
	const foodSeedTaogeGoreng = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Taoge, goreng',
			description: 'Ini adalah Taoge, goreng.',
			image: 'https://img.kurio.network/bmizo0RfhrurmaxfSXqouGMMD2s=/1200x900/filters:quality(80)/https://kurio-img.kurioapps.com/21/03/26/55ee220c-cf46-492e-8d45-58bc5fd972b2.jpe',
			price: 6000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedTaogeGoreng.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedTaogeGoreng.id,
			foodRecipeId: foodRecipeSeedTaogeGoreng.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedTaogeGoreng.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedTaogeSeduh = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Taoge, seduh',
		},
	});
	const foodSeedTaogeSeduh = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Taoge, seduh',
			description: 'Ini adalah Taoge, seduh.',
			image: 'https://cdn0-production-images-kly.akamaized.net/-77hgKOWZanv0lvl_cqqeAG1VZo=/303x0:1636x1333/1200x1200/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3330261/original/062050000_1608607406-tumisan.jpg',
			price: 4000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedTaogeSeduh.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedTaogeSeduh.id,
			foodRecipeId: foodRecipeSeedTaogeSeduh.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedTaogeSeduh.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedTerungPanjangKukus = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Terung panjang, kukus',
		},
	});
	const foodSeedTerungPanjangKukus = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Terung panjang, kukus',
			description: 'Ini adalah Terung panjang, kukus.',
			image: 'https://cdns.klimg.com/merdeka.com/i/w/news/2021/06/10/1316801/670x335/6-khasiat-terong-ungu-untuk-kesehatan-wanita-kaya-antioksidan.jpg',
			price: 7000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedTerungPanjangKukus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedTerungPanjangKukus.id,
			foodRecipeId: foodRecipeSeedTerungPanjangKukus.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedTerungPanjangKukus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedWortelRebus = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Wortel, rebus',
		},
	});
	const foodSeedWortelRebus = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Wortel, rebus',
			description: 'Ini adalah Wortel, rebus.',
			image: 'https://asset-a.grid.id/crop/0x222:594x690/700x0/photo/2022/03/05/manfaat-makan-worteljpg-20220305070713.jpg',
			price: 3000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedWortelRebus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedWortelRebus.id,
			foodRecipeId: foodRecipeSeedWortelRebus.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedWortelRebus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedWortelKukus = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Wortel, kukus',
		},
	});
	const foodSeedWortelKukus = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Wortel, kukus',
			description: 'Ini adalah Wortel, kukus.',
			image: 'https://www.wikihow.com/images_en/thumb/8/86/Steam-Carrots-Step-6-Version-3.jpg/550px-nowatermark-Steam-Carrots-Step-6-Version-3.jpg',
			price: 4000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedWortelKukus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedWortelKukus.id,
			foodRecipeId: foodRecipeSeedWortelKukus.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedWortelKukus.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedAsinanBogor = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Asinan Bogor, sayuran',
		},
	});
	const foodSeedAsinanBogor = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Asinan Bogor, sayuran',
			description: 'Ini adalah Asinan Bogor, sayuran.',
			image: 'https://2.bp.blogspot.com/-KIrziolXTqk/X2WHIubUfII/AAAAAAAAMZw/YvJr5coUvOsMHoT3Bn42enq-3jX9TdKxwCLcBGAsYHQ/s1600/37420617_1818617494841674_7594512523139743744_n.jpg',
			price: 10000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedAsinanBogor.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedAsinanBogor.id,
			foodRecipeId: foodRecipeSeedAsinanBogor.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedAsinanBogor.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedLangsatSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Langsat, segar',
		},
	});
	const foodSeedLangsatSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Langsat, segar',
			description: 'Ini adalah Langsat, segar.',
			image: 'https://storage.googleapis.com/manfaat/2018/02/29e550e6-manfaat-buah-langsat.png',
			price: 15000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedLangsatSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedLangsatSegar.id,
			foodRecipeId: foodRecipeSeedLangsatSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedLangsatSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedLemonSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Langsat, segar',
		},
	});
	const foodSeedLemonSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Lemon, segar',
			description: 'Ini adalah Langsat, segar.',
			image: 'https://images.tokopedia.net/img/cache/500-square/VqbcmM/2020/8/16/668b19a2-677d-459a-b719-f97b1e9eccdc.jpg',
			price: 8000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedLemonSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedLemonSegar.id,
			foodRecipeId: foodRecipeSeedLemonSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedLemonSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedLontarSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Lontar, segar',
		},
	});
	const foodSeedLontarSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Lemon, segar',
			description: 'Ini adalah Lontar, segar.',
			image: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2022/7/19/7366d78a-0047-480c-afce-2ec61fd4fa88.jpg',
			price: 5000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedLontarSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedLontarSegar.id,
			foodRecipeId: foodRecipeSeedLontarSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedLontarSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedManggaSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Mangga, segar',
		},
	});
	const foodSeedManggaSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Mangga, segar',
			description: 'Ini adalah Mangga, segar.',
			image: 'https://tokohinspiratif.id/wp-content/uploads/2019/10/03mangga2.jpg	',
			price: 5000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedManggaSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedManggaSegar.id,
			foodRecipeId: foodRecipeSeedManggaSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedManggaSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedManggaBenggalaSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Mangga benggala, segar',
		},
	});
	const foodSeedManggaBenggalaSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Mangga benggala, segar',
			description: 'Ini adalah Mangga benggala, segar.',
			image: 'https://tokohinspiratif.id/wp-content/uploads/2019/10/03manggaBenggala2.jpg',
			price: 6000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedManggaBenggalaSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedManggaBenggalaSegar.id,
			foodRecipeId: foodRecipeSeedManggaBenggalaSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedManggaBenggalaSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedManggaGedongSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Mangga gedong, segar',
		},
	});
	const foodSeedManggaGedongSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Mangga gedong, segar',
			description: 'Ini adalah Mangga gedong, segar.',
			image: 'https://www.rumahtanaman.com/wp-content/uploads/2014/05/GG.jpg',
			price: 7000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedManggaGedongSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedManggaGedongSegar.id,
			foodRecipeId: foodRecipeSeedManggaGedongSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedManggaGedongSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedManggaGolekSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Mangga golek, segar',
		},
	});
	const foodSeedManggaGolekSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Mangga golek, segar',
			description: 'Ini adalah Mangga golek, segar.',
			image: 'https://ik.imagekit.io/dcjlghyytp1/2018/09/sayurbox-mangofestival-jenismangga-rasanya-manggagolek-595x335.jpg?tr=f-auto,w-448',
			price: 8000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedManggaGolekSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedManggaGolekSegar.id,
			foodRecipeId: foodRecipeSeedManggaGolekSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedManggaGolekSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedManggaHarumanisSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Mangga harumanis, segar',
		},
	});
	const foodSeedManggaHarumanisSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Mangga harumanis, segar',
			description: 'Ini adalah Mangga harumanis, segar.',
			image: 'https://ik.imagekit.io/dcjlghyytp1/2020/10/mangga-harumanis-1080-595x595.jpg?tr=f-auto,w-448',
			price: 10000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedManggaHarumanisSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedManggaHarumanisSegar.id,
			foodRecipeId: foodRecipeSeedManggaHarumanisSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedManggaHarumanisSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedManggaIndramayuSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Mangga indramayu, segar',
		},
	});
	const foodSeedManggaIndramayuSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Mangga indramayu, segar',
			description: 'Ini adalah Mangga indramayu, segar.',
			image: 'https://ik.imagekit.io/dcjlghyytp1/2020/10/mangga-indramayu.jpg?tr=f-auto,w-448',
			price: 9000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedManggaIndramayuSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedManggaIndramayuSegar.id,
			foodRecipeId: foodRecipeSeedManggaIndramayuSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedManggaIndramayuSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedManggaKopekSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Mangga kopek, segar',
		},
	});
	const foodSeedManggaKopekSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Mangga kopek, segar',
			description: 'Ini adalah Mangga kopek, segar.',
			image: 'https://images.tokopedia.net/img/cache/215-square/shops-1/2021/6/20/2672183/2672183_1b75a874-ca17-4b9f-a282-81ac0179b76d.jpg',
			price: 7000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedManggaKopekSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedManggaKopekSegar.id,
			foodRecipeId: foodRecipeSeedManggaKopekSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedManggaKopekSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedManggaKwiniSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Mangga kwini, segar',
		},
	});
	const foodSeedManggaKwiniSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Mangga kwini, segar',
			description: 'Ini adalah Mangga kwini, segar.',
			image: 'https://ik.imagekit.io/dcjlghyytp1/2020/10/mangga-kweni-ig-595x595.jpg?tr=f-auto,w-448',
			price: 8000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedManggaKwiniSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedManggaKwiniSegar.id,
			foodRecipeId: foodRecipeSeedManggaKwiniSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedManggaKwiniSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedManggaManalagiSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Mangga manalagi, segar',
		},
	});
	const foodSeedManggaManalagiSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Mangga manalagi, segar',
			description: 'Ini adalah Mangga manalagi, segar.',
			image: 'https://ik.imagekit.io/dcjlghyytp1/2020/10/mangga-manalagi-1080-595x595.jpg?tr=f-auto,w-448',
			price: 12000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedManggaManalagiSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedManggaManalagiSegar.id,
			foodRecipeId: foodRecipeSeedManggaManalagiSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedManggaManalagiSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedManggaMudaSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Mangga muda, segar',
		},
	});
	const foodSeedManggaMudaSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Mangga muda, segar',
			description: 'Ini adalah Mangga muda, segar.',
			image: 'https://images.tokopedia.net/img/cache/700/product-1/2020/7/9/8875831/8875831_347ae0a9-eb28-44a6-9e72-91ecfaebe967_720_720.jpg',
			price: 6000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedManggaMudaSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedManggaMudaSegar.id,
			foodRecipeId: foodRecipeSeedManggaMudaSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedManggaMudaSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedManggisSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Manggis, segar',
		},
	});
	const foodSeedManggisSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Manggis, segar',
			description: 'Ini adalah Manggis, segar.',
			image: 'https://img.inews.co.id/media/620/files/inews_new/2021/06/08/cara_mengolah_kulit_manggis.jpg',
			price: 5000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedManggisSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedManggisSegar.id,
			foodRecipeId: foodRecipeSeedManggisSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedManggisSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedMarkisaSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Markisa, segar',
		},
	});
	const foodSeedMarkisaSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Markisa, segar',
			description: 'Ini adalah Markisa, segar.',
			image: 'https://sc04.alicdn.com/kf/U9a58688525d24e25a10c656a5b19874cy.jpg',
			price: 4000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedMarkisaSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedMarkisaSegar.id,
			foodRecipeId: foodRecipeSeedMarkisaSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedMarkisaSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedMatoaSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Matoa, segar',
		},
	});
	const foodSeedMatoaSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Matoa, segar',
			description: 'Ini adalah Matoa, segar.',
			image: 'https://s4.bukalapak.com/img/90611031732/large/data.jpeg',
			price: 15000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedMatoaSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedMatoaSegar.id,
			foodRecipeId: foodRecipeSeedMatoaSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedMatoaSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedMelonSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Melon, segar',
		},
	});
	const foodSeedMelonSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Melon, segar',
			description: 'Ini adalah Melon, segar.',
			image: 'https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/2/1/eff338a9-db72-406b-886b-2df6859de47c.jpg',
			price: 10000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedMelonSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedMelonSegar.id,
			foodRecipeId: foodRecipeSeedMelonSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedMelonSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedMentengSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Menteng, segar',
		},
	});
	const foodSeedMentengSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Menteng, segar',
			description: 'Ini adalah Menteng, segar.',
			image: 'https://images.tokopedia.net/img/cache/500-square/product-1/2021/2/15/inv/inv_fd9de16a-44eb-42a7-aba2-0a1bab7d1c5b_622_622.jpg',
			price: 7000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedMentengSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedMentengSegar.id,
			foodRecipeId: foodRecipeSeedMentengSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedMentengSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedNanasPalembangSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Nanas palembang, segar',
		},
	});
	const foodSeedNanasPalembangSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Nanas palembang, segar',
			description: 'Ini adalah Nanas palembang, segar.',
			image: 'https://s1.bukalapak.com/img/64839521221/large/Nanas_Palembang_Buah_Manis_Harga_Bersahabat_Ukuran_Besar_Gra.jpg',
			price: 6000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedNanasPalembangSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedNanasPalembangSegar.id,
			foodRecipeId: foodRecipeSeedNanasPalembangSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedNanasPalembangSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedNanasSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Nanas, segar',
		},
	});
	const foodSeedNanasSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Nanas, segar',
			description: 'Ini adalah Nanas, segar.',
			image: 'https://asset-a.grid.id/crop/0x0:0x0/360x240/photo/2018/04/08/500280527.jpg',
			price: 5000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedNanasSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedNanasSegar.id,
			foodRecipeId: foodRecipeSeedNanasSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedNanasSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedNangkaSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Nangka masak pohon, segar',
		},
	});
	const foodSeedNangkaSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Nangka masak pohon, segar',
			description: 'Ini adalah Nangka masak pohon, segar.',
			image: 'https://hastinpratiwi.com/wp-content/uploads/2020/12/Manfaat-nangka-matang.jpg',
			price: 10000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedNangkaSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedNangkaSegar.id,
			foodRecipeId: foodRecipeSeedNangkaSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedNangkaSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedPalaDagingSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Pala, daging, segar',
		},
	});
	const foodSeedPalaDagingSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Pala, daging, segar',
			description: 'Ini adalah Pala, daging, segar.',
			image: 'https://res.cloudinary.com/dk0z4ums3/image/upload/v1672648028/attached_image/buah-pala-dan-manfaatnya-bagi-kesehatan.jpg',
			price: 20000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedPalaDagingSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedPalaDagingSegar.id,
			foodRecipeId: foodRecipeSeedPalaDagingSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedPalaDagingSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedPepayaSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Pepaya, segar',
		},
	});
	const foodSeedPepayaSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Pepaya, segar',
			description: 'Ini adalah Pepaya, segar.',
			image: 'https://nilaigizi.com/assets/images/produk/produk_1599054887.jpg',
			price: 4000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedPepayaSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedPepayaSegar.id,
			foodRecipeId: foodRecipeSeedPepayaSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedPepayaSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedPisangAmbon = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang ambon, segar',
		},
	});
	const foodSeedPisangAmbon = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang ambon, segar',
			description: 'Ini adalah Pisang ambon, segar.',
			image: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2022/5/24/2723c72f-e00a-4862-b558-1c99915d36c0.jpg',
			price: 3000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedPisangAmbon.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedPisangAmbon.id,
			foodRecipeId: foodRecipeSeedPisangAmbon.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedPisangAmbon.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedPisangAngleng = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang angleng (pisang ampyang), segar',
		},
	});
	const foodSeedPisangAngleng = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang angleng (pisang ampyang), segar',
			description: 'Ini adalah Pisang angleng (pisang ampyang), segar.',
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqjlhR1Ei-n7Ga4tmpk3UpxevxucOPrSSJFGUh1Buj_8Bl-E2-yPR9oRxZvp4N6YskKYc&usqp=CAU',
			price: 4000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedPisangAngleng.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedPisangAngleng.id,
			foodRecipeId: foodRecipeSeedPisangAngleng.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedPisangAngleng.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedPisangAyamSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang ayam, segar',
		},
	});
	const foodSeedPisangAyamSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang ayam, segar',
			description: 'Ini adalah Pisang ayam, segar.',
			image: 'https://assets.tokko.io/0feaf09b-2761-465e-98df-a8ae8e3d0837/products/images/9239a74b-b3ba-43b0-8368-88ae7940ff5e',
			price: 2000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedPisangAyamSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedPisangAyamSegar.id,
			foodRecipeId: foodRecipeSeedPisangAyamSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedPisangAyamSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedPisangGapiSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang gapi, segar',
		},
	});
	const foodSeedPisangGapiSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang gapi, segar',
			description: 'Ini adalah Pisang gapi, segar.',
			image: 'https://assets.tokko.io/ed7f41aa-f0e5-4923-a37d-1b675fe754c0/products/images/8613707e-e797-410e-9cea-053706a8aeb6',
			price: 3000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedPisangGapiSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedPisangGapiSegar.id,
			foodRecipeId: foodRecipeSeedPisangGapiSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedPisangGapiSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedPisangGorohoSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang goroho, segar',
		},
	});
	const foodSeedPisangGorohoSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang goroho, segar',
			description: 'Ini adalah Pisang goroho, segar.',
			image: 'https://1.bp.blogspot.com/-c-tzC5mdFJk/YAJHRRIDLBI/AAAAAAAANB8/AAMWoCEpuwA-yoMtbM-gGGwP2A5xZM1rwCLcBGAsYHQ/s640/pisang%2Bgoroho%2Basli%2Bmanado%2Bsulawesi%2Btenggara.jpg',
			price: 5000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedPisangGorohoSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedPisangGorohoSegar.id,
			foodRecipeId: foodRecipeSeedPisangGorohoSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedPisangGorohoSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedPisangHijauSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang hijau, segar',
		},
	});
	const foodSeedPisangHijauSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang hijau, segar',
			description: 'Ini adalah Pisang hijau, segar.',
			image: 'https://img.okezone.com/content/2018/01/23/481/1849213/8-keajaiban-yang-bikin-anda-tergoda-memakan-pisang-hijau-UjEtFoevXC.jpg',
			price: 3000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedPisangHijauSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedPisangHijauSegar.id,
			foodRecipeId: foodRecipeSeedPisangHijauSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedPisangHijauSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedPisangKayuSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang kayu, segar',
		},
	});
	const foodSeedPisangKayuSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang kayu, segar',
			description: 'Ini adalah Pisang kayu, segar.',
			image: 'https://media.istockphoto.com/id/1452251760/id/foto/pisang-kayu.jpg?s=170667a&w=0&k=20&c=TfPxl6qbln-eElWCUM5ZZw6iIy-SMzqBJz8hqQ2aCxw=',
			price: 4000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedPisangKayuSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedPisangKayuSegar.id,
			foodRecipeId: foodRecipeSeedPisangKayuSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedPisangKayuSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedPisangKepokSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang kepok, segar',
		},
	});
	const foodSeedPisangKepokSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang kepok, segar',
			description: 'Ini adalah Pisang kepok, segar.',
			image: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2022/12/30/96d272db-ce68-4866-807b-567e6b1fcf17.jpg',
			price: 4000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedPisangKepokSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedPisangKepokSegar.id,
			foodRecipeId: foodRecipeSeedPisangKepokSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedPisangKepokSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedPisangKetipSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang ketip, segar',
		},
	});
	const foodSeedPisangKetipSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang ketip, segar',
			description: 'Ini adalah Pisang ketip, segar.',
			image: 'https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/8/10/ef1bcf38-0609-425b-bff6-91fd57f62bbb.jpg',
			price: 5000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedPisangKetipSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedPisangKetipSegar.id,
			foodRecipeId: foodRecipeSeedPisangKetipSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedPisangKetipSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedPisangKidangSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang kidang, segar',
		},
	});
	const foodSeedPisangKidangSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang kidang, segar',
			description: 'Ini adalah Pisang kidang, segar.',
			image: 'https://o-cdn-cas.sirclocdn.com/parenting/images/pisang-merah.width-800.jpegquality-80.jpg',
			price: 4000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedPisangKidangSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedPisangKidangSegar.id,
			foodRecipeId: foodRecipeSeedPisangKidangSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedPisangKidangSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedPisanglampungSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang lampung, segar',
		},
	});
	const foodSeedPisanglampungSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang lampung, segar',
			description: 'Ini adalah Pisang lampung, segar.',
			image: 'https://images.tokopedia.net/img/cache/700/product-1/2019/10/8/70319360/70319360_9c8b3545-c893-48c9-ae77-675911beaca9_1000_1000',
			price: 6000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedPisanglampungSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedPisanglampungSegar.id,
			foodRecipeId: foodRecipeSeedPisanglampungSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedPisanglampungSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedPisangMasBaliArpenan = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang mas bali ampenan, segar',
		},
	});
	const foodSeedPisangMasBaliArpenan = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang mas bali ampenan, segar',
			description: 'Ini adalah Pisang mas bali ampenan, segar.',
			image: 'https://assets2.rumah-bumn.id/produk/1569982733.jpg',
			price: 7000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedPisangMasBaliArpenan.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedPisangMasBaliArpenan.id,
			foodRecipeId: foodRecipeSeedPisangMasBaliArpenan.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedPisangMasBaliArpenan.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedPisangMasKopangArpenan = await prisma.foodRecipe.create(
		{
			data: {
				uuid: uuidv4(),
				name: 'Pisang mas bali kopang, segar',
			},
		},
	);
	const foodSeedPisangMasKopangArpenan = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang mas bali kopang, segar',
			description: 'Ini adalah Pisang mas bali kopang, segar.',
			image: 'https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/6/18/25f855ad-5c91-4641-ac1d-292f9e3708cd.jpg',
			price: 8000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedPisangMasKopangArpenan.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedPisangMasKopangArpenan.id,
			foodRecipeId: foodRecipeSeedPisangMasKopangArpenan.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedPisangMasKopangArpenan.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedPisangMas = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang mas, segar',
		},
	});
	const foodSeedPisangMas = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang mas, segar',
			description: 'Ini adalah Pisang mas, segar.',
			image: 'https://assets.klikindomaret.com/share/20117397_1.jpg',
			price: 5000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedPisangMas.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedPisangMas.id,
			foodRecipeId: foodRecipeSeedPisangMas.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedPisangMas.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedPisangRajaSereh = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang raja sereh, segar',
		},
	});
	const foodSeedPisangRajaSereh = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang raja sereh, segar',
			description: 'Ini adalah Pisang raja sereh, segar.',
			image: 'https://o-cdn-cas.sirclocdn.com/parenting/images/manfaat-pisang-raja-sereh.width-800.format-webp.webp',
			price: 9000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedPisangRajaSereh.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedPisangRajaSereh.id,
			foodRecipeId: foodRecipeSeedPisangRajaSereh.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedPisangRajaSereh.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedPisangRaja = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang raja, segar',
		},
	});
	const foodSeedPisangRaja = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang raja, segar',
			description: 'Ini adalah Pisang raja, segar.',
			image: 'https://asset.kompas.com/crops/WTI1_pfkO93jNqt6bcgiUvr8ov0=/24x23:992x668/750x500/data/photo/2022/07/21/62d8f40e157f8.jpg',
			price: 10000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedPisangRaja.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedPisangRaja.id,
			foodRecipeId: foodRecipeSeedPisangRaja.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedPisangRaja.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedPisangRotan = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang rotan, segar',
		},
	});
	const foodSeedPisangRotan = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang rotan, segar',
			description: 'Ini adalah Pisang rotan, segar.',
			image: 'https://www.tebetbarat.com/buah/index_files/pisangrotan.jpg',
			price: 6000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedPisangRotan.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedPisangRotan.id,
			foodRecipeId: foodRecipeSeedPisangRotan.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedPisangRotan.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedPisangTalas = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang talas, segar',
		},
	});
	const foodSeedPisangTalas = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang talas, segar',
			description: 'Ini adalah Pisang talas, segar.',
			image: 'https://s3.bukalapak.com/img/874746887/large/Pisang_Talas.jpeg',
			price: 7000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedPisangTalas.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedPisangTalas.id,
			foodRecipeId: foodRecipeSeedPisangTalas.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedPisangTalas.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedPisangTujuhBulan = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang tujuh bulan',
		},
	});
	const foodSeedPisangTujuhBulan = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang tujuh bulan',
			description: 'Ini adalah Pisang tujuh bulan.',
			image: 'https://oss.mommyasia.id/photo/5c73a5f98e4d537b0ab7a648?x-oss-process=style/_m',
			price: 5000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedPisangTujuhBulan.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedPisangTujuhBulan.id,
			foodRecipeId: foodRecipeSeedPisangTujuhBulan.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedPisangTujuhBulan.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedPisangUaSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang ua, segar',
		},
	});
	const foodSeedPisangUaSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang ua, segar',
			description: 'Ini adalah Pisang ua, segar.',
			image: 'https://awsimages.detik.net.id/customthumb/2013/04/01/900/pisangcntt.jpg?w=700&q=90',
			price: 6000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedPisangUaSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedPisangUaSegar.id,
			foodRecipeId: foodRecipeSeedPisangUaSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedPisangUaSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedPisangUliSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang uli, segar',
		},
	});
	const foodSeedPisangUliSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Pisang uli, segar',
			description: 'Ini adalah Pisang uli, segar.',
			image: 'https://s3.bukalapak.com/img/85811020492/large/data.jpeg',
			price: 7000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedPisangUliSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedPisangUliSegar.id,
			foodRecipeId: foodRecipeSeedPisangUliSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedPisangUliSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedPurutSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Purut, segar',
		},
	});
	const foodSeedPurutSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Purut, segar',
			description: 'Ini adalah Purut, segar.',
			image: 'https://lzd-img-global.slatic.net/g/ff/kf/S78e9c00f9b474798a7c2253728d33684O.jpg_720x720q80.jpg_.webp',
			price: 4000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedPurutSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedPurutSegar.id,
			foodRecipeId: foodRecipeSeedPurutSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedPurutSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedRambutanBinjai = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Rambutan binjai, segar',
		},
	});
	const foodSeedRambutanBinjai = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Rambutan binjai, segar',
			description: 'Ini adalah Rambutan binjai, segar.',
			image: 'https://www.jualbenihmurah.com/wp-content/uploads/2021/02/buah-binjai.jpg',
			price: 12000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedRambutanBinjai.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedRambutanBinjai.id,
			foodRecipeId: foodRecipeSeedRambutanBinjai.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedRambutanBinjai.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedRambutanSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Rambutan, segar',
		},
	});
	const foodSeedRambutanSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Rambutan, segar',
			description: 'Ini adalah Rambutan, segar.',
			image: 'https://cdn.idntimes.com/content-images/community/2019/05/rambutan-ftr-a504649459cd0b5769e317f2064d76d7_600x400.jpg',
			price: 10000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedRambutanSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedRambutanSegar.id,
			foodRecipeId: foodRecipeSeedRambutanSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedRambutanSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedSalakBali = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Salak bali, segar',
		},
	});
	const foodSeedSalakBali = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Salak bali, segar',
			description: 'Ini adalah Salak bali, segar.',
			image: 'https://id-live-02.slatic.net/p/a91aa1988e8f2ed759261b1b4ebb5aa3.jpg',
			price: 10000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedSalakBali.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedSalakBali.id,
			foodRecipeId: foodRecipeSeedSalakBali.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedSalakBali.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedSalakMedanSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Salak medan, segar',
		},
	});
	const foodSeedSalakMedanSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Salak medan, segar',
			description: 'Ini adalah Salak medan, segar.',
			image: 'https://images.tokopedia.net/img/cache/700/product-1/2019/7/6/5688428/5688428_aa6ccaee-4062-4912-97cf-acdd735ced93_412_412.jpg',
			price: 9000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedSalakMedanSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedSalakMedanSegar.id,
			foodRecipeId: foodRecipeSeedSalakMedanSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedSalakMedanSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedSalakPondohSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Salak pondoh, segar',
		},
	});
	const foodSeedSalakPondohSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Salak pondoh, segar',
			description: 'Ini adalah Salak pondoh, segar.',
			image: 'https://home.lapakbuah.com/wp-content/uploads/2021/06/SALAK-PONDOH.jpeg',
			price: 7000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedSalakPondohSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedSalakPondohSegar.id,
			foodRecipeId: foodRecipeSeedSalakPondohSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedSalakPondohSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedSalakSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Salak, segar',
		},
	});
	const foodSeedSalakSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Salak, segar',
			description: 'Ini adalah Salak, segar.',
			image: 'https://images.tokopedia.net/img/cache/500-square/product-1/2020/6/4/358767732/358767732_407e9383-a593-4aa5-a70c-9f0b573df1ba_695_695.jpg',
			price: 8000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedSalakSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedSalakSegar.id,
			foodRecipeId: foodRecipeSeedSalakSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedSalakSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedSawoDurenSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Sawo duren, segar',
		},
	});
	const foodSeedSawoDurenSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Sawo duren, segar',
			description: 'Ini adalah Sawo duren, segar.',
			image: 'https://eventkampus.com/data/artikel/2/7-manfaat-dan-khasiat-sawo-duren-untuk-kesehatan.jpeg',
			price: 10000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedSawoDurenSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedSawoDurenSegar.id,
			foodRecipeId: foodRecipeSeedSawoDurenSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedSawoDurenSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedSawoKecikSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Sawo kecik, segar',
		},
	});
	const foodSeedSawoKecikSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Sawo kecik, segar',
			description: 'Ini adalah Sawo kecik, segar.',
			image: 'https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1634025439/0180e949101fe17710834ba7e13dfbfa.jpg',
			price: 6000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedSawoKecikSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedSawoKecikSegar.id,
			foodRecipeId: foodRecipeSeedSawoKecikSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedSawoKecikSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedSawoManilaSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Sawo Manila, segar',
		},
	});
	const foodSeedSawoManilaSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Sawo Manila, segar',
			description: 'Ini adalah Sawo Manila, segar.',
			image: 'https://www.rumahtanaman.com/wp-content/uploads/2017/01/Untitled-design.png',
			price: 8000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedSawoManilaSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedSawoManilaSegar.id,
			foodRecipeId: foodRecipeSeedSawoManilaSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedSawoManilaSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedSemangkaSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Semangka, segar',
		},
	});
	const foodSeedSemangkaSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Semangka, segar',
			description: 'Ini adalah Semangka, segar.',
			image: 'https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/05/04071222/Kaya-Nutrisi-Ini-11-Khasiat-Buah-Semangka-untuk-Kesehatan-Tubuh.jpg',
			price: 5000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedSemangkaSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedSemangkaSegar.id,
			foodRecipeId: foodRecipeSeedSemangkaSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedSemangkaSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedSirsakSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Sirsak, segar',
		},
	});
	const foodSeedSirsakSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Sirsak, segar',
			description: 'Ini adalah Sirsak, segar.',
			image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-8800055/afcbandung_buah_sirsak_segar_1kg_full01_uo07vdm9.jpg',
			price: 7000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedSirsakSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedSirsakSegar.id,
			foodRecipeId: foodRecipeSeedSirsakSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedSirsakSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedSowaSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Sowa, segar',
		},
	});
	const foodSeedSowaSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Sowa, segar',
			description: 'Ini adalah Sowa, segar.',
			image: 'https://bibitbunga.com/wp-content/uploads/2016/08/daun-dill-adas-sowa.jpg',
			price: 6000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedSowaSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedSowaSegar.id,
			foodRecipeId: foodRecipeSeedSowaSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedSowaSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedSrikayaSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Srikaya, segar',
		},
	});
	const foodSeedSrikayaSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Srikaya, segar',
			description: 'Ini adalah Srikaya, segar.',
			image: 'https://t-2.tstatic.net/jogja/foto/bank/images/8-manfaat-mengonsumsi-buah-srikaya.jpg',
			price: 8000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedSrikayaSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedSrikayaSegar.id,
			foodRecipeId: foodRecipeSeedSrikayaSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedSrikayaSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedSukunMudaSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Sukun muda, segar',
		},
	});
	const foodSeedSukunMudaSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Sukun muda, segar',
			description: 'Ini adalah Sukun muda, segar.',
			image: 'https://titipku.com/blog/wp-content/uploads/2022/11/shutterstock_1777606616.jpg',
			price: 6000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedSukunMudaSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedSukunMudaSegar.id,
			foodRecipeId: foodRecipeSeedSukunMudaSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedSukunMudaSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedSukunTuaSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Sukun tua, segar',
		},
	});
	const foodSeedSukunTuaSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Sukun tua, segar',
			description: 'Ini adalah Sukun tua, segar.',
			image: 'https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/7/1/ffeb91af-da08-4d68-95df-5677b61d7054.jpg',
			price: 7000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedSukunTuaSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedSukunTuaSegar.id,
			foodRecipeId: foodRecipeSeedSukunTuaSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedSukunTuaSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedWaniSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Wani, segar',
		},
	});
	const foodSeedWaniSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Wani, segar',
			description: 'Ini adalah Wani, segar.',
			image: 'https://www.kintamani.id/wp-content/uploads/Buah-Wani-Khas-Bali-2-1024x1024.jpg',
			price: 5000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedWaniSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedWaniSegar.id,
			foodRecipeId: foodRecipeSeedWaniSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedWaniSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedMentimunSuriSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Mentimun Suri, segar',
		},
	});
	const foodSeedMentimunSuriSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Mentimun Suri, segar',
			description: 'Ini adalah Mentimun Suri, segar.',
			image: 'https://www.yayasankankerpayudaraindonesia.org/images/uploads/2020/05/Timun-Suri-mandira.jpg?var=214557512',
			price: 4000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedMentimunSuriSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedMentimunSuriSegar.id,
			foodRecipeId: foodRecipeSeedMentimunSuriSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedMentimunSuriSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedSusuKambingSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Susu kambing, segar',
		},
	});
	const foodSeedSusuKambingSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Susu kambing, segar',
			description: 'Ini adalah Susu kambing, segar.',
			image: 'https://sumbarprov.go.id/images/2017/07/thumbnails/susu_kambing.jpg',
			price: 15000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedSusuKambingSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedSusuKambingSegar.id,
			foodRecipeId: foodRecipeSeedSusuKambingSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedSusuKambingSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedSusuKerbauSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Susu kerbau, segar',
		},
	});
	const foodSeedSusuKerbauSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Susu kerbau, segar',
			description: 'Ini adalah Susu kerbau, segar.',
			image: 'https://pict.sindonews.net/dyn/960/salsabila/video/2021/06/13/9/25026/rasakan-kesegaran-susu-kerbau-yang-langsung-diambil-dari-peternakan-npl.png',
			price: 18000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedSusuKerbauSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedSusuKerbauSegar.id,
			foodRecipeId: foodRecipeSeedSusuKerbauSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedSusuKerbauSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedSusuKudaSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Susu kuda, segar',
		},
	});
	const foodSeedSusuKudaSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Susu kuda, segar',
			description: 'Ini adalah Susu kuda, segar.',
			image: 'https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2021/03/02/967292615.jpg',
			price: 16000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedSusuKudaSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedSusuKudaSegar.id,
			foodRecipeId: foodRecipeSeedSusuKudaSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedSusuKudaSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});

	const foodRecipeSeedSusuSapiSegar = await prisma.foodRecipe.create({
		data: {
			uuid: uuidv4(),
			name: 'Susu sapi, segar',
		},
	});
	const foodSeedSusuSapiSegar = await prisma.food.create({
		data: {
			uuid: uuidv4(),
			name: 'Susu sapi, segar',
			description: 'Ini adalah Susu sapi, segar.',
			image: 'https://cdn-2.tstatic.net/manado/foto/bank/images/susu-sapi-segar.jpg',
			price: 12000,
			status: 'publish',
			foodRecipeId: foodRecipeSeedSusuSapiSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
		},
	});
	await prisma.foodDetail.create({
		data: {
			uuid: uuidv4(),
			fat: 2.2,
			protein: 9.4,
			carbohidrat: 79.1,
			calories: 374,
			foodId: foodSeedSusuSapiSegar.id,
			foodRecipeId: foodRecipeSeedSusuSapiSegar.id,
		},
	});
	await prisma.foodTagsOnFood.create({
		data: {
			uuid: uuidv4(),
			foodId: foodSeedSusuSapiSegar.id,
			foodTagsId: foodTagsSeedMakananRingan.id,
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
