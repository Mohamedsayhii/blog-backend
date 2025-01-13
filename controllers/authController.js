import asyncHandler from 'express-async-handler';
import db from '../database/queries';
import validateLogin from '../middlewares/validateFields';
import { validationResult } from 'express-validator';
import CustomError from '../utils/customError';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

exports.signup = async (req, res) => {
	const { email, username, password } = req.body;
	await db.createUser(email, username, password);
	res.redirect('/auth/login');
};

exports.login = [
	validateLogin,
	asyncHandler(async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				message: 'Validation Error',
			});
		}

		const { email, password } = req.body;

		const user = await db.findUser(email);
		if (!user) {
			throw new CustomError('Email does not exist', 401);
		}

		const match = await compare(password, user.password);
		if (!match) {
			throw new CustomError('Password is incorrect', 401);
		}

		jwt.sign(
			user,
			process.env.SECRET,
			{ expiresIn: '3h' },
			(err, token) => {
				if (err) {
					throw new CustomError(err.message, 409);
				}

				return res.status(200).json({
					token,
					message: 'Token created successfully.',
				});
			}
		);
	}),
];
