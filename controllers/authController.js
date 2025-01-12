import db from '../database/queries';

exports.signup = async (req, res) => {
	const { email, username, password } = req.body;
	await db.createUser(email, username, password);
	res.redirect('/auth/login');
};
