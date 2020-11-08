import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
//Models
import { User } from '../../user/models';

export const jwtStrategy = new JwtStrategy({
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
	try {
		const candidate = await User.findOne({ where: { id: payload.id } });
		if (candidate) {
			return done(null, candidate);
		} else {
			throw Error('user is not fined');
		}
	} catch (ex) {
		return done(ex, null);
	}
});