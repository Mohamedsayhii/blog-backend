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

const findUser = async (email) => {
	return await prisma.user.findUnique({
		where: {
			email,
		},
	});
};

const createPost = async (title, content, published) => {
	return await prisma.post.create({
		data: {
			title: title,
			content: content,
			published: published,
		},
	});
};

module.exports = { createUser, findUser, createPost };
