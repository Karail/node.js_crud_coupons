import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
//Models
import { User } from '../../user/models';

export const jwtStrategy = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
    try {
        const user = await User.findOne({where: {id: payload.id}});
        if (user) {
            return done(null, user);
        } else {
            throw Error('user is not fined');
        }
    } catch (ex) {
        return done(ex, null);
    }
});