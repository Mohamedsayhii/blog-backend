import asyncHandler from 'express-async-handler';
import db from '../database/queries.js';
import CustomError from '../utils/customError.js';
import { validateComment } from '../middlewares/validateFields.js';
import { validationResult } from 'express-validator';

export const getAllComments = asyncHandler(async (req, res) => {
	const { postId } = req.params;
	const comments = await db.getComments(postId);
	if (!comments) {
		throw new CustomError(`Comments not fetched`, 400);
	}

	return res.status(200).json(comments);
});

export const createComment = [
	validateComment,
	asyncHandler(async (req, res) => {
		const { postId } = req.params;
		const { author, text } = req.body;

		if (!author || !text) {
			throw new CustomError('Author and text are required', 400);
		}

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const errorMessages = errors.array().map((error) => error.msg);
			throw new CustomError(errorMessages, 400);
		}

		const comment = await db.createComment(author, text, postId);
		return res.status(200).json(comment);
	}),
];

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

	return res.status(200).json(comment);
});

export const deleteComment = asyncHandler(async (req, res) => {
	const { postId, commentId } = req.params;

	const comment = await db.deleteComment(postId, commentId);

	return res.status(200).json(comment);
});
