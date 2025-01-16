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
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	return user;
};

const createPost = async (title, content, published) => {
	const post = await prisma.post.create({
		data: {
			title: title,
			content: content,
			published: published,
		},
	});

	return post;
};

const getPosts = async () => {
	const posts = await prisma.post.findMany();

	return posts;
};

const getPost = async (postId) => {
	const post = await prisma.post.findUnique({
		where: {
			id: postId,
		},
	});

	return post;
};

const updatePost = async (postId, title, content, published) => {
	const post = await prisma.post.update({
		where: {
			id: postId,
		},

		data: {
			title: title,
			content: content,
			published: published,
		},
	});

	return post;
};

const deletePost = async (postId) => {
	const post = prisma.post.delete({ where: postId });

	return post;
};

const getComments = async () => {
	const comments = prisma.comment.findMany();

	return comments;
};

const createComment = async (author, text, postId) => {
	const comment = await prisma.comment.create({
		data: {
			author: author,
			text: text,
			postId: postId,
		},
	});

	return comment;
};

module.exports = {
	createUser,
	findUser,
	createPost,
	getPosts,
	getPost,
	updatePost,
	deletePost,
	getComments,
	createComment,
};
