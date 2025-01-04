const bcrypt = require('bcryptjs');
const passport = require('passport');
const prisma = require('../database/prisma');

passport.use();

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
	try {
		const user = await prisma.user.findUnique({ where: { id } });
		done(null, user);
	} catch (err) {
		done(err);
	}
});
