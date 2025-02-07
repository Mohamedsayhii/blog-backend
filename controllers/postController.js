import { validatePost } from '../middlewares/validateFields.js';
import asyncHandler from 'express-async-handler';
import db from '../database/queries.js';
import CustomError from '../utils/customError.js';

export const createPost = [
	validatePost,
	asyncHandler(async (req, res) => {
		const { title, content, published } = req.body;
		if (!title || !content) {
			throw new CustomError('Title and content are required', 400);
		}

		const post = await db.createPost(title, content, published);
		return res.status(200).json(post);
	}),
];

export const getAllPosts = asyncHandler(async (req, res) => {
	const posts = await db.getPosts();
	if (!posts) {
		throw new CustomError(`Couldn't fetch posts from database`, 400);
	}

	return res.status(200).json(posts);
});

export const getPost = asyncHandler(async (req, res) => {
	const { postId } = req.params;

	const post = await db.getPost(postId);
	if (!post) {
		throw new CustomError(`Post with id: ${postId} doesn't exist`, 404);
	}

	return res.status(200).json(post);
});

export const updatePost = asyncHandler(async (req, res) => {
	const { postId } = req.params;
	const { title, content, published } = req.body;

	if (!title || !content) {
		throw new CustomError('Title and content are required', 400);
	}

	const post = await db.updatePost(postId, title, content, published);
	if (!post) {
		throw new CustomError(`Post with id: ${postId} doesn't exist`, 404);
	}

	return res.status(200).json(post);
});

export const deletePost = asyncHandler(async (req, res) => {
	const { postId } = req.params;
	const deletedPost = await db.deletePost(postId);

	return res.status(200).json(deletedPost);
});
