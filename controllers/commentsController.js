import asyncHandler from 'express-async-handler';
import db from '../database/queries.js';
import CustomError from '../utils/customError.js';

export const getAllComments = asyncHandler(async (req, res) => {
	const { postId } = req.params;
	const comments = await db.getComments(postId);
	if (!comments) {
		throw new CustomError(`Comments not fetched`, 400);
	}

	res.status(200).json(comments);
});

export const createComment = asyncHandler(async (req, res) => {
	const { postId } = req.params;

	const { author, text } = req.body;
	if (!author || !text) {
		throw new CustomError(`Author and text are required`, 400);
	}

	const comment = db.createComment(author, text, postId);

	res.status(200).json(comment);
});

export const updateComment = asyncHandler(async (req, res) => {
	const { postId, commentId } = req.params;
	const post = db.getPost(postId);
	if (!post) {
		throw new CustomError(`Post with id: ${postId} is not found`, 404);
	}

	const { author, text } = req.body;
	if (!author || !text) {
		throw new CustomError(`Author and text are required`, 400);
	}

	const comment = await db.updateComment(postId, commentId, author, text);

	res.status(200).json(comment);
});

export const deleteComment = asyncHandler(async (req, res) => {
	const { postId, commentId } = req.params;

	const comment = await db.deleteComment(postId, commentId);

	return comment;
});
