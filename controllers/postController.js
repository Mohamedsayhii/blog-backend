const { validatePost } = require('../middlewares/validateFields');
import asyncHandler from 'express-async-handler';
import db from '../database/queries';
import CustomError from '../utils/customError';

exports.createPost = [
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
