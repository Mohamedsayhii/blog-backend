import prisma from './prisma';
import { hash } from 'bcryptjs';

const createUser = async (email, username, password) => {
	const cryptedPassword = hash(password, 10, async (err, hashedPassword) => {
		console.log(`Password couldn't be hashed. Error: \n ${err}`);
	});

	await prisma.user.create({
		data: {
			email: email,
			username: username,
			password: cryptedPassword,
		},
	});
};

module.exports = { createUser };
