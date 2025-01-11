import bcrypt from 'bcryptjs';
import passport from 'passport';
import { ExtractJwt, JwtStrategy } from 'passport-jwt';
import prisma from '../database/prisma';
require('dotenv').config();

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.SECRET,
};

passport.use(
	new JwtStrategy(opts, async (jwt_payload, done) => {
		try {
			const user = prisma.user.findUnique({
				where: { email: jwt_payload.email },
			});

			if (!user) {
				return done(null, false);
			}

			return done(null, jwt_payload);
		} catch (error) {
			return done(error, false);
		}
	})
);

export default passport;
