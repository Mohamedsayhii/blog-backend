import asyncHandler from 'express-async-handler';
import db from '../database/queries';
import CustomError from '../utils/customError';

exports.getAllComments = asyncHandler(async (req, res) => {
	const comments = await db.getComments();
	if (!comments) {
		throw new CustomError(`Comments not fetched`, 404);
	}

	res.status(200).json(comments);
});
