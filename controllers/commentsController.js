import asyncHandler from 'express-async-handler';
import db from '../database/queries';
import CustomError from '../utils/customError';

exports.getAllComments = asyncHandler(async (req, res) => {
	const comments = await db.getComments();
	if (!comments) {
		throw new CustomError(`Comments not fetched`, 400);
	}

	res.status(200).json(comments);
});

exports.createComment = asyncHandler(async (req, res) => {
	const { postId } = req.params;
	const post = db.getPost(postId);
	if (!post) {
		throw new CustomError(`Post with id: ${postId} is not found`, 404);
	}

	const { author, text } = req.body;
	if (!author || !text) {
		throw new CustomError(`Author and text are required`, 400);
	}

	const comment = db.createComment(author, text, postId);

	res.status(200).json(comment);
});
