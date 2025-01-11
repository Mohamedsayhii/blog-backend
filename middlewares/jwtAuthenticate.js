import passport from '../config/passport';

const jwtAuthenticate = passport.authenticate('jwt', { session: false });

export { jwtAuthenticate };
