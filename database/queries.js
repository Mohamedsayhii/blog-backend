import prisma from './prisma.js';
import bcryptjs from 'bcryptjs';

const createUser = async (email, username, password) => {
	const cryptedPassword = await bcryptjs.hash(password, 10);

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
			published: published === 'true',
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
			published: published === 'true',
		},
	});

	return post;
};

const deletePost = async (postId) => {
	await prisma.comment.deleteMany({
		where: {
			postId: postId,
		},
	});

	const post = await prisma.post.delete({ where: { id: postId } });

	return post;
};

const getAllComments = async () => {
	const comments = prisma.comment.findMany();

	return comments;
};

const getComments = async (postId) => {
	const comments = await prisma.comment.findMany({
		where: {
			postId: postId,
		},
	});

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

const updateComment = async (postId, commentId, author, text) => {
	const comment = await prisma.comment.update({
		where: {
			id: commentId,
			postId: postId,
		},

		data: {
			author: author,
			text: text,
		},
	});

	return comment;
};

const deleteComment = async (postId, commentId) => {
	const comment = await prisma.comment.delete({
		where: {
			id: commentId,
			postId: postId,
		},
	});

	return comment;
};

const db = {
	createUser,
	findUser,
	createPost,
	getPosts,
	getPost,
	updatePost,
	deletePost,
	getAllComments,
	getComments,
	createComment,
	updateComment,
	deleteComment,
};

export default db;
