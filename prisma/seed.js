const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync('12345678', salt);

async function main() {
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
